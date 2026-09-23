Page({
 data:{value:'',digits:3,result:''},
 setValue(e){this.setData({value:e.detail.value})},
 setDigits(e){this.setData({digits:Number(e.detail.value)})},
 calc(){
  const raw=this.data.value.trim()
  const digits=this.data.digits
  if(!raw){wx.showToast({title:'请输入坐标或数字',icon:'none'});return}
  const out=raw.split(/\s+|,|，/).filter(Boolean).map(v=>{
   const n=Number(v)
   return Number.isNaN(n)?v:n.toFixed(digits)
  }).join(', ')
  this.setData({result:out})
 },
 copy(){wx.setClipboardData({data:this.data.result})}
})