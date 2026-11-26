# 阶段 05｜实证分析、交错/连续 DID、内生性、机制与代码自动化

> **对应 Emergence 流程**：**阶段 5 · 分析（第 8–9 步）** ｜ **核心目标**：交错 DID 零负权重误判、平行趋势合规过关、内生性精准对症不堆砌、本地真统计引擎跑数零幻觉。
> **关联底库**：[因果推断与算法速查卡](../knowledge/causal-ab-and-algo-cheatsheet.md)（PSM/IPW/Uplift/DML/网络效应）｜[顶刊核心方法精要卡](../knowledge/top-journal-methods-brief.md)（内生性三件套 + 平行趋势 4 招）。

---

## 一、W1 核心必调（经管实证核心 Skills 与统计生态）

| 编号 | 工具 / Skill / 包 | 权重 | 核心作用 | 开源入口 / 做法 |
|---|---|---:|---|---|
| **S-05a** | `econometrics-skill`（XHS `#073`） | **W1 (94)** | 推荐开源 Skill：17 种因果推断方法（OLS/PSM/IV/DID/RDD），含中文指南 `SKILL.zh-CN.md` | [xiaomihu1992/econometrics-skill](https://github.com/xiaomihu1992/econometrics-skill) |
| **S-05b** | `stata-idiomatic` ＋ `stata-ai-fusion` | **W1 (93)** | 推荐开源 Skill：地道 Stata 语法＋内置 `reghdfe`/`coefplot`/`gtools`/出表/防错参考库 | [dylantmoore/stata-skill](https://github.com/dylantmoore/stata-skill) ＋ [stata-ai-fusion](https://github.com/haoyu-haoyu/stata-ai-fusion) |
| **S-05c** | `statspai-analysis` ＋ `aers-stata/r/python-pipeline` | **W1 (95)** | 推荐开源 Skill：Stanford REAP 实证全流程（覆盖 DID/IV/RD/SCM/DML 及 R/Stata/Python 三栈） | [Auto-Empirical-Research-Skills](https://github.com/brycewang-stanford/Auto-Empirical-Research-Skills) ＋ [StatsPAI](https://github.com/brycewang-stanford/StatsPAI) |
| **S-05d** | `pedro-data-analysis` | **W1 (91)** | 推荐开源 Skill：CSDID 作者 Pedro Sant'Anna 亲写实证数据分析工程规范 | [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow) |
| **T05** | R 因果生态（`fixest`/`did`/`DRDID`/`HonestDiD`/`CVXR`） | **W1 (92)** | R 计量核心包生态（含 `lavaan`/`semTools`） | R 安装：`fixest`/`did`/`DRDID`/`HonestDiD`/`CVXR` |
| **C06** | 独立复现脚本与“Python 探路＋Stata 复跑”双轨法 | **W1 (90)** | 先复现主表逐位一致再做扩展；**严禁让 AI 裸手写 numpy 假回归或口头报数**（XHS `#014/#071/#073`） | 独立脚本先复现主表逐位一致再做扩展 |

> **IDE + Stata MCP 扩展（W2）**：`hanlulong/stata-mcp`（★532，VS Code/Cursor/Antigravity 插件，SSE `localhost:4000/mcp`，XHS `#069`）与 `SepineTam/mcp-for-stata`（★285，安全优先版）；**防坑**：必核 `.do`/`.log`，且在 Prompt 中**严禁使用 `capture` / `if _rc == 0` 静默吞错**（`#072`）。

---

## 二、五大实证核心卡点标准解法（高密度速查）

### 1. 交错 DID 决策流（先验毒再上桌，XHS `#264/#266/#268/#282/#298`）
1. 跑 TWFE 基线 → 跑 `bacondecomp y treat, ddetail` 验禁忌比较（Later vs Earlier）权重：**`<10%` 可控、`10–20%` 建议换、`>20%`（或负权重和 `>15%`）必须换新估计量为主表**。
2. 按数据结构选型：
   - 标准吸收性（有 never-treated）→ **`csdid` / `csdid2`**（`gvar=0` 表未处理，**绝不设 `-1/999`**；never-treated `<10%` 时加 `notyet`）＋ **`eventstudyinteract`**（SA，看干净事件研究图）＋ **`did_imputation`**（BJS，最高效率稳健性互证）；
   - 全部最终都被处理（无 never-treated）→ `csdid ..., notyet` 或陈强截断法（把最后处理组视为 never-treated 并截去其生效年起样本，须交代最后批次占比风险，`#028`）；
   - 处理可逆（1→0）或时变连续剂量 → **`did_multiplegt_dyn`**（dCDH，`#024/#268`）；
   - 时不变连续剂量 DID → R 官方 `contdid` / Stata 开源 `github.com/niuniuhaoyu/contdid`（`#024/#031`；**核心区分**：弱平行趋势只识水平效应 $ATT(d|d)$，边际斜率 $ACRT(d)$ 需强平行趋势！）。

### 2. 平行趋势检验不通过 / 擦边显著的合规 4 步解（XHS `#020/#254/#256/#258/#293/#295`）
1. **排假阳性**：事前 5 期逐期 5% 检验天然有 **22.6%** 假阳性，必看**事前联合 F 检验**；
2. **切异质性稳健估计量**：换 `csdid` / `eventstudyinteract` 清除 TWFE 跨期污染，大量“假翘头”会直接回落 0 线；
3. **HonestDiD 敏感性崩溃点（顶刊必杀）**：报相对幅度 $\Delta^{RM}(\bar{M})$ 与平滑度 $\Delta^{SD}(M)$ 的 95% 稳健置信区间（通常 $\bar{M}=1.0$ 仍不跨 0 即强过关，`#020/#258/#295`）；
4. **结构替代路线**：单处理单位切 **SCM（`synth`+`synth_runner`）**；多处理交错切 **部分池化交错 SCM（R `augsynth` `#283`）** 或 **合成 DID（`sdid`）**；特征失衡上 **PSM-DID / 熵平衡**（**严禁匹配 $Y$ 滞后项或坏控制**，要求标准化偏差 `<10%` 且 $p>0.1$，`#009/#274`）；政策门槛操纵上 **Bunching-DID**（`#030`）。

### 3. 安慰剂检验规范与致命跨层级坑（XHS `#267/#273/#291`）
- **时间安慰剂**（`pbotime`）：**必须删除真实处理后样本**防污染，覆盖全部处理前期；
- **空间安慰剂**（`pbounit`，建议 `repeat(1000)`）：看真实系数是否落在安慰剂系数分布尾部（**不要求安慰剂均值≈0，不用 p 值分布直接推断**）；
- **⚠️ 跨层级致命坑（`#267/#273`）**：政策冲击在城市/省层面、面板数据是企业层面时，**禁止直接对企业面板跑 `didplacebo ..., pbounit`**！必须手写循环按城市层面随机抽伪试点城市再 `merge 1:m` 回企业面板。

### 4. 内生性精准治理（先定来源＋偏误方向，禁堆全家桶，XHS `#001/#006/#008/#255`）
- **OVB**：升级高维交互 FE（`ind#year` / `prov#year`）＋ Oster 系数稳定性 `psacalc delta x`（$|\delta|>1$，注意仅用于 OLS 不能替代 IV）；
- **反向因果**：滞后一期 $X_{t-1}$ ＋ **Lead 安慰剂 $X_{t+1}$ 回归 $Y_t$**（不显著作辅助佐证，须 `xtset` 后用 `L.x`/`F.x` 防缺年错位）；
- **顶刊 IV 梯队**：首选**海外同行业/职业外生映射 IV**（美机器人/数字风险/Felten-LLM `#059/#065/#101`）、**Leave-One-Out Bartik IV**（必报 Rotemberg 权重 `#014`）、**历史 GIS/自然事件 IV**（近代电报局/活动当日降雨 `#078/#125`）；无外部 IV 时用 **Lewbel 异方差 IV**（先做 `hettest, rhs`，面板用 `ivlewfe`）作稳健性补充；必报 **KP rk Wald F**（弱 IV 时补 **AR 区间 / LIML / Fuller-k**）与 **Hansen J**；
- **边界**：因变量为“真实 0”时**禁套 Heckman**（`#007`）；系统 GMM `xtabond2` 必过 `AR(2) p>0.1` + `Hansen J p>0.1`；无完美外生冲击时走 **负对照 / 外部安慰剂 + 同期政策赛马 + 零成本三维下沉（`X05`）**。

### 5. 机制检验、反向调节与异质性（XHS `#029/#065/#078/#002/#003`）
- **机制纠偏（`#029`）**：弃用温忠麟三步法；江艇（2022）核心是聚焦 $X \to M$ 因果识别且要求 $M \to Y$ 有高度显明理论共识；两阶段 $\hat{M} \to Y$ 严格要求单一排他机制不可多渠道乱套；**最稳组合＝直接微观机制代理 $X \to M$ ＋ 机制预测的初始特征交互项 $X \times Z$**（后者诚实定性为条件渠道证据）。
- **反向调节（补位/雪中送炭）**：负向交互常代表资源弱/分工低/生态缺口组获益更大（如《财经研究》2025 `#065`、*SMJ* 2025 `#078`）。
- **异质性硬规**：分组回归**禁止只看“一组显著一组不显著”下结论**，必须报 **`suest` / 全交互 Chow / 费舍尔组合检验**（高维 FE 用费舍尔）；分组变量须为处理前特征。

---

## 三、可折叠：Stata / R 一键复用代码库（含排坑勘误）＋ 探索期 MVP 抽屉

<details>
<summary><b>▶ 点击展开：Stata 生态一键安装 ＋ 交错 DID / HonestDiD / SCM / 安慰剂 / IV-Lewbel-Oster 速查代码</b></summary>

```stata
* === 0. 核心包安装（按需勾选）===
* ssc install ftools reghdfe avar coefplot event_plot bacondecomp drdid csdid csdid2 ///
*     eventstudyinteract eventstudyweights did_imputation did_multiplegt_dyn did2s jwdid ///
*     stackedev honestdid synth synth_runner psacalc ivreg2, replace
* net install ivlewfe, from("https://raw.githubusercontent.com/woahidmurad/ivlewfe/main/") replace
* 连续处理DID Stata包: https://github.com/niuniuhaoyu/contdid

* === 1. 交错 DID 诊断 + CS + SA + BJS 标准流 ===
xtset id year
gen gvar = first_treat
replace gvar = 0 if missing(gvar)                     // 未处理组必设为0（勿设-1/999）
gen treat = (gvar > 0) & (year >= gvar)
gen never_t = (gvar == 0)

reghdfe y treat $X, absorb(id year) vce(cluster id)
bacondecomp y treat, ddetail                          // 查 Later vs Earlier 权重

csdid y $X, ivar(id) time(year) gvar(gvar) method(dripw)  // 无never-treated时加 notyet
estat simple
estat event, window(-5 5) estore(es_cs)
csdid_plot

eventstudyinteract y pre5 pre4 pre3 pre2 post0-post5, ///
    cohort(gvar) control_cohort(never_t) covariates($X) absorb(id year) vce(cluster id)

gen gvar_bjs = gvar if gvar > 0                       // BJS 要求未处理组为缺失(.)
did_imputation y id year gvar_bjs, horizons(0/5) pretrends(5) autosample

* === 2. HonestDiD 敏感性（先 mat list e(b) 核对列序号！）===
reghdfe y pre4 pre3 pre2 post0-post3 $X, absorb(id year) vce(cluster id)
mat list e(b)
honestdid, pre(1/3) post(4/7) mvec(0(0.5)2) coefplot
honestdid, pre(1/3) post(4/7) delta(sd) mvec(0(0.005)0.04) coefplot

* === 3. 内生性三件套 + IV + Lewbel + 组间差异 ===
reghdfe y x $X, absorb(firm year ind#year) vce(cluster firm)
psacalc delta x                                       // Oster |δ|>1
reghdfe y F.x $X, absorb(firm year) vce(cluster firm) // Lead 安慰剂(用F.x防缺年错位)
ivreghdfe y $X (x = z1), absorb(firm year) endog(x) first cluster(firm)
hettest, rhs                                          // Lewbel 前提：检验异方差
ivlewfe y $X (x = external_IVs), fe(firm year) cluster(firm) first small

* === 4. 同层级安慰剂（城市政策+企业样本请勿直接跑 pbounit！）===
reghdfe y did $X, absorb(id year) vce(cluster id)
estimates store did_main
didplacebo did_main, treatvar(did) pbotime(1(1)5) nodrop
didplacebo did_main, treatvar(did) pbomix(3) rantimescope(2012 2020) seed(1)
```

```r
# R: Callaway-Goodman-Bacon-Sant'Anna 官方连续处理 DID (contdid, #031)
library(contdid)
fit <- cont_did(yname="Y", tname="year", idname="id", dname="D", gname="G", data=p,
                target_parameter="level", aggregation="dose", treatment_type="continuous",
                dose_est_method="cck", control_group="nevertreated",
                bstrap=TRUE, cband=TRUE, biters=1000)
ggcont_did(fit, type="att")
# R 交错部分池化合成控制: augsynth (github.com/ebenmichael/augsynth, #283)
```

</details>

<details>
<summary><b>▶ 点击展开：探索期 MVP 沙盒邪修抽屉（W2-MVP · 试水找信号用，附转正红线）</b></summary>

- **① 快速多维规格雷达扫描（`MVP-01`）**：先批量扫 `Y口径 × FE × 滞后期 × 切片` 摸清信号在哪，**转正条件**：正式稿画完整 **Specification Curve**（`#070`），严禁单挑显著列。
- **② 事前趋势分箱 / 时点试探 / 两步去趋势诊断（`MVP-04`）**：快速诊断事前偏离是提前泄露还是稳定斜率；**转正条件**：正式稿以 `csdid` + `honestdid` 为主，两步去趋势仅与原图并排做敏感性补充（`#254/#256/#257`），**严禁做事前均值平移“美妆”（W0）**。
- **③ 同行业 LOO-IV / 面板 Lewbel IV 试水（`MVP-05`）**：快速探测内生性偏误方向；**转正条件**：冲顶刊时退居稳健性附表，主识别补外部冲击/精选 IV 或切替代解释矩阵。
- **④ 平行趋势擦边显著急救 Prompt（`#020`）**：将原始 do 文件贴给 AI，让它同时输出 `eventstudyinteract/csdid` + `honestdid` + `c.base_x#i.year` 三选一脚本＋250 字《经济研究》风格客观讨论＋英文 Referee Response。

</details>
