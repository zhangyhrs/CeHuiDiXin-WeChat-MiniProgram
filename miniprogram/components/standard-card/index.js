Component({
 properties:{item:{type:Object,value:{}}},
 methods:{open(){ const id=this.data.item.id; wx.navigateTo({url:'/pages/detail/index?id='+encodeURIComponent(id)}) }}
})