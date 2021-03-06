const app = getApp()
Page({
    data: {
        checkSetlist: []
    },
    onLoad: function () {
    },
    onShow: function () {
        let that = this
        that.getCheckSetList()
    },
    createcheckin: function () {
        wx.redirectTo({
            url: '../createCheckSet/createCheckSet',
        })
    },
    getCheckSet: function (e) {
        var id = e.currentTarget.dataset.id
        console.log(id)
        wx.redirectTo({
            url: '../getCheckSet/getCheckSet?role=teacher&checkSetId=' + id,
        })
    },
    return: function () {
        // console.log("return")
        wx.redirectTo({
            url: '../mode/mode?',
        })
    },
    myInfo: function () {
        wx.redirectTo({
            url: '../my/my',
        })
    },
    getCheckSetList: function () {
        let that = this
        let url = app.globalData.backend
        wx.showLoading({ title: '获取数据中...' })
        wx.request({
            url: url + '/api/checkSet/teacher/list', //这里填写你的接口路径
            method: 'GET',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json;charset=utf-8',
                'Token':app.globalData.Token
            },
            data: { //这里写你要请求的参数
            },
            success: function (res) {
                wx.hideLoading()
                console.log(res.data)
                if (res.data.code == 200) {
                    that.setData({
                        checkSetlist: res.data.data.data
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
    onPullDownRefresh: function () {
    let that = this
    wx.showNavigationBarLoading()  //在标题栏中显示加载
    this.updateBlogs()  //重新加载数据,模拟加载  1秒
    setTimeout(function () {// 完成
      that.getCheckSetList()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
  updateBlogs: function () {
    var that = this
    wx.request({
      //url: common.baseUrl + 'blog_rss.php',//common is not defind
      data: {
      },
      header: {
        'Content-Type': 'application/json;charset=utf-8',
        'Token': app.globalData.Token
      },
      success: function (res) {
        var feeds = feed.getBlogs(res.data);
        wx.setStorage({
          key: "blog_feeds",
          data: feeds
        })
        that.setData({
          feeds: feeds
        })
      }
    })
  },
  getSignIn: function(e){
    console.log(e.currentTarget.dataset.id)
    wx.redirectTo({
      url: '../getSign/getSign?id='+e.currentTarget.dataset.id,
    })
  },
})
