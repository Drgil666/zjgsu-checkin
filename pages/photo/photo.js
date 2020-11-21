const app = getApp()
Page({
  data: {
    accessToken: null,
    photobase64: null
  },
  onLoad: function () {
    let that = this
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
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];//上一页的数据
        prevPage.setData({
          photo: photobase64
        })
        that.setData({
          photobase64: photobase64
        })
        console.log(that.humanCheck(photobase64))
        wx.navigateBack({
          delta: 0,
        })
      },
    })
  },
  onUnload: function () {
    wx.showToast({
      title: '更新成功',
      icon: 'success'
    })
  },
  getAccessToken: function () {
    let that = this
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + app.globalData.apiKey + '&client_secret=' + app.globalData.secretKey,
      method: 'post',
      data: {},
      success: function (res) {
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
    wx.showLoading({
      title: '活体识别中...',
    }),
      wx.request({
        url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceverify?access_token=' + that.data.accessToken,
        method: 'post',
        data: [
          {
            image: photobase64,
            image_type: "BASE64",
            "face_field": "age,beauty,spoofing",
            "option": "COMMON"
          }
        ],
        success: function (res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.error_msg === "SUCCESS") {
            console.log(res.data.result.face_liveness)
            if (res.data.result.face_liveness >= 0.95) {
              wx.showToast({
                icon:'success',
                title: '活体识别成功!',
              })
              return true;
            }
          }
          else {
            wx.showToast({
              icon: 'none',
              title: '未识别到人脸!请重新拍摄!',
            })
            return false;
          }
        },
        fail: function () {
          wx.hideLoading()
          wx.showToast({
            title: '请求失败,请重试!',
          })
          return false;
        }
      })
  }
})