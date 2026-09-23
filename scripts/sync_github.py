#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从 GitHub 仓库 catalog_auto.csv 生成微信小程序 standards.js。
依赖：pip install requests
用法：
    python scripts/sync_github.py
"""
from pathlib import Path
import csv, io, json, re, requests, hashlib

RAW = "https://raw.githubusercontent.com/zhangyhrs/Natural-Resources-Standards-and-Specifications/main/catalog_auto.csv"
OUT = Path(__file__).resolve().parents[1] / "miniprogram" / "data" / "standards.js"

PREFIX = {
    "GBT":"GB/T","CHT":"CH/T","CHZ":"CH/Z","TDT":"TD/T","DZT":"DZ/T",
    "HYT":"HY/T","LYT":"LY/T","NYT":"NY/T","SLT":"SL/T","CJJT":"CJJ/T"
}

def norm(s):
    return re.sub(r"[^A-Za-z0-9.]", "", s or "").upper()

def parse_name(filename):
    base = re.sub(r"\.[^.]+$", "", filename)
    m = re.match(r"^([A-Za-z]+)\s*([\d.]+-\d{4})\s+(.+)$", base)
    if not m:
        return "", base, None
    p, no, name = m.groups()
    code = f"{PREFIX.get(p.upper(), p.upper())} {no}"
    y = re.search(r"-(\d{4})$", no)
    return code, name, int(y.group(1)) if y else None

def main():
    r = requests.get(RAW, timeout=60)
    r.raise_for_status()
    text = r.content.decode("utf-8-sig")
    rows = list(csv.DictReader(io.StringIO(text)))
    items = []
    for i,row in enumerate(rows,1):
        kind=row.get("资料类型","").strip()
        c1=row.get("一级分类","").strip()
        c2=row.get("二级分类","").strip()
        c3=row.get("三级分类","").strip()
        fn=row.get("文件名","").strip()
        ext=row.get("扩展名","").strip()
        path=row.get("相对路径","").strip()
        code,name,year=parse_name(fn)
        ccode = c1.split()[0] if kind=="标准规范" and re.match(r"^[A-Z]{2}\d-", c1) else ""
        cname = c1[len(ccode):].strip() if ccode else c1
        sid = hashlib.sha1(path.encode("utf-8")).hexdigest()[:16]
        enc_path = requests.utils.quote(path, safe="/")
        items.append({
          "id": sid, "type":kind, "code":code, "codeNormalized":norm(code),
          "name":name, "categoryCode":ccode, "categoryName":cname,
          "level2":c2, "level3":c3, "fileName":fn, "ext":ext, "path":path, "year":year,
          "repoUrl":f"https://github.com/zhangyhrs/Natural-Resources-Standards-and-Specifications/blob/main/{enc_path}",
          "rawUrl":f"https://raw.githubusercontent.com/zhangyhrs/Natural-Resources-Standards-and-Specifications/main/{enc_path}",
          "keywords":[x for x in [cname,c2,c3] if x]
        })
    OUT.write_text("module.exports = " + json.dumps(items,ensure_ascii=False,indent=2),encoding="utf-8")
    print(f"同步完成：{len(items)} 条 -> {OUT}")

if __name__ == "__main__":
    main()
