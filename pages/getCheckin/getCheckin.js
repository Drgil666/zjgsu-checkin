const app = getApp()
Page({
    data: {
        checkInId: 2,
        role: null,
        checkIn: {},
    },
    onLoad: function (e) {
        let that = this
        console.log(e.checkInId)
        console.log(e.role)
        that.setData({
            checkInId: e.checkInId,
            role: e.role
        })
    },
    onShow: function () {
        let that = this
        that.getCheckIn()
    },
    visibleChange: function () {
        let that = this
        that.setData({
            visible: !that.data.visible
        })
    },
    getCheckIn: function () {
        let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/checkin', //这里填写你的接口路径
            method: 'GET',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json'
            },
            data: { //这里写你要请求的参数
                checkId: that.data.checkInId
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
                    that.setData({
                        checkIn:res.data.data
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
    createQrCode:function()
    {
        
    }
})