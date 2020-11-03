const app = getApp()
Page({
    data: {
        checkinlist: [
            {
                "id": 1,
                "userId": 1,
                "startTime": "2020-11-02 18:58:48",
                "endTime": "2020-11-02 18:58:48",
                "status": 0,
                "type": 1,
                "visible": 1,
                "nick": "签到1"
            },
            {
                "id": 2,
                "userId": 1,
                "startTime": "2020-11-02 18:58:48",
                "endTime": "2020-11-02 18:58:48",
                "status": 1,
                "type": 1,
                "visible": 1,
                "nick": "签到2"
            }
        ]
    },
    onLoad: function () {

    },
    onShow: function () {
        //添加选中效果
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0 //这个数是，tabBar从左到右的下标，从0开始
            })
        }
    },
    createcheckin: function () {
        wx.navigateTo({
            url: '../createCheckin/createCheckin',
        })
    },
    getcheckin: function (e) {
        var id = e.currentTarget.dataset.id
        console.log(id)
        wx.navigateTo({
          url: '../getCheckin/getCheckin?checkId='+id,
        })
    }
})