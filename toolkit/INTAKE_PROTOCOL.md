# 科研工具库 · 防冗余脚手架与增量入库规范

> **设计目的**：随着资料、Prompt、开源仓库和实证技巧不断增加，平面大清单必定膨胀冗余。本规范通过 **“四层分离 + 单一真相源 + 唯一主阶段 + 折叠披露 + 脚本自动体检”**，确保工具库长期演进不腐化、且公开仓库零隐私与零本地路径泄露。

---

## 一、四层架构（各司其职）

| 层级 | 路径 | 职责 | 膨胀红线 |
|---|---|---|---|
| **Layer 0 总控入口** | `toolkit/README.md` | 唯一导航页：流程地图 + 10 秒卡点路由 + CLI 口令 | **硬上限 ≤ 200 行**，不堆长代码/长 Prompt |
| **Layer 1 流程工具卡** | `toolkit/stages/00-*.md` – `08-*.md` | 1-to-1 对齐 Emergence 8 阶段＋00 底座；做哪一步只读哪一张卡 | 顶栏只展 `W1`；长 Prompt、代码、MVP 沙盒邪修收进 `<details>` 折叠块 |
| **Layer 2 机器账本与脚手架** | `toolkit/registry/catalog.jsonl` ＋ `toolkit/scripts/toolkit_cli.py` | 唯一真相源（去重、赋权、路由）＋ 自动防冗余/防泄露体检 CLI | **一物一 ID**，同 URL/仓库只能登记一次 |
| **Layer 3 知识卡与冷归档** | `toolkit/knowledge/` ＋ `toolkit/archives/` | 长期方法论浓缩卡与全网开源仓库核验总表 | **冷存储**：AI 日常写作默认不读 `archives/`，选配查链接时再翻 |

---

## 二、防冗余与公开边界 5 条铁律

1. **唯一主阶段挂靠（Single Primary Stage）**：每条工具只在一个 `primary_stage`（`00`–`08`）写完整说明；跨阶段复用只放 1 行短指针，绝不重复粘贴。
2. **默认折叠披露（Progressive Disclosure）**：工具卡只把 `W1` 放明面，长文本、代码、探索期 `W2-MVP` 技巧收进 `<details>` 折叠抽屉。
3. **保护创新 MVP，同时锁死转正条件**：所有 `W2-MVP` 探索期沙盒邪修必须在 `catalog.jsonl` 带有明确 `promotion_rule`（进入正式投稿前如何转正）；运行 `route --strict` 可一键切为严格发表模式。
4. **Skills 精装不盲装**：多技能大仓（如数百/上千项集合）只抽装 2–4 个最高杠杆核心技能，其余只当字典查阅，防上下文膨胀与同指向冲突。
5. **零本机路径、零版权原文泄露**：公开仓库严禁写入个人主目录绝对路径、未公开草稿/私有数据路径、账号密钥或受版权保护的第三方完整讲义原文（仅保留原创提炼的方法论要点与公开可查链接）；由 `toolkit_cli.py check` 强制正则拦截。

---

## 三、未来增量入库 5 步标准流

```bash
# 1. 入库前先查重（防重复建项）
python3 toolkit/scripts/toolkit_cli.py validate-new --url "<仓库URL>" --name "<名称>"

# 2. 外部开源仓库必须先用 GitHub API 实测核验（查规范名、Star、更新日期、真实语言与用途，防标题党误标）

# 3. 追加登记到 toolkit/registry/catalog.jsonl，并只挂靠 1 个 primary_stage 更新对应 stages/0X-*.md

# 4. 完整仓库链接归入 toolkit/archives/github-repos-verified.md

# 5. 跑自动化健康、防冗余与防泄露体检（0 Errors 才可提交推送）
python3 toolkit/scripts/toolkit_cli.py check && python3 toolkit/scripts/toolkit_cli.py stats
```
