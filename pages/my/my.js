// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    userid: null,
    username: null,
    stuNo: null,
    mail: null,
    status: null,
    photoId: null,
    nick: null,
    avatar: "123123"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var url = getApp().globalData.backend
    var userid = wx.getStorageSync('userid')
    console.log("userid:" + userid)
    wx.request({
      url: url+'/api/user', //这里填写你的接口路径
      method: 'GET',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        userId: userid
      },
      success: function (res) {
        if (res.data.code === 0) {
          console.log(res.data)
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  }
})