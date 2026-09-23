const store=require('../../utils/store')
Page({
 data:{q:'',type:'',category:'',items:[],title:'资料列表'},
 onLoad(opt){
   const type=decodeURIComponent(opt.type||''),category=decodeURIComponent(opt.category||''),q=decodeURIComponent(opt.q||'')
   this.setData({type,category,q}); this.refresh()
 },
 input(e){this.setData({q:e.detail.value})},
 doSearch(){this.refresh()},
 refresh(){
   let list=store.search(this.data.q,this.data.type)
   if(this.data.category) list=list.filter(x=>x.categoryCode===this.data.category||x.categoryName===this.data.category)
   const title=this.data.category || this.data.type || (this.data.q?'搜索结果':'全部资料')
   wx.setNavigationBarTitle({title:title.length>12?'资料列表':title})
   this.setData({items:list,title})
 }
})