const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#ff6700",
    list: [{
      "pagePath": "/pages/stu/stu",
      "text": "我参与的签到"
    },
    {
      "pagePath": "/pages/my/my",
      "text": "个人信息"
    },
    ]
  },
  lifetimes: {
    //组件的生命周期函数
    attached() {
      var that = this
      that.setData({
        list: app.globalData.list
      })
    },
  },
  methods: {
    switchTab(e) {
      let that = this
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      that.setData({
        selected: data.index
      })
    }
  }
})