const app = getApp()
Page({
  data: {},
  stu: function () {
    wx.redirectTo({
      url: '../stu/stu',
    })
  },
  teacher: function () {
    wx.redirectTo({
      url: '../teacher/teacher',
    })
  }
})