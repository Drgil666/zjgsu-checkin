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
    if (that.data.type === "signin")
      that.getPhoto()
  },
  // 拍摄按钮按下, 执行record 触发拍摄
  record: function () {
    let that = this
    this.data.cameraContext = wx.createCameraContext()
    this.data.cameraContext.takePhoto({
      quality: "low", //高质量的图片
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
            if (that.data.type === "signin") {
              that.compareCheck(that.data.userphoto, photobase64)
            }
            else if (that.data.type === "user") {
              that.createPhoto(photobase64)
            }
          } else {
            wx.showToast({
              icon: 'none',
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
        "liveness_control": "LOW"
      },
      {
        "image": userphoto,
        "image_type": "BASE64",
        "face_type": "IDCARD",
        "quality_control": "LOW",
        "liveness_control": "LOW"
      }
      ],
      success: function (res) {
        console.log(res.data)
        if (res.data.error_code === 0) {
          console.log(res.data.result.score)
          if (res.data.result.score >= app.globalData.compareThreshold) {
            wx.showToast({
              title: '人脸识别成功!',
              icon: 'none',
            }),
              that.createPhoto(photobase64)
          }
          else {
            wx.showToast({
              icon: 'none',
              title: '人脸对比失败!请重新拍摄',
            })
          }
        }
        else {
          wx.showToast({
            icon: 'none',
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
        wx.setStorageSync('photo', res.data.data.id)
        if (that.data.type === "user") {
          wx.showToast({
            title: '人脸录入成功!',
            icon: 'success'
          })
        }
        setTimeout(function () {
          wx.navigateBack({
            delta: 0,
          })
        }, 1000)
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
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
        console.log(res.data)
        if (res.data.code !== 200) {
          wx.showToast({
            title: '用户照片获取失败!',
            icon: 'none'
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 0,
            })
          }, 1000)
        }
        else {
          if (res.data.data != null) {
            that.setData({
              userphoto: res.data.data.photoId
            })
          }else{
            wx.showToast({
              title: '用户照片未录入!请去个人界面录入照片!',
              icon:'none'
            })
          }
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '请求失败,请重试!',
        })
      }
    })
  },
})