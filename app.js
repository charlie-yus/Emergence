// 进度页：直接读取仓库里的 进度.md 并显示，无需构建。格式说明见 AGENTS.md「怎么更新 进度.md」
const $ = (q) => document.querySelector(q);
const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const inline = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`(.+?)`/g, "<code>$1</code>");
const CHECK = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.2l2.3 2.3 4.7-5"/></svg>';

// 仓库地址：https://用户名.github.io/仓库名/ → https://github.com/用户名/仓库名
function repoUrl() {
  const m = location.hostname.match(/^([^.]+)\.github\.io$/);
  if (!m) return "";
  const repo = location.pathname.split("/").filter(Boolean)[0];
  return repo ? `https://github.com/${m[1]}/${repo}` : `https://github.com/${m[1]}/${m[1]}.github.io`;
}

function sections(md) {
  const out = {};
  let cur = null;
  for (const line of md.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) { cur = h[1]; out[cur] = []; } else if (cur) out[cur].push(line);
  }
  return out;
}

function kv(lines = []) {
  const o = {};
  for (const l of lines) {
    const m = l.match(/^-\s*([^：:]+?)\s*[：:]\s*(.*)$/);
    if (m && !/^\[/.test(m[1])) o[m[1].trim()] = m[2].trim();
  }
  return o;
}

function steps(lines = []) {
  const phases = [];
  let ph = null, last = null;
  for (const l of lines) {
    const h = l.match(/^###\s+(.+)/);
    if (h) { ph = { name: h[1].trim(), items: [] }; phases.push(ph); continue; }
    const s = l.match(/^-\s*\[( |x|X)\]\s*(\S+)\s+([^【：:]+)(【[^】]*】)?\s*[：:]?\s*(.*)$/);
    if (s) {
      if (!ph) { ph = { name: "步骤", items: [] }; phases.push(ph); }
      last = { done: s[1] !== " ", no: s[2], name: s[3].trim(), who: (s[4] || "").replace(/[【】]/g, ""), note: s[5], sub: [] };
      ph.items.push(last);
      continue;
    }
    const sub = l.match(/^\s{2,}[-*]\s+(.*)/);
    if (sub && last) last.sub.push(sub[1]);
  }
  return phases;
}

function table(lines = []) {
  const rows = lines.filter((l) => /^\s*\|/.test(l)).map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
  return rows.filter((r) => !r.every((c) => /^:?-+:?$/.test(c)));
}

function list(lines = []) {
  return lines.map((l) => l.match(/^-\s+(.*)/)).filter(Boolean).map((m) => m[1]);
}

const today = new Date(new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" }));
const daysTo = (d) => Math.round((new Date(d) - today) / 864e5);

function render(md) {
  const S = sections(md);
  const info = kv(S["基本信息"]), now = kv(S["现在"]), key = kv(S["关键信息"]), help = kv(S["求助"]);
  const ph = steps(S["步骤"]);
  const all = ph.flatMap((p) => p.items), done = all.filter((x) => x.done).length;
  const cur = all.find((x) => !x.done);
  const dates = table(S["节点"]);
  const logs = list(S["记录"]);
  const repo = repoUrl();
  const askHelp = /^有/.test(help["状态"] || "");
  const title = info["题目"] && !/^（/.test(info["题目"]) ? info["题目"] : "毕业论文进度";
  const route = info["路线"] || "未定";
  const ok = /^是/.test(info["老师确认"] || "");
  const updated = info["更新"];
  const ago = updated ? daysTo(updated) * -1 : null;
  document.title = `${title} · 进度`;

  // 求助：除“状态”外的键值与编号问题
  const helpQs = (S["求助"] || []).map((l) => l.match(/^\s+\d+[.、]\s*(\S.*)$/)).filter(Boolean).map((m) => m[1]);
  const helpKv = Object.entries(help).filter(([k, v]) => k !== "状态" && v);

  // 节点：第一个未完成且日期有效的标为“下一个”
  const head = dates[0] || [];
  const body = dates.slice(1);
  const nextIdx = body.findIndex((r) => /^\d{4}-\d{2}-\d{2}$/.test(r[0]) && !/已/.test(r[2] || "") && daysTo(r[0]) >= 0);

  const prompt = `请读我的 GitHub 仓库 ${repo || "（仓库链接）"} ，先读 AGENTS.md，再读 进度.md，按里面的规则带我做。`;

  $("#app").innerHTML = `
  <header class="hero" id="top">
    <p class="eyebrow">${updated ? `更新于 ${ago <= 0 ? "今天" : `${ago} 天前`}` : "尚未更新"}</p>
    <h1>${esc(title.split("——")[0])}${title.includes("——") ? `<span>——${esc(title.split("——").slice(1).join("——"))}</span>` : ""}</h1>
    <p class="sub">${[info["姓名"] && !/^（/.test(info["姓名"]) ? esc(info["姓名"]) : "", info["指导老师"] ? `指导老师 ${esc(info["指导老师"])}` : ""].filter(Boolean).join(" · ")}</p>
    <div class="chips">
      <span class="chip">路线 ${esc(route)}</span>
      <span class="chip ${ok ? "ok" : "warn"}">${ok ? "老师已确认" : "老师未确认"}</span>
      <span class="chip">${done}/${all.length} 步</span>
      ${askHelp ? '<span class="chip warn">需要帮助</span>' : ""}
    </div>
  </header>

  ${askHelp ? `<section class="card help" id="help"><h2>需要帮助</h2>
    <dl class="kv">${helpKv.filter(([k]) => !k.startsWith("想问")).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${inline(v)}</dd>`).join("")}</dl>
    ${helpQs.length ? `<p style="margin-top:12px"><b>想问的问题</b></p><ol>${helpQs.map((q) => `<li>${inline(q)}</li>`).join("")}</ol>` : ""}
  </section>` : ""}

  <section class="card" id="now"><h2>现在</h2>
    <dl class="kv">${Object.entries(now).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${inline(v)}</dd>`).join("") || '<dd class="empty">还没有填写</dd>'}</dl>
    ${info["一句话研究问题"] ? `<dl class="kv" style="margin-top:12px"><dt>研究问题</dt><dd>${inline(info["一句话研究问题"])}</dd></dl>` : ""}
  </section>

  <section class="card" id="steps"><h2>步骤<small>${done}/${all.length}</small></h2>
    <div class="bar"><i style="width:${all.length ? (100 * done) / all.length : 0}%"></i></div>
    ${ph.map((p) => {
      const d = p.items.filter((x) => x.done).length;
      return `<div class="phase"><h3>${esc(p.name)}<span>${d}/${p.items.length}</span></h3>${p.items.map((x) => `
        <div class="step${x.done ? " done" : ""}${x === cur ? " cur" : ""}">
          <span class="box">${x.done ? CHECK : ""}</span><span class="no">${esc(x.no)}</span>
          <div><span class="name">${inline(x.name)}</span>${x.who ? `<span class="who">${esc(x.who)}</span>` : ""}
          ${x.note ? `<span class="note">${inline(x.note)}</span>` : ""}
          ${x.sub.length ? `<ul class="sub">${x.sub.map((t) => `<li>${inline(t)}</li>`).join("")}</ul>` : ""}</div>
        </div>`).join("")}</div>`;
    }).join("") || '<p class="empty">路线定了以后，AI 会把全部步骤写进 进度.md。</p>'}
    ${route === "未定" ? '<p class="empty" style="margin-top:12px">路线还没定：把仓库交给 AI，它会和你商量。</p>' : ""}
  </section>

  <section class="card" id="dates"><h2>节点</h2>
    <div class="tbl"><table>${head.length ? `<tr>${head.map((c) => `<th>${esc(c)}</th>`).join("")}</tr>` : ""}${body.map((r, i) => `<tr class="${i === nextIdx ? "next" : ""}">${r.map((c, j) => `<td>${inline(c)}${j === 0 && i === nextIdx ? `<br><small>还有 ${daysTo(r[0])} 天</small>` : ""}</td>`).join("")}</tr>`).join("")}</table></div>
  </section>

  <section class="card"><h2>关键信息</h2>
    <dl class="kv">${Object.entries(key).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v ? inline(v) : '<span class="empty">—</span>'}</dd>`).join("")}</dl>
  </section>

  <section class="card" id="log"><h2>记录</h2>
    <ul class="log">${logs.map((l) => { const m = l.match(/^(\d{4}-\d{2}-\d{2}|\d{1,2}-\d{1,2})\s*[：:]\s*(.*)$/); return m ? `<li><time>${esc(m[1])}</time><span>${inline(m[2])}</span></li>` : `<li><time></time><span>${inline(l)}</span></li>`; }).join("") || '<li class="empty">还没有记录</li>'}</ul>
  </section>

  <section class="card" id="ai"><h2>给 AI</h2>
    <div class="prompt"><p>${esc(prompt)}</p><button class="btn" id="copy">复制</button></div>
    ${repo ? `<div class="links">
      <a href="${repo}" target="_blank" rel="noopener">仓库</a>
      <a href="${repo}/blob/main/%E8%BF%9B%E5%BA%A6.md" target="_blank" rel="noopener">进度.md</a>
      <a href="${repo}/blob/main/AGENTS.md" target="_blank" rel="noopener">AGENTS.md</a>
      <a href="${repo}/tree/main/%E6%B5%81%E7%A8%8B" target="_blank" rel="noopener">流程</a>
      <a href="${repo}/tree/main/%E8%B5%84%E6%96%99" target="_blank" rel="noopener">资料</a>
    </div>` : ""}
  </section>
  <p class="foot">王鸿鑫科研组 · 内容来自仓库里的 进度.md</p>`;

  $("#copy").onclick = async (e) => {
    try { await navigator.clipboard.writeText(prompt); e.target.textContent = "已复制"; } catch { e.target.textContent = "请手动复制"; }
  };
}

// ?file=流程/进度示例_B1.md 可预览其他进度文件（只允许仓库内的 .md）
const want = new URLSearchParams(location.search).get("file");
const file = want && /^[^/.][^:]*\.md$/.test(want) && !want.includes("..") ? want : "进度.md";
fetch(`${encodeURI(file)}?t=${Date.now()}`)
  .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
  .then(render)
  .catch((e) => { $("#app").innerHTML = `<p class="loading">读不到 ${esc(file)}（${esc(e)}）。确认文件在仓库根目录，Pages 已开启。</p>`; });
