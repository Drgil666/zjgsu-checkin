const app=getApp()
Page({
  data:{
    signId:null,
    sign:{
      id:null,
      stuId:null,
      signTime:null,
      photoId:null,
      checkId:null,
    },
    photo:"../image/add-circle.png",
  },
  onLoad:function(e){
    console.log(e.id)
    let that=this
    that.setData({
      signId:e.id
    })
  },
  onShow:function(){
    let that=this
    that.getSign()
  },
  getSign:function(){
    let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/sign', //这里填写你的接口路径
            method: 'GET',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
            },
            data: { //这里写你要请求的参数
               id:that.data.signId
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
                   that.setData({
                     sign:res.data.data
                   })
                   that.getPhoto(that.data.sign.photoId)
                } else {
                    wx.showToast({
                        title: res.data.msg
                    })
                }
            },
            fail: function () {
                wx.hideLoading()
                wx.showToast({
                    title: '请求失败!',
                })
            }
        })
  },
  getPhoto:function(photoId){
    let that = this
        let url = app.globalData.backend
        wx.request({
            url: url + '/api/photo', //这里填写你的接口路径
            method: 'GET',
            header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                'Content-Type': 'application/json',
                'Token': app.globalData.Token
            },
            data: { //这里写你要请求的参数
               id:photoId
            },
            success: function (res) {
                wx.hideLoading()
                if (res.data.code === 200) {
                    console.log(res.data.data)
                   that.setData({
                     photo:"data:image/jpg;base64,"+res.data.data.photoId
                   })
                } else {
                    wx.showToast({
                        title: res.data.msg
                    })
                }
            },
            fail: function () {
                wx.hideLoading()
                wx.showToast({
                    title: '请求失败!',
                })
            }
        })
  }
})