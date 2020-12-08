const app = getApp()
Page({
  data: {
    accessToken: null,
    photobase64: null,
    type: null,
    signIn: null,
    photoId: null,
    userphoto: null,
  },
  onLoad: function (e) {
    let that = this
    console.log(e.type)
    that.setData({
      type: e.type
    })
    that.getAccessToken()
    that.getPhoto()
  },
  // 拍摄按钮按下, 执行record 触发拍摄
  record: function () {
    let that = this
    this.data.cameraContext = wx.createCameraContext()
    this.data.cameraContext.takePhoto({
      quality: "high", //高质量的图片
      success: res => {
        let tempImagePath = res.tempImagePath //res.tempImagePath照片文件在手机内的的临时路径
        let photobase64 = wx.getFileSystemManager().readFileSync(tempImagePath, "base64")
        // console.log(photobase64)
        that.setData({
          photobase64: photobase64
        })
        wx.showLoading({
          title: '活体识别中...'
        })
        that.humanCheck(photobase64)
      },
    })
  },
  onUnload: function () {

  },
  getAccessToken: function () {
    let that = this
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + app.globalData.apiKey + '&client_secret=' + app.globalData.secretKey,
      method: 'post',
      data: {},
      success: res => {
        console.log(res.data)
        that.setData({
          accessToken: res.data.access_token
        })
      },
      fail: function () {
        console.log("get Access Token Failed!")
      }
    })
  },
  humanCheck: function (photobase64) {
    let that = this
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceverify?access_token=' + that.data.accessToken,
      method: 'post',
      data: [{
        image: photobase64,
        image_type: "BASE64",
        "face_field": "age,beauty,spoofing,quality",
        "option": "COMMON"
      }],
      success: res => {
        wx.hideLoading()
        // console.log(res.data)
        if (res.data.error_msg === "SUCCESS") {
          console.log(res.data.result.face_liveness)
          //活体识别阀值设置
          if (res.data.result.face_liveness >= app.globalData.threshold) {
            that.compareCheck(that.data.userphoto, photobase64)
          } else {
            wx.showToast({
              icon: 'success',
              title: '人脸吻合度不足!请调整重新拍照!',
            })
          }
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败,请重试!',
        })
      }
    })
  },
  compareCheck: function (userphoto, photobase64) {
    console.log(userphoto)
    // console.log(photobase64)
    let that = this
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/match?access_token=' + that.data.accessToken,
      method: 'post',
      data: [{
          "image": photobase64,
          "image_type": "BASE64",
          "face_type": "LIVE",
          "quality_control": "LOW",
          "liveness_control": "HIGH"
        },
        {
          "image": userphoto,
          "image_type": "BASE64",
          "face_type": "IDCARD",
          "quality_control": "LOW",
          "liveness_control": "HIGH"
        }
      ],
      success: function (res) {
        console.log(res.data)
        if (res.data.error_code === 0) {
          if (res.data.result.score >= app.globalData.compareThreshold) {
            wx.showToast({
                title: '人脸识别成功!',
                icon: 'success',
              }),
              that.createPhoto(photobase64)
          } else {
            wx.showToast({
              icon: 'success',
              title: '人脸对比失败!请重新拍摄',
            })
          }
        } else {
          wx.showToast({
            icon: 'success',
            title: '人脸对比失败!请重新拍摄',
          })
        }
      }
    })
  },
  createPhoto: function (photobase64) {
    console.log("createphoto")
    let url = app.globalData.backend
    let that = this
    wx.request({
      url: url + '/api/photo',
      method: 'post',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json;charset=utf-8',
        'Token': app.globalData.Token
      },
      data: {
        method: "create",
        key: [],
        data: {
          photoId: photobase64
        }
      },
      success: res => {
        console.log(res.data.data)
        that.setData({
          photoId: res.data.data.id
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000)
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败,请重试!',
        })
      }
    })
  },
  getPhoto: function () {
    let url = app.globalData.backend
    let that = this
    wx.request({
      url: url + '/api/photo',
      method: 'get',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json;charset=utf-8',
        'Token': app.globalData.Token
      },
      data: {},
      success: res => {
        // console.log(res.data.data.photoId)
        that.setData({
          userphoto: res.data.data.photoId
        })
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败,请重试!',
        })
      }
    })
  }
})