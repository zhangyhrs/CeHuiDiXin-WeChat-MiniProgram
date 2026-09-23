const app=getApp()
const {gcj02ToWgs84}=require('../../utils/coord')

const SOURCES={
  esri:{
    name:'ESRI World Imagery',
    type:'tiles',
    coord:'wgs84',
    note:'ArcGIS World Imagery 全球影像，用于辅助查看。',
    template:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  },
  osm:{
    name:'OpenStreetMap',
    type:'tiles',
    coord:'wgs84',
    note:'OpenStreetMap 标准地图，用于道路、地名与位置辅助查看。',
    template:'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
  }
}

function lonLatToTile(lon,lat,z){
  const n=Math.pow(2,z)
  const x=(lon+180)/360*n
  const rad=lat*Math.PI/180
  const y=(1-Math.log(Math.tan(rad)+1/Math.cos(rad))/Math.PI)/2*n
  return {x,y}
}

Page({
  data:{
    source:'esri',
    sourceName:'ESRI World Imagery',
    sourceNote:'',
    latitude:29.65,
    longitude:91.12,
    wgsLat:29.65,
    wgsLon:91.12,
    zoom:15,
    tiles:[],
    amapUrl:'',
    amapEnabled:false
  },

  onLoad(opt){
    const lat=Number(opt.lat)||29.65
    const lon=Number(opt.lng)||91.12
    const wgs=gcj02ToWgs84(lon,lat)
    this.setData({
      latitude:lat,
      longitude:lon,
      wgsLat:wgs.latitude,
      wgsLon:wgs.longitude,
      sourceNote:SOURCES.esri.note,
      amapEnabled:!!(app.globalData.amapWebKey||'').trim()
    },()=>this.refresh())
  },

  switchSource(e){
    const source=e.currentTarget.dataset.id
    if(source==='amap'){
      this.openAmap()
      return
    }
    if(!SOURCES[source])return
    this.setData({
      source,
      sourceName:SOURCES[source].name,
      sourceNote:SOURCES[source].note,
      amapUrl:''
    },()=>this.refreshTiles())
  },

  refresh(){
    if(this.data.source==='amap') this.openAmap()
    else this.refreshTiles()
  },

  refreshTiles(){
    const cfg=SOURCES[this.data.source]
    if(!cfg)return
    const {wgsLon,wgsLat,zoom}=this.data
    const c=lonLatToTile(wgsLon,wgsLat,zoom)
    const cx=Math.floor(c.x), cy=Math.floor(c.y)
    const n=Math.pow(2,zoom)
    const tiles=[]
    for(let dy=-1;dy<=1;dy++){
      for(let dx=-1;dx<=1;dx++){
        let x=(cx+dx)%n
        if(x<0)x+=n
        const y=Math.max(0,Math.min(n-1,cy+dy))
        tiles.push({
          id:`${zoom}_${x}_${y}`,
          url:cfg.template.replace('{z}',zoom).replace('{x}',x).replace('{y}',y)
        })
      }
    }
    this.setData({tiles,amapUrl:''})
  },

  openAmap(){
    const key=(app.globalData.amapWebKey||'').trim()
    if(!key){
      wx.showModal({
        title:'高德地图需要 Key',
        content:'高德官方静态地图接口需要 Web 服务 Key。请在 miniprogram/config.js 中配置后使用。未配置不会影响微信地图、ESRI 和 OpenStreetMap。',
        showCancel:false
      })
      return
    }
    // 高德静态地图使用 GCJ-02，经纬度直接使用微信定位结果。
    const lon=this.data.longitude.toFixed(6)
    const lat=this.data.latitude.toFixed(6)
    const zoom=Math.max(3,Math.min(17,this.data.zoom))
    const url=`https://restapi.amap.com/v3/staticmap?location=${lon},${lat}&zoom=${zoom}&size=750*750&scale=1&markers=mid,,A:${lon},${lat}&key=${encodeURIComponent(key)}`
    this.setData({
      source:'amap',
      sourceName:'高德地图',
      sourceNote:'高德官方静态地图。需申请 Web 服务 Key，通常有开发者免费调用额度，具体以高德开放平台规则为准。',
      amapUrl:url,
      tiles:[]
    })
  },

  zoomIn(){
    if(this.data.zoom>=19)return
    this.setData({zoom:this.data.zoom+1},()=>this.refresh())
  },

  zoomOut(){
    if(this.data.zoom<=3)return
    this.setData({zoom:this.data.zoom-1},()=>this.refresh())
  },

  pan(e){
    if(this.data.source==='amap'){
      wx.showToast({title:'高德静态图请回到微信地图选点后重新打开',icon:'none'})
      return
    }
    const dir=e.currentTarget.dataset.dir
    const z=this.data.zoom
    const t=lonLatToTile(this.data.wgsLon,this.data.wgsLat,z)
    let tx=t.x,ty=t.y
    if(dir==='left')tx-=1
    if(dir==='right')tx+=1
    if(dir==='up')ty-=1
    if(dir==='down')ty+=1
    const n=Math.pow(2,z)
    const lon=tx/n*360-180
    const merc=Math.PI*(1-2*ty/n)
    const lat=180/Math.PI*Math.atan(Math.sinh(merc))
    this.setData({wgsLon:lon,wgsLat:lat},()=>this.refreshTiles())
  },

  reset(){
    const wgs=gcj02ToWgs84(this.data.longitude,this.data.latitude)
    this.setData({wgsLon:wgs.longitude,wgsLat:wgs.latitude},()=>this.refresh())
  },

  openTencent(){
    wx.openLocation({
      latitude:this.data.latitude,
      longitude:this.data.longitude,
      scale:16,
      name:'测绘地信选定位置'
    })
  }
})
