# CeHuiDiXin WeChat Mini Program

**Surveying · GIS · Natural Resources · Practical Geospatial Tools**

[**🇺🇸 English**](./README.md) · [🇨🇳 中文](./README_CN.md)

---

## About

**CeHuiDiXin** is a lightweight WeChat Mini Program for surveying, GIS and natural-resources workflows. Version **V1.0.0** does not depend on cloud development. Standards and regulation catalog data are bundled with the Mini Program, while favorites and recent history are stored locally on the user's device.

## Features

- Natural-resources standards, specifications and regulations lookup
- Search, favorites and recent browsing history
- Links to original files hosted on GitHub
- DMS conversion, area conversion and map-scale calculation
- Gauss–Krüger zone, central meridian and EPSG lookup
- Distance, bearing, slope and other surveying utilities
- WeChat native standard and satellite maps
- Esri World Imagery and OpenStreetMap viewing
- Optional AMap official Static Map service
- Location, map point selection, coordinate copy and location sharing

## Open-source configuration

The public source package is prepared for open-source release and does not include private credentials.

Optional local configuration should be kept outside the tracked source files. For local development, copy:

```text
miniprogram/config.local.example.js
```

to:

```text
miniprogram/config.local.js
```

Then fill in only the configuration required by your own environment. `config.local.js` is excluded by `.gitignore` and should not be committed to a public repository.

The default `project.config.json` uses `touristappid`. Developers should use their own Mini Program AppID locally in WeChat DevTools.

## Map sources

- **WeChat native map / satellite imagery** — based on the Mini Program `<map>` component.
- **Esri World Imagery** — used for auxiliary imagery viewing. Users should follow the applicable Esri service terms.
- **OpenStreetMap** — used for roads, place names and location reference. Users should follow the OSM Tile Usage Policy and attribution requirements.
- **AMap** — uses the official Static Map Web Service when configured locally.
- **Tencent map capabilities** — accessed through WeChat native map functions and `wx.openLocation`.

## Import into WeChat DevTools

1. Clone or download this repository.
2. Open WeChat DevTools and choose **Import Project**.
3. Select the repository root directory.
4. Configure your own Mini Program AppID locally if needed.
5. Configure any required legal request domains in the WeChat Mini Program admin console.
6. Test map, location and third-party network functions on a real device before release.

## Version

Current open-source version: **V1.0.0**

## License

This project is released under the **GNU General Public License v3.0 (GPL-3.0)**.

## Follow & Connect

<table>
  <tr>
    <th width="33.33%">WeChat Official Account<br>微信公众号：测绘地信</th>
    <th width="33.33%">WeChat Mini Program<br>微信小程序：测绘地信</th>
    <th width="33.33%">Knowledge Planet<br>知识星球：测绘地理信息共享中心</th>
  </tr>
  <tr>
    <td align="center" valign="middle"><img src="https://raw.githubusercontent.com/zhangyhrs/GeoStar-Selector-QGIS/main/assets/wechat-official-account.png" alt="WeChat Official Account: 测绘地信" height="150"></td>
    <td align="center" valign="middle"><img src="https://raw.githubusercontent.com/zhangyhrs/GeoStar-Selector-QGIS/main/assets/wechat-mini-program.jpg" alt="WeChat Mini Program: 测绘地信" height="150"></td>
    <td align="center" valign="middle"><img src="https://raw.githubusercontent.com/zhangyhrs/GeoStar-Selector-QGIS/main/assets/knowledge-planet.jpg" alt="Knowledge Planet: 测绘地理信息共享中心" height="150"></td>
  </tr>
</table>

## Author

**Zhang Y.H.** · GitHub [@zhangyhrs](https://github.com/zhangyhrs)
