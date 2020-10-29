const app=getApp()
Page({
    stu: function () {
        app.globalData.list = [{
            "pagePath": "/pages/stu/stu",
            "text": "我参与的签到"
          },
          {
            "pagePath": "/pages/my/my",
            "text": "个人信息"
          },
        ]
        wx.switchTab({
            url: '../stu/stu',
        })
    },
    teacher: function () {
        app.globalData.list = [{
            "pagePath": "/pages/teacher/teacher",
            "text": "我发起的签到"
          },
          {
            "pagePath": "/pages/my/my",
            "text": "个人信息"
          },
        ]
        wx.switchTab({
            url: '../teacher/teacher',
        })
    }
})