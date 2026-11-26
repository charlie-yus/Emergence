# 阶段 07｜独立审稿、证据链取证审计与 Rebuttal 返修

> **对应 Emergence 流程**：**阶段 7 · 修改（第 12–15 步）** ｜ **核心目标**：既抓出致命硬伤（数字打架、伪造引文、逻辑断层），又防陷入“AI 无限挑刺→越改越防御”死循环，高效打赢返修与审稿博弈。

---

## 一、W1 核心必调（审稿与证据链审计主力）

| 编号 | 工具 / Skill / 脚本 | 权重 | 核心作用 | 开源入口 / 做法 |
|---|---|---:|---|---|
| **C01** | **`check_numbers.py` 数字自动核对脚本** | **W1 (96)** | 扫描草稿中每个带小数数字回查结果 CSV，**0 缺失才交付**，根绝肉眼漏数 | [Emergence-assets/tools/check_numbers.py](https://github.com/charlie-yus/Emergence-assets/blob/main/tools/check_numbers.py) |
| **M06** | **审稿意见 P0–P3 四刀切法** | **W1 (94)** | 按“说服力 ÷ 成本”分 P0 硬伤 / P1 高性价比 / P2 附录或 B 版 / P3 止损 | [lessons-and-priorities.md](../../resources/lessons-and-priorities.md) |
| **X06** | **外部 AI 审 PDF 假报错反杀术** | **W1 (90)** | 先用 先核对导出 PDF 文字抽取无缺失→外部审稿意见全部回 Markdown/LaTeX/Word 源稿核真伪，秒杀 80% 抽字假错 | 先核 PDF 抽字无缺失→意见回源稿正则核真伪 |
| **S-07a** | `integrity-auditor` ＋ `anti-autoresearch` 3 件套 | **W1 (93)** | 推荐开源 Skill：`ai4s-skills` 证据完整性审计（真引用/实测标 `measured`/代码 provenance）＋ `anti-autoresearch` / `citation-forensics` / `consistency-audit` 全稿一致性与引文取证 | [ai4s-skills](https://github.com/ai4s-research/ai4s-skills) ＋ [Anti-Autoresearch](https://github.com/wanshuiyin/Anti-Autoresearch) |
| **S-07b** | `pedro-audit-reproducibility` / `devils-advocate` / `adjudicate-review` | **W1 (92)** | 推荐开源 Skill：CSDID 作者 Sant'Anna 亲写——可复现审计、魔鬼代言人深度挑刺、审稿意见裁决 | [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow) |
| **S-07c** | `ars-paper-reviewer` ＋ `nature-reviewer` / `nature-response` | **W1 (90)** | 推荐开源 Skill：独立审稿人 ＋ 逐条 Rebuttal 回复套件（按需配 `smj/amj-rebuttal`） | [academic-research-skills](https://github.com/Imbad0202/academic-research-skills) ＋ [nature-skills](https://github.com/Yuan1z0825/nature-skills) |

---

## 二、实战心法：如何用好 AI 预审、反制敷衍 AI 审稿人、做好 Rebuttal

### 1. 破除 AI 预审两大坑（XHS `#083/#084/#087/#088` + LinuxDo `#011`）
1. **必开“新窗口 + 关闭记忆 + 直接传 PDF”**（`#084` 评论 1 & 12）：不关记忆，AI 带入你的心血上下文会系统打高分掩盖硬伤；且**严禁让两个模型互看输出“互相 review”**（LinuxDo `#011`）。
2. **绝不看 AI 单篇拒稿/接收打分，改用“10 篇顶刊对标盲排前 40% 法”**（`#083` 3518 赞）：连已发 CNS/CVPR Best 扔给 AI 都会被批 reject（`#087/#088`）；找目标期刊 **10 篇强相关论文＋自己稿子**抽核心导入/设计/结论，开新窗口盲排综合贡献，进 **前 40%** 才算过线！
3. **只读复核与三轮即停（`M08` + `#087`）**：只读窗口严禁改稿，只查硬伤；严格走 **①结构审查 → ②技术审查 → ③终审定稿** 三轮即止，意见人工分三档（必须改 / 建议改 / 忽略），防止无限返工。
4. **多模型预审分工（`#082`）**：创新点与讨论用 **DeepSeek**，方法细节用 **Gemini**（注意其偏温和不看打分），逻辑挑硬伤用 **ChatGPT/Claude Opus**；**文献综述与引言三者命中率偏低，须靠人工与导师把关**。

### 2. 反制“审稿人无脑用 AI 审稿”两招（XHS `#084/#081/#228`）
1. **“详细附录埋伏法”（`#084`）**：把全部稳健性、参数、代码细节与次要检验扎实放进 **Online Appendix**（不污染主文流畅度）；AI 审稿人往往不读附录瞎提“缺少 X 检验”，Rebuttal 逐条精准回指“详见附录第 X 页表 Y”，让编辑/AC 一眼识破对方敷衍。
2. **识破 AI 审稿幻觉判据（`#081` 评论 14）**：凡是**指不出原文具体句段位置、或要求补根本不存在的文献**，大概率为 AI 幻觉；精准锚定原文证据的才当真实学术问题扎实补改。

### 3. Rebuttal 高分结构与防“答顺没答实”（XHS `#001/#079/#080/#277`）
- **人先定 Action Queue 再让 AI 润色（`#080`）**：先把每条意见人工定性为 **`补证据 / 改解释 / 收紧 claim / 补稳健性 / 礼貌澄清`**，绝不让 AI 直接一键生成回复信把真问题糊弄过去。
- **内生性与计量质疑四段式回复（`#001/#277`）**：①礼貌认同重要性 → ②精准诊断最可能来源（OVB/反向因果/负权重）并量化风险（如 Bacon 权重）→ ③亮出 **1–2 种最贴合方法**交叉验证（禁吹“用了 IV+GMM+Heckman+PSM 全家桶”）→ ④报告稳健一致结果与诚实边界，精准标注正文/附录改动页码行号（`Section X, P8L38`）。
- **审稿人高频拒稿 Top 8 排雷雷达（`#034/#047/#054/#109/#225`）**：①理论—推导—实证三层断裂 ②交错 DID 负权重/内生性未定来源 ③词频构念与测度脱节 ④LLM 错分未纠偏 ⑤替代解释/同期政策未排 ⑥相关越界写成因果 ⑦通篇叠甲防御端水 ⑧结论照抄摘要/局限空喊“能力有限”。

---

## 三、可折叠：终审停手 / 9 维模拟审稿 / 返修 4 步 / 红队左右互搏逐字 Prompt

<details>
<summary><b>▶ 点击展开：终审停手防挑刺 / 9 维顶刊审稿 / 返修 4 步 / Reviewer #2 红队互搏 Prompt</b></summary>

#### 1. 第三轮“终审停手”防无限挑刺 Prompt（XHS `#087` 原文）
```text
你现在是目标期刊严格审稿人。只判断是否存在影响投稿/送审的实质性问题。
❌ 不要为展示批判性思维刻意找茬
❌ 不要因"有另一种写法"就判当前版本有误
❌ 不追加与核心结论无关的实验/文献
✅ 仅当问题触及科学性、逻辑完整性、证据充分性、可重复性时才列入清单
若无必须修改项 → 直接告诉我：可以停手，进投稿流程。
```

#### 2. 顶刊 9 维模拟审稿＋8 节输出 Prompt（XHS `#017` 精华；中文 CSSCI 可改为选题/逻辑/规范/政策/表达 5 维 `#067`）
```text
你是【目标期刊】资深审稿人，从拒稿风险角度审阅9维：核心贡献/Novelty/引言/综述/方法/实验/可辩护性(有无overclaim或跳步)/可读性/常见拒稿风险。
按8节输出：一总体评价；二分项评分及理由；三3-5条具体优点；四3-7个最可能拒稿问题(是什么/为何在意/如何改)；五逐节修改建议；六最像overclaim的句段及稳妥改法；七投稿前checklist；八作者最难回应的3个问题及提前准备证据。不要空喊“需要更多实验”，要说清补什么、验什么claim。
```

#### 3. 论文返修 4 步保密工作流 Prompt（XHS `#079`，仅给片段防整稿泄露）
1. **归类**：`Summarize the key points from these reviewer comments, categorizing them by major concerns and minor revisions. Highlight repeated themes.`
2. **定位表**：`Create a step-by-step revision plan: (1) Reviewer ID, (2) Exact manuscript location (section/paragraph/line), (3) Action type (clarification/evidence/tighten claim/robustness).`
3. **片段改稿**：`Revise [Location] to address [Reviewer X]'s concern about [requirement]: [Insert excerpt only]`
4. **回复信**：`Write a polite, professional response letter quoting each comment, explaining the exact revision made, and citing the exact revised location.`

#### 4. Reviewer #2 红队左右互搏预备弹药库（XHS `#013` Step 5 原文）
```text
第一轮，扮演挑剔的 Reviewer #2，直面这篇稿给出 4 条致命质疑（不给优点）。
第二轮，换身份扮演作者，针对每条质疑：①判断是 misunderstanding / weakness / out-of-scope；②给一段 80 词/150 字以内回复段；③列出需补证据或表格。
```

</details>
