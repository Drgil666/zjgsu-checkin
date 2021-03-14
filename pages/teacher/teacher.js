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
        console.log("return")
        wx.redirectTo({
            url: '../mode/mode?',
        })
    },
    myInfo: function () {
        wx.redirectTo({
            url: '../my/my',
        })
    },
    return: function () {
        wx.redirectTo({
            url: '../mode/mode?id=1',
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
    }
})