//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'A Demo',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user: {},
    uservis: false,
    photostring: '',
    photovis: false,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {},
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getcheck: function (e) {
    var that = this
    that.setData({
      user: {},
      uservis: true
    })
    var id = e.currentTarget.dataset.userid
    console.log(id)
    wx.request({
      url: 'http://10.21.234.24:8080/api/user', //这里填写你的接口路径
      method: 'GET',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: { //这里写你要请求的参数
        userId: id
      },
      success: function (res) {
        //这里就是请求成功后，进行一些函数操作
        console.log(res.data)
        that.setData({
          user: res.data,
          uservis: true
        })
        // console.log(that.data.user)
      }
    })
  },
  takePhoto: function () {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64"))
      }
    })
  },
  transformBase: function () {
    let that = this;
    that.setData({
      photovis: false,
      photostring: ''
    })
    var FSM = wx.getFileSystemManager().readFileSync('pages/index/test1.png', 'base64');
    console.log(FSM)
    //循环将得到的图片转换为Base64
    that.setData({
      photovis: true,
      photostring: FSM
    })
  }
})
