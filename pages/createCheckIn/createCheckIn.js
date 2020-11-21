const app = getApp()
var utils = require('../../utils/util.js')
Page({
    data: {
        visible: true,
        timeList: [],
        timeIndex: 10,
        type: 0,
        remainTime: 10 * 1000 * 60,
        checkSetId: null,
        checkBox: [
            { value: 1, name: '签到' },
            { value: 2, name: '签退' }
        ]
    },
    onLoad: function (e) {
        let that = this
        console.log(e.checkSetId)
        that.setData({
            checkSetId: e.checkSetId
        })
        that.timeListSet()
    },
    timeListSet: function () {
        let timeList = []
        for (let index = 0; index <= 60; index++) {
            timeList[index] = index;
        }
        let that = this
        that.setData({
            timeList: timeList
        })
    },
    checkboxChange: function (e) {
        console.log(e.detail.value)
        let type = 0
        let that = this
        for (let index in e.detail.value) {
            type = type + parseInt(e.detail.value[index])
        }
        console.log(type)
        that.setData({
            type: type
        })
    },
    visibleChange: function () {
        let that = this
        that.setData({
            visible: !that.data.visible
        })
    },
    pickChange: function (e) {
        console.log(e.detail.value)
        let that = this
        that.setData({
            remainTime: e.detail.value * 60 * 1000,
            timeIndex: e.detail.value
        })
    },
    createCheckin: function () {
        let visible;
        let that = this
        if (that.data.visible === true) {
            visible = 1;
        }
        else {
            visible = 0;
        }
        if (that.data.type === 0) {
            wx.showToast({
                icon: 'none',
                title: '请选择签到环节!',
            })
            return;
        }
        let url = app.globalData.backend
        let now = new Date().getTime()
        console.log(now)
        wx.showLoading({ title: '创建签到环节中...' })
        wx.request({
            url: url + '/api/checkin',
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: { //这里写你要请求的参数
                method: 'create',
                data: {
                    startTime: now,
                    endTime: now + that.data.remainTime,
                    status: 0,
                    visible: visible,
                    type: that.data.type,
                    setId: that.data.checkSetId
                },
                key: []
            },
            success: function (res) {
                console.log(res.data)
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
                    wx.showToast({
                        icon: 'success',
                        title: '创建成功!',
                    })
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 0,
                        })
                    }, 1000)
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