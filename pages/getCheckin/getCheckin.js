const app = getApp()
Page({
    data: {
        checkInId: 2,
        role: null,
        photo: "",
        checkIn: {},
        buttonVisible: true,
        qrCode: null,
        interval: null,
        isSign: false,
        checkBox: [
            { value: 1, name: '签到' },
            { value: 2, name: '签退' }
        ]
    },
    onLoad: function (e) {
        let that = this
        that.isSign()
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
        let photo = wx.getStorageSync('photo')
        console.log(photo)
        if (photo !== "") {
            console.log("photo is not null!")
            that.createSignIn(photo)
        }
    },
    isSign: function () {
        let that = this
        that.setData({
            isSign: true
        })
    },
    visibleChange: function () {
        let that = this
        that.setData({
            visible: !that.data.visible
        })
    },
    getCheckIn: function () {
        wx.showLoading({ title: '请求中...' })
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
        if (new Date() <= that.data.checkIn.endTime) {
            that.setData({
                buttonVisible: !that.data.buttonVisible
            })
            that.getQrCode()
            that.interval = setInterval(function () {
                that.getQrCode()
            }, 10000)//每隔10s获取一次二维码
        }
        else {
            wx.showToast({
                icon: 'success',
                title: '签到已结束!'
            })
        }
    },
    getQrCode: function () {
        wx.showLoading({ title: '请求中...' })
        let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/QrCode',
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                checkInId: that.data.checkIn.id,
                userId: wx.getStorageSync('userid'),
                role: "stu",
                date: new Date()
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
                    that.setData({
                        qrCode: res.data.data
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
    onUnload: function () {
        let that = this
        clearInterval(that.interval)
    },//页面退出时清空页面
    signIn: function () {
        wx.navigateTo({
            url: '../photo/photo?type=signin',
        })
    },
    deleteModel: function () {
        let that = this
        wx.showModal({
            title: '提示',
            content: '您确定要删除该签到?',
            cancelText: '确定',
            confirmText: '取消',
            success: function (res) {
                if (!res.confirm) {
                    that.deleteCheckIn()
                }
            }
        })
    },
    deleteCheckIn: function () {
        wx.showLoading({ title: '请求中...' })
        let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/checkin', //这里填写你的接口路径
            method: 'POST',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json'
            },
            data: { //这里写你要请求的参数
                method: "delete",
                data: {},
                key: [that.data.checkInId]
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
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
    },
    createSignIn: function (photo) {
        wx.removeStorageSync('photo')
        wx.showLoading({ title: '签到中...' })
        let that = this
        let url = app.globalData.backend
        let sign = {}
        // sign.photoId = photo
        sign.photoId = "111"
        sign.stuId = wx.getStorageSync('userid')
        sign.signTime = new Date()
        sign.checkId = parseInt(that.data.checkInId)
        console.log(sign)
        wx.request({
            url: url + '/api/Sign', //这里填写你的接口路径
            method: 'POST',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json'
            },
            data: { //这里写你要请求的参数
                method: "create",
                data: sign,
                key: []
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
                    wx.showToast({
                        icon: 'success',
                        title: '签到成功!'
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