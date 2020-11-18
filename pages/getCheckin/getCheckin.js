const app = getApp()
Page({
    data: {
        checkInId: 2,
        role: null,
        checkIn: {},
        buttonVisible: true,
        qrCode: null
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
                        checkIn: res.data.data
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
    createQrCode: function () {
        let that = this
        let url = app.globalData.backend
        that.setData({
            buttonVisible: !that.data.buttonVisible
        })
        wx.request({
            url: url + '/api/QrCode', //这里填写你的接口路径
            method: 'POST',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json'
            },
            data: { //这里写你要请求的参数
                test1: "111",
                test2: "222"
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
                    that.setData({
                        qrCode: res.data.data
                    })
                    that.getBase64ImageUrl()
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
    //把base64转换成图片
    getBase64ImageUrl: function () {
        let that = this
        let data = "iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAABu0lEQVR42u2YQYrDMAxFVbLwMkfITZKLFWrwxdKb+AhdehGi+V+mIR2Y5fwOQ7MItl8XQvr6Vmr+02Mf8tdJNrPRa/KHTX73UrEfpKS47yBtxt4u7tXjTEmqzWOpzcY8NbMbV+8gbotv5mv/zRvIZu3yuE543d5Aen3Sbtce2/fK/ToJjSIn8/P1ql4BiWeztNpQfbXbtw6WEJuxh0IKU4Sw1lFL8pTu6E4LcbBZoRAtcUdEZm3pGh0qo5SSEGU2uCXCWrCiTNQkdNG7BFFSK1ICq2ZO2gU5gVZwbexq4omxtX5xcXs/ukRDCuWJxFAmzqsT9VGTvuQh4NXkBDbFZoVlZgbIPFEwQhKxZRZqm+hV9VCIjnBwYp/2W/OsEA1xp0fCLuAUifNbSFZJClsURYJGkZ0xv2hHRHBJ4drgTQXThkxPfq0hyAn6NFGt0azhWkoSvYEBennaBYxjkJJ4KFTOUTw8+lRFYn7LrArrQ8EsDy3pM6yzKtRKOXmVinCOz1OMkf2ZzxO+itAyGdE6wjLXc2wq4v3qbAwt5igpYX02HnKOx8oOrxKR/l3P2QVj5N6/KLXk8y/OPyNffMLU6FPXmbUAAAAASUVORK5CYII="
        var base64Data = data;
        base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
        const base64ImgUrl = "data:image/png;base64," + base64Data;
        that.setData({
            qrCode: base64ImgUrl
        })
        // console.log(base64ImgUrl)
    },
})