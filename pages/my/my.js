// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: null,
    photo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    var url = getApp().globalData.backend
    var userid = wx.getStorageSync('userid')
    console.log("userid:" + userid)
    wx.request({
      url: url + '/api/user', //这里填写你的接口路径
      method: 'GET',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json',
        'Token':app.globalData.token
      },
      /*data: { //这里写你要请求的参数
        userId: userid
      },*/
      success: function (res) {
        if (res.data.code === 200) {
          console.log(res.data)
          that.setData({
            userinfo: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  },
  takephoto: function () {
    console.log('take photo')
    wx.navigateTo({
      url: '../photo/photo',
    })
  },
  updateuser: function (e) {
    var url = getApp().globalData.backend
    let that = this
    let value = e.detail.value
    let type = e.currentTarget.dataset.type
    let userinfo = that.data.userinfo
    if (type == "name") {
      userinfo.nick = value
    }
    else if (type == "stuNo") {
      userinfo.stuNo = value
    }
    else if (type == "mail") {
      userinfo.mail = value
    }
    else if (type == "school") {
      userinfo.school = value
    }
    else if (type == "academy") {
      userinfo.academy = value
    }
    else if (type == "major") {
      userinfo.major = value
    }
    wx.request({
      url: url + '/api/user', //这里填写你的接口路径
      method: 'POST',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        method: "update",
        key: [],
        data: userinfo
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        })
      }
    })
  },
  onShow: function () {
  }
})