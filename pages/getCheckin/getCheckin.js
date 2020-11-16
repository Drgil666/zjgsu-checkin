Page({
    data:{
        checkInId:2
    },
    onLoad:function(e)
    {
        let that=this
        console.log(e.checkInId)
        that.setData({
            checkInId:e.checkInId
        })
    }
})