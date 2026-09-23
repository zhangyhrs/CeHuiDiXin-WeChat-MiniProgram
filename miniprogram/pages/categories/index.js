const store=require('../../utils/store')
Page({
 data:{cats:[],lawCats:[]},
 onLoad(){
   const law=[...new Set(store.standards.filter(x=>x.type==='法律法规').map(x=>x.categoryName))].map((name,i)=>({code:name,name}))
   this.setData({cats:store.categories.map(c=>({...c,count:store.byCategory(c.code,'标准规范').length})),lawCats:law.map(c=>({...c,count:store.byCategory(c.code,'法律法规').length}))})
 },
 open(e){wx.navigateTo({url:'/pages/list/index?category='+encodeURIComponent(e.currentTarget.dataset.code)+'&type='+encodeURIComponent(e.currentTarget.dataset.type)})}
})