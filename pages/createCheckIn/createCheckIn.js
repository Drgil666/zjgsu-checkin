Page({
    data: {
        visible: true
    },
    onLoad: function (e) {

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