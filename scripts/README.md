# GitHub 数据同步

安装依赖：

```bash
pip install requests
```

运行：

```bash
python scripts/sync_github.py
```

脚本读取仓库根目录 `catalog_auto.csv`，自动生成：

`miniprogram/data/standards.js`

以后 GitHub 标准库更新后，重新运行一次即可把最新目录带入小程序。
