const store=require('../../utils/store')
Page({data:{cats:[]},onLoad(){this.setData({cats:store.categories.map(c=>({...c,count:store.byCategory(c.code,'标准规范').length}))})},open(e){wx.navigateTo({url:'/pages/list/index?type='+encodeURIComponent('标准规范')+'&category='+encodeURIComponent(e.currentTarget.dataset.code)})},all(){wx.navigateTo({url:'/pages/list/index?type='+encodeURIComponent('标准规范')})}})
