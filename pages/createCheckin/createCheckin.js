var util = require('../../utils/util.js');
Page({
    data: {
        nick: null,
        timeList: [],
        timeIndex: 10,
        time:10,
        visible:true
    },
    onLoad() {
        let timeList = []
        for (let index = 0; index <= 60; index++) {
            timeList[index] = index;
        }
        console.log(timeList);
        let that = this
        that.setData({
            timeList: timeList
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
    bindTimeChange: function (e) {
        console.log(e.detail.value)
        that.setData({
            time:parseInt(e.detail.value)
        })
    },
    visibleChange:function()
    {
        that.setData({
            visible:!that.data.visible
        })
    },
    createCheckin: function () {
        wx.showLoading({ title: '创建中...' })
        var url = getApp().globalData.backend
        let that = this
        console.log("createCheckin")
        var checkin = {}
        checkin.nick = that.data.nick
        // checkin.startTime=new Date();
        // checkin.EndTime=new Date()+that.data.time*60*1000
        if (that.data.visible === true) {
            checkin.visible = 1
        }
        else {
            checkin.visible = 0
        }
        checkin.userId = wx.getStorageSync('userid')
        console.log(checkin)
        // wx.request({
        //     url: url + '/api/checkin', //这里填写你的接口路径
        //     method: 'POST',
        //     header: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     data: { //这里写你要请求的参数
        //         method: "create",
        //         key: [],
        //         data: checkin
        //     },
        //     success: function (res) {
        //         wx.hideLoading()
        //         console.log(res.data)
        //         wx.showToast({
        //             title: '创建成功!',
        //             icon: 'success'
        //         })
        //         setTimeout(function () {
        //             wx.navigateBack({
        //                 delta: 0,
        //             })
        //         }, 2000) //延迟时间 这里是1秒
        //     },
        //     fail: function () {
        //         wx.hideLoading()
        //         wx.showToast({
        //             icon: 'none',
        //             title: '创建失败!'
        //         })
        //     }
        // })
    }
})