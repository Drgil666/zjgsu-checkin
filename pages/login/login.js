Page({
    data:{
      hidden:true
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
              console.log('通过login接口的code换取openid')
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
                   wx.setStorage({
                     data: openIdRes.data.openid,
                     key: 'userid',
                   })
                   that.setData({
                    hidden:true
                  })
                      console.info("登录成功返回的openId：" + openIdRes.data.openid);
                      wx.switchTab({
                        url: '../index/index',
                      })
                 },
                 fail: function(error) {
                  that.setData({
                    hidden:true
                  })
                  wx.showToast({
                    title: '获取用户openId失败',
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
    },
    getopenid:function()
    {
        
    }
})