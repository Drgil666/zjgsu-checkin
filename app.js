//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    backend: "http://10.21.234.24:8080",//后端链接
    apiKey:"a2W3xpdwboiZZHN2NKIPqZXy",//人脸识别api的key
    secretKey:"tuGXFGmzfgcnG9CejHIe9wa1DzcLimiE",//人脸识别api的secret
    threshold:0.957,//活体识别阀值
    compareThreshold:80,//人脸对比阀值
    Token:'',//传输用Token
    QrCodeTime:60//二维码有效时长(单位为秒)
  }
})