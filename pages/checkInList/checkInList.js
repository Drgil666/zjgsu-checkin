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
            courseId:courseid
        })
        console.log(that.data.courseid)
    }
})