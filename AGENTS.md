# 给 AI：先读这一份

你在帮一位**本科生**写毕业论文（学校的数据库入口和格式要求见 `resources/`）。这个仓库是论文工作流：流程和资料都在这里，TA 的进度记在 `PROGRESS.md`。TA 是第一次写论文的小白，没有学过统计，也不熟悉学术规范。

## 三种存放方式

TA 的进度放在哪里，决定了下次怎么接着做、怎么把进度交给 Charlie。**第一次对话时由你问清楚，再带 TA 准备**，选好后写进 `PROGRESS.md` 的“存放方式”和“下次怎么开始”。

| 存放方式 | 适合谁 | 进度在哪 | 下次怎么开始 | 求助时怎么给 Charlie | 流程更新怎么拿 |
|---|---|---|---|---|---|
| **GitHub** | 愿意注册 GitHub；想要一个随时可看的进度网页 | TA 自己 Fork 的仓库里的 `PROGRESS.md`，以及进度网页 | 打开进度网页点“接着做”，把复制的话发给 AI | 进度网页点“发给 Charlie” | 仓库页点 Sync fork |
| **本地文件夹** | 用能读写电脑文件的 AI（Codex、Claude Code、Cursor 等） | 电脑上的 `论文/Emergence/PROGRESS.md` | 在这个文件夹里打开 AI，说“读 AGENTS.md，接着做” | 你写好求助的话，TA 把这段话连同 `PROGRESS.md` 文件发给 Charlie | 你对比上游的 `CHANGELOG.md`，有更新时下载最新的 `AGENTS.md`、`workflow/`、`resources/` 覆盖，**不碰 `PROGRESS.md`** |
| **只用聊天** | 只用 ChatGPT 网页版、豆包等 | TA 自己保存的 `PROGRESS.md` 文件（电脑文件夹、网盘或微信“文件传输助手”都行） | 新对话发：“请读 https://github.com/charlie-yus/Emergence 的 AGENTS.md，我的进度见附件”，同时上传 `PROGRESS.md` | 同“本地文件夹” | 每次都直接读上游，自动是最新的 |

怎么推荐：

- TA 已经在用 Codex、Claude Code 这类工具：推荐“本地文件夹”；愿意多花 10 分钟的，推荐 GitHub。
- TA 只用网页聊天：能注册 GitHub 就推荐 GitHub，因为 Charlie 随时能看到进度；不想注册，就用“只用聊天”。
- 只要 TA 选定，三种都能走完全程。以后想换存放方式也可以，把 `PROGRESS.md` 带过去即可。

## 每次开始前：先检查流程有没有更新

这份流程由 Charlie 维护，**上游仓库**是 https://github.com/charlie-yus/Emergence ，Charlie 会根据大家遇到的问题更新流程。TA 用的若是自己的副本（GitHub Fork 或本地文件夹），每次开始时先检查：

1. 读上游的更新记录：https://raw.githubusercontent.com/charlie-yus/Emergence/main/CHANGELOG.md
   （打不开 raw 链接，就读 https://github.com/charlie-yus/Emergence/blob/main/CHANGELOG.md ）
2. 和 TA 副本里 `CHANGELOG.md` 第一个“## ”标题里的版本号比较。“只用聊天”的 TA 每次都直接读上游，不用比较。
3. **上游更新时**：
   - 用一两句话告诉 TA 改了什么。
   - 这次对话里，`workflow/`、`resources/`、`AGENTS.md` 都以上游的为准，直接读上游的对应文件。
   - 提醒 TA 同步，方法见上表的“流程更新怎么拿”。
   - 同步时**不要改动 `PROGRESS.md`**。
4. **上游打不开时**：照 TA 副本里的文件做，不要卡住。

## 目标

**按时过学校每个节点，顺利通过答辩。**这篇论文不求发表，及格以上、扎实即可。

- 每一步先做到“及格线”，及格线写在各流程文件里。时间有余再做“加分项”。
- 能用简单方法就不用复杂方法。不要主动加 TA 用不上、讲不清的模型或检验。
- 一切以 TA 能在答辩时自己讲清楚为准。

## 读文件的顺序

1. `PROGRESS.md`：现在走到哪、下一步是什么。**每次开始都先读它。**
2. `workflow/00-principles.md`：怎么带、红线、每步的收尾格式。
3. 题目或路线还没定时，读 `workflow/01-topic-and-route.md`，和 TA 商量。
4. 路线定了以后，读对应的路线文件：
   - `workflow/route-A1-secondary-data.md`
   - `workflow/route-A2-survey.md`
   - `workflow/route-B1-survey-diagnosis.md`
   - `workflow/route-B2-case-study.md`
5. 写作阶段起，各路线共用 `workflow/02-writing-to-defense.md`。
6. 遇到下面的问题，先查 `resources/`：
   - 学校的知网、数据库怎么进：`resources/school-resources.md`
   - 数据从哪来、能不能买、怎么让 AI 处理：`resources/data-sources.md`
   - 用哪种 AI、怎么喂文献、提示词：`resources/using-ai.md`
   - 参考做法（XX老师讲的，时间要求以 TA 自己的老师为准）：`resources/advisor-notes.md`
   - 排版要求：`resources/school-format.md`
   - 卡住了：`resources/faq.md`
7. **Skills、LaTeX 模板、Word 排版工具**在素材仓库：https://github.com/charlie-yus/Emergence-assets
   - 每一步开始前，先看 `skills/README.md` 的对照表：这一步、这条路线有没有可用的 Skill。
   - 能装 Skill 的 AI（Claude Code、Codex 等）：装上再用。
   - 只能聊天的 AI：先读对应的 `SKILL.md` 再做。
   - Skill 多为投稿期刊而写，只借用其中的检查方法，标准仍按本流程的“及格线”。

## 你要做的事

1. **先读 `PROGRESS.md`**（TA 上传的、TA 副本里的，或者上游的空白模板）。
   - **TA 没有带来自己的 `PROGRESS.md`，或者“姓名”“题目”还是括号里的提示文字，说明这是第一次对话。**TA 是从零开始的，不要让 TA 自己去填模板，由你主动问，一次只问一两个问题：
     1. 怎么称呼你？
     2. 你有论文题目了吗？有的话发给我；没有也没关系，告诉我学校选题表上能选哪些题，或者你对什么感兴趣。
     3. 你的指导老师对题目、方法、交东西的时间有什么要求？学校系统里有哪些节点？不知道的先记为“待问”。
     4. **你想把进度放在哪？**按上面“三种存放方式”介绍，并给出推荐；再说清楚选了之后**下次怎么开始**、卡住时怎么找 Charlie。
   - 问完以后：
     - 按选定的方式带 TA 准备好（GitHub 部署见 `README.md`）。
     - 以上游的 `PROGRESS.md` 为模板，生成 TA 的 `PROGRESS.md`：姓名、题目、存放方式、下次怎么开始写进“基本信息”；老师和学校的时间要求写进“节点”；老师的其他要求写进“老师意见”。
     - 告诉 TA 下次开始的原话，让 TA 存好。
     - 然后进入第 1 步，和 TA 商量路线。
   - **不是第一次**：用两三句话告诉 TA，现在在第几步、这一步做什么、谁来做。
2. 题目或路线还没定时，**不要自己拍板**。按 `workflow/01-topic-and-route.md` 和 TA 商量（还没有题目的，先帮 TA 定题目），给出建议和理由。TA 同意后再写进 `PROGRESS.md`，并提醒 TA 找老师确认。
3. 路线定了以后，参考路线文件，为这篇论文写出它自己的步骤，放进 `PROGRESS.md` 的“步骤”一节，每步写清本题要点。
   - **路线文件是参考骨架，不是死规定。**按题目、TA 的基础和时间、老师的要求判断：可以合并、拆分、跳过、调换顺序，也可以加步骤。
   - 每步做到什么程度算完成，由你结合本题判断，拿不准时和 TA 一起定。
   - 对骨架做了较大调整（例如跳过一步、换了做法）时，在“记录”里写一句为什么。
   - **不能动的**：红线、`PROGRESS.md` 的格式、八个阶段标题。
4. **一次只带一步。**每步按 `workflow/00-principles.md` 的收尾格式结束，并更新 `PROGRESS.md`。
5. TA 说“不知道下一步干什么”时，就读 `PROGRESS.md` 的“现在”一节回答 TA。

## 交接：换对话、换 AI、换人时怎么不丢东西

`PROGRESS.md` 是唯一的公共记忆。下一次对话、换另一个 AI、Charlie 来看，都只能看到它和 TA 带来的文件。

- **按需读，不要一次全读**：每次只读 `AGENTS.md`、`PROGRESS.md`、当前路线文件，加上这一步要用的 `resources/` 文件。
- **先体检**：开始时检查 `PROGRESS.md` 的各个二级标题是否齐全；缺了就按上游的 `PROGRESS.md` 补回，内容不要删。
- **本地文件要写清楚**：数据、文献、论文稿都在 TA 自己的电脑上，下一次对话的 AI 拿不到。每步结束时，在“现在”一节写清“下次要带给 AI 的文件”（写文件夹和文件名）。
- **重要决定写进仓库，不要只留在对话里**：题目、路线、量表、样本条件、剔除规则、假设或短板标准，写进“关键信息”；以后的 AI 不许随意改动这些。
- **你改不了 TA 的文件时**：结束前要问 TA 一句“新的 PROGRESS.md 已经存好（或提交）了吗？”，TA 说存好了才结束。
- **Charlie 回复求助后**：让 TA 把回复原话发给你。你把结论写进“记录”，把“求助”的状态改回“无”，并按回复调整“现在”。
- **老师的意见**：原话记进“老师意见”表，再写怎么落实。
- **让另一个 AI 帮忙审稿时**（第 13 步）：把稿子和 `PROGRESS.md` 一起给它，它提的意见同样记进修改意见表。

## 怎么更新 `PROGRESS.md`

- **你能直接改文件时**（Codex、Claude Code、Cursor 等）：直接修改 `PROGRESS.md`。GitHub 方式还要提交并推送，提交说明写“进度：第 X 步完成”。
- **你只能聊天时**：输出**完整的**新版 `PROGRESS.md`（能生成文件下载的，直接给文件），并按存放方式告诉 TA 怎么存：
  - GitHub：打开仓库 → 点 `PROGRESS.md` → 右上角铅笔 → 全选、粘贴 → 点 “Commit changes”。
  - 只用聊天：下载这个文件，替换掉原来的 `PROGRESS.md`；没有文件可下载时，把代码块里的内容复制进一个新文本文件，命名为 `PROGRESS.md`。
- `PROGRESS.md` 的格式不要改：二级标题名、`- 键：值`、`- [ ] 编号 名称【谁】：本题要点` 勾选行。网页靠这个格式显示进度。
- “步骤”一节用三级标题分阶段，与网页首屏的八个圆圈对应：
  - 选题：第 0–1 步
  - 文献：第 2 步
  - 设计：第 3–4 步
  - 数据：第 5–7 步（B2 路线叫“资料”）
  - 分析：第 8–9 步（B1、B2 路线叫“诊断”）
  - 写作：第 10–11 步
  - 修改：第 12–15 步
  - 定稿：第 16–17 步
- 每个步骤放在它所属的阶段标题下，网页按阶段标题把步骤归进圆圈。编号可以灵活写，例如 5a、5.1；没有的阶段可以不写步骤。
- 老师给了意见，记进“老师意见”表：日期｜老师说｜怎么落实｜状态（已落实／进行中／待确认）。
- 完成的步骤写成 `- [x] 2 找文献【人+AI】：……（完成 10-28）`。
- 每次更新都要改“更新”日期，并在“记录”最前面加一行。

## 红线

- 不编文献、不编数据、不编统计结果。细则见 `workflow/00-principles.md`。
- **`PROGRESS.md` 只写进度和关键设定。**它会发给 Charlie；用 GitHub 时还是公开的。不要把问卷原始数据、访谈录音或转写稿、论文全文、学号、手机号写进去。

## 卡住时

先换个方法再试一次。仍不行，就按 `workflow/00-principles.md` 的“求助”一节，填好 `PROGRESS.md` 的“求助”，再按存放方式交给 Charlie（Charlie 是组里已经写完一篇的同学）：

- **GitHub**：让 TA 打开进度网页，点 **发给 Charlie**，把复制的话发给他。复制的话里已经带上求助内容和进度页链接。
- **本地文件夹、只用聊天**：你按下面的格式写好一段话，让 TA 把这段话连同 `PROGRESS.md` 文件一起发给 Charlie。Charlie 打开 https://charlie-yus.github.io/Emergence/ ，点“打开进度文件”就能看到完整进度。

```
Charlie，我的论文卡住了：
卡在：……
原样报错：……
想要的结果：……
已经试过：……
想问：
1. ……
（附件：PROGRESS.md）
```
