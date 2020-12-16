const app = getApp()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: null,
    photo: null,
    school: ["浙江工商大学", "浙江大学"],
    academy: ["信息学院", "信电学院"],
    major: ["计算机科学与技术", "软件工程"],
    schoolIndex: 0,
    academyIndeX: 0,
    majorIndex: 0
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
        'Token': app.globalData.Token
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
          that.setData({
            schoolIndex: that.data.userinfo.school,
            academyIndex: that.data.userinfo.academy,
            majorIndex: that.data.userinfo.major
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
      url: '../photo/photo?type=user',
    })
  },
  schoolChange: function (e) {
    // console.log(e)
    let that = this
    let userinfo = that.data.userinfo
    userinfo.school = e.detail.value
    that.setData({
      schoolIndex: e.detail.value,
    })
    this.updateuser(e)
  },
  academyChange: function (e) {
    // console.log(e)
    let that = this
    let userinfo = that.data.userinfo
    userinfo.academy = e.detail.value
    that.setData({
      academyIndex: e.detail.value,
    })
    this.updateuser(e)
  },
  majorChange: function (e) {
    // console.log(e)
    let that = this
    let userinfo = that.data.userinfo
    userinfo.major = e.detail.value
    that.setData({
      majorIndex: e.detail.value,
    })
    this.updateuser(e)
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
        'Content-Type': 'application/json',
        'Token': app.globalData.Token
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