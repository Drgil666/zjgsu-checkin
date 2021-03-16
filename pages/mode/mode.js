const app = getApp()
Page({
  data: {},
  stu: function () {
    wx.navigateTo({
      url: '../stu/stu',
    })
  },
  teacher: function () {
    wx.navigateTo({
      url: '../teacher/teacher',
    })
  }
})