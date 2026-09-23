const store=require('../../utils/store')
const app=getApp()

Page({
  data:{favCount:0,recentCount:0},

  onShow(){
    this.setData({
      favCount:store.getFavorites().length,
      recentCount:store.recentItems().length
    })
  },

  go(e){
    wx.navigateTo({url:e.currentTarget.dataset.url})
  },

  repo(){
    wx.setClipboardData({
      data:'https://github.com/zhangyhrs/Natural-Resources-Standards-and-Specifications'
    })
  },

  officialAccount(){
    const username=(app.globalData.officialAccountUsername||'').trim()

    if(username && typeof wx.openOfficialAccountProfile==='function'){
      wx.openOfficialAccountProfile({
        username,
        fail:()=>{
          wx.setClipboardData({
            data:'测绘地信',
            success:()=>wx.showToast({title:'已复制公众号名称',icon:'none'})
          })
        }
      })
      return
    }

    wx.setClipboardData({
      data:'测绘地信',
      success:()=>{
        wx.showModal({
          title:'微信公众号：测绘地信',
          content:'已复制公众号名称。需要直接打开公众号主页时，请仅在本地配置相应公众号信息，并完成公众号与小程序关联。',
          showCancel:false
        })
      }
    })
  }
})
