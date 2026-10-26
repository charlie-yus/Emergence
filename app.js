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

// 给 AI 读
const ask = `请阅读 ${mdUrl} ，用不超过 5 句话总结这位同学毕业论文的进展：已完成什么、正在做什么、下一个节点、卡在哪里、需要 Charlie 或老师回答什么。`;
const cont = `请读我的 GitHub 仓库 ${REPO || "（仓库链接）"} ，先读 AGENTS.md，再读 进度.md，按里面的规则带我做。`;
const gpt = `https://chatgpt.com/?q=${encodeURIComponent(ask)}`, claude = `https://claude.ai/new?q=${encodeURIComponent(ask)}`;
const curName = S.cur ? `第 ${S.cur.id} 步 ${S.cur.title}` : "全部完成";

$("#pillLinks").innerHTML = [["top", "流程"], ...SECTIONS].map(([id, n]) => `<a href="#${id}" data-s="${id}">${n}</a>`).join("");

$("#app").innerHTML = `
<header class="hero" id="top"><div class="art"><img src="assets/art/hero.jpg" alt="" /></div><div class="hero-in">
  <p class="eyebrow"><span class="eb-brand">牛马一号<i></i></span>更新于${ago <= 0 ? "今天" : ` ${ago} 天前`}</p>
  <h1>论文进展<span>-由Agent实时更新</span></h1>
  <p class="sub"><span>${esc(S.meta.title)}</span><span>${esc(S.meta.subtitle)}</span><br />${esc(S.meta.student)}${S.meta.advisor ? ` · 指导老师 ${esc(S.meta.advisor)}` : ""}</p>
  <div class="ai-strip"><span>让 AI 读这一页，<b>一键总结进展</b></span>
    <nav><a href="${gpt}" target="_blank" rel="noopener">ChatGPT</a><a href="${claude}" target="_blank" rel="noopener">Claude</a><button id="copyCtx">复制全文</button><button id="copyCont">接着做</button>${REPO ? `<a href="${REPO}" target="_blank" rel="noopener">仓库</a>` : ""}</nav></div>
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

    <section id="help" class="block${S.help.on ? " help-on" : ""}"><div class="bh"><h2>求助</h2><span class="hint">${S.help.on ? "把仓库链接发给 Charlie" : "暂无"}</span></div>
      ${S.help.on ? `${table(["", ""], S.help.kv.map(([k, v]) => [esc(k), inl(v)]))}${S.help.qs.length ? `<h3 class="dt">想问的问题</h3><ol class="playbook">${S.help.qs.map((q) => `<li>${inl(q)}</li>`).join("")}</ol>` : ""}`
        : `<p class="hint">卡住时让 AI 填 进度.md 的“求助”一节，这里就会显示，Charlie 打开就能看到。</p>`}</section>

    <section id="dates" class="block"><div class="bh"><h2>时间节点</h2><span class="hint">学校系统的节点以系统为准</span></div>
      ${table(["日期", "事项", "状态"], S.milestones.map((m) => [isDate(m.date) ? md2(m.date) + (m === next ? `<br><span class="hint">还有 ${days} 天</span>` : "") : esc(m.date), m === next ? `<b>${inl(m.label)}</b>` : inl(m.label), esc(m.status)]))}</section>

    <section id="feedback" class="block"><div class="bh"><h2>老师意见</h2><span class="hint">记在 进度.md 的“老师意见”</span></div>
      ${S.feedback.length ? `<div class="fbt">${table(["", "日期", "老师说", "落实"], S.feedback.map((f) => [`<span class="st ${f.state}" title="${STATE[f.state]}"></span>`, esc(f.date), inl(f.text), inl(f.reply)]))}</div>
      <div class="legend"><span><i class="st done"></i>已落实</span><span><i class="st doing"></i>进行中</span><span><i class="st ask"></i>待确认</span></div>` : `<p class="hint">还没有老师意见。</p>`}</section>

    <section id="info" class="block"><div class="bh"><h2>关键信息</h2></div>
      ${table(["", ""], [["路线", esc(S.meta.route)], ["研究问题", inl(S.meta.question) || "—"], ...S.info.map(([k, v]) => [esc(k), v ? inl(v) : "—"])])}</section>
  </div>
</div>
<footer><span>牛马一号 · ${esc(S.meta.student)} · ${md2(S.meta.updated)}更新</span><a href="${REPO ? `${REPO}/blob/main/${encodeURI(S.file)}` : encodeURI(S.file)}">进度.md</a></footer>`;

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

// 给 AI：复制全文（总结用）/ 接着做（交给 AI 继续带）
async function copy(btn, text) {
  try { await navigator.clipboard.writeText(text); btn.textContent = "已复制"; } catch { btn.textContent = "复制失败"; }
}
$("#copyCtx").onclick = (e) => copy(e.currentTarget, `请用不超过 5 句话总结下面这位同学的毕业论文进展：已完成什么、正在做什么、下一个节点、卡在哪里、需要回答什么。\n\n${S.raw}`);
$("#copyCont").onclick = (e) => copy(e.currentTarget, cont);

// 目录高亮
const links = [...document.querySelectorAll("[data-s]")];
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.dataset.s === e.target.id)); }), { rootMargin: "-35% 0px -60% 0px" });
["top", ...SECTIONS.map(([id]) => id)].forEach((id) => io.observe(document.getElementById(id)));
// 侧边导航：到正文区才浮现
new IntersectionObserver(([e]) => $("#sidenav").classList.toggle("show", e.isIntersecting), { rootMargin: "0px 0px -40% 0px" }).observe($("#body"));
