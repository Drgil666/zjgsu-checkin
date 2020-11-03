Page({
    data:{
        checkId:null,
    },
    onLoad:function(e)
    {
        let that=this
        that.setData({
            checkId:e.checkId
        })
        console.log(that.data.checkId)
    }
})