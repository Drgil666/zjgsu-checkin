const app = getApp()
Page({
    data: {
        checkSetId: 1,
        role: null,
        visible: 1,
        nick: "Web前端技术开发",
        checkInList: []
    },
    onLoad: function (e) {
        let that = this
        console.log(e.role)
        console.log(e.checkSetId)
        that.setData({
            role: e.role + "",
            checkSetId: e.checkSetId
        })
    },
    onShow: function () {
        wx.showLoading({ title: '获取数据中...' })
        let that = this
        that.getCheckSet()
        that.getCheckInList()
    },
    visibleChange: function () {
        let that = this
        that.setData({
            visible: !that.data.visible
        })
    },
    updateCheckSet: function (e) {
        console.log(e.currentTarget.dataset.type)
        console.log(e.detail.value)
        let that = this
        that.setData({
            nick: e.detail.value
        })
    },
    getCheckIn: function (e) {
        let that = this
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../getCheckIn/getCheckIn?checkInId=' + id + '&role=' + that.data.role
        })
    },
    createCheckIn: function () {
        let that = this
        wx.navigateTo({
            url: '../createCheckIn/createCheckIn?checkSetId=' + that.data.checkSetId,
        })
    },
    getCheckSet: function () {
        let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/checkSet', //这里填写你的接口路径
            method: 'GET',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
            },
            data: { //这里写你要请求的参数
                checkSetId: that.data.checkSetId
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
                    that.setData({
                        visible: res.data.data.visible,
                        nick: res.data.data.nick
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg
                    })
                }
            },
            fail: function () {
                wx.hideLoading()
                wx.showToast({
                    title: '请求失败!',
                })
            }
        })
    },
    getCheckInList: function () {
        let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/checkin/List', //这里填写你的接口路径
            method: 'GET',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
            },
            data: { //这里写你要请求的参数
                setId: that.data.checkSetId
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    for (let i = 0; i < res.data.data.length; i++) {
                        // console.log(new Date().getTime())
                        // console.log(new Date(res.data.data[i].startTime).getTime())
                        // console.log(new Date(res.data.data[i].endTime).getTime())
                        if (new Date().getTime() < new Date(res.data.data[i].startTime).getTime())
                            res.data.data[i].status = 0
                        else if (new Date().getTime() > new Date(res.data.data[i].endTime).getTime())
                            res.data.data[i].status = 2
                        else res.data.data[i].status = 1
                    }
                    console.log(res.data.data)
                    that.setData({
                        checkInList: res.data.data
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg
                    })
                }
            },
            fail: function () {
                wx.hideLoading()
                wx.showToast({
                    title: '请求失败!',
                })
            }
        })
    },
    deleteCheckSet: function () {
        let url = app.globalData.backend
        wx.showLoading({ title: '请求中...' })
        wx.request({
            url: url + '/api/checkSet', //这里填写你的接口路径
            method: 'POST',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json;charset=utf-8',
                'Token': app.globalData.Token
            },
            data: { //这里写你要请求的参数
                method: "delete",
                data: {},
                key: [this.data.checkSetId]
            },
            success: function (res) {
                wx.hideLoading()
                console.log(res.data)
                if (res.data.code === 200) {
                    wx.showToast({
                        icon: 'success',
                        title: '删除成功!'
                    })
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 0,
                        })
                    }, 1500)
                } else {
                    wx.showToast({
                        title: res.data.msg
                    })
                }
            },
            fail: function () {
                wx.hideLoading()
                wx.showToast({
                    title: '请求失败!',
                })
            }
        })

    }
})