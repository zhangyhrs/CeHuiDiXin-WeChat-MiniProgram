const geo=require('../../utils/geo')
Page({
 data:{
  q:'',lon:'',currentLat:'',currentLon:'',locationAccuracy:'',result:null,
  items:[
   {code:'EPSG:4490',kind:'地理坐标',name:'CGCS2000',note:'中国大地2000地理坐标系，经纬度'},
   {code:'EPSG:4326',kind:'地理坐标',name:'WGS 84',note:'全球常用经纬度坐标系'},
   {code:'EPSG:4545',kind:'投影坐标',name:'CGCS2000 / 3-degree GK CM 108E',note:'3°高斯-克吕格，中央经线108°'},
   {code:'EPSG:4524',kind:'投影坐标',name:'CGCS2000 / 3-degree GK zone 36',note:'3°高斯-克吕格，36带，中央经线108°'},
   {code:'EPSG:4508',kind:'投影坐标',name:'CGCS2000 / GK CM 111E',note:'6°高斯-克吕格，中央经线111°'},
   {code:'EPSG:4497',kind:'投影坐标',name:'CGCS2000 / GK zone 19',note:'6°高斯-克吕格，19带，中央经线111°'}
  ],
  filtered:[]
 },
 onLoad(){this.setData({filtered:this.data.items})},
 inputSearch(e){
  const q=e.detail.value.toLowerCase()
  this.setData({q,filtered:this.data.items.filter(x=>(x.code+x.kind+x.name+x.note).toLowerCase().includes(q))})
 },
 setLon(e){this.setData({lon:e.detail.value})},
 calc(){
  const r=geo.zoneInfo(this.data.lon)
  if(!r){wx.showToast({title:'请输入 -180～180 的经度',icon:'none'});return}
  this.setData({result:r})
 },
 locate(){geo.getCurrentLocation(this,(lon)=>this.setData({result:geo.zoneInfo(lon)}))},
 copy(e){wx.setClipboardData({data:e.currentTarget.dataset.code})}
})