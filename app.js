// 进展页：首屏是流程图（核心），下面按日志的版式排进展、完成、求助、节点、意见、信息。内容全部来自 progress.js 整理的 进度.md
const S = window.STATUS;
const $ = (q) => document.querySelector(q);
const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const inl = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`(.+?)`/g, "<code>$1</code>");
const CHECK = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.2l2.3 2.3 4.7-5"/></svg>';
const md2 = (d) => { const [, m, day] = d.split("-"); return `${+m} 月 ${+day} 日`; };
const isDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);
const today = new Date(new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" }));
const next = S.milestones.find((m) => m.state === "todo" && isDate(m.date) && new Date(m.date) >= today);
const days = next ? Math.round((new Date(next.date) - today) / 864e5) : null;
const ago = Math.max(0, Math.round((today - new Date(S.meta.updated)) / 864e5));
const TASK = Object.fromEntries(S.tasks.map((t) => [t.id, t]));
const STATE = { done: "已落实", doing: "进行中", ask: "待确认" };
const SECTIONS = [["log", "进展"], ["tasks", "完成"], ["help", "求助"], ["dates", "节点"], ["feedback", "意见"], ["info", "信息"]];
const taskRow = (t) => `<div class="task${t.done ? " done" : ""}"><span class="box">${t.done ? CHECK : ""}</span><span>${esc(t.id)}　${esc(t.title)}<span class="n">${t.who ? `【${esc(t.who)}】` : ""}${inl(t.note)}</span></span>${t.date ? `<time>${md2(t.date)}</time>` : "<span></span>"}</div>`;
const table = (cols, rows) => `<div class="tbl"><table><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;

// 仓库地址：https://用户名.github.io/仓库名/ → https://github.com/用户名/仓库名
const gh = location.hostname.match(/^([^.]+)\.github\.io$/);
const repoName = location.pathname.split("/").filter(Boolean)[0];
const REPO = gh ? `https://github.com/${gh[1]}/${repoName || `${gh[1]}.github.io`}` : "";
const mdUrl = new URL(encodeURI(S.file), location.href.split(/[?#]/)[0]).href;

// 三个按钮复制的话：接着做（给 AI）、我卡住了（给 AI 填求助）、发给 Charlie（带进度页链接）
const pageUrl = location.href.split("#")[0];
const cont = `请读我的 GitHub 仓库 ${REPO || "（仓库链接）"} ，先读 AGENTS.md，再读 进度.md，按里面的规则带我做。`;
const stuck = `我卡住了。请按仓库里 流程/00_总则.md 第五节，帮我把 进度.md 的“求助”一节填好：卡在哪一步、原样报错、想要的结果、已经试过什么、想问 Charlie 的 1–3 个问题（尽量写成是/否题）。改完更新到仓库；你改不了仓库的话，给我完整的新版 进度.md。仓库：${REPO || "（仓库链接）"}`;
const toCharlie = `Charlie，我的论文卡住了，麻烦看一下：${pageUrl}#help`;
const curName = S.cur ? `第 ${S.cur.id} 步 ${S.cur.title}` : "全部完成";

$("#pillLinks").innerHTML = [["top", "流程"], ...SECTIONS].map(([id, n]) => `<a href="#${id}" data-s="${id}">${n}</a>`).join("");

$("#app").innerHTML = `
<header class="hero" id="top"><div class="art"><img src="assets/art/hero.jpg" alt="" /></div><div class="hero-in">
  <p class="eyebrow"><span class="eb-brand">牛马一号<i></i></span>更新于${ago <= 0 ? "今天" : ` ${ago} 天前`}</p>
  <h1>论文进展<span>-由Agent实时更新</span></h1>
  <p class="sub"><span>${esc(S.meta.title)}</span><span>${esc(S.meta.subtitle)}</span><br />${esc(S.meta.student)}</p>
  <div class="ai-strip"><span>${S.help.on ? "已填好求助，<b>点“发给 Charlie”</b>" : "交给 AI 接着做，卡住了<b>一键求助</b>"}</span>
    <nav>${S.help.on ? '<button id="toCharlie">发给 Charlie</button><button id="copyCont">接着做</button><button id="copyStuck">我卡住了</button>' : '<button id="copyCont">接着做</button><button id="copyStuck">我卡住了</button><button id="toCharlie">发给 Charlie</button>'}${REPO ? `<a href="${REPO}" target="_blank" rel="noopener">仓库</a>` : ""}</nav></div>
  <div class="window">
    <div class="win-bar"><b>论文流程</b><span class="hint">点圆圈看细节</span>
      <div class="track"><span><i class="pulse"></i>当前<b>${esc(curName)}</b></span>${next ? `<span>下一站<b>${md2(next.date)} ${esc(next.label)}</b>${days >= 0 ? `<em>${days} 天</em>` : ""}</span>` : ""}</div></div>
    ${S.help.on ? `<a class="help-bar" href="#help"><b>需要帮助</b>${esc((S.help.kv.find(([k]) => k === "卡在") || [, ""])[1])}</a>` : ""}
    <div class="flow">${window.flowSVG(S)}</div>
    ${window.flowList(S)}
    <div class="panel" id="panel"></div>
  </div>
</div></header>

<nav class="sidenav" id="sidenav" aria-label="章节">${SECTIONS.map(([id, n]) => `<a href="#${id}" data-s="${id}"><i></i><span>${n}</span></a>`).join("")}</nav>
<div class="grid body" id="body">
  <div class="main">
    <section id="log" class="block"><div class="bh"><h2>每天进展</h2><div class="seg" data-tabs="log">${S.days.slice(0, 7).map((d, i) => `<button aria-pressed="${!i}" data-k="${i}">${md2(d.date)}</button>`).join("")}</div></div><div class="bp" id="p-log"></div></section>

    <section id="tasks" class="block"><div class="bh"><h2>完成情况 <em>${S.doneN} / ${S.tasks.length}</em></h2><div class="seg" data-tabs="tasks">${S.groups.map((g, i) => `<button aria-pressed="${g === S.cur?.group || (!S.cur && !i)}" data-k="${i}">${esc(g)}</button>`).join("")}</div></div>
      <div class="bar"><i style="width:${S.tasks.length ? (S.doneN / S.tasks.length) * 100 : 0}%"></i></div><div class="bp" id="p-tasks"></div></section>

    <section id="help" class="block${S.help.on ? " help-on" : ""}"><div class="bh"><h2>求助</h2><span class="hint">${S.help.on ? "点上方“发给 Charlie”" : "暂无"}</span></div>
      ${S.help.on ? `${table(["", ""], S.help.kv.map(([k, v]) => [esc(k), inl(v)]))}${S.help.qs.length ? `<h3 class="dt">想问的问题</h3><ol class="playbook">${S.help.qs.map((q) => `<li>${inl(q)}</li>`).join("")}</ol>` : ""}`
        : `<p class="hint">卡住时点上方“我卡住了”，把复制的话发给 AI，它会把求助填到这里；再点“发给 Charlie”。</p>`}</section>

    <section id="dates" class="block"><div class="bh"><h2>时间节点</h2><span class="hint">学校系统的节点以系统为准</span></div>
      ${table(["日期", "事项", "状态"], S.milestones.map((m) => [isDate(m.date) ? md2(m.date) + (m === next ? `<br><span class="hint">还有 ${days} 天</span>` : "") : esc(m.date), m === next ? `<b>${inl(m.label)}</b>` : inl(m.label), esc(m.status)]))}</section>

    <section id="feedback" class="block"><div class="bh"><h2>老师意见</h2><span class="hint">记在 进度.md 的“老师意见”</span></div>
      ${S.feedback.length ? `<div class="fbt">${table(["", "日期", "老师说", "落实"], S.feedback.map((f) => [`<span class="st ${f.state}" title="${STATE[f.state]}"></span>`, esc(f.date), inl(f.text), inl(f.reply)]))}</div>
      <div class="legend"><span><i class="st done"></i>已落实</span><span><i class="st doing"></i>进行中</span><span><i class="st ask"></i>待确认</span></div>` : `<p class="hint">还没有老师意见。</p>`}</section>

    <section id="info" class="block"><div class="bh"><h2>关键信息</h2></div>
      ${table(["", ""], [["路线", esc(S.meta.route)], ["研究问题", inl(S.meta.question) || "—"], ...S.info.map(([k, v]) => [esc(k), v ? inl(v) : "—"])])}</section>
  </div>
</div>
<footer><span>牛马一号 · ${md2(S.meta.updated)}更新</span><a href="${REPO ? `${REPO}/blob/main/${encodeURI(S.file)}` : encodeURI(S.file)}">进度.md</a></footer>`;

// 各节横向切换：一次只显示一组
const PANEL = {
  log: (i) => { const d = S.days[i]; return d ? `<ul class="items">${d.items.map((t) => `<li class="item"><p>${inl(t)}</p></li>`).join("")}</ul>` : '<p class="hint">还没有记录。</p>'; },
  tasks: (i) => `<div class="cols">${S.tasks.filter((t) => t.group === S.groups[i]).map(taskRow).join("")}</div>`,
};
function setTab(name, i) {
  document.querySelectorAll(`[data-tabs="${name}"] button`).forEach((b) => b.setAttribute("aria-pressed", +b.dataset.k === i));
  $(`#p-${name}`).innerHTML = PANEL[name](i);
}
document.querySelectorAll("[data-tabs]").forEach((seg) => {
  seg.onclick = (e) => { const b = e.target.closest("button"); if (b) setTab(seg.dataset.tabs, +b.dataset.k); };
  const on = seg.querySelector('[aria-pressed="true"]');
  setTab(seg.dataset.tabs, on ? +on.dataset.k : 0);
});

// 流程图：点圆圈看这一段包含的步骤
function show(i) {
  const s = S.flow.stages[i];
  document.querySelectorAll(".stage, .fl-item").forEach((g) => g.classList.toggle("sel", +g.dataset.i === i));
  $("#panel").innerHTML = `<h4>${esc(s.n)} ${esc(s.name)}<span>${esc(s.date)} · ${esc(s.badge)}</span></h4>
    <div class="ptasks">${s.tasks.map((id) => TASK[id]).filter(Boolean).map(taskRow).join("") || '<p class="hint">路线定了以后，AI 会把这一段的步骤写进 进度.md。</p>'}</div>`;
}
document.querySelectorAll(".stage, .fl-item").forEach((g) => {
  g.onclick = () => show(+g.dataset.i);
  g.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(+g.dataset.i); } };
});
show(Math.max(0, S.flow.stages.findIndex((s) => s.state === "now")));

// 按钮：复制对应的话，按钮上提示下一步把它发给谁
async function copy(btn, text, done) {
  try { await navigator.clipboard.writeText(text); btn.textContent = done; } catch { btn.textContent = "复制失败"; }
}
$("#copyCont").onclick = (e) => copy(e.currentTarget, cont, "已复制，发给 AI");
$("#copyStuck").onclick = (e) => copy(e.currentTarget, stuck, "已复制，发给 AI");
$("#toCharlie").onclick = (e) => copy(e.currentTarget, toCharlie, "已复制，发给 Charlie");

// 目录高亮
const links = [...document.querySelectorAll("[data-s]")];
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.dataset.s === e.target.id)); }), { rootMargin: "-35% 0px -60% 0px" });
["top", ...SECTIONS.map(([id]) => id)].forEach((id) => io.observe(document.getElementById(id)));
// 侧边导航：到正文区才浮现
new IntersectionObserver(([e]) => $("#sidenav").classList.toggle("show", e.isIntersecting), { rootMargin: "0px 0px -40% 0px" }).observe($("#body"));
