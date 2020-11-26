const app = getApp()
Page({
  data: {
    accessToken: null,
    photobase64: null,
    type: null,
    signIn: null,
  },
  onLoad: function (e) {
    let that = this
    console.log(e.type)
    that.setData({
      type: e.type
    })
    that.getAccessToken()
  },
  // 拍摄按钮按下, 执行record 触发拍摄
  record: function () {
    let that = this
    this.data.cameraContext = wx.createCameraContext()
    this.data.cameraContext.takePhoto({
      quality: "high", //高质量的图片
      success: res => {
        let tempImagePath = res.tempImagePath//res.tempImagePath照片文件在手机内的的临时路径
        let photobase64 = wx.getFileSystemManager().readFileSync(tempImagePath, "base64")
        console.log(photobase64)
        that.setData({
          photobase64: photobase64
        })
        wx.showLoading({ title: '活体识别中...' })
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
      data: [
        {
          image: photobase64,
          image_type: "BASE64",
          "face_field": "age,beauty,spoofing,quality",
          "option": "COMMON"
        }
      ],
      success: res => {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.error_msg === "SUCCESS") {
          console.log(res.data.result.face_liveness)
          //活体识别阀值设置
          if (res.data.result.face_liveness >= app.globalData.threshold) {
            wx.showToast({
              title: '识别成功!',
              icon: 'success',
            })
            wx.setStorageSync('photo', photobase64)
          setTimeout(function () {
            wx.navigateBack({
              delta: 0,
            })
          }, 1500)
        }
        else {
          wx.showToast({
            icon: 'success',
            title: '未识别到人脸!请重新识别!',
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
  }
})