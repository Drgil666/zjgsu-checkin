const app = getApp()
Page({

  data: {
    userInfo: null,
  },
  onLoad: function () {
  },
  onShow: function () {
    var that = this
    wx.showLoading({ title: '获取用户数据中...' })
    that.getuserinfo()
    that.getopenid()
    wx.hideLoading()
  },
  getuserinfo: function () {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              that.setData({
                userInfo: res.userInfo
              })
            },
          })
        }
      }
    })
  },
  getopenid: function () {
    let that=this
    var url = getApp().globalData.backend
    wx.login({
      success: function (res) {
        // console.log(res)
        if (res.code) {
          // console.log(res.code)
          wx.request({
            url: url+'/openId',
            data: {
              js_code: res.code
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (openIdRes) {
              // console.info("登录成功返回的openId：" + openIdRes.data.openid);
              that.setData({
                openid:openIdRes.data.openid
              })
            },
            fail: function (error) {
              wx.showToast({
                title: '获取用户openId失败!',
                icon: 'none',
                duration: 2000
              })
              console.info(error);
            }
          })
        }
      }
    })
  },
  login: function () {
    let that=this
    wx.showLoading({ title: '登录中...' })
    var url = getApp().globalData.backend
    wx.request({
      url: url + '/login', //这里填写你的接口路径
      method: 'POST',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        username: that.data.openid
      },
      success: function (res) {
        if (res.data.code === 200) {
          console.log(res.data.data)
          getApp().globalData.Token = res.data.data
          // wx.setStorageSync('userid', res.data.data)
          wx.hideLoading()
          wx.redirectTo({
            url: '../mode/mode',
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败!',
        })
      }
    })
  }
})
