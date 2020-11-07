//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    user: {},
    uservis: false,
    photostring: '',
    photovis: false,
    items: []
  },
  onLoad: function () {
    let that=this
    var userId=wx.getStorageSync('userid')
    console.log(userId)
  },
  getcheck: function () {
  },
  onShow: function () {
    app.setTabbar1()
    //添加选中效果
    let that=this
    if (typeof that.getTabBar === 'function' &&
      that.getTabBar()) {
      that.getTabBar().setData({
        selected: 0 //这个数是，tabBar从左到右的下标，从0开始
      })
    }
  }
})