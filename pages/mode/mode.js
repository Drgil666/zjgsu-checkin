const app = getApp()
Page({
  data: {},
  stu: function () {
    app.setTabbar1()
    wx.switchTab({
      url: '../stu/stu',
    })
  },
  teacher: function () {
    app.setTabbar2()
    wx.switchTab({
      url: '../teacher/teacher',
    })
  }
})