const config = require('./config.js')

App({
  globalData:{
    appName:'测绘地信',
    version:'1.0.0',
    repo:'zhangyhrs/Natural-Resources-Standards-and-Specifications',
    officialAccountUsername:(config.officialAccountUsername || '').trim(),
    amapWebKey:(config.amapWebKey || '').trim()
  }
})
