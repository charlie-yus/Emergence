# 阶段 04｜数据获取、另类替代测度与顶刊级 LLM 文本分析

> **对应 Emergence 流程**：**阶段 4 · 数据（第 5–7 步）** ｜ **核心目标**：跳出“单数年报词频”内卷，构建经得起一二区/中文顶刊拷问的变量测度与 LLM 计量纠偏证据链。
> **深度附件卡片**：金星晔/李虎斌/余明桂/Word2Vec+TF-IDF 四大精要详见 [顶刊核心方法精要卡](../knowledge/top-journal-methods-brief.md)。

---

## 一、W1 核心必调

| 编号 | 工具 / 方法 | 权重 | 核心作用 | 开源入口 / 做法 |
|---|---|---:|---|---|
| **M03** | 统一清洗底表 | **W1 (96)** | 全套回归/机制/稳健性共用一份底表，彻底根绝跨表同 $N$ 系数打架 | 阶段前置硬规 |
| **M09** | 付费数据四步样表核验 | **W1 (88)** | 付款前核四关：字段非空、稳定映射代码与年份、覆盖率 ≥80%、价格可控 | [data-sources.md](../../resources/data-sources.md) |
| **D-04a** | **“说 / 买 / 做”与 AI 漂洗度操作化矩阵** | **W1 (94)** | 打破年报词频构念混淆（方颖等《金融研究》2026 实锤：披露 AI 企业 **64% 只说不做**且对 TFP 无效，XHS `#060/#151`） | 见第二节 |
| **D-04b** | **顶刊 7 步 LLM 文本测度 SOP + 四大计量纠偏** | **W1 (95)** | 解决“90% 准确率直接回归仍有 40% 偏差”（Egami 2023 / SMJ 2026 / ARE 2026 / IJOC 2026，XHS `#075/#109/#129/#133`） | 见第三节 |
| **S13** | `alterlab-ssci-measurement-gate` ＋ `sem-psychometrics` | **W2 (82)** | 问卷/量表测量不变性、信效度、缺失数据与 SEM 检验（R / 心理测量生态） | R `lavaan` / `semTools`（问卷信效度与测量不变性） |

---

## 二、打破“年报词频”内卷的 6 类高区分度新数据与替代测度

| 赛道 | 顶刊级构造方式与数据源 | 代表顶刊与出处 | 直接复用价值 |
|---|---|---|---|
| **1. 在线招聘 & 员工履历** | 技能共现构建词典→算 AI 岗位占比 `AIRatio`（`#060`）或员工履历 AI 存量（`#054`，稳健性剔除 Python 等通用编程词）；`BERT-Base-Chinese` 匹配岗位与《职业分类大典》（阈值 0.7，`#102`）；本土招聘×O*NET 构中国职业 LLM 暴露度（`#059`） | *JFE* 2024、`《金融研究》2026(5)`、`《中国工业经济》2025(7)`、`《管理世界》2025(7)` | **穿透“说 vs 做”第一梯队**；区分需求（招聘）与存量（履历） |
| **2. AI 专利、知识宽度与资本投入** | CNIPA 2023 分类体系 + 知识宽度均值/中位数 + **剔除 AI 发明人参与的非 AI 专利作超干净安慰剂**（`#289`）；`BERT` 直接判专利摘要规避 IPC 二类错误（`#125`）；**在建工程明细**与 CSMAR 附注“无形资产—AI 软件/算力”（`#120/#151`） | `《经济研究》2025(11)` / `2025(9)` / 余明桂新文、`《中国工业经济》2025(2)` / `2025(6)` | CSMAR 新上线 **3 大 AI 专项库**（AI 专利 46 字段、AI 研究 12 表含算法备案与机器人、AI 产业链 11 表，`#057`） |
| **3. 算力基础设施 5 套变量** | ①公共智算中心多期 DID（`#289`，须控商业智算中心）；②工信部 B11 类 IDC 许可累计存量（连续变量）；③国家超算中心 DID；④国家绿色数据中心强度 DID；⑤**科技部国家新一代 AI 公共算力开放创新平台 DID（2023.7 首批 9 城，蓝海！）** | `《金融研究》2025(7)`、余明桂新文、`#055` | 注意统一“开工/投运/验收”与公告跨年口径，补 **6 月 30 日半年度截断**稳健性（`#289`） |
| **4. 供应链与真实交易网** | 前五大供应商/客户构一阶/二阶共享商业关联网络（`#065`）；全国工商范围 BERT 识别 83 万数商企业＋真实采购额测“实数融合”（`#124`） | `《财经研究》2025(1)`、`《中国工业经济》2026(4)` | 把普通财报数据升级为网络嵌入位置与真实交易流 |
| **5. 多元非年报文本源** | 分析师报告+电话会+员工评论多源对撞算视角分歧（`#063` *RFS* 2026）；互动易问答（`#135/#151`）；券商研报剥离 120 宏观指标取**净预期残差**（`#103`）；10-K 叙述性 R&D 补救财报研发缺失（`#115`） | *RFS* 2026、*MS* 2025、*JAE* 2022/2025、`《世界经济》2026(3)` | 突破 MD&A 模板化宣传，刻画多主体分歧 |
| **6. “说/买/做”与 AI 漂洗度** | **说**：LLM 逐段判 0未涉及/1表态/2实质举措（`#075`）或 Word2Vec+分年 TF-IDF（`#093`）；**买**：AI 无形资产/在建工程/数商采购；**做**：AI 专利/AI 招聘/算法备案；**AI 漂洗度** $= Z(\text{AI 象征文本及积极语调}) - Z(\text{AI 核心专利或算力无形资产/总资产})$（`#151`） | `《南开管理评论》2026`（李虎斌）、`《金融研究》2026(5)` | 适合刻画企业“象征性披露 vs 实质性投入/自研”分层与 AI 漂洗建模 |

> **创新质量多维避坑（XHS `#052/#102/#131/#289`）**：① IPC 知识宽度均值/中位数；② 复用/新组合/突破性新发明三阶（*MS* 2024）；③ 专利公告 3 日股市超额回报（Kogan 2017）；④ 专利摘要嵌入余弦距离 `1 - CosSim` 测语义新颖性；⑤ **多零值专利稳健性必补 PPML 泊松回归**（回应 Chen & Roth 2024 *QJE* 对 `ln(1+y)` 的缩放敏感批评，`#289`）。

---

## 三、顶刊级 LLM 文本测度全流程（从定义答辩到计量纠偏）

### 1. 答辩避坑定义 & 选型决策（XHS `#143/#114/#076/#116`）
- **答辩标准口径（`#143`）**：BERT/ERNIE/FinBERT 属 **Encoder-only 预训练语言模型（PLM）**，GPT/Qwen/DeepSeek/Claude 属 **Decoder-only 生成式大语言模型（GLLM）**；章节标题统一写“基于 Transformer 架构的预训练语言模型”，根绝定义之争。
- **工程选型铁律**：① 正则/词典能解决绝不滥用 LLM（`#104/#117`）；② 十万—百万级明确分类用 **“强 GLLM 标注 + 人工核验 + 微调 ERNIE/FinBERT/DeBERTa 小模型”**（`#101/#107/#116`）；③ 复杂语境用 *MS* 2025 **漏斗混合架构**（关键词排除 42%→轻量模型粗滤→仅 1/3 边界送 GLLM 精判，准确率 94–96%、成本仅 **1/35**，`#114`）。
- **连续打分避坑 Heaping Bias（`#116`）**：直接让 LLM 打 1–9 分会异常堆在 1/5/9；最优提示法是用**词元概率加权逐点评分**（`logprobs`），或仅用 **1,000 对**人工偏好微调 `DeBERTa-v3-large`/`ModernBERT` 奖励模型反超 70B 提示模型。

### 2. 7 步实操 SOP ＋ 杀手锏：四大 LLM 测量误差计量纠偏（`#075/#109/#129/#133`）
1. **切分锁种子**（超 3,000 字先分段防退化 `#104`；抽样必含**无关键词随机段**防漏报 `#075/#132`）→
2. **人机共用标签手册（Codebook）** →
3. **RCFC 结构化 Prompt**（加**分布先验声明** `#114`、**原文抄录 `evidence_span` 引号转「」** `#075`、**零推断返 `null`** `#074`、**`I need more context` 拒答出口** `#063`、数值抽取配 **ChatExtract 否定追问**使精确率 42.7%→90.8% `#128`）→
4. **30–100 条试跑迭代手册 v1→v2** →
5. **批量跑数**（`temp=0`、单段独立新会话、锁定精确快照版本名与日期、**JSON 解析失败重试 3 次仍败须留空补录绝不置 0** `#075`）→
6. **完全隔离的 Hold-out 验证集**：汇报人际 κ、Accuracy/P/R/F1/$F_{0.8}$、完整混淆矩阵、两轮重跑稳定性、**日期掩码/知识截止日后样本防训练泄露检验（Look-ahead Bias）**（`#103/#113/#129`）→
7. **第二阶段回归计量纠偏（拉满顶刊壁垒！）**：
   - **随机验证子样本 DSL 去偏**（Egami et al. 2023 / *ARE* 2026 Ludwig 等证明仅需 **125–250 条**随机金标准标注即可纠偏并收紧标准误，`#075/#129`）；
   - **IJOC 2026 四大去偏估计量（`#133`）**：`SIMEX / MC-SIMEX`、去偏 MLE、`IV-GMM`（机器预测当 IV 结合标注样本 OLS）、`Two-step DML / GMM-DML`；
   - **SMJ 2026 多 Prompt 系数边界（`#109`）**：自动生成多策略变体 Prompt 批量跑下游回归，汇报系数分布带（均值±1 SD），证明不依赖单条 Prompt。
   - **底线铁律（`#105`）**：**LLM 只解决 Measurement，绝不替代 Identification！**

---

## 四、可折叠：可直接复制的 LLM 文本测度 Prompt 与 Python 批处理骨架

<details>
<summary><b>▶ 点击展开：年报逐段编码 Prompt / MS 分布先验 Prompt / ChatExtract 否定追问 / Python 并发容错与 Embedding 代码</b></summary>

#### 1. 年报“0未涉及 / 1表态 / 2实质举措”逐段编码 Prompt（XHS `#075` 实测原文）
```text
你是一名经济学研究助理，负责按标签手册给上市公司年报段落编码。
{此处插入完整标签手册：定义、决策树规则、正反例子}
请只根据下面这段原文判断，不要引入原文以外的信息。
输出一个 JSON 对象，不要输出其他任何文字：
{
  "label": 0 或 1 或 2,
  "evidence": "从文中直接抄录的那一句，照抄，文中的引号一律改成「」，标点、时间与数字照抄",
  "reason": "一句话说明依照手册哪一条"
}
段落原文：{段落原文}
```

#### 2. *MS* 2025 分布先验声明 ＋ *Nature Comm.* ChatExtract 否定式追问（`#114` & `#128`）
```text
[先验防误报关键句，#114]
Important: these sentences are rare, in 65% of the cases this will be an empty list. It is ok to return an empty list. Provide JSON = {"sentences": []}

[数值/实体抽取后否定式追问，精确率 42.7%->90.8%，#128]
There is a possibility that the data you extracted is incorrect. Answer "Yes" or "No" only. Be very strict.
Is "[value]" the [property] for "[entity]" in the following text? [text]
```

#### 3. 确定性 API 并发打标 + JSON 容错提取骨架（`#075/#106/#112`）
```python
import json, time
from concurrent.futures import ThreadPoolExecutor

MODEL = "claude-haiku-4-5-20251001"  # 必须锁定精确版本快照

def extract_json(s: str):
    a, b = s.find("{"), s.rfind("}")
    if a == -1 or b <= a: return None
    try: return json.loads(s[a:b+1])
    except Exception: return None

def label_one(row, client, build_prompt, max_retries=3):
    for _ in range(max_retries):
        try:
            r = client.chat.completions.create(
                model=MODEL, temperature=0,
                response_format={"type": "json_object"},
                messages=[{"role": "user", "content": build_prompt(row["text"])}],
            )
            obj = extract_json(r.choices[0].message.content)
            if obj is not None:
                return {"id": row["id"], "ok": 1, **obj}
        except Exception:
            time.sleep(1)
    return {"id": row["id"], "ok": 0, "label": None}  # 失败留空补录，绝不置 0！
```

#### 4. 本地开源 Embedding 语义新颖性 / 余弦相似度（`#123/#078/#131`）
```python
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("path/to/qwen3-embedding-0.6B")  # 或 all-MiniLM-L6-v2
embs = model.encode(texts, normalize_embeddings=True)
cos_sim = float(np.dot(embs[0], embs[1]))
novelty = 1.0 - cos_sim
```

#### 5. 探索期 MVP 沙盒快捷通道（`W2-MVP`）
- 新想法试水先跑 **LLM 零样本 200–500 条极速探路（`MVP-03`）** 看相关性与分布，有信号再按第三节升级 7 步 SOP ＋ DSL 纠偏（→ 详见 [00卡](00-base-and-hacks.md)）。
- 公开数据/代码入口：`TiesdeKok/chatgpt_paper`（`#114`）、`daphnearmstrong.com/data`（`#117`）、`osf.io/qsgby`（`#097`）、`ai4ss.github.io/CUE-Bench/`（`#154`）。

</details>
