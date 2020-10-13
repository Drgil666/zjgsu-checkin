Page({
    data:{
      hidden:true,
      userid:null,
      openid:null
    },
    onLoad:function(){
      var that=this
      that.setData({
        hidden:false
      })
      wx.login({
      success: function (res) {
          console.log(res)
           if (res.code) {
               wx.request({
                 url: 'https://api.weixin.qq.com/sns/jscode2session',
                 data: {
                   appid: 'wx3ed951293baeadc9',
                   secret: '0d75d409db2e94ce3bed3a611b23ac25',
                   grant_type: 'authorization_code',
                   js_code: res.code
                 },
                 method: 'GET',
                 header: { 'content-type': 'application/json'},
                 success: function(openIdRes){
                   that.setData({
                    hidden:true,
                  })
                      console.info("登录成功返回的openId：" + openIdRes.data.openid);
                      wx.setStorageSync('openid', openIdRes.data.openid)
                      wx.request({
                        url: 'http://10.21.234.24:8080/login', //这里填写你的接口路径
                        method: 'POST',
                        header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
                          'Content-Type': 'application/json'
                        },
                        data: { //这里写你要请求的参数
                          username: openIdRes.data.openid
                        },
                        success: function (res) {
                          if(res.data.code===0)
                          {
                            that.setData({
                              userid:res.data.data
                            })
                            console.log(that.data.userid)
                            wx.setStorage({
                              data: that.data.userid,
                              key: 'userid',
                            })
                            wx.switchTab({
                              url: '../index/index',
                            })
                          }
                          else
                          {
                            wx.showToast({
                              title: res.data.msg,
                            })
                          }
                        }
                      })
                 },
                 fail: function(error) {
                  that.setData({
                    hidden:true
                  })
                  wx.showToast({
                    title: '获取用户openId失败',
                    icon:'none',
                    duration:2000
                  })
                     console.info(error);
                 }
              })
            }
          }
      })
    },
    getuserinfo:function()
    {
        wx.getUserInfo({
            lang:"zh_CN",
          success:function(res)
          {
              console.log(res)
          }
        })
    }
})