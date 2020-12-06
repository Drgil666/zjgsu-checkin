const app = getApp();

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
    /*getcheckin: function (e) {
      var id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: '../ShowCheckIn/ShowCheckIn?role=stu&checkSetId=' + id,
      })
    },*/
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
    ShowCheckIn: function () {
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
          userId: wx.getStorageSync('userid')
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


  /*onLoad() {
      this.setData({
          search: this.search.bind(this)
      })
  },
  search: function (value) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
          }, 200)
      })
  },
  selectResult: function (e) {
      console.log('select result', e.detail)
  },*/
})


