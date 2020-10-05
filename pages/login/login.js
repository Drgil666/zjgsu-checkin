Page({
  data: {
    username: "",
    password: "",
    hidden: true //true表示不显示
  },
  //读取本地的账号密码缓存
  onLoad: function () {
    var that = this
    wx.getStorage({
        key: 'username',
        success: function (res) {

          that.setData({
            username: res.data
          })
        },
        fail: function () {}
      }),
      wx.getStorage({
        key: 'password',
        success: function (res) {
          that.setData({
            password: res.data
          })
        },
        fail: function () {}
      })
  },
  login: function (e) {
    var that = this
    var username = e.detail.value.username
    var password = e.detail.value.password
    console.log(username + " " + password)
    that.setData({
      hidden: false
    })
    wx.request({
      url: 'http://10.21.234.24:8080/login', //这里填写你的接口路径
      method: 'post',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        username: username,
        password: password
      },
      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        console.log(res.data)
        if (res.data.code == 0) {
          wx.setStorage({
              data: username,
              key: 'username'
            }),
            wx.setStorage({
              data: password,
              key: 'password'
            }),
            that.setData({
              hidden: true
            }),
            wx.switchTab({
              url: '../index/index',
            })
        } else {
          that.setData({
            hidden: true
          })
          wx.showToast({
            title: '用户名或密码错误!',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function () {
        that.setData({
          hidden: false
        })
        wx.showToast({
          title: '请求失败!',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})