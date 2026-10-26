// 进展页：首屏是流程图（核心），下面按日志的版式排进展、完成、求助、节点、意见、信息。内容全部来自 progress.js 整理的 PROGRESS.md
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
// 只显示有内容的栏目（求助只是按钮，不占栏目）：没开始就没有“进展”，没有确定日期就没有“节点”，没有意见就没有“意见”，路线没定就没有“信息”
const DATES = S.milestones.filter((m) => isDate(m.date));
const SECTIONS = [
  S.days.length && ["log", "进展"], ["tasks", "完成"],
  DATES.length && ["dates", "节点"], S.feedback.length && ["feedback", "意见"], S.meta.code && ["info", "信息"],
].filter(Boolean);
const has = (id) => SECTIONS.some(([x]) => x === id);
const taskRow = (t) => `<div class="task${t.done ? " done" : ""}"><span class="box">${t.done ? CHECK : ""}</span><span>${esc(t.id)}　${esc(t.title)}<span class="n">${t.who ? `【${esc(t.who)}】` : ""}${inl(t.note)}</span></span>${t.date ? `<time>${md2(t.date)}</time>` : "<span></span>"}</div>`;
const table = (cols, rows) => `<div class="tbl"><table><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;

// 仓库地址：https://用户名.github.io/仓库名/ → https://github.com/用户名/仓库名
const gh = location.hostname.match(/^([^.]+)\.github\.io$/);
const repoName = location.pathname.split("/").filter(Boolean)[0];
const REPO = gh ? `https://github.com/${gh[1]}/${repoName || `${gh[1]}.github.io`}` : "";
const mdUrl = new URL(encodeURI(S.file), location.href.split(/[?#]/)[0]).href;

// 三个按钮复制的话：接着做（给 AI）、我卡住了（给 AI 填求助）、发给 Charlie（带进度页链接）
const pageUrl = location.href.split("#")[0];
const UP = "https://github.com/charlie-yus/Emergence";
const own = REPO && !S.local && REPO.toLowerCase() !== UP.toLowerCase();   // 学生自己的 GitHub 进度页
const cont = own ? `请读我的 GitHub 仓库 ${REPO} ，先读 AGENTS.md，再读 PROGRESS.md，按里面的规则带我做。`
  : `请读 ${UP} 的 AGENTS.md，按里面的规则带我做。我的进度见附件 PROGRESS.md。`;
const stuck = `我卡住了。请按 ${UP} 的 workflow/00-principles.md 第五节，帮我把 PROGRESS.md 的“求助”一节填好：卡在哪一步、原样报错、想要的结果、已经试过什么、想问 Charlie 的 1–3 个问题（尽量写成是/否题）。${own ? `改完更新到我的仓库 ${REPO}；你改不了仓库的话，给我完整的新版 PROGRESS.md。` : "然后给我完整的新版 PROGRESS.md，并写好发给 Charlie 的那段话。"}`;
const helpText = [...S.help.kv.map(([k, v]) => `${k}：${v}`), ...(S.help.qs.length ? ["想问：", ...S.help.qs.map((q, i) => `${i + 1}. ${q}`)] : [])].join("\n");
const where = own ? `进度页：${pageUrl}` : "（附件：PROGRESS.md）";
const toCharlie = S.help.on ? `Charlie，我的论文卡住了：\n${helpText}\n${where}` : `Charlie，我的论文有问题想问你。\n${where}`;
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
    <div class="flow">${window.flowSVG(S)}</div>
    ${window.flowList(S)}
    <div class="panel" id="panel"></div>
  </div>
</div></header>

<nav class="sidenav" id="sidenav" aria-label="章节">${SECTIONS.map(([id, n]) => `<a href="#${id}" data-s="${id}"><i></i><span>${n}</span></a>`).join("")}</nav>
<div class="grid body" id="body">
  <div class="main">
    ${has("log") ? `<section id="log" class="block"><div class="bh"><h2>每天进展</h2><div class="seg" data-tabs="log">${S.days.slice(0, 7).map((d, i) => `<button aria-pressed="${!i}" data-k="${i}">${md2(d.date)}</button>`).join("")}</div></div><div class="bp" id="p-log"></div></section>` : ""}

    <section id="tasks" class="block"><div class="bh"><h2>完成情况 <em>${S.doneN} / ${S.tasks.length}</em></h2><div class="seg" data-tabs="tasks">${S.groups.map((g, i) => `<button aria-pressed="${g === S.cur?.group || (!S.cur && !i)}" data-k="${i}">${esc(g)}</button>`).join("")}</div></div>
      <div class="bar"><i style="width:${S.tasks.length ? (S.doneN / S.tasks.length) * 100 : 0}%"></i></div><div class="bp" id="p-tasks"></div></section>

    ${has("dates") ? `<section id="dates" class="block"><div class="bh"><h2>时间节点</h2><span class="hint">学校系统的节点以系统为准</span></div>
      ${table(["日期", "事项", "状态"], DATES.map((m) => [md2(m.date) + (m === next ? `<br><span class="hint">还有 ${days} 天</span>` : ""), m === next ? `<b>${inl(m.label)}</b>` : inl(m.label), esc(m.status)]))}</section>` : ""}

    ${has("feedback") ? `<section id="feedback" class="block"><div class="bh"><h2>老师意见</h2><span class="hint">记在 PROGRESS.md 的“老师意见”</span></div>
      <div class="fbt">${table(["", "日期", "老师说", "落实"], S.feedback.map((f) => [`<span class="st ${f.state}" title="${STATE[f.state]}"></span>`, esc(f.date), inl(f.text), inl(f.reply)]))}</div>
      <div class="legend"><span><i class="st done"></i>已落实</span><span><i class="st doing"></i>进行中</span><span><i class="st ask"></i>待确认</span></div></section>` : ""}

    ${has("info") ? `<section id="info" class="block"><div class="bh"><h2>关键信息</h2></div>
      ${table(["", ""], [["路线", esc(S.meta.route)], ["研究问题", inl(S.meta.question) || "—"], ["存放方式", esc(S.meta.storage) || "—"], ["下次怎么开始", inl(S.meta.nextStart) || "—"], ...S.info.map(([k, v]) => [esc(k), v ? inl(v) : "—"])])}</section>` : ""}
  </div>
</div>
<footer><span>牛马一号 · ${md2(S.meta.updated)}更新${S.local ? " · 本地文件" : ""}</span><span class="foot-links"><label class="open-file">打开进度文件<input type="file" id="openFile" accept=".md,.txt,text/markdown,text/plain" hidden /></label>${S.local ? "" : `<a href="${own ? `${REPO}/blob/main/${encodeURI(S.file)}` : encodeURI(S.file)}">PROGRESS.md</a>`}</span></footer>`;

// 打开进度文件：选文件或拖进页面，暂存后用 ?local=1 重新显示（不上传，只在本标签页）
function openLocal(file) {
  if (!file) return;
  file.text().then((t) => {
    try { sessionStorage.setItem("emergence-local", t); } catch { alert("浏览器不允许暂存文件，换个浏览器试试"); return; }
    location.href = `${location.pathname}?local=1`;
  });
}
$("#openFile").onchange = (e) => openLocal(e.target.files[0]);
addEventListener("dragover", (e) => e.preventDefault());
addEventListener("drop", (e) => { e.preventDefault(); openLocal([...e.dataTransfer.files].find((f) => /\.(md|txt)$/i.test(f.name))); });

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
    <div class="ptasks">${s.tasks.map((id) => TASK[id]).filter(Boolean).map(taskRow).join("") || '<p class="hint">路线定了以后，AI 会把这一段的步骤写进 PROGRESS.md。</p>'}</div>`;
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

// 流程更新提示：本仓库的 CHANGELOG.md 比上游旧时，在流程图上方提示去 Sync fork
const UPSTREAM = "https://github.com/charlie-yus/Emergence";
const UP_LOG = "https://raw.githubusercontent.com/charlie-yus/Emergence/main/CHANGELOG.md";
const ver = (t) => (String(t).match(/^##\s+(\d{4}-\d{2}-\d{2})\.(\d+)/m) || []).slice(1);
const newer = (a, b) => a.length && (!b.length || a[0] > b[0] || (a[0] === b[0] && +a[1] > +b[1]));
if (REPO.toLowerCase() !== UPSTREAM.toLowerCase()) {
  const get = (u) => fetch(u, { cache: "no-store" }).then((r) => (r.ok ? r.text() : "")).catch(() => "");
  Promise.all([get(`${encodeURI("CHANGELOG.md")}?t=${Date.now()}`), get(UP_LOG)]).then(([mine, up]) => {
    const m = ver(mine), u = ver(up);
    if (!newer(u, m)) return;
    $(".flow").insertAdjacentHTML("beforebegin", `<a class="help-bar update-bar" href="${REPO || UPSTREAM}" target="_blank" rel="noopener"><b>流程有更新</b>新版本 ${esc(u.join("."))}：到你的 GitHub 仓库页点 Sync fork → Update branch</a>`);
  });
}
