const store=require('../../utils/store')
Page({
 data:{item:null,fav:false},
 onLoad(opt){
  const id=decodeURIComponent(opt.id||'')
  const item=store.getById(id)
  if(!item){wx.showToast({title:'资料不存在',icon:'none'});return}
  store.addRecent(item.id)
  this.setData({item,fav:store.isFavorite(item.id)})
 },
 toggle(){const fav=store.toggleFavorite(this.data.item.id);this.setData({fav})},
 copyGithub(){
  const url=this.data.item.repoUrl||''
  wx.setClipboardData({data:url,success(){
   wx.showModal({title:'链接已复制',content:'请在手机浏览器中粘贴打开 GitHub 页面查看或下载原文件。',showCancel:false})
  }})
 },
 copyPath(){wx.setClipboardData({data:this.data.item.path||''})}
})
