Page({
 data:{
  latitude:29.65,longitude:91.12,accuracy:'-',altitude:'-',speed:'-',address:'',
  markers:[],satellite:false,mapSource:'标准地图'
 },

 onLoad(opt){
  if(opt.lat&&opt.lng)this.setPoint(Number(opt.lat),Number(opt.lng),'分享位置')
 },

 onShareAppMessage(){
  const {latitude,longitude}=this.data
  return{
   title:`测绘地信 · 位置 ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
   path:`/pages/map-location/index?lat=${latitude}&lng=${longitude}`
  }
 },

 setPoint(lat,lng,title){
  this.setData({
   latitude:lat,
   longitude:lng,
   markers:[{
    id:1,latitude:lat,longitude:lng,title:title||'选定位置',
    width:28,height:36
   }]
  })
 },

 switchSource(e){
  const id=e.currentTarget.dataset.id
  this.setData({
   satellite:id==='satellite',
   mapSource:id==='satellite'?'卫星影像':'标准地图'
  })
 },

 locate(){
  wx.getLocation({
   type:'gcj02',
   isHighAccuracy:true,
   highAccuracyExpireTime:5000,
   success:(r)=>{
    this.setData({
     accuracy:r.accuracy?r.accuracy.toFixed(1)+' m':'-',
     altitude:typeof r.altitude==='number'?r.altitude.toFixed(1)+' m':'-',
     speed:typeof r.speed==='number'&&r.speed>=0?r.speed.toFixed(1)+' m/s':'-'
    })
    this.setPoint(r.latitude,r.longitude,'当前位置')
   },
   fail:()=>wx.showModal({
    title:'无法获取位置',
    content:'请允许小程序使用位置信息。',
    showCancel:false
   })
  })
 },

 choose(){
  wx.chooseLocation({
   latitude:this.data.latitude,
   longitude:this.data.longitude,
   success:(r)=>{
    this.setData({address:[r.name,r.address].filter(Boolean).join(' · ')})
    this.setPoint(r.latitude,r.longitude,r.name||'选定位置')
   }
  })
 },

 tapMap(e){
  this.setData({address:'地图选点'})
  this.setPoint(e.detail.latitude,e.detail.longitude,'地图选点')
 },

 copy(){
  wx.setClipboardData({
   data:`${this.data.latitude.toFixed(8)}, ${this.data.longitude.toFixed(8)}`
  })
 },

 open(){
  wx.openLocation({
   latitude:this.data.latitude,
   longitude:this.data.longitude,
   scale:16,
   name:this.data.address||'测绘地信选定位置'
  })
 },

 openImagery(e){
  const source=e.currentTarget.dataset.source||'esri'
  wx.navigateTo({
   url:`/pages/map-imagery/index?source=${source}&lat=${this.data.latitude}&lng=${this.data.longitude}`
  })
 }
})
