# 阶段 03｜理论设计、每条假设 1 页+ 推演与识别策略

> **对应 Emergence 流程**：**阶段 3 · 设计（第 3–4 步）** ｜ **核心目标**：用 1–2 个核心理论贯通推演（彻底消灭假理论/跳步）、把每条假设扎实写到 1 页以上、画对顶刊框架图、开工跑数前冻结识别策略与主张上限。

---

## 一、W1 核心必调

| 编号 | 工具 / 方法 | 权重 | 核心作用 | 开源入口 / 做法 |
|---|---|---:|---|---|
| **L03** | **标杆范文段落标签拆解法** | **W1 (92)** | 抽 1–4 篇《中国工业经济》《管理世界》范文，逐段标 `理论/现象/机制/文献/边界/小结` 借结构不借句子 | 抽 1–4 篇目标顶刊范文手标段落功能与段长 |
| **M05** | **主张上限表（Claim Ceiling）** | **W1 (95)** | 每条结论写死“最多能说什么 / 绝不能说什么”，匹配识别强度（相关性/稳健关联/因果证据） | [lessons-and-priorities.md](../../resources/lessons-and-priorities.md) |
| **M04** | **替代解释排除矩阵** | **W1 (95)** | 逐行列明竞争性解释：预测什么｜检验什么｜结果｜排除状态，构建无完美外生冲击时的多维证据链 | [lessons-and-priorities.md](../../resources/lessons-and-priorities.md) |
| **S-03a** | `pedro-credible-claims` ＋ `empiricalwiki-design` | **W1 (90)** | 推荐开源 Skill：CSDID 作者 Sant'Anna 主张边界审查 ＋ EmpiricalWiki 从知识库导出实证设计 | [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow) |
| **R-03a** | **`Econ-Variation` 中国经管冲击库**（XHS `#253`） | **W1 (89)** | 开源参考库：收录顶刊中国准自然实验（国企分权/淮河供暖/户籍/两税合一/退税/混合办公等）及政策原文核查规范 | [mimaowang/Econ-Variation](https://github.com/mimaowang/Econ-Variation) |

---

## 二、把每条假设扎实写到 1 页+（1000–1500 字）的六模块厚推导蓝图

> **避开三大“假理论”死穴（XHS `#035/#037/#047`）**：① 不做理论百货公司（聚焦 **1–2 个核心理论**，把理论压缩成**一句话核心命题**再起步）；② 永远走 **`理论机制 → 链式推理 → 经验证据佐证 → 假设`**，不走 `文献A+文献B→假设`；③ 严禁写出“正反结果都能圆”的不可证伪假说，严禁同时推“X 影响 Y 且 Y 影响 X”自证反向因果（`#050`）。

| 模块 | 建议篇幅 | 核心写作动作（综合 XHS `#035/#037/#038/#046/#047/#050/#100`） |
|---|---|---|
| **1. 核心命题压缩与概念界定** | 150–200 字 | 界定 X 与 Y 边界；把主理论压缩为 1–2 句命题（主体受何驱动、何种约束/信息/资源改变决策），引奠基文献 |
| **2. 理论—情境深度适配** | 150–250 字 | 完成研究对象的理论化：说明本研究场景为何恰好触发该理论，显性走完 `理论概念 → 研究构念 → 可观测变量` |
| **3. 多步/多维机制链展开** | 350–500 字 | **厚推导主体**：拆为 2–3 条平行子渠道或“引入→吸收→落地”分阶段链条，每条写清 `因为A → 改变激励/信息/能力B → 改变组织行为C → 作用于Y`，穿插行业事实佐证 |
| **4. 竞争性机制与净效应权衡** | 200–300 字 | **顶刊拉深度必杀技**：主动写出 1–2 条反向成本/替代路径（如调整成本、挤出效应），论证为何主导机制净收益占优；势均力敌时直接提竞争性假设 `H1a / H1b` |
| **5. 边界条件与可观测异质预测** | 150–200 字 | 交代机制在何条件下更强/更弱（为调节/异质性埋伏笔），收束出可被数据检验的具体推论与反证条件 |
| **6. 规范四要素假设句** | 50–80 字 | 必含：①条件限定 ②明确 X 与 Y ③明确方向（正/负/U 型，禁写“存在关系”）④程度/对比表述；**模型没放某机制变量时，假设句本身不写“通过该机制”**（`#046`） |

- **调节假设铁律（`#034/#037/#041`）**：绝不写成“W 也影响 Y”，必须说明 **W 改变了 `X→Y` 中间哪一环机制**，并写出“高 W vs 低 W”鲜明对比。
- **假设数量与排布（`#047/#049`）**：全篇 **3–5 条**最佳；顺序与后文回归表格列序 100% 对齐（直接效应 → 机制/中介 → 调节）。

---

## 三、研究框架图（《管理世界》/ 顶刊硬规矩）与识别 Variation 升级路线

### 1. 框架图 6 条硬规矩（XHS `#041/#044/#049` + 导师要求）
1. 严格区分**理论框架图（构念×构念）**与**实证框架图（变量×变量）**；
2. 布局左 X、中 M、右 Y，W 放路径上方/下方；
3. **矩形＝观测变量**（回归/PROCESS 全用矩形），**椭圆＝潜变量**（仅 SEM 用）；控制变量只写图注不画连线；
4. 核心主路径实线，调节路径虚线且**箭头指向路径箭头而非指向变量框**；中介模型必须保留 `X→Y` 直接路径 $c'$；
5. **每条箭头必标唯一假设编号**，没写假设的箭头一律不画；
6. 绘图标配：Python/matplotlib 或 Draw.io 绘制（控制变量仅写图注不画连线）。

### 2. 没有干净 0/1 政策冲击时的 4 种 Variation 升级（XHS `#019/#026/#030/#059/#253`）
1. **语义/业务暴露度 × 全国统一政策 = 连续型 DID**（如 LLM 评主营业务依赖度 1–5 分 ×《个保法》`#019`；注意区分 $ATT(d|d)$ 与边际斜率 $ACRT(d)$，`#031`）；
2. **门槛操纵剥离 = Bunching-DID**（如高企研发密度门槛，`#030`）；
3. **跨国/行业外生暴露 × 基期份额 = Bartik / Shift-Share IV**（如美国 O*NET Felten-LLM × 中国城市基期职业份额 `#059`，必做 Leave-One-Out 与 Rotemberg 权重 `#014`）；
4. **细粒度测度＋负对照＋替代解释矩阵**（如 `#105`《金融研究》2026 用省内 vs 省外相邻城市负对照、支持 vs 限制政策负对照同样发顶刊）。
- *核查政策文件铁律（`#253/#032/#100`）*：务必核对“发布年 vs 落地启动年”及 1–6 月/7–12 月跨年口径，绝不盲抄二手名单！

### 3. 更多理论设计 Skills & 知识卡
- Claude：`amj/smj/amr/asq/orgsci-theory-development`、`amj/smj-methods`；Codex：`hypothesis-generation`、`experimental-design`、`scientific-critical-thinking`。
- 知识底库：[因果推断与算法速查卡](../knowledge/causal-ab-and-algo-cheatsheet.md)（做田野实验/双边市场/长短期学习效应/SUTVA 网络溢出设计必查）。

---

## 四、可折叠：假设 7 环推演 Prompt、英文句式模板与提交前 6 问自检

<details>
<summary><b>▶ 点击展开：#035 七环理论推导 Prompt / 英文顶刊假设句式 / 提交前 6 问自检</b></summary>

#### 1. Hypothesis Generation Skill v2.1 七环推导链与逐字 Prompt（XHS `#035`）
链路：`现实观察 → 研究问题 → 理论机制 → 边界条件 → 竞争性解释（混杂/反向因果/选择/同期事件）→ 可观察预测 → 研究假设`
```text
基于【现实观察】和【已核验证据】，提出候选机制。
区分研究问题、机制、因果假设和可观察预测；
至少列出2种竞争性解释与适用边界；
说明各解释分别预测什么、如何测量，以及什么结果会反驳首选机制。
不要把候选假设写成事实，也不要自动替我选结论。
```

#### 2. 英文顶刊直接/中介/调节假设句式骨架（XHS `#034`）
- **Direct**: `First, [X] refers to... According to [theory], [X] may influence [Y] because... Specifically, when [subjects] experience [X], they are more likely to... This process further leads to... Therefore, we propose: H1: [X] is positively/negatively associated with [Y].`
- **Mediation**: `We further argue that [M] serves as a key mechanism linking [X] to [Y]. Based on [theory], [X] may enhance/reduce [M] by... In turn, [M] promotes/inhibits [Y] because... Therefore, we propose: H2: [M] mediates the relationship between [X] and [Y].`
- **Moderation**: `The relationship between [X] and [Y/M] depends on [W]. When [W] is high, ... which strengthens/weakens the effect of [X] on [Y/M]. In contrast, when [W] is low, ... Therefore, we propose: H3: [W] moderates the relationship between [X] and [Y/M], such that the relationship is stronger/weaker when [W] is high rather than low.`

#### 3. 假设章节提交前 6 问硬核自检（XHS `#037`＋`#046`）
1. 主理论的核心命题压缩成一句话是什么？
2. 为什么适用于当前情境？
3. X 触发了什么机制，中间因果步骤写全了吗？
4. 为什么净方向是正/负而非反方向（回应了反向机制吗）？
5. 调节变量说清了“高 W vs 低 W”改变了中间哪一环吗？
6. 每条假设都能在回归方程里找到唯一对应的检验系数吗？

</details>
