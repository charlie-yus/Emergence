# 全网开源科研工具与 GitHub 仓库实测核验总表（冷归档 · 2026-11-26）

> **说明**：本表汇总经 **GitHub API 实时核验**的 **60+ 个高价值学术科研、经管实证、上下文治理与去 AI 味开源项目**（已修正重定向改名与原帖拼写错误，剔除误标与 PPT 类技能）。**平时写作不需要把本页塞给 AI**，仅在按需选装新 Skill、找 Stata/R 外部包或核对仓库链接时查阅。
> **安装防坑原则**：严禁把几百上千个 Skill 的大仓整包倒进技能目录（会拖爆上下文并造成同指向冲突）；每次只抽装 1–3 个与当前任务直接相关的核心技能。

---

## 一、经管实证、计量经济学与因果推断（最高优先）

| 权重 | 规范仓库与可点击链接 | 实测 Star | 核心能力与定位 |
|---|---|---:|---|
| **W1** | [brycewang-stanford/Auto-Empirical-Research-Skills](https://github.com/brycewang-stanford/Auto-Empirical-Research-Skills) | 5,158 | Stanford REAP 出品：覆盖 8 大社科的 23,000+ 实证技能索引；**建议只抽装 `plugins/empirical-analysis-{stata,r,python}` 三套主流程** |
| **W1** | [brycewang-stanford/StatsPAI](https://github.com/brycewang-stanford/StatsPAI) | 385 | 同团队出品：Python 平替 Stata（`reghdfe`/`csdid`/`rdrobust`/`synth`）与 R（`fixest`/`did`），自带 Skill 与 MCP Server |
| **W1** | [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow) | 1,737 | **CSDID 作者 Pedro Sant'Anna 亲写**学术工作流，精选 `credible-claims`、`data-analysis`、`audit-reproducibility`、`devils-advocate`、`adjudicate-review` |
| **W1** | [Lambenthan/empiricalwiki](https://github.com/Lambenthan/empiricalwiki) | 103 | Karpathy LLM-Wiki 经管实证特化版：按变量/数据/模型/机制/假设/识别/稳健/异质/表格/论文 10 类实体建知识图谱（精选 `empirical-ingest`、`empirical-design`） |
| **W1** | [xiaomihu1992/econometrics-skill](https://github.com/xiaomihu1992/econometrics-skill) | 46 | 17 种因果推断估计量（OLS/PSM/IPW/IV/DID/RDD）Agent Skill，自带中文指南 `SKILL.zh-CN.md` |
| **W1** | [dylantmoore/stata-skill](https://github.com/dylantmoore/stata-skill) | 310 | 规范地道 Stata 编程、数据管理与计量语法 Skill |
| **W1** | [mimaowang/Econ-Variation](https://github.com/mimaowang/Econ-Variation) | 10 | 中国经管实证 Variation 与准自然实验设计案例库（含政策原文核查规范与路由脚本） |
| **W2** | [haoyu-haoyu/stata-ai-fusion](https://github.com/haoyu-haoyu/stata-ai-fusion) | 45 | Stata MCP + Skill（内置 `reghdfe`/`coefplot`/`gtools`/出表/防错参考库） |
| **W2** | [hanlulong/stata-mcp](https://github.com/hanlulong/stata-mcp) ＋ [SepineTam/mcp-for-stata](https://github.com/SepineTam/mcp-for-stata) | 532 / 285 | VS Code / Cursor / Antigravity 直连本地 Stata 17+ 的 MCP 扩展（后者主打安全优先） |
| **W2** | [niuniuhaoyu/contdid](https://github.com/niuniuhaoyu/contdid) | 3 | Stata 外部包：CGBS (2024) 连续处理 DID（B 样条 `ATT(d)`/`ACRT(d)` + 联合置信带） |
| **W2** | [woahidmurad/ivlewfe](https://github.com/woahidmurad/ivlewfe) | 5 | Stata 外部包：支持高维 FE 与聚类 SE 的面板 Lewbel (2012) 异方差 IV（`net install`） |
| **W2** | [TiesdeKok/chatgpt_paper](https://github.com/TiesdeKok/chatgpt_paper) | 74 | *Management Science* (2025) 伴随代码：经管生成式 LLM 文本分析漏斗法与分布先验 Prompt |
| **W2** | [velikov-mihail/AI-Powered-Scholarship](https://github.com/velikov-mihail/AI-Powered-Scholarship) | 91 | Novy-Marx & Velikov (*JEL* 2026) 金融 AI 研究与反 HARKing 实证代码 |
| **W2** | [uber/causalml](https://github.com/uber/causalml) / [py-why/dowhy](https://github.com/py-why/dowhy) / [py-why/EconML](https://github.com/py-why/EconML) | 6.0k / 8.4k / 4.8k | Python 现代因果推断三剑客（Uplift / CATE / DML / 因果图识别） |

---

## 二、综合学术科研、文献精读与证据完整性审计

| 权重 | 规范仓库与可点击链接 | 实测 Star | 核心能力与定位 |
|---|---|---:|---|
| **W1** | [Yuan1z0825/nature-skills](https://github.com/Yuan1z0825/nature-skills) | 55,048 | 通用科研读写、精读、统计核对、引用核验与模拟审稿全套（核心项已收录于 [Emergence-assets](https://github.com/charlie-yus/Emergence-assets)） |
| **W1** | [brycewang-stanford/Awesome-Journal-Skills](https://github.com/brycewang-stanford/Awesome-Journal-Skills) | 1,458 | AMJ / SMJ / AMR / ASQ / Organization Science 等顶刊分环节写作与审稿技能库（按环节只调 1 个） |
| **W1** | [ai4s-research/ai4s-skills](https://github.com/ai4s-research/ai4s-skills) | 277 | 精选 **`integrity-auditor`**：强制本会话真抓取引用、数字标 `measured/simulated`、代码 provenance 防造假审计 |
| **W1** | [wanshuiyin/Anti-Autoresearch](https://github.com/wanshuiyin/Anti-Autoresearch) | 182 | 审稿人视角科研完整性取证（`anti-autoresearch`、`citation-forensics`、`consistency-audit`、`evidence-ledger`） |
| **W2** | [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) / [-codex](https://github.com/Imbad0202/academic-research-skills-codex) | 58,565 / 15,083 | 苏格拉底对话式研究规划（`academic-pipeline`）与独立审稿（`academic-paper-reviewer`） |
| **W2** | [FeijiangHan/PaperForge](https://github.com/FeijiangHan/PaperForge) | 862 | 主动式论文精读 Skill（`paper-reading-zh`）：重建作者推理链条与方法拆解（注：与 `QJHWC/PaperForge` 重名不同作者） |
| **W2** | [yandisyn/literature-research-assistant](https://github.com/yandisyn/literature-research-assistant) | 9 | 6 模块文献综述套件：PDF 摘录、Zotero 低成本初筛、证据导出、WoS 共被引 Louvain 聚类/突现与 450 DPI 矢量图 |
| **W2** | [ustc-ai4science/academic-search](https://github.com/ustc-ai4science/academic-search) | 723 | 多源学术检索与 OA 合法全文下载 |
| **W2** | [QAbot-zh/citation-checker](https://github.com/QAbot-zh/citation-checker) | — | 本地免 AI API 核验 Crossref / OpenAlex 题录真实性 |
| **W2** | [wanshuiyin/Auto-claude-code-research-in-sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) | 19,895 | ARIS ⚔️：极轻量纯 Markdown 跨模型审阅循环与科研实验自动化（197 项大仓，按需查用勿全装） |
| **W2** | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | 58,473 | 177 项综合科学 Agent Skills（当字典按需查阅） |
| **W2** | [HKUSTDial/Supervisor-Skills](https://github.com/HKUSTDial/Supervisor-Skills) | 13,605 | 博导科研指导经验提炼的 AI 副导师技能集 |
| **W2** | [appautomaton/document-SKILLs](https://github.com/appautomaton/document-SKILLs) | 192 | 科研 PDF / DOCX / XLSX 文档批处理（按本库约定排除同仓 `pptx`） |
| **W3** | [WILLOSCAR/research-units-pipeline-skills](https://github.com/WILLOSCAR/research-units-pipeline-skills) / [appautomaton/latex-arxiv-SKILL](https://github.com/appautomaton/latex-arxiv-SKILL) / [yunshenwuchuxun/latex-paper-skills](https://github.com/yunshenwuchuxun/latex-paper-skills) | 520 / 499 / 277 | 语义单元科研流 / SQLite 中间件防爆 Token 综述流 / 保留 `\cite{}` 的 LaTeX 润色流 |

---

## 三、中文/英文写作、反防御性写作与去 AI 味

| 权重 | 规范仓库与可点击链接 | 实测 Star | 核心能力与定位 |
|---|---|---:|---|
| **W1** | [blader/humanizer](https://github.com/blader/humanizer) | 73,616 | 基于维基百科 AI 写作特征研究的通用去 AI 味底座，砍过度对冲与工整句 |
| **W1** | [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh) | 23,790 | 中文去 AI 味专精：狙击“综上所述/需要注意的是/总而言之”与西化长定语 |
| **W1** | [Adkid-Zephyr/anti-defensive-writing-Skill](https://github.com/Adkid-Zephyr/anti-defensive-writing-Skill) | 7,265 | “发布会原则”中英双语反防御写作（装时建议命名 `anti-defensive-writing-cn` 防与 Kiterlin 版冲突；必配遮住测试防误删科学限定） |
| **W1** | [Kiterlin/anti-defensive-writing](https://github.com/Kiterlin/anti-defensive-writing) | 2,427 | 英文反防御性写作、去除多余免责声明同时保留方法边界（已收录于 `Emergence-assets`） |
| **W1** | [AIScientists-Dev/academic-humanizer](https://github.com/AIScientists-Dev/academic-humanizer) | — | 学术语境校准论断强度、锁死数字与引用（已收录于 `Emergence-assets`） |
| **W2** | [danyuchn/asd-ste100-skill](https://github.com/danyuchn/asd-ste100-skill) | 6,914 | Karpathy 推荐的 ASD-STE100 航空维修手册级清晰直白表达规范 |
| **W2** | [MrGeDiao/shuorenhua](https://github.com/MrGeDiao/shuorenhua) | 2,786 | 中文“说人话”去官话端水改写（学术正文慎防过度口语化，仅借其砍空话） |
| **W2** | [gulucaptain/Best-Paper-Writing-Skill](https://github.com/gulucaptain/Best-Paper-Writing-Skill) | 948 | 60 篇顶会最佳论文提炼的摘要/引言/方法/实验写作技巧，未提供数字强制标 `[TODO]` |
| **W2** | [SNL-UCSB/paper-writing-skill](https://github.com/SNL-UCSB/paper-writing-skill) | 257 | 系统顶会论文写作与编辑规范（社科使用须保留证据边界） |

---

## 四、上下文工程、任务治理与自造 Skill 工具

| 权重 | 规范仓库与可点击链接 | 实测 Star | 核心能力与定位 |
|---|---|---:|---|
| **W1** | [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) | 28,235 | 用 `task_plan.md` / `findings.md` / `progress.md` 三文件做持久化外挂记忆，防长任务跑偏 |
| **W2** | [dongshuyan/compass-skills](https://github.com/dongshuyan/compass-skills) | 774 | 清华博士开源“司南”：`task-clarifier`（开工需求对齐）＋ `task-forest`（任务森林 DAG） |
| **W2** | [muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) | 18,431 | 上下文压缩（`context-compression`）与防退化优化（`context-optimization`） |
| **W2** | [wanshuiyin/HERO-Anti-OverDefense](https://github.com/wanshuiyin/HERO-Anti-OverDefense) | 903 | 防编程 Agent 陷入 HERO（Hashing/Edge cases/Rubrics/Overbuild）过度防御 |
| **W2** | [anthropics/skills](https://github.com/anthropics/skills) ＋ [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) | 200k / 15.3k | 官方 `skill-creator` 标杆与自动把文档/GitHub 仓库转为标准 Skill 的“铲子工具” |
| **W3** | [mattpocock/skills](https://github.com/mattpocock/skills) / [RobMitt/grill-me-skill](https://github.com/RobMitt/grill-me-skill) / [nidhinjs/prompt-master](https://github.com/nidhinjs/prompt-master) / [ballShell/codex-bridge](https://github.com/ballShell/codex-bridge) | 332k / 1.9k / 16.3k / 1 | 轻量 `grill-me` 追问对齐 / 提示词优化 / Codex+Gemini 前店后厂翻译层 |
| **W3** | [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) / [obra/superpowers](https://github.com/obra/superpowers) | 37.5k / 326k | 大型技能索引与重型工程门控框架（仅作字典/理念参考，勿与多框架叠装） |

---

## 五、Skills 聚合搜索站与排雷纠偏清单

- **聚合搜索站**：[skills.sh](https://skills.sh) · [skillsmp.com](https://skillsmp.com) · [agentskills.me](https://agentskills.me) · [skillhub.tencent.com](https://skillhub.tencent.com)（国内高速镜像） · [skillstore.io](https://skillstore.io)
- **实测排雷纠偏**：
  1. **误标排雷**：[epoko77-ai/im-not-ai](https://github.com/epoko77-ai/im-not-ai)（★6,778）在部分中文攻略中被误列为通用中文去 AI 味技能，实测其为 **韩语（한글）专用**，中文写作请勿误装。
  2. **作者张冠李戴纠偏**：部分网帖称“CSDID 作者 Sant'Anna 发布了 23,000+ 实证技能库”，实测该 23,000+ 技能库为 `brycewang-stanford/Auto-Empirical-Research-Skills`，而 Sant'Anna 本人的开源学术工作流仓库是 **`pedrohcgs/claude-code-my-workflow`**（两者皆极优秀，按需搭配）。
  3. **黑盒反面教材（`W0`）**：脱离 Baseline 复现与 Research Contract 的全自动“一键发顶会”黑盒框架（如 Paper2Code、AI-Scientist 系列）极易产出高精滤镜学术垃圾，严禁用于正式研究。
