# 科研工具库（Emergence 全流程模块化防冗余版）

> **定位**：与本仓库 [AGENTS.md](../AGENTS.md) 科研全流程 1-to-1 对齐的**带权重、渐进披露、零冗余**科研工具箱（学位论文与中文顶刊 / SCI·SSCI 通用，所有外部开源仓库均经 GitHub API 实测核验，**无任何本机私有路径依赖**，Clone 或 Fork 后即开即用）。
> **调用原则**：做哪一阶段任务，只让 AI 读本页 ＋ 对应 1 张 `stages/` 工具卡（或用下方 CLI 按需检索），**不要把全库和 `archives/` 一次性全塞进上下文**。
>
> ```bash
> python3 toolkit/scripts/toolkit_cli.py route --stage 05 --q 平行趋势   # 按阶段/关键词路由（含探索期MVP技巧）
> python3 toolkit/scripts/toolkit_cli.py route --stage 05 --strict      # 严格发表模式（隐藏探索期MVP沙盒）
> python3 toolkit/scripts/toolkit_cli.py stats && python3 toolkit/scripts/toolkit_cli.py check
> ```

---

## 一、五档权重体系（保护创新 MVP，守住发表底线）

| 权重档 | 分值 | 含义 | 调用策略 |
|---|---:|---|---|
| **W1 · 核心必调** | 90–100 | 贯穿论文的高杠杆主力（防翻车、控上下文、保真实、顶刊标配） | 默认优先调用 |
| **W2 · 场景强援** | 70–89 | 特定卡点（因果识别、LLM 测度、假设厚推、去 AI 味、审稿博弈）正规武器 | 按当前阶段按需打开 |
| **W2-MVP · 探索期沙盒邪修** | 70–85 | **早期跑通 MVP、探测信号、激发非计划性创新的高敏技巧**（绝不盲目一刀切删光） | 仅限探索试水期；每条带**转正条件**，进发表稿前切正规闭环 |
| **W3 · 扩展备选** | 40–69 | 细分场景与长尾开源仓库 | 只当字典按需查，严禁全量盲装爆上下文 |
| **W0 · 学术不端红线** | 0 | 编造数据/文献、篡改数字、事前均值平移美妆、买假数据、黑盒造假 | 永久禁用；仅作审稿反查 |

---

## 二、按 Emergence 科研全流程导航地图（点开当前阶段单卡即可）

| 阶段 | 对应流程步骤 | 模块化工具卡（按需单卡加载） | 本阶段核心 W1 武器速览 |
|---|---|---|---|
| **00 底座** | 全程治理与红线 | [00-base-and-hacks.md](stages/00-base-and-hacks.md) | 目标定档、Research Contract、Context 防污染、模型三维矩阵、30 点软 Control、卡神 4 Prompt、**邪修三层分级（含 6 条 MVP 沙盒技巧）** |
| **01 选题** | 第 0–1 步 · 选题 | [01-topic-and-benchmark.md](stages/01-topic-and-benchmark.md) | `nature-social-science`、**ClaimNov 查新（AI 误杀 96%→1.5%）**、Prior-Work Collision 撞题 6 切口、MVP 最小验证 |
| **02 文献** | 第 2 步 · 文献 | [02-literature-and-reading.md](stages/02-literature-and-reading.md) | `nature-ref-verifier/reader`、`EmpiricalWiki` 10 实体图谱、`PaperForge` 主动精读、争议地图综述、喂 MD 切片、三栏吵架法 |
| **03 设计** | 第 3–4 步 · 设计 | [03-theory-and-design.md](stages/03-theory-and-design.md) | **每条假设 1 页+ 六模块厚推导蓝图**、`#035` 七环推演、框架图 6 硬规、`Econ-Variation` 中国冲击库、`credible-claims`、替代解释矩阵 |
| **04 数据** | 第 5–7 步 · 数据 | [04-data-and-llm-measure.md](stages/04-data-and-llm-measure.md) | 打破年报词频 6 类新数据、“说买做”与 AI 漂洗公式、**LLM 7 步 SOP ＋ 4 大计量纠偏（DSL/SIMEX/IV-GMM/DML + 100-Prompt 边界）** |
| **05 分析** | 第 8–9 步 · 分析 | [05-empirical-and-causal.md](stages/05-empirical-and-causal.md) | `econometrics-skill`、`Auto-Empirical-Research-Skills`、`StatsPAI`、交错/连续 DID 全套、`HonestDiD`、内生性三件套/Lewbel/Oster、Stata/R 速查 |
| **06 写作** | 第 10–11 步 · 写作 | [06-writing-and-deai.md](stages/06-writing-and-deai.md) | `Humanizer-zh`、发布会原则反防御＋遮住测试、`academic-humanizer`、`asd-ste100`、段长分布破壁、6 类 AI 晦涩句法清理 |
| **07 修改** | 第 12–15 步 · 修改 | [07-review-and-audit.md](stages/07-review-and-audit.md) | `check_numbers.py`、`integrity-auditor`、`Anti-Autoresearch`、Sant'Anna 审稿裁决、10 篇盲排前 40%、三轮停手、附录反制 AI 审稿 |
| **08 定稿** | 第 16–17 步 · 定稿 | [08-layout-and-defense.md](stages/08-layout-and-defense.md) | LaTeX/Word 版面规则、Mac→Win 字体规范、锁句锁数工作流、`esttab`/`coefplot` 美化、组会与答辩 5 大高频拷问接招表 |

---

## 三、高频卡点 10 秒反查路由

| 遇到的科研卡点 | 直达工具卡与核心组合 |
|---|---|
| 想先跑通 MVP 摸信号，又怕后面发不了期刊 | [00 卡](stages/00-base-and-hacks.md)（`W2-MVP` 探索期沙盒抽屉 6 招 ＋ 转正条件） |
| 选题和某篇顶刊太像，怕撞题被拒 | [01 卡](stages/01-topic-and-benchmark.md)（`Prior-Work Collision` 6 切口 ＋ `ClaimNov` 拆分查新） |
| 导师嫌假设推导太薄，要求每条写满 1 页以上 | [03 卡](stages/03-theory-and-design.md)（六模块厚推导蓝图 ＋ 七环推演 Prompt ＋ 标杆拆解） |
| 年报词频被怼“只说不做”，想用 LLM 造变量怕偏误 | [04 卡](stages/04-data-and-llm-measure.md)（招聘/专利/AI 漂洗 ＋ 7 步 SOP ＋ DSL/100-Prompt 纠偏） |
| 多期 DID 平行趋势擦边显著 / 负权重 / 缺好 IV | [05 卡](stages/05-empirical-and-causal.md)（`bacondecomp`→`csdid`→`honestdid` / 内生性三件套 / `ivlewfe`） |
| GPT 越改越怂爱叠甲、中文 AI 味重、读起来很累 | [06 卡](stages/06-writing-and-deai.md)（`Humanizer-zh` + 发布会原则 + 遮住测试 + 段长与句法破壁） |
| 怕 AI 编文献/算错数/审稿无限挑刺/PDF 假报错 | [07 卡](stages/07-review-and-audit.md)（`check_numbers.py` + `integrity-auditor` + 源稿反核 + 三轮停手） |
| Mac 排 Word 跨系统错版、答辩被怼内生性 | [08 卡](stages/08-layout-and-defense.md)（字体与锁数规范 + `esttab`/`coefplot` 模板 + 答辩 5 招） |

---

## 四、知识底库、全网开源索引与防冗余规范

- **防冗余维护规范**：[INTAKE_PROTOCOL.md](INTAKE_PROTOCOL.md) ｜ 唯一注册表 [catalog.jsonl](registry/catalog.jsonl) ｜ 校验与路由脚本 [toolkit_cli.py](scripts/toolkit_cli.py)
- **方法论与知识速查（已脱敏、无第三方版权原文）**：
  - [top-journal-methods-brief.md](knowledge/top-journal-methods-brief.md)：6 组中文/英文顶刊方法论标杆浓缩（大模型数字化六维验证、AI 漂洗操作化、公共智算中心与纯净非 AI 安慰剂、SUTVA 下界证明、*RFS* 因果图谱、平行趋势 4 招 & 内生性三件套）
  - [causal-ab-and-algo-cheatsheet.md](knowledge/causal-ab-and-algo-cheatsheet.md)：因果推断、A/B 实验、Uplift/DML 与大面板算法复杂度速查卡
- **冷归档全网开源索引（平时无需喂给 AI，选配安装时查阅）**：
  - [github-repos-verified.md](archives/github-repos-verified.md)：经 GitHub API 实测核验的 **60+ 学术科研与实证开源仓库**、12 个 Skills 聚合检索站与排雷纠偏记录（注：本库不收录 PPT/演示类扩展技能；基础内置技能包见 [Emergence-assets](https://github.com/charlie-yus/Emergence-assets)）
