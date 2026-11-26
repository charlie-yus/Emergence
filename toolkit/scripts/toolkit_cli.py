#!/usr/bin/env python3
"""
Emergence Research Toolkit · Anti-Bloat Scaffold CLI (Zero-Dependency Python 3)

Commands:
  stats        : Summary dashboard by stage, weight, kind, and availability
  route        : Query W1/W2/W2-MVP tools by Emergence stage (00-08) or keywords
  check        : Verify zero duplicate IDs/URLs, zero broken internal links,
                 zero local machine path leaks, and master README line budget
  validate-new : Dry-run duplicate check before adding any new repo/tool
"""

import argparse
import datetime
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REGISTRY_DIR = ROOT / "registry"
CATALOG_PATH = REGISTRY_DIR / "catalog.jsonl"
INDEX_MD = ROOT / "README.md"
STAGES_DIR = ROOT / "stages"

VALID_STAGES = {
    "00": "AI协作底座与邪修分级",
    "01": "选题与对标",
    "02": "文献检索与精读",
    "03": "理论设计与假设推导",
    "04": "数据获取与LLM变量测度",
    "05": "实证分析与内生性稳健",
    "06": "论文写作与去AI味润色",
    "07": "审稿修改与证据链审计",
    "08": "排版定稿与答辩收尾",
}

VALID_WEIGHTS = {"W1", "W2", "W2-MVP", "W3", "W0"}
WEIGHT_ORDER = {"W1": 0, "W2": 1, "W2-MVP": 2, "W3": 3, "W0": 4}
MAX_INDEX_LINES = 200

# Strict portability / privacy leak guard for public GitHub repo (generic patterns only)
LEAK_PATTERNS = [
    re.compile(r"/Users/[A-Za-z0-9_.-]+"),
    re.compile(r"C:\\Users\\[A-Za-z0-9_.-]+"),
    re.compile(r"~/(?:Downloads|Desktop|Documents|Applications|\.claude|\.codex)/"),
    re.compile(r"\b(?:sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,})\b"),
]


def load_catalog():
    if not CATALOG_PATH.exists():
        return []
    items = []
    with CATALOG_PATH.open("r", encoding="utf-8") as f:
        for lineno, line in enumerate(f, 1):
            s = line.strip()
            if not s or s.startswith("#"):
                continue
            try:
                obj = json.loads(s)
                obj["_line"] = lineno
                items.append(obj)
            except json.JSONDecodeError as e:
                print(f"[ERROR] catalog.jsonl:{lineno} JSON parse failed: {e}", file=sys.stderr)
                sys.exit(1)
    return items


def norm_url(url: str) -> str:
    if not url:
        return ""
    u = url.strip().rstrip("/").lower()
    return re.sub(r"^https?://(www\.)?", "", u)


def cmd_stats(_args):
    items = load_catalog()
    by_stage = Counter(it.get("primary_stage", "?") for it in items)
    by_weight = Counter(it.get("weight", "?") for it in items)
    by_kind = Counter(it.get("kind", "?") for it in items)

    print(f"=== Emergence 科研工具库资产仪表盘 ({datetime.date.today().isoformat()}) ===")
    print(f"总注册条目数: {len(items)}")
    print("\n[按权重分布]")
    for w in ["W1", "W2", "W2-MVP", "W3", "W0"]:
        if by_weight[w]:
            print(f"  {w:7s}: {by_weight[w]:3d}")

    print("\n[按 Emergence 流程阶段分布]")
    for code, name in VALID_STAGES.items():
        print(f"  {code} {name:16s}: {by_stage[code]:3d}")

    print("\n[按类型分布]")
    for k, v in by_kind.most_common():
        print(f"  {k:16s}: {v:3d}")


def cmd_route(args):
    items = load_catalog()
    stage = args.stage
    query = (args.query or "").strip().lower()

    matched = []
    for it in items:
        w = it.get("weight", "W3")
        if w == "W0" and not args.include_banned:
            continue
        if w == "W3" and not args.all:
            continue
        if w == "W2-MVP" and args.strict:
            continue

        if stage:
            if it.get("primary_stage") != stage and stage not in it.get("secondary_stages", []):
                continue

        if query:
            hay = " ".join(
                [
                    it.get("id", ""),
                    it.get("name", ""),
                    it.get("summary", ""),
                    " ".join(it.get("tags", [])),
                    it.get("url", ""),
                ]
            ).lower()
            tokens = [t for t in re.split(r"\s+", query) if t]
            if not all(t in hay for t in tokens):
                continue

        matched.append(it)

    matched.sort(key=lambda x: (WEIGHT_ORDER.get(x.get("weight", "W3"), 9), -x.get("score", 0), x.get("id", "")))

    if stage and stage in VALID_STAGES:
        card = sorted(STAGES_DIR.glob(f"{stage}-*.md"))
        card_hint = str(card[0].relative_to(ROOT)) if card else "未建卡"
        print(f"=== 路由结果 · 阶段 {stage} ({VALID_STAGES[stage]}) | 对应工具卡: toolkit/{card_hint} ===")
    else:
        print(f"=== 路由结果 · 检索词: {query or '全部主力'} ===")

    print(f"命中 {len(matched)} 项（默认显 W1/W2/W2-MVP，加 --all 看 W3，加 --strict 隐藏探索期 MVP 邪修）：\n")
    for it in matched:
        loc = it.get("url") or it.get("repo_path") or "-"
        sec = f" (复用:{','.join(it['secondary_stages'])})" if it.get("secondary_stages") else ""
        print(
            f"- [{it.get('weight'):6s}|{it.get('score',0):2d}] **{it.get('id')} {it.get('name')}** "
            f"[{it.get('primary_stage')}{sec}]\n"
            f"  作用: {it.get('summary')}\n"
            f"  入口: {loc}"
        )


def cmd_check(_args):
    errors = []
    warnings = []
    items = load_catalog()

    seen_ids = {}
    seen_urls = {}
    seen_names = defaultdict(list)

    for it in items:
        line = it["_line"]
        iid = it.get("id")
        if not iid:
            errors.append(f"catalog.jsonl:{line} missing id")
        elif iid in seen_ids:
            errors.append(f"duplicate id `{iid}` (lines {seen_ids[iid]} & {line})")
        else:
            seen_ids[iid] = line

        if it.get("primary_stage") not in VALID_STAGES:
            errors.append(f"{iid}: invalid primary_stage `{it.get('primary_stage')}`")
        if it.get("weight") not in VALID_WEIGHTS:
            errors.append(f"{iid}: invalid weight `{it.get('weight')}`")

        u = norm_url(it.get("url", ""))
        if u:
            if u in seen_urls:
                errors.append(f"duplicate URL `{u}`: {seen_urls[u]} & {iid}")
            else:
                seen_urls[u] = iid

        seen_names[it.get("name", "").strip().lower()].append(iid)

        rp = it.get("repo_path", "")
        if rp:
            resolved = (ROOT / rp).resolve()
            if not resolved.exists():
                errors.append(f"{iid}: repo_path does not exist `{rp}`")

        if it.get("weight") == "W2-MVP" and not it.get("promotion_rule"):
            warnings.append(f"{iid}: W2-MVP item missing `promotion_rule`")

    for name, ids in seen_names.items():
        if name and len(ids) > 1:
            warnings.append(f"duplicate name `{name}`: {ids}")

    if not INDEX_MD.exists():
        errors.append("missing toolkit/README.md")
    else:
        lines = INDEX_MD.read_text(encoding="utf-8").splitlines()
        if len(lines) > MAX_INDEX_LINES:
            warnings.append(f"toolkit/README.md has {len(lines)} lines (> {MAX_INDEX_LINES} budget)")

    for code in VALID_STAGES:
        matches = list(STAGES_DIR.glob(f"{code}-*.md"))
        if len(matches) != 1:
            errors.append(f"stage {code} must have exactly 1 card, found {len(matches)}")

    link_re = re.compile(r"\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)")
    for md in ROOT.rglob("*.md"):
        txt = md.read_text(encoding="utf-8", errors="ignore")
        for m in link_re.finditer(txt):
            target = m.group(1).strip()
            if not target or target.startswith(("http://", "https://", "mailto:", "file://")):
                continue
            resolved = (md.parent / target).resolve()
            if not resolved.exists():
                errors.append(f"broken link: {md.relative_to(ROOT)} -> `{target}`")
        for pat in LEAK_PATTERNS:
            hit = pat.search(txt)
            if hit:
                errors.append(f"local path/privacy leak in {md.relative_to(ROOT)}: `{hit.group(0)}`")

    if CATALOG_PATH.exists():
        raw_cat = CATALOG_PATH.read_text(encoding="utf-8")
        for pat in LEAK_PATTERNS:
            hit = pat.search(raw_cat)
            if hit:
                errors.append(f"local path/privacy leak in registry/catalog.jsonl: `{hit.group(0)}`")

    print("=== Emergence Toolkit Health & Portability Check ===")
    print(f"Catalog items: {len(items)} | Errors: {len(errors)} | Warnings: {len(warnings)}")
    for e in errors:
        print("  [ERROR]", e)
    for w in warnings:
        print("  [WARN] ", w)
    if not errors and not warnings:
        print("OK: zero duplicates, zero broken links, zero local-path leaks, line budget healthy.")
    sys.exit(1 if errors else 0)


def cmd_validate_new(args):
    items = load_catalog()
    u = norm_url(args.url or "")
    name = (args.name or "").strip().lower()
    hits = []
    for it in items:
        if u and norm_url(it.get("url", "")) == u:
            hits.append(("URL duplicate", it))
        elif name and name in it.get("name", "").lower():
            hits.append(("Name match", it))
    if hits:
        print(f"Found {len(hits)} possible duplicates:")
        for reason, it in hits:
            print(f"  - [{reason}] {it['id']} | {it['name']} | stage {it['primary_stage']}")
        sys.exit(2)
    print("OK: no duplicates found.")


def main():
    p = argparse.ArgumentParser(description="Emergence Research Toolkit Anti-Bloat CLI")
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("stats", help="Show toolkit inventory dashboard")

    pr = sub.add_parser("route", help="Route tools by stage or keyword")
    pr.add_argument("--stage", choices=list(VALID_STAGES.keys()))
    pr.add_argument("--q", "--query", dest="query")
    pr.add_argument("--all", action="store_true")
    pr.add_argument("--strict", action="store_true")
    pr.add_argument("--include-banned", action="store_true")

    sub.add_parser("check", help="Check duplicates, links, leaks, and line budget")
    pv = sub.add_parser("validate-new", help="Dry-run duplicate check")
    pv.add_argument("--url")
    pv.add_argument("--name")

    args = p.parse_args()
    {
        "stats": cmd_stats,
        "route": cmd_route,
        "check": cmd_check,
        "validate-new": cmd_validate_new,
    }[args.cmd](args)


if __name__ == "__main__":
    main()
