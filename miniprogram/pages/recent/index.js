const store=require('../../utils/store')
Page({data:{items:[]},onShow(){this.setData({items:store.recentItems()})},clear(){wx.removeStorageSync('recent');this.setData({items:[]})}})
