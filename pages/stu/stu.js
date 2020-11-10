//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    checkinlist: [
      /*{
        "id": 1,
        "userId": 1,
        "startTime": "2020-11-02 18:58:48",
        "endTime": "2020-11-02 18:58:48",
        "status": 2,
        "type": 1,
        "visible": 1,
        "nick": "Web前端技术开发"
      },
      {
        "id": 2,
        "userId": 1,
        "startTime": "2020-11-02 18:58:48",
        "endTime": "2020-11-02 18:58:48",
        "status": 1,
        "type": 1,
        "visible": 1,
        "nick": "软件工程实践"
      },
      {
        "id": 3,
        "userId": 1,
        "startTime": "2020-11-02 18:58:48",
        "endTime": "2020-11-02 18:58:48",
        "status": 0,
        "type": 1,
        "visible": 1,
        "nick": "在历史的坐标上解析日本"
      }*/
    ]
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
      var url = getApp().globalData.backend
      wx.request({
          url: url + '/api/checkin/findByUserId', //这里填写你的接口路径
          method: 'GET',
          header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
              'Content-Type': 'application/json'
          },
          data: { //这里写你要请求的参数
              userId: wx.getStorageSync('userid')
          },
          success: function (res) {
              wx.hideLoading()
              console.log(res.data)
              that.setData({
                  checkinlist: res.data.data
              })
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
  getcheckin: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../getCheckin/getCheckin?checkId=' + id,
    })
  },
  return: function (e) {
    wx.redirectTo({
      url: '../mode/mode',
    })
  },
  myInfo:function()
  {
    wx.navigateTo({
      url: '../my/my',
    })
  }
})
