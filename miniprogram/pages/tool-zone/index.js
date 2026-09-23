const geo=require('../../utils/geo')
Page({
 data:{lon:'',currentLat:'',currentLon:'',locationAccuracy:'',result:null},
 setLon(e){this.setData({lon:e.detail.value})},
 calc(){
   const r=geo.zoneInfo(this.data.lon)
   if(!r){wx.showToast({title:'请输入 -180～180 的经度',icon:'none'});return}
   this.setData({result:r})
 },
 locate(){
   geo.getCurrentLocation(this,(lon)=>{this.setData({result:geo.zoneInfo(lon)})})
 },
 clear(){this.setData({lon:'',result:null,currentLat:'',currentLon:'',locationAccuracy:''})}
})