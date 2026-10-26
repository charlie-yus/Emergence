// 首页流程图：九宫格环形，中间是论文；八个圆圈由 progress.js 从 PROGRESS.md 的第 0–17 步归并而来
window.flowSVG = function (S, sheet = false) {
  const F = S.flow;
  const C = { x: 561, y: 398 };
  const POS = [[300, 208], [561, 208], [822, 208], [822, 398], [822, 590], [561, 590], [300, 590], [300, 398]];
  const SIDE = ["left", "top", "right", "right", "right", "bottom", "left", "left"];
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const tw = (t, cjk = 11.5, asc = 6.4) => [...String(t)].reduce((w, ch) => w + (/[\u0000-ÿ]/.test(ch) ? asc : cjk), 0);
  const T = (x, y, s, a = {}) => `<text x="${x}" y="${y}" font-size="${a.fs ?? 11.5}"${a.anchor ? ` text-anchor="${a.anchor}"` : ""}${a.bold ? ' font-weight="600"' : ""} fill="${a.fill ?? "#111"}"${a.serif ? ` font-family="'Instrument Serif', 'Songti SC', serif"` : ""}>${esc(s)}</text>`;
  const ICON = {
    卡: (x, y) => `<circle cx="${x}" cy="${y}" r="8" fill="#c55a11"/>` + T(x, y + 4, "卡", { fs: 10.5, anchor: "middle", bold: 1, fill: "#fff" }),
    时: (x, y) => `<path d="M${x},${y - 9} L${x + 9},${y} L${x},${y + 9} L${x - 9},${y} Z" fill="#555"/>` + T(x, y + 4, "时", { fs: 10.5, anchor: "middle", bold: 1, fill: "#fff" }),
    人: (x, y) => `<rect x="${x - 8}" y="${y - 8}" width="16" height="16" rx="2.5" fill="#111"/>` + T(x, y + 4, "人", { fs: 10.5, anchor: "middle", bold: 1, fill: "#fff" }),
    源: (x, y) => `<rect x="${x - 8}" y="${y - 8}" width="16" height="16" rx="2.5" fill="#1f4e79"/>` + T(x, y + 4, "源", { fs: 10.5, anchor: "middle", bold: 1, fill: "#fff" }),
    "？": (x, y) => `<circle cx="${x}" cy="${y}" r="8" fill="#fff" stroke="#777" stroke-width="1.2" stroke-dasharray="2.5 2"/>` + T(x, y + 4, "？", { fs: 10.5, anchor: "middle", bold: 1, fill: "#555" }),
    待: (x, y) => `<circle cx="${x}" cy="${y}" r="8" fill="#fff" stroke="#777" stroke-width="1.2" stroke-dasharray="2.5 2"/>` + T(x, y + 4, "待", { fs: 10.5, anchor: "middle", bold: 1, fill: "#555" }),
  };
  const pillW = (t) => tw(t[1]) + 38;
  const pill = (x, y, t) => {
    const open = t[0] === "？" || t[0] === "待", w = pillW(t);
    return `<rect x="${x}" y="${y}" width="${w}" height="24" rx="12" fill="#fff" stroke="${open ? "#999" : "rgba(0,0,0,.18)"}" stroke-width="1"${open ? ' stroke-dasharray="4 3"' : ""}/>` +
      ICON[t[0]](x + 13, y + 12) + T(x + 27, y + 16.5, t[1], { fill: open ? "#555" : "#222" });
  };
  const arrow = (a, b, w = 1.6) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy), u = [dx / d, dy / d];
    const e = b === POS_C ? 110 : 64;
    return `<line x1="${a[0] + u[0] * 60}" y1="${a[1] + u[1] * 60}" x2="${b[0] - u[0] * e}" y2="${b[1] - u[1] * e}" stroke="#111" stroke-width="${w}" marker-end="url(#ar)"/>`;
  };
  const POS_C = [C.x, C.y];
  const CHECK = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="#111"/><path d="M${x - 4.5},${y + 0.3} l3,3 l6,-6.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;

  let b = "";
  // 虚线辐条
  POS.forEach(([x, y]) => {
    const dx = C.x - x, dy = C.y - y, d = Math.hypot(dx, dy), u = [dx / d, dy / d];
    b += `<line x1="${x + u[0] * 58}" y1="${y + u[1] * 58}" x2="${C.x - u[0] * 104}" y2="${C.y - u[1] * 104}" stroke="rgba(0,0,0,.16)" stroke-width="1.2" stroke-dasharray="3 4"/>`;
  });
  for (let i = 0; i < 7; i++) b += arrow(POS[i], POS[i + 1]);
  b += `<line x1="360" y1="398" x2="451" y2="398" stroke="#111" stroke-width="2.4" marker-end="url(#ar)"/>` + T(407.5, 390, F.arrowLabel, { fs: 12, anchor: "middle", bold: 1 });

  // 中心
  b += `<circle cx="${C.x}" cy="${C.y}" r="100" fill="#111"/>`;
  b += T(C.x, 376, F.center.title, { fs: 21, anchor: "middle", bold: 1, fill: "#fff" });
  b += T(C.x, 404, F.center.lines[0], { anchor: "middle", fill: "#d6d6d6" }) + T(C.x, 420, F.center.lines[1], { anchor: "middle", fill: "#d6d6d6" });
  b += T(C.x, 444, F.center.done, { fs: 11.5, anchor: "middle", bold: 1, fill: "#fff" });
  b += T(C.x, 460, F.center.extra, { fs: 10.5, anchor: "middle", fill: "#bdbdbd" });

  F.stages.forEach((s, i) => {
    const [x, y] = POS[i], side = SIDE[i];
    const style = s.role === "human" ? 'fill="#fff" stroke="#111" stroke-width="2.4"' : s.role === "ai" ? 'fill="#ecebe7"' : 'fill="#ecebe7" stroke="#111" stroke-width="2"';
    b += `<g class="stage" data-i="${i}" tabindex="0" role="button" aria-label="${esc(s.name)}">`;
    if (s.state === "now") b += `<circle cx="${x}" cy="${y}" r="62" fill="none" stroke="#111" stroke-width="1.2" stroke-dasharray="4 4" class="spin"/>`;
    b += `<circle class="hit" cx="${x}" cy="${y}" r="54" ${style}/>`;
    b += T(x, y - 16, s.n, { fs: 15, anchor: "middle", bold: 1 }) + T(x, y + 6, s.name, { fs: 16, anchor: "middle", bold: 1 }) + T(x, y + 24, s.date, { fs: 10, anchor: "middle", fill: "#666" });
    const bw = tw(s.badge, 10.5, 6) + 16;
    const bs = s.role === "human" ? 'fill="#111" stroke="#111" stroke-width="1.2"' : s.role === "ai" ? 'fill="#fff" stroke="rgba(0,0,0,.25)" stroke-width="1"' : 'fill="#fff" stroke="#111" stroke-width="1.2"';
    b += `<rect x="${x - bw / 2}" y="${y + 44}" width="${bw}" height="20" rx="10" ${bs}/>` + T(x, y + 58, s.badge, { fs: 10.5, anchor: "middle", bold: 1, fill: s.role === "human" ? "#fff" : "#111" });
    if (s.state === "done") b += CHECK(x + 40, y - 38);
    b += `</g>`;

    if (side === "left" || side === "right") {
      const L = side === "left";
      b += T(L ? 224 : 898, y - 58, s.headline, { anchor: L ? "end" : "start", bold: 1 });
      s.tags.forEach((t, k) => { const w = pillW(t); b += pill(L ? 224 - w : 898, y - 48 + k * 29, t); });
      b += `<line x1="${L ? 242 : 880}" y1="${y}" x2="${L ? 228 : 894}" y2="${y}" stroke="rgba(0,0,0,.25)" stroke-width="1"/>`;
    } else {
      const top = side === "top", ry = top ? 110 : 666;
      b += T(561, top ? 100 : 710, s.headline, { anchor: "middle", bold: 1 });
      const total = s.tags.reduce((w, t) => w + pillW(t), 0) + 8 * (s.tags.length - 1);
      let px = 561 - total / 2;
      s.tags.forEach((t) => { b += pill(px, ry, t); px += pillW(t) + 8; });
    }
  });

  // 页眉页脚（只在整页模式下画）
  if (sheet) {
  const [, m, d] = S.meta.updated.split("-");
  b += T(40, 44, F.title, { fs: 22, serif: 1 }) + T(40, 64, S.meta.student, { fs: 11, fill: "#666" });
  b += T(1083, 44, "牛马一号", { fs: 13, anchor: "end", serif: 1 }) + T(1083, 64, `更新于 ${S.meta.updated.slice(0, 4)} 年 ${+m} 月 ${+d} 日`, { fs: 11, anchor: "end", fill: "#666" });
  b += `<line x1="40" y1="726" x2="1083" y2="726" stroke="rgba(0,0,0,.12)"/>`;
  F.footer.forEach(([k, v], i) => { b += T(40, 744 + i * 20, k, { bold: 1 }) + T(40 + tw(k) + 12, 744 + i * 20, v, { fill: "#333" }); });
  b += `<circle cx="648" cy="740" r="8" fill="#fff" stroke="#111" stroke-width="2"/>` + T(661, 744, "人工", { fs: 11, fill: "#333" });
  b += `<circle cx="707" cy="740" r="8" fill="#ecebe7"/>` + T(720, 744, "AI", { fs: 11, fill: "#333" });
  b += `<circle cx="756" cy="740" r="8" fill="#ecebe7" stroke="#111" stroke-width="1.8"/>` + T(769, 744, "协作", { fs: 11, fill: "#333" });
  b += CHECK(826, 740).replace('r="10"', 'r="8"') + T(839, 744, "已完成", { fs: 11, fill: "#333" });
  b += `<circle cx="900" cy="740" r="8" fill="none" stroke="#111" stroke-width="1.2" stroke-dasharray="3 3"/>` + T(913, 744, "进行中", { fs: 11, fill: "#333" });
  [["源", 648, "数据来源"], ["卡", 727, "卡点"], ["时", 784, "耗时"], ["人", 841, "本人完成"], ["？", 920, "待确认"], ["待", 988, "待完成"]].forEach(([k, x, n]) => { b += ICON[k](x, 760) + T(x + 13, 764, n, { fs: 11, fill: "#333" }); });

  }

  return `<svg viewBox="${sheet ? "0 0 1123 794" : "20 78 1090 652"}" xmlns="http://www.w3.org/2000/svg" font-family="'PingFang SC', -apple-system, sans-serif" role="img" aria-label="毕业论文流程图">` +
    `<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#111"/></marker></defs>` +
    `${sheet ? '<rect width="1123" height="794" fill="#fff"/>' : ""}${b}</svg>`;
};

// 图例（网页模式放在图下方）
window.flowLegend = function () {
  const svg = window.flowSVG({ ...window.STATUS }, true);
  return svg.replace(/viewBox="[^"]+"/, 'viewBox="636 728 446 44"').replace(/<rect width="1123"[^>]*>/, "");
};

// 手机：竖排节点，像物流跟踪
window.flowList = function (S) {
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  return `<ol class="fl">${S.flow.stages.map((s, i) => `<li class="fl-item ${s.state} ${s.role}" data-i="${i}">
    <span class="fl-dot">${s.state === "done" ? '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.2l2.3 2.3 4.7-5"/></svg>' : esc(s.n)}</span>
    <div><div class="fl-head"><b>${esc(s.name)}</b><span>${esc(s.date)}</span><i class="fl-badge">${esc(s.badge)}</i></div>
    <div class="fl-line">${esc(s.headline)}</div>
    <div class="fl-tags">${s.tags.map((t) => `<span class="fl-tag k${"卡时人源？待".indexOf(t[0])}"><em>${esc(t[0])}</em>${esc(t[1])}</span>`).join("")}</div></div></li>`).join("")}</ol>`;
};
