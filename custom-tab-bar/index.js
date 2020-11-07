const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#ff6700",
    list: []
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
      that.setData({
        selected: data.index
      })
      wx.switchTab({ url })
    }
  }
})