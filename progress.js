// 读仓库里的 PROGRESS.md，整理成网页用的 window.STATUS，再加载 flow.js 和 app.js。无需构建。
// ?file=workflow/progress-example-B1.md 可预览其他进度文件（只允许仓库内的 .md）
(function () {
  const want = new URLSearchParams(location.search).get("file");
  const FILE = want && /^[^/.][^:]*\.md$/.test(want) && !want.includes("..") ? want : "PROGRESS.md";

  // 八个圆圈 ← 第 0–17 步
  const RANGES = [[0, 1], [2, 2], [3, 4], [5, 7], [8, 9], [10, 11], [12, 15], [16, 17]];
  const NAMES = { "": ["选题", "文献", "设计", "数据", "分析", "写作", "修改", "定稿"] };
  NAMES.B1 = [...NAMES[""]]; NAMES.B1[4] = "诊断";
  NAMES.B2 = [...NAMES.B1]; NAMES.B2[3] = "资料";
  const NUM = "①②③④⑤⑥⑦⑧";

  const cut = (t, n) => ([...t].length > n ? [...t].slice(0, n - 1).join("") + "…" : t);
  const md2 = (d) => { const [, m, day] = d.split("-"); return `${+m} 月 ${+day} 日`; };

  function sections(md) {
    const out = {}; let cur = null;
    for (const line of md.split(/\r?\n/)) {
      const h = line.match(/^##\s+(.+?)\s*$/);
      if (h) { cur = h[1]; out[cur] = []; } else if (cur) out[cur].push(line);
    }
    return out;
  }
  function kv(lines = []) {
    const o = [];
    for (const l of lines) {
      const m = l.match(/^-\s*([^：:\[]+?)\s*[：:]\s*(.*)$/);
      if (m) o.push([m[1].trim(), m[2].trim()]);
    }
    return o;
  }
  function table(lines = []) {
    const rows = lines.filter((l) => /^\s*\|/.test(l)).map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
    return rows.filter((r) => !r.every((c) => /^:?-+:?$/.test(c))).slice(1);
  }

  function build(md) {
    const S = sections(md);
    const info = Object.fromEntries(kv(S["基本信息"]));
    const updated = /^\d{4}-\d{2}-\d{2}$/.test(info["更新"] || "") ? info["更新"] : new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" });
    const fullDate = (m, d) => { // “10-31” → 不晚于更新日的完整日期
      let y = +updated.slice(0, 4);
      const s = (yy) => `${yy}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      if (s(y) > updated) y -= 1;
      return s(y);
    };
    const filled = (v) => v && !/^（/.test(v) ? v : "";
    const fullTitle = filled(info["题目"]) || "还没有题目";
    const [title, ...rest] = fullTitle.split("——");
    const route = info["路线"] || "未定";
    const code = (route.match(/^(A1|A2|B1|B2)/) || [""])[0];
    const confirmed = /^是/.test(info["老师确认"] || "");

    // 步骤
    const tasks = [], groups = [];
    let group = "步骤", last = null;
    for (const l of S["步骤"] || []) {
      const h = l.match(/^###\s+(.+)/);
      if (h) { group = h[1].trim(); continue; }
      const s = l.match(/^-\s*\[( |x|X)\]\s*(\d+[a-z.\d]*)\s+([^【：:]+)(【[^】]*】)?\s*[：:]?\s*(.*)$/);
      if (s) {
        let note = s[5].trim(), date;
        const dm = note.match(/[（(]完成\s*(\d{1,2})-(\d{1,2})[）)]\s*$/);
        if (dm) { date = fullDate(+dm[1], +dm[2]); note = note.slice(0, dm.index).replace(/[，,；;\s]+$/, ""); }
        last = { id: s[2], group, title: s[3].trim(), who: (s[4] || "").replace(/[【】]/g, ""), done: s[1] !== " ", note, date, sub: [] };
        tasks.push(last);
        if (!groups.includes(group)) groups.push(group);
        continue;
      }
      const sub = l.match(/^\s{2,}[-*]\s+(.*)/);
      if (sub && last) last.note += (last.note ? "；" : "") + sub[1];
    }
    const cur = tasks.find((t) => !t.done);
    const doneN = tasks.filter((t) => t.done).length;

    // 求助
    const helpKv = kv(S["求助"]);
    const helpOn = /^有/.test(Object.fromEntries(helpKv)["状态"] || "");
    const helpQs = (S["求助"] || []).map((l) => l.match(/^\s+\d+[.、]\s*(\S.*)$/)).filter(Boolean).map((m) => m[1]);
    const stuckAt = helpOn ? ((Object.fromEntries(helpKv)["卡在"] || "").match(/第\s*(\d+)\s*步/) || [])[1] : null;

    // 八个圆圈
    const names = NAMES[code] || NAMES[""];
    const stages = RANGES.map(([a, b], i) => {
      // 先按阶段标题归进圆圈（AI 可以增删、合并步骤），标题对不上的再按编号
      const ALIAS = { 资料: "数据", 诊断: "分析" };
      const stageOf = (t) => { const g = ALIAS[t.group] || t.group; const k = NAMES[""].indexOf(g);
        if (k >= 0) return k; const n = parseFloat(t.id); return RANGES.findIndex(([x, y]) => n >= x && n < y + 1); };
      const ts = tasks.filter((t) => stageOf(t) === i);
      const state = ts.length && ts.every((t) => t.done) ? "done" : ts.includes(cur) ? "now" : "todo";
      const whos = ts.map((t) => t.who);
      const role = !whos.length ? "collab" : whos.every((w) => w === "人") ? "human" : whos.every((w) => /^AI/.test(w)) ? "ai" : "collab";
      const lastDone = ts.filter((t) => t.date).map((t) => t.date).sort().pop();
      let tags = ts.map((t) => [String(t.id) === stuckAt ? "卡" : t.done ? "人" : "待", cut(t.title, 7)]);
      if (!ts.length) tags = [["待", code ? "按路线补齐" : "路线定后生成"]];
      if (i === 0 && !confirmed) tags.unshift(["？", "老师确认"]);
      tags.sort((x, y) => "卡？待人".indexOf(x[0]) - "卡？待人".indexOf(y[0]));
      const headline = state === "now" ? `正在：${cur.title}` : state === "done" ? `已完成 ${ts.length} 步` : ts.length ? `待做：${ts.map((t) => t.title).join("、")}` : "等路线定了再展开";
      return {
        n: NUM[i], name: names[i], date: state === "done" && lastDone ? md2(lastDone) : state === "now" ? "进行中" : ts.length ? `${ts.length} 步` : "",
        role, badge: { human: "本人", ai: "AI", collab: "协作" }[role], headline: cut(headline, 17), state,
        tags: tags.slice(0, 3), tasks: ts.map((t) => t.id), tools: [...new Set(ts.map((t) => t.who).filter(Boolean))],
      };
    });

    // 节点
    const milestones = table(S["节点"]).map((r) => ({
      date: r[0], label: r[1] || "", status: r[2] || "",
      state: /已|完成/.test(r[2] || "") ? "done" : "todo",
    }));

    // 记录：按日期分组，新的在前
    const days = [];
    for (const l of S["记录"] || []) {
      const m = l.match(/^-\s*(\d{4}-\d{2}-\d{2}|\d{1,2}-\d{1,2})\s*[：:]\s*(.*)$/);
      if (!m) continue;
      const d = m[1].length > 5 ? m[1] : fullDate(...m[1].split("-").map(Number));
      let day = days.find((x) => x.date === d);
      if (!day) days.push((day = { date: d, items: [] }));
      day.items.push(m[2]);
    }

    // 老师意见（可选）：| 日期 | 老师说 | 怎么落实 | 状态 |
    const feedback = table(S["老师意见"]).map((r) => ({
      date: r[0], text: r[1] || "", reply: r[2] || "",
      state: /已落实|完成/.test(r[3] || "") ? "done" : /进行|在改/.test(r[3] || "") ? "doing" : "ask",
    }));

    const two = [...title], line1 = two.slice(0, 11).join(""), line2 = cut(two.slice(11).join(""), 11);
    return {
      file: FILE, raw: md, local: local != null,
      meta: { title, subtitle: rest.length ? `——${rest.join("——")}` : "", student: filled(info["姓名"]) || "第一次对话时 AI 会先问你", updated, route, code, confirmed, question: info["一句话研究问题"] || "", storage: filled(info["存放方式"]), nextStart: filled(info["下次怎么开始"]) },
      now: kv(S["现在"]),
      tasks, groups, cur, doneN,
      help: { on: helpOn, kv: helpKv.filter(([k]) => k !== "状态" && !k.startsWith("想问")), qs: helpQs },
      milestones, days, feedback, info: kv(S["关键信息"]),
      flow: {
        title: "毕业论文流程", arrowLabel: "成稿", footer: [],
        center: { title: code ? `${code} ${{ A1: "数据实证", A2: "问卷实证", B1: "调查诊断", B2: "案例分析" }[code]}` : "路线未定", lines: [line1, line2], done: `第 ${doneN} / ${tasks.length} 步`, extra: confirmed ? "老师已确认" : "老师未确认" },
        stages,
      },
    };
  }

  const load = (src) => new Promise((ok, no) => document.body.appendChild(Object.assign(document.createElement("script"), { src, onload: ok, onerror: no })));
  // ?local=1：显示用“打开进度文件”选中的本地文件（内容暂存在本标签页的 sessionStorage）
  let local = null;
  if (new URLSearchParams(location.search).has("local")) try { local = sessionStorage.getItem("emergence-local"); } catch {}
  (local != null ? Promise.resolve(local) : fetch(`${encodeURI(FILE)}?t=${Date.now()}`).then((r) => (r.ok ? r.text() : Promise.reject(r.status))))
    .then((md) => { window.STATUS = build(md); return load("flow.js"); })
    .then(() => load("app.js"))
    .catch((e) => {
      document.getElementById("app").innerHTML = `<p style="padding:140px 20px;text-align:center;color:rgba(0,0,0,.5)">读不到 ${FILE}（${String(e).replace(/</g, "&lt;")}）。确认文件在仓库根目录，Pages 已开启。</p>`;
    });
})();
