Page({
    data: {
        checkSetId: 1,
        role: null,
        userId: wx.getStorageSync('userid'),
        visible: 1,
        nick: "Web前端技术开发",
        checkInList: [
            {
                id: 1,
                startTime: 100000000,
                endTime: 100000000,
                status: 1,
                type: 1,
                visible: 1,
                setId: 1
            },
            {
                id: 2,
                startTime: 100000000,
                endTime: 100000000,
                status: 2,
                type: 2,
                visible: 1,
                setId: 1
            },
        ],
        timeList: [],
        timeIndex: 10,
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
    onLoad: function (e) {
        let that = this
        that.timeListSet()
        that.setData({
            role: e.role + "",
            checkSetId: e.checkSetId
        })
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
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../getCheckIn/getCheckIn?checkInId=' + id
        })
    },
    createCheckIn: function () {
        wx.navigateTo({
          url: '../createCheckIn/createCheckIn',
        })
    }
})