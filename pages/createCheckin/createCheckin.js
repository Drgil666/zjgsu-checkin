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
        ]
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
        console.log(e.detail.value)

    },
    visibleChange: function () {
        let that = this
        that.setData({
            visible: !that.data.visible
        })
    },
    nickChange:function(e)
    {
        let that=this
        var nick=e.detail.value
        console.log(e.detail.value)
        that.setData({
            nick:nick
        })
    },
    createCheckin: function () {
        let that = this
        console.log("createCheckin")
        console.log(that.data.date, that.data.time)
        console.log(that.data.date1, that.data.time1)
        console.log(that.data.visible)
        console.log(that.data.checkbox)
        console.log(that.data.nick)
    }
})