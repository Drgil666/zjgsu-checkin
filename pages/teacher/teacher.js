const app = getApp()
Page({
    data: {
        checkinlist: []
    },
    onLoad: function () {
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
    onShow: function () {
        let that = this
        //添加选中效果
        if (typeof that.getTabBar === 'function' &&
            that.getTabBar()) {
            that.getTabBar().setData({
                selected: 0 //这个数是，tabBar从左到右的下标，从0开始
            })
        }
    },
    createcheckin: function () {
        wx.navigateTo({
            url: '../createCheckin/createCheckin',
        })
    },
    getcheckin: function (e) {
        var id = e.currentTarget.dataset.id
        console.log(id)
        wx.navigateTo({
            url: '../checkinInformation/checkinInformation?checkId=' + id,
        })
    },
    return: function () {
        console.log("return")
        wx.redirectTo({
            url: '../mode/mode?',
        })
    },
    myInfo: function () {
        wx.navigateTo({
            url: '../my/my',
        })
    }
})