# 阶段 08｜排版定稿、出表制图规范、答辩拷问与归档边界

> **对应 Emergence 流程**：**阶段 8 · 定稿（第 16–17 步）** ｜ **核心目标**：Word/LaTeX 版面一次过审零乱码、三线表与统计图达顶刊颜值、答辩高频拷问对答如流、严守论文私有桶归档边界。
> *注：本工具库聚焦论文研究、实证与写作本身，不收录第三方 PPT/演示类扩展技能。*

---

## 一、W1 核心必调（排版、制图与核对工程规范）

| 编号 | 工具 / 脚本 / Skill | 权重 | 核心作用 | 公开入口 / 实操方式 |
|---|---|---:|---|---|
| **C02** | **PDF 文本抽检脚本 极速全页视觉筛查** | **W1 (93)** | 3 秒扫 PDF / 10 秒转 Word，16 页缩略总览 + 异常页高清图 + 缺字报警（推荐独立安装的最新 LibreOffice 批转 PDF 配合缩略图总览核查版面） | 先核 PDF 抽字无缺失→意见回源稿正则核真伪 |
| **X01** | **Mac→Windows 字体伪装术** | **W1 (92)** | docx XML 显式写入 Windows 通用字体名（`宋体`/`Times New Roman`），切忌拿 Mac Pages 预览代替 Windows Word 终验 | [Emergence-assets/word-tools/](https://github.com/charlie-yus/Emergence-assets/tree/main/word-tools) |
| **X03** | **模板锁句锁数构建链（`@@R 行号@@`）** | **W1 (94)** | 改文或重排 Word 时锁死原句与表格数字，完成后必跑 `check_numbers.py` 逐位核验 | [Emergence-assets/word-tools/](https://github.com/charlie-yus/Emergence-assets/tree/main/word-tools) |
| **C03** | **统一绘图样式与防压线碰撞检查** | **W1 (90)** | 统一字体与字号、集中管理图号、自动防文字压线重叠、极简黑白框架图 | Python/matplotlib 统一字体、分图号与防压线检查 |
| **C04** | **CSV 直出标准三线表** | **W2 (88)** | 从结果 CSV 自动生成 Markdown 三线表，彻底分离表格设计与排版 | 脚本由结果 CSV 直出三线表（或 Stata `esttab`） |
| **S10** | `wuhan-college-thesis-latex` ＋ `doc-pdf/docx/xlsx` | **W2 (85)** | 文经管通用 LaTeX 模板 ＋ 推荐开源 Skill： 科研 PDF/Word/Excel 处理 3 技能（已排除同仓 `pptx`） | [Emergence-assets/skills/wuhan-college-thesis-latex](https://github.com/charlie-yus/Emergence-assets/tree/main/skills/wuhan-college-thesis-latex) ＋ [document-SKILLs](https://github.com/appautomaton/document-SKILLs) |

---

## 二、实证出表、学术制图与 Word/LaTeX 定稿必查规则

1. **三线表汇报必查（XHS `#005/#007/#031/#043/#265`）**：
   - 全文统一三线表；同类单元格合并；表注写清括号内为聚类 SE 及聚类层级、显著性星号、FE 勾选行、IV 第一阶段 F / KP rk Wald F / Hansen J p 值；
   - 交错 DID 交代 Overall ATT 聚合权重并将 `ATT(g,t)` 矩阵放附录；连续 DID 汇报联合置信带 `cband` 与尾部稀疏说明。
2. **Word 多轮返修防混乱铁律（XHS `#079/#080`）**：
   - 开始新一轮修改前**必须先清理/接受上一轮修订痕迹**，本轮仅标色本轮修改；交付前逐页核对正文最终页码行号与回复信引用完全一致，每版独立归档。
3. **LaTeX 模板编译防 AI 编数（XHS `#092`）**：未提供数字、基线或引用一律输出 `[TODO]` 占位符，严禁填数。
4. **LLM 方法段/附录定稿必备项（XHS `#075`）**：交代精确模型快照版本名、调用日期、切分与随机种子、独立人工验证集一致率/κ/混淆矩阵、两轮稳定性；标签手册 v1→v2 放附录 A，完整 Prompt 与脚本放附录 B。
5. **版本冻结与隐私备份边界**：
   - 每次交付前先归档上一版只读副本再覆盖，严禁直接覆盖唯一终稿；
   - 原始数据、涉密问卷、论文全文、学号与 API 密钥只留本地或私有加密备份，**严禁提交到公开 GitHub 仓库**。

---

## 三、组会与毕业答辩 5 大高频灵魂拷问“满分接招表”（XHS `#001/#005/#020/#044/#075/#281`）

| 高频拷问 | 致命踩坑反应 | 满分接招骨架 |
|---|---|---|
| **1. “你这模型有内生性，怎么处理？”** | 慌答“我去补个 IV”或报一串方法名堆砌 | **定来源 → 亮 1–2 招 → 讲边界**：区分 OVB/反向因果/测量误差/选择，对症亮法（OVB→高维 FE+Oster；测量误差→衰减偏误属保守下界） |
| **2. “政策分批落地还用 TWFE？不怕负权重？”** | 答“已加个体和年份 FE” | **验毒＋多法互证**：报 `bacondecomp` 禁忌权重占比 → 亮 `csdid` + `eventstudyinteract`/`did_imputation` 一致结果 → 交代 `never`/`notyet` 对照池 |
| **3. “事前第 `t=-3` 期擦边显著，平行趋势废了吧？”** | 沉默或偷删年份/换基期 | **概率事实＋合规三板斧**：事前 5 期天然 22.6% 假阳性 → 换 `csdid` 排 TWFE 污染 → 亮 `honestdid` 崩溃点边界（$\bar{M}=1.0$ 不跨 0）＋前定特征×年份联合 F 检验 |
| **4. “你的大模型打分能信吗？不是黑箱？”** | 答“GPT 很准直接跑的” | **7 步可审计证据链**：公开标签手册、锁模型快照与 `temp=0`、独立人工验证集 κ/混淆矩阵、两轮稳定性、多模型/多 Prompt 边界及 DSL 误差校正讨论 |
| **5. “框架图里怎么看不出要检验什么？”** | 只指变量框念概念 | 按“构念—变量—假设”三层画实/虚线与假设编号，每条假设后直接口播对应计量方程与检验系数 |

---

## 四、可折叠：Stata 顶刊级出表（`esttab`）与制图（`coefplot` / 安慰剂双轴图）美化模板

<details>
<summary><b>▶ 点击展开：esttab 三线表 / 四估计量错位事件研究图 / 空间安慰剂双轴图代码（XHS #046/#260/#266/#290/#291）</b></summary>

```stata
* === 1. esttab 一键输出 Word/RTF 规范三线表 (#046, #266) ===
esttab main_h1 mech_a mech_b mod_h2 using "Table_Main.rtf", ///
    replace se star(* 0.10 ** 0.05 *** 0.01) b(3) se(3) ///
    title("表1：主效应、机制与调节检验") stats(N r2_a, fmt(0 3)) ///
    labels("观测数" "调整R²") nogap compress

esttab m_twfe m_cs m_sa m_bjs, b(3) se(3) star(* 0.1 ** 0.05 *** 0.01) ///
    mtitles("TWFE" "CS" "SA" "BJS")

* === 2. 顶刊颜值：四估计量同图错位对比事件研究图 (#266, #260, #290) ===
coefplot (m_twfe, offset(-0.15) msymbol(O)) (m_cs, offset(-0.05) msymbol(D)) ///
         (m_sa,   offset( 0.05) msymbol(T)) (m_bjs, offset( 0.15) msymbol(S)), ///
         vertical keep(event*) yline(0, lp(solid) lc(black)) ///
         ciopts(recast(rcap) lw(thin)) ///
         plotregion(style(none)) graphregion(color(white)) scheme(s1mono) ///
         title("交错DID四估计量动态效应对比")

* === 3. 空间安慰剂：核密度 + P值双轴极简出版图 (#291, #260) ===
* 注：避免 didplacebo 默认灰底/英文标签锁字体，可加 frame(pl_res) nofigure 导出数据后重绘 (#267/#273)
twoway (kdensity coef1, yaxis(2) lc(black)) ///
       (scatter pvalue1 coef1, msymbol(smcircle_hollow) mcolor(gs8) yaxis(1)), ///
       xline(0.125, lp(shortdash) lc(black)) yline(0.1, lp(dash) lc(gs6)) ///
       xlabel(, nogrid format(%4.2f)) plotregion(style(none)) graphregion(color(white))
```

</details>
