# 因果推断、A/B 实验与大面板算法复杂度速查卡

> **说明**：本卡为开源/通用方法论知识点速查索引（不含任何第三方版权教材原文），供在 **阶段 03（研究与实验设计）**、**阶段 04（大数据清洗）** 与 **阶段 05（观测性因果与异质性处理效应）** 快速对照概念、检验条件与开源工具包。

---

## 一、因果推断与实验设计核心框架速查

| 模块 | 核心概念与假设 | 实战痛点与标准解法 | 对应开源工具 / 延伸 |
|---|---|---|---|
| **1. 潜在结果框架与功效** | 相关性 / 干预 / 反事实三层级；混杂变量双条件（既影响处理又影响结果）；辛普森悖论；SUTVA + 随机化；I/II 类错误与统计功效 Power | 小样本功效不足易误判“无效应”；实验前必做最小可检测效应（MDE）与样本量估算 | R `pwr` / Python `statsmodels.stats.power` |
| **2. A/B 实验与方差缩减** | 层域正交分流、参数交互与遗留效应（Rehash）、人均/比率指标（Delta Method 算方差） | 方差太大看不出显著提升 → 用实验前同指标做协变量调整：**CUPED / PSA 方差缩减**，不增样本量即可大幅收紧标准误 | 实证面板等价思想：控制前定特征或 ANCOVA |
| **3. 双边市场实验与 FDR 假阳性** | 供需竞争/预算抢夺违背独立性；多重假设检验（测几十个指标必出假阳性） | 6 类双边隔离法：双侧分流、预算隔离、Interleaving、**Switchback（时间轮转实验）**；多指标校正用 **FDR（Benjamini-Hochberg / Storey Q）** 或 Romano-Wolf (`rwolf`) | Stata `rwolf` / R `stats::p.adjust` |
| **4. 长短期效应评估 8 法** | 区分短期**新奇效应**、**用户/企业学习曲线**、反馈循环与外部冲击（直接呼应 AI 工具采用初期“先降后升”或“短期热潮后回落”讨论） | 用长期代理指标（Surrogates）、队列追踪、分阶段动态事件研究、Meta 分析跨期整合评估长期净效应 | 面板动态滞后期 / 事件研究窗口延伸 |
| **5. 网络效应与 SUTVA 违背** | 稳定单元处理值假设（SUTVA）被跨单元溢出破坏 → 直接效应与溢出效应混淆 | 拆分直接效应与溢出效应；按社区/空间聚类分配（如 Louvain 社区划分、EgoCluster 异构聚类）；在观测面板中用**低溢出子样本重估**论证基准为保守下界（见 [top-journal-methods-brief.md](top-journal-methods-brief.md) 卡 4） | 空间分带回归 / 暴露映射（Exposure Mapping） |
| **6. 观测性因果：PSM 与 IPW** | 平衡性（标准化偏差 `<10%` 且 `p>0.1`）、条件可忽略性（CIA）、共同支撑；逆概率加权（IPW）与广义倾向得分（多值处理） | **红线**：严禁匹配结果变量 $Y$ 的滞后项或受处理影响的“坏控制”；优先双重稳健估计（AIPW / DRDID） | Stata `psmatch2`/`pstest`/`drdid`；R `MatchIt`/`DRDID`；Python `DoWhy` |
| **7. 异质性处理效应（CATE / Uplift）** | 区分平均处理效应 ATE 与个体/条件异质效应 CATE；四象限敏感人群；Meta-Learners（**S / T / X / R-Learner**）与因果树/因果森林（Causal Tree / Causal Forest） | 超越“产权/规模/东中西”传统二分分组，发现非线性高维异质性并做策略定向 | R `grf::causal_forest`；Python [uber/causalml](https://github.com/uber/causalml) / [py-why/EconML](https://github.com/py-why/EconML) |
| **8. 双重机器学习（DML）与可解释性** | Robinson 部分线性模型 + **Neyman 正交性** + **样本交叉拟合（Cross-fitting）** 消除高维非线性控制与正则化偏误；评估看 AUUC/Qini；特征归因用 **SHAP** | 高维控制变量（含文本嵌入/高维固定效应）或 LLM 测量误差纠偏时极具威力 | Python [py-why/dowhy](https://github.com/py-why/dowhy) / [DoubleML](https://github.com/DoubleML/doubleml-for-py) / R `DoubleML` |

---

## 二、大面板与专利数据工程：算法复杂度避坑速查

处理百万级工商注册、专利 IPC、发明人姓名匹配、招聘文本清洗时，脚本卡死/爆内存 90% 源于复杂度失控：

| 常见科研数据卡死场景 | 低效写法（易卡死） | 高效工程替代 | 复杂度改善 |
|---|---|---|---|
| **逐件专利匹配企业/IPC 分类表** | 双重 `for` 循环逐行 `in list` 匹配 | 先将代码表转 **`dict` / `set` 哈希索引**或 `pandas.merge` / `data.table` 键连接 | $O(N \times M) \to O(N + M)$ |
| **滚动窗口 / 历史 5 年技术池去重** | 每年重新扫描全历史专利算新 IPC 占比 | 维护**滑动窗口集合/哈希计数**或先按 `(firm, year)` 排序增量更新 | $O(N^2) \to O(N \log N)$ |
| **专利引文网 / 供应链共享关联网络** | 构造稠密 $N \times N$ 邻接矩阵爆内存 | 用**邻接表 / 稀疏矩阵**（`scipy.sparse`）＋ BFS/DFS 计算一阶/二阶关联度 | 内存与耗时降数量级 |
| **重复子问题（如动态规划/文本编辑距离）** | 递归无缓存重复计算 | 记忆化搜索（`@lru_cache`）或向量化批处理（`numpy` / `SentenceTransformer` 矩阵点积） | 指数级 $\to$ 多项式/线性 |
| **批量文献/API 抽取防内存与 Token 溢出** | 全量结果塞进单次内存/单次 AI 对话 | **先落本地 SQLite 数据库**，建索引后按 SQL 切片读写与断点续跑 | 零丢数据、省 Token |
