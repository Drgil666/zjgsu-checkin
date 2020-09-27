//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'A Demo',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user: {},
    vis:false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getcheck: function (e) {
    var that = this
    var id = e.currentTarget.dataset.userid
    console.log(id)
    wx.request({
      url: 'http://10.21.234.24:8080/api/user', //这里填写你的接口路径
      method: 'GET',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        userId: id
      },
      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        console.log(res.data)
        that.setData({
            user: res.data,
            vis:true
          })
          // console.log(that.data.user)
      }
    })
  }
})