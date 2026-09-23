# 测绘地信微信小程序 / CeHuiDiXin WeChat Mini Program

[中文](#中文说明) · [English](#english)

## 中文说明

**测绘地信**是一款面向测绘、GIS 与自然资源业务的微信小程序。V1.0.0 采用轻量化、无云开发架构，标准规范与法律法规目录随小程序发布，收藏和最近浏览保存在本机。

### 主要功能

- 自然资源技术标准、规范及法律法规查询
- 收藏、最近浏览与资料检索
- GitHub 原文件页面访问
- 度分秒转换、面积换算、比例尺计算
- 高斯分带、中央经线、EPSG 查询
- 两点距离、方位角、坡度等常用测绘计算
- 微信原生标准地图与卫星影像
- Esri World Imagery、OpenStreetMap 辅助查看
- 高德官方静态地图（可选，需用户自行申请 Web 服务 Key）
- 地图定位、地图选点、坐标复制与位置分享

### 开源与敏感配置

本仓库**不包含真实 AppID、AppSecret、API Key、Token 或其他私人凭据**。

公开默认配置位于：

```text
miniprogram/config.js
```

如需本地配置公众号原始 ID 或高德 Web 服务 Key：

1. 将 `miniprogram/config.local.example.js` 复制为 `miniprogram/config.local.js`；
2. 在 `config.local.js` 中填写自己的配置；
3. `config.local.js` 已加入 `.gitignore`，请勿提交到公开仓库。

示例：

```js
module.exports = {
  officialAccountUsername: 'gh_xxxxxxxxxxxx',
  amapWebKey: 'YOUR_AMAP_WEB_SERVICE_KEY'
}
```

> 微信小程序 AppSecret 等服务端密钥不应放入前端小程序代码中。

### 导入微信开发者工具

1. 克隆或下载本仓库；
2. 微信开发者工具中选择“导入项目”；
3. 选择仓库根目录；
4. `project.config.json` 默认使用 `touristappid`，请在本地开发环境中使用你自己的小程序 AppID；
5. 如使用第三方网络资源，请按微信公众平台要求配置合法域名，并遵守对应数据/服务提供方条款。

### 图源说明

- **微信原生地图 / 卫星影像**：使用微信小程序 `<map>` 组件。
- **Esri World Imagery**：用于辅助浏览，使用时应遵守 Esri 相关服务条款。
- **OpenStreetMap**：用于道路、地名和位置辅助查看，使用时遵守 OSM Tile Usage Policy 与署名要求。
- **高德地图**：仅通过官方静态地图 Web 服务接口接入，Key 由使用者自行申请并保管。
- **腾讯地图**：当前通过微信原生地图及 `wx.openLocation` 使用腾讯体系地图能力。

### 版本

当前开源版本：**V1.0.0**

### 许可证

本项目采用 **GNU General Public License v3.0 (GPL-3.0)**。

---

## English

**CeHuiDiXin** is a WeChat Mini Program for surveying, GIS and natural-resources workflows. Version 1.0.0 uses a lightweight architecture without cloud development. Standards/law catalog data are bundled with the app, while favorites and recent history are stored locally.

### Features

- Natural-resources standards, specifications and laws lookup
- Search, favorites and recent history
- Links to original files on GitHub
- DMS conversion, area conversion and map-scale calculation
- Gauss–Krüger zone, central meridian and EPSG lookup
- Distance, bearing, slope and other surveying utilities
- WeChat native standard/satellite maps
- Esri World Imagery and OpenStreetMap viewing
- Optional AMap official Static Map API using the user's own Web Service Key
- Location, map point selection, coordinate copy and location sharing

### Security

No real AppID, AppSecret, API key, token or private credential is included in this repository. Copy `miniprogram/config.local.example.js` to `miniprogram/config.local.js` for local-only configuration. The local file is excluded by `.gitignore`.

### License

GNU General Public License v3.0 (GPL-3.0).

## Author

**Zhang Y.H.** · GitHub [@zhangyhrs](https://github.com/zhangyhrs)
