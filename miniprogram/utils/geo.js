function zoneInfo(lon){
  lon=Number(lon)
  if(Number.isNaN(lon)||lon<-180||lon>180) return null

  const zone3=Math.floor((lon+1.5)/3)
  const cm3=zone3*3
  const zone6=Math.floor(lon/6)+1
  const cm6=zone6*6-3

  // CGCS2000 EPSG ranges in China
  let epsg3Zone=null, epsg3CM=null, epsg6Zone=null, epsg6CM=null
  if(zone3>=25 && zone3<=45){
    epsg3Zone=4513+(zone3-25)
    epsg3CM=4534+(zone3-25)
  }
  if(zone6>=13 && zone6<=23){
    epsg6Zone=4491+(zone6-13)
    epsg6CM=4502+(zone6-13)
  }

  return {lon,zone3,cm3,zone6,cm6,epsg3Zone,epsg3CM,epsg6Zone,epsg6CM}
}

function getCurrentLocation(page, callback){
  wx.getLocation({
    type:'gcj02',
    isHighAccuracy:true,
    highAccuracyExpireTime:5000,
    success(res){
      page.setData({
        lon:String(res.longitude.toFixed(8)),
        currentLat:res.latitude.toFixed(8),
        currentLon:res.longitude.toFixed(8),
        locationAccuracy:res.accuracy ? res.accuracy.toFixed(1)+' m' : '-'
      })
      callback && callback(res.longitude,res.latitude,res)
    },
    fail(){
      wx.showModal({
        title:'无法获取当前位置',
        content:'请在手机系统和微信中允许“测绘地信”使用位置信息。',
        showCancel:false
      })
    }
  })
}

module.exports={zoneInfo,getCurrentLocation}
