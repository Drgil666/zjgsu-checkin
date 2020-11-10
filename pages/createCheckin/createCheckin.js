var util = require('../../utils/util.js');
Page({
    data: {
        nick: null,
        date: null,
        time: null,
        date1: null,
        time1: null,
        switchChecked: true,
        visible: true,
        checkbox: [
            {
                checked: false,
                name: "签到",
                value: "1"
            },
            {
                checked: false,
                name: "签退",
                value: "2"
            }
        ],
        ischecked: []
    },
    onLoad() {
        let that = this
        var time = util.formatTime(new Date());
        // console.log(time)
        that.setData({
            date: util.tsFormatTime(time, "Y-M-D"),
            date1: util.tsFormatTime(time, "Y-M-D"),
            time: util.tsFormatTime(time, "h:m"),
            time1: util.tsFormatTime(time, "h:m")
        })
    },
    switchChange: function () {
        let that = this
        that.setData({
            switchChecked: !that.data.switchChecked
        })
    },
    bindDateChange1: function (e) {
        let that = this
        var time = util.formatTime(new Date());
        time = util.tsFormatTime(time, "Y-M-D")
        var repTime = Date.parse(time.replace(/-/g, '/'))
        var settime = e.detail.value
        var repTime2 = Date.parse(settime.replace(/-/g, '/'))
        if (repTime <= repTime2) {
            that.setData({
                date: e.detail.value
            })
        }
        else {
            wx.showToast({
                icon: 'none',
                title: '发起日期有误',
            })
        }
    },
    bindTimeChange1: function (e) {
        let that = this
        var time = util.formatTime(new Date());
        var repTime = Date.parse(time.replace(/-/g, '/'))
        var settime = that.data.date + " " + e.detail.value
        var repTime2 = Date.parse(settime.replace(/-/g, '/'))
        console.log(repTime)
        console.log(repTime2)
        if (repTime <= repTime2) {
            that.setData({
                time: e.detail.value
            })
        }
        else {
            wx.showToast({
                icon: 'none',
                title: '发起时间有误',
            })
        }
    },
    bindDateChange2: function (e) {
        let that = this
        var time = that.data.date
        var repTime = Date.parse(time.replace(/-/g, '/'))
        var settime = e.detail.value
        var repTime2 = Date.parse(settime.replace(/-/g, '/'))
        if (repTime <= repTime2) {
            that.setData({
                date1: e.detail.value
            })
        }
        else {
            wx.showToast({
                icon: 'none',
                title: '发起日期有误',
            })
        }
    },
    bindTimeChange2: function (e) {
        let that = this
        var settime = that.data.date1 + " " + e.detail.value
        var repTime2 = Date.parse(settime.replace(/-/g, '/'))
        var settime1 = that.data.date + " " + that.data.time
        var repTime = Date.parse(settime1.replace(/-/g, '/'))
        console.log(repTime)
        console.log(repTime2)
        if (repTime <= repTime2) {
            that.setData({
                time1: e.detail.value
            })
        }
        else {
            wx.showToast({
                icon: 'none',
                title: '发起时间有误',
            })
        }
    },
    checkboxChange: function (e) {
        let that = this
        that.setData({
            ischecked: e.detail.value
        })
    },
    visibleChange: function () {
        let that = this
        that.setData({
            visible: !that.data.visible
        })
    },
    nickChange: function (e) {
        let that = this
        var nick = e.detail.value
        console.log(e.detail.value)
        that.setData({
            nick: nick
        })
    },
    createCheckin: function () {
        wx.showLoading({ title: '创建中...' })
        var url = getApp().globalData.backend
        let that = this
        console.log("createCheckin")
        console.log(that.data.date, that.data.time)
        console.log(that.data.date1, that.data.time1)
        console.log(that.data.visible)
        console.log(that.data.ischecked)
        console.log(that.data.nick)
        var settime1 = that.data.date + " " + that.data.time
        var Time1 = Date.parse(settime1.replace(/-/g, '/'))
        var settime2 = that.data.date1 + " " + that.data.time1
        var Time2 = Date.parse(settime2.replace(/-/g, '/'))
        if (that.data.switchChecked === true && Time1 > Time2) {
            wx.showToast({
                icon: 'none',
                title: '结束时间不能早于起始时间!'
            })
        }
        else if (that.data.nick === null) {
            wx.showToast({
                icon: 'none',
                title: '签到名不能为空!'
            })
        }
        else if (that.data.ischecked.length === 0) {
            wx.showToast({
                title: '请选择签到类型!',
            })
        }
        else {
            var count = parseInt(0)
            for (var index in that.data.ischecked) {
                count = parseInt(count) + parseInt(that.data.ischecked[index])
            }
            var checkin = {}
            checkin.nick = that.data.nick
            checkin.startTime = Time1 + ""
            checkin.endTime = Time2 + ""
            if (that.data.visible === true) {
                checkin.visible = 1
            }
            else {
                checkin.visible = 0
            }
            checkin.userId = wx.getStorageSync('userid')
            checkin.status = 0
            checkin.type = count
            console.log(checkin)
            wx.request({
                url: url + '/api/checkin', //这里填写你的接口路径
                method: 'POST',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                data: { //这里写你要请求的参数
                    method: "create",
                    key: [],
                    data: checkin
                },
                success: function (res) {
                    wx.hideLoading()
                    console.log(res.data)
                    wx.showToast({
                        title: '创建成功!',
                        icon: 'success'
                    })
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: 0,
                        })
                    }, 2000) //延迟时间 这里是1秒
                },
                fail: function () {
                    wx.hideLoading()
                    wx.showToast({
                        icon: 'none',
                        title: '创建失败!'
                    })
                }
            })
        }
    }
})