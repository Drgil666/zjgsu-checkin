Page({
    data:{
        courseid:null
    },
    onLoad:function(option)
    {
        console.log(option)
        var that=this
        var courseid=parseInt(option.courseid)
        that.setData({
            courseid:courseid
        })
        console.log(that.data.courseid)
    }
})