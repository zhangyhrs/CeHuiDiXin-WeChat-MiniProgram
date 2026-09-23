Page({
 data:{lat1:'',lon1:'',lat2:'',lon2:'',distance:'',bearing:''},
 set(e){this.setData({[e.currentTarget.dataset.k]:e.detail.value})},
 calc(){
  const lat1=Number(this.data.lat1),lon1=Number(this.data.lon1),lat2=Number(this.data.lat2),lon2=Number(this.data.lon2)
  if([lat1,lon1,lat2,lon2].some(Number.isNaN)){wx.showToast({title:'请输入完整经纬度',icon:'none'});return}
  const R=6378137, rad=Math.PI/180
  const p1=lat1*rad,p2=lat2*rad,dp=(lat2-lat1)*rad,dl=(lon2-lon1)*rad
  const a=Math.sin(dp/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(dl/2)**2
  const d=2*R*Math.asin(Math.sqrt(a))
  const y=Math.sin(dl)*Math.cos(p2)
  const x=Math.cos(p1)*Math.sin(p2)-Math.sin(p1)*Math.cos(p2)*Math.cos(dl)
  let b=Math.atan2(y,x)/rad
  if(b<0)b+=360
  this.setData({distance:d>=1000?(d/1000).toFixed(4)+' km':d.toFixed(3)+' m',bearing:b.toFixed(6)+'°'})
 },
 locate1(){wx.getLocation({type:'gcj02',success:r=>this.setData({lat1:r.latitude.toFixed(8),lon1:r.longitude.toFixed(8)})})},
 locate2(){wx.getLocation({type:'gcj02',success:r=>this.setData({lat2:r.latitude.toFixed(8),lon2:r.longitude.toFixed(8)})})}
})