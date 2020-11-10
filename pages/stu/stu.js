//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    checkinlist: [
      {
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
      }
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
  },
  getcheckin: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../checkinInformation/checkinInformation?checkId=' + id,
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
