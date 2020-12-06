//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    checkSetlist: []
  },
  onLoad: function () {
    let that = this
    var userId = wx.getStorageSync('userid')
    console.log(userId)
  },
  getcheck: function () {
  },
  onShow: function () {
    let that = this
    that.getCheckSetList()
  },
  getcheckin: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../getCheckSet/getCheckSet?role=stu&checkSetId=' + id,
    })
  },
  /*return: function (e) {
    wx.redirectTo({
      url: '../mode/mode',
    })
  },*/
  myInfo: function () {
    wx.navigateTo({
      url: '../my/my',
    })
  },
  getCheckSetList: function () {
    let that = this
    let url = app.globalData.backend
    wx.showLoading({ title: '获取数据中...' })
    wx.request({
      url: url + '/api/checkSet/findByUserId', //这里填写你的接口路径
      method: 'GET',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: { //这里写你要请求的参数
        userId: app.globalData.token//wx.getStorageSync('userid')
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 200) {
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
  },
  scanCode: function () {
    wx.scanCode({
      success(res) {
        console.log(res)
        try {
          let data = JSON.parse(res.result)
          console.log(JSON.parse(res.result))
          wx.navigateTo({
            url: '../getCheckIn/getCheckIn?role=stu&checkInId=' + data.checkInId,
          })
          wx.showToast({
            title: '扫描成功!',
            icon: 'success',
            duration: 2000
          })
        }
        catch (err) {
          wx.showToast({
            icon: 'none',
            title: '二维码解析错误!',
          })
          console.log(err)
        }
      },
      fail: (res) => {
        console.log(res);
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})