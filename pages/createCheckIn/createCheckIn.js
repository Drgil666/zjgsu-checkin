Page({
    data: {
        visible: true,
        timeList: [],
        timeIndex: 10
    },
    onLoad: function (e) {
        let that=this
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
    visibleChange: function () {
        let that=this
        that.setData({
            visible: !that.data.visible
        })
    },
    createCheckin:function()
    {
        console.log("createCheckin")
    }
})