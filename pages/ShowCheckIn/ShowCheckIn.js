const app = getApp();
Page({
    data: {
      checkSetlist: [],
      checkId:null,
    },
    onLoad: function (e) {
      let that = this
      console.log(e)
      that.setData({
        checkId:e.checkId
      })
    },
    onShow: function () {
      let that = this
      that.ShowCheckIn()
    },
    ShowCheckIn: function () {
      let that = this
      let url = app.globalData.backend
      wx.showLoading({ title: '获取数据中...' })
      wx.request({
        url: url + '/api/Sign/findByCheckIdAndUserId', //这里填写你的接口路径
        method: 'GET',
        header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
          'Content-Type': 'application/json;charset=utf-8',
          'Token':app.globalData.Token
        },
        data: { //这里写你要请求的参数
          checkId:that.data.checkId
        },
        success: function (res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.code == 200) {
            console.log(res.data)
            that.setData({
              checkSetlist: res.data.data
            })
          }
          else {
            wx.showToast({
              title: res.data.msg
            })
          }
        },
        fail: function () {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '获取失败!'
          })
        }
      })
    }
})


