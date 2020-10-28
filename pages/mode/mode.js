Page({
    stu: function () {
        wx.switchTab({
            url: '../stu/stu',
        })
    },
    teacher: function () {
        wx.navigateTo({
            url: '../teacher/teacher',
        })
    }
})