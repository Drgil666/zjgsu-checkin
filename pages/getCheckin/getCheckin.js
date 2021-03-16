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
        signButton: false,
        checkBox: [{
            value: 1,
            name: '签到'
        },
        {
            value: 2,
            name: '签退'
        }
        ],
        sign: {},
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
        that.isSign()
        let photo = wx.getStorageSync('photo')
        console.log(photo)
        if (photo !== null && photo.length !== 0) {
            that.createSignIn(photo)
        }
    },
    visibleChange: function () {
        let that = this
        that.setData({
            visible: !that.data.visible
        })
    },
    getCheckIn: function () {
        wx.showLoading({
            title: '请求中...'
        })
        let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/checkin', //这里填写你的接口路径
            method: 'GET',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
            },
            data: { //这里写你要请求的参数
                checkId: that.data.checkInId
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    if (new Date().getTime() < new Date(res.data.data.startTime).getTime())
                        res.data.data.status = 0
                    else if (new Date().getTime() > new Date(res.data.data.endTime).getTime())
                        res.data.data.status = 2
                    else res.data.data.status = 1
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
    isSign: function () {
        let that = this
        let url = app.globalData.backend
        console.log(that.data.checkInId)
        wx.request({
            url: url + '/api/checkin/isSign', //这里填写你的接口路径
            method: 'get',
            header: {
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
            },
            data: { //这里写你要请求的参数
                checkId: that.data.checkInId
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
                    that.setData({
                        isSign: res.data.data
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
        // console.log(new Date().getTime())
        // console.log(new Date(that.data.checkIn.endTime).getTime())
        if (new Date().getTime() <= new Date(that.data.checkIn.endTime).getTime()) {
            that.setData({
                buttonVisible: !that.data.buttonVisible
            })
            that.getQrCode()
            that.interval = setInterval(function () {
                that.getQrCode()
            }, 10000)
        } else {
            wx.showToast({
                icon: 'success',
                title: '签到已结束!'
            })
        }
    },
    getQrCode: function () {
        wx.showLoading({
            title: '请求中...'
        })
        let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/qrCode',
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
            },
            data: {
                checkInId: that.data.checkIn.id,
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
    },
    signIn: function () {
        let that = this
        if (new Date().getTime() <= new Date(that.data.checkIn.endTime).getTime() &&
            new Date().getTime() >= new Date(that.data.checkIn.startTime).getTime()) {
            wx.navigateTo({
                url: '../photo/photo?type=signin',
            })
        } else {
            wx.showToast({
                icon: 'none',
                title: '签到未开始或已结束!',
            })
        }
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
        wx.showLoading({
            title: '请求中...'
        })
        let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/checkin', //这里填写你的接口路径
            method: 'POST',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
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
        wx.setStorageSync('photo', null)
        wx.showLoading({
            title: '签到中...'
        })
        let that = this
        let url = app.globalData.backend
        let sign = {}
        // sign.photoId = photo
        sign.photoId = photo
        sign.signTime = new Date()
        sign.checkId = parseInt(that.data.checkInId)
        console.log(sign)
        wx.request({
            url: url + '/api/sign', //这里填写你的接口路径
            method: 'POST',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
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
    },
    showCheckIn: function () {
        wx.navigateTo({
            url: '../ShowCheckIn/ShowCheckIn?checkId=' + this.data.checkInId,
        })
    },
    signButton: function () {
        let that = this
        that.setData({
            signButton: !that.data.signButton
        })
        that.getSign()
    },
    getSign: function () {
        let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/sign/checkId/userId', //这里填写你的接口路径
            method: 'get',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
            },
            data: { //这里写你要请求的参数
                checkId: that.data.checkInId
            },
            success: function (res) {
                wx.hideLoading()
                console.log(res.data)
                if (res.data.code === 200) {
                    that.setData({
                        sign: res.data.data
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
    }
})