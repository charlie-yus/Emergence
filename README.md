# Emergence

**Niuma One (牛马一号)** · An AI-guided workflow for undergraduate theses, from choosing a topic to the final defense.

Fork this repository and hand it to your AI assistant. The AI reads `AGENTS.md`, asks you a few questions, helps you pick one of four routes (secondary-data empirical, survey empirical, survey diagnosis and strategy, case study), and then walks you through 18 steps one at a time. Progress is kept in `PROGRESS.md` and shown on a GitHub Pages progress page. When the workflow is updated upstream, your AI tells you and you sync with one click (**Sync fork**).

The goal is to pass every milestone on time and get through the defense, not to aim for publication.

- Example progress page: https://charlie-yus.github.io/Emergence/?file=workflow/progress-example-B1.md
- The workflow itself is written in Chinese.

---

## 中文说明

这个仓库是一份**写毕业论文的工作流**：从选题、找文献、做数据或问卷、写作、排版，到定稿和答辩，每一步都写清了谁来做、做到什么程度算过关。AI 读完流程，和你商量走哪条路线，然后一步步带你做，同时把进度记在 `PROGRESS.md` 里。

目标是**按时过学校的每个节点，顺利通过答辩**，不求最好。

---

## 一　开始：只要一句话

不管你用哪个 AI，第一次都只要发这句话：

> 请读 https://github.com/charlie-yus/Emergence 的 AGENTS.md，按里面的规则带我做。

AI 打不开链接时：在这个页面点绿色的 **Code → Download ZIP**，解压后把 `AGENTS.md`、`PROGRESS.md` 和 `workflow/` 里的文件上传给它，再发同一句话。

**你什么都不用先填。**AI 会主动问你：怎么称呼、有没有题目（没有就帮你从学校选题表里挑）、老师有什么要求、**你想把进度放在哪**。然后和你商量走哪条路线：

| 路线 | 适合 |
|---|---|
| A1 二手数据实证 | 用 CSMAR 等数据库跑回归，例：“X 对企业 Y 的影响” |
| A2 问卷实证 | 用量表发问卷，检验假设，例：“X 对员工 Y 的影响” |
| B1 调查诊断与对策 | 问卷加访谈找短板、提对策，例：“……短板与提升策略——以武汉为例” |
| B2 案例分析与对策 | 选一到三家企业诊断问题、提对策，例：“某企业……策略分析” |

## 二　进度放在哪（AI 会问你）

| 存放方式 | 适合谁 | 下次怎么开始 | 卡住时怎么找 Charlie |
|---|---|---|---|
| **GitHub** | 愿意注册 GitHub；想要一个随时可看的进度网页 | 打开进度网页点 **接着做**，把复制的话发给 AI | 进度网页点 **我卡住了**，再点 **发给 Charlie** |
| **本地文件夹** | 用能读写电脑文件的 AI（Codex、Claude Code、Cursor） | 在 `论文/Emergence` 文件夹里打开 AI，说“读 AGENTS.md，接着做” | AI 写好求助的话，你把这段话连同 `PROGRESS.md` 文件发给 Charlie |
| **只用聊天** | 只用 ChatGPT 网页版、豆包等 | 新对话发：“请读 https://github.com/charlie-yus/Emergence 的 AGENTS.md，我的进度见附件”，并上传 `PROGRESS.md` | 同上 |

选好以后，AI 会把“下次怎么开始”的原话写进你的 `PROGRESS.md`，并告诉你，**请存好**。

**看自己的进度页**：GitHub 方式有自己的网页。另外两种方式，打开 https://charlie-yus.github.io/Emergence/ ，点页面底部的 **打开进度文件**，选你的 `PROGRESS.md`，就能看到同样的进度页。

示例：https://charlie-yus.github.io/Emergence/?file=workflow/progress-example-B1.md

### GitHub 方式怎么部署（约 10 分钟，只做一次）

1. **注册 GitHub**：打开 https://github.com 注册账号。用户名会出现在网址里，建议用拼音。
2. **Fork 这个仓库**：打开 https://github.com/charlie-yus/Emergence ，点右上角 **Fork** → **Create fork**。用 Fork 而不是复制，以后 Charlie 更新流程，你点一下 **Sync fork** 就能拿到新版本。
3. **打开网页**：在你的新仓库里点 **Settings → Pages**，在 Build and deployment 下面设置：
   - Source 选 **Deploy from a branch**；
   - Branch 选 **main** 和 **/(root)**；
   - 点 **Save**。
   - 等 1–2 分钟，网页地址是 `https://你的用户名.github.io/仓库名/`。
4. **登记**：把**仓库链接**和**网页链接**发给 Charlie。

### 本地文件夹方式怎么准备

1. 在这个页面点绿色的 **Code → Download ZIP**，解压到你的论文文件夹，改名为 `Emergence`。
2. 在这个文件夹里打开你的 AI（Codex、Claude Code、Cursor 等），说“读 AGENTS.md，接着做”。

## 三　进度怎么保存

- **AI 能直接改文件**（Codex、Claude Code 等）：每做完一步，它会自己更新 `PROGRESS.md`；GitHub 方式还会提交。
- **AI 只能聊天**：它会给出新版 `PROGRESS.md`。
  - GitHub 方式：在仓库里点 `PROGRESS.md` → 铅笔图标 → 全选、粘贴 → **Commit changes**。
  - 只用聊天：下载或另存为 `PROGRESS.md`，替换掉旧文件。

**每次结束前，确认新的 `PROGRESS.md` 已经存好**，下次全靠它接着做。

## 四　遇到问题

1. 先让 AI 换个方法再试，把报错截图或原文发给它。
2. 同一个问题试了三次还不行，或者遇到要人拍板的事，对 AI 说“我卡住了，帮我填求助”（GitHub 方式也可以直接点网页上的 **我卡住了**）。
3. 发给 Charlie：
   - GitHub 方式：点 **发给 Charlie**，把复制的话发过去，里面带着你的进度页链接。
   - 其他方式：把 AI 写好的那段话，连同 `PROGRESS.md` 文件一起发过去。
4. 收到 Charlie 的回复后，把回复原话发给 AI，它会记下来并关掉求助。

常见问题先看 `resources/faq.md`。

## 五　流程更新了怎么办

Charlie 会根据大家遇到的问题更新流程，每次更新都写在 `CHANGELOG.md` 里。你的 AI 每次开始前会自己检查，有新版本会告诉你。

- GitHub：打开你的仓库页 → 点 **Sync fork** → **Update branch**。
- 本地文件夹：让 AI 下载最新的流程文件来覆盖，它不会改你的 `PROGRESS.md`。
- 只用聊天：不用做什么，AI 每次读的都是最新版。

## 六　注意

- **`PROGRESS.md` 只写进度。**它会发给 Charlie，用 GitHub 时还是公开的。问卷原始数据、访谈录音、论文全文、学号、手机号都不要写进去。论文和数据放在你自己的电脑或网盘里。
- 文献、数据、结果都不能编。规则见 `workflow/00-principles.md`。
- 学校系统的节点无论进度快慢，都必须按时提交。

## 目录

| 文件 | 内容 |
|---|---|
| `AGENTS.md` | 给 AI 的入口：检查更新、读什么、怎么带你、怎么更新进度 |
| `CHANGELOG.md` | 流程的版本和每次改了什么 |
| `PROGRESS.md` | 进度模板；你的进度就记在你自己的这份文件里（网页显示的就是它） |
| `workflow/00-principles.md` | 分工、红线、每步怎么收尾、怎么求助 |
| `workflow/01-topic-and-route.md` | 怎么定路线 |
| `workflow/route-*.md` | 四条路线的第 0–9 步 |
| `workflow/02-writing-to-defense.md` | 各路线共用的第 10–17 步：写作、排版、AI 审稿、查重、修改、定稿、答辩 |
| `resources/school-resources.md` | 知网、CSMAR 等学校数据库怎么进 |
| `resources/data-sources.md` | 哪些数据能直接下载、哪些要自己做、哪些可以买，以及怎么让 AI 处理 |
| `resources/using-ai.md` | 用哪种 AI、怎么喂文献、提示词、写作 Skills 精华 |
| `resources/advisor-notes.md` | 参考做法：XX老师 10-22 会议要点（时间要求以你自己的老师为准） |
| `resources/school-format.md`、`resources/school-format-original.doc` | 排版要求 |
| `resources/faq.md` | 卡住了先看这里 |

Skills、学校 LaTeX 模板、Word 排版工具在素材仓库：https://github.com/charlie-yus/Emergence-assets

---

## 给 Charlie：怎么发布更新

1. 改 `workflow/`、`resources/`、`AGENTS.md`、网页文件。**不要改 `PROGRESS.md`**，否则组员同步时会冲突。
2. 在 `CHANGELOG.md` 最上面加一条：`## 年-月-日.序号`，下面用一两行写改了什么。
3. 推送到 main。组员的 AI 下次开始时会读到；组员的进度网页会提示“流程有更新”。
4. 组员的求助解决后，如果是大家都可能遇到的问题，写进 `resources/faq.md`，按上面的步骤发布。
5. **看组员的进度**：GitHub 方式的直接打开他们的网页；其他方式的，打开 https://charlie-yus.github.io/Emergence/ ，点底部 **打开进度文件**，选他们发来的 `PROGRESS.md`，也可以直接把文件拖进页面。
