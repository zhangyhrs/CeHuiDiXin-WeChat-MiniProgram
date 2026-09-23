
const standards = require('../data/standards')
const categories = require('../data/categories')

function norm(s=''){
  return String(s).toUpperCase().replace(/[\s\/\\\-—_·（）()：:，,。.]/g,'')
}
function search(q='', type=''){
  let list = standards
  if(type) list = list.filter(x => x.type === type)
  const k = norm(q)
  if(!k) return list
  return list.filter(x => {
    const bag = [x.code,x.codeNormalized,x.name,x.categoryName,x.level2,x.level3,(x.keywords||[]).join(' ')].join(' ')
    return norm(bag).includes(k)
  })
}
function byCategory(codeOrName, type=''){
  return standards.filter(x => (!type || x.type===type) && (x.categoryCode===codeOrName || x.categoryName===codeOrName))
}
function getById(id){ return standards.find(x=>x.id===id) }
function getFavorites(){ return wx.getStorageSync('favorites') || [] }
function isFavorite(id){ return getFavorites().includes(id) }
function toggleFavorite(id){
  let ids=getFavorites()
  if(ids.includes(id)) ids=ids.filter(x=>x!==id); else ids.unshift(id)
  wx.setStorageSync('favorites',ids)
  return ids.includes(id)
}
function favoriteItems(){ const ids=getFavorites(); return ids.map(getById).filter(Boolean) }
function addRecent(id){
  let ids=wx.getStorageSync('recent')||[]
  ids=[id,...ids.filter(x=>x!==id)].slice(0,30)
  wx.setStorageSync('recent',ids)
}
function recentItems(){ return (wx.getStorageSync('recent')||[]).map(getById).filter(Boolean) }
module.exports={standards,categories,search,byCategory,getById,getFavorites,isFavorite,toggleFavorite,favoriteItems,addRecent,recentItems}
