//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'the truth that you leave',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        timer: null
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.data.timer = setInterval(() => {
            this.daojishi()
        }, 1000)

    },
    onUnload() {
        clearInterval(this.data.timer)
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    daojishi() {
        let start = Date.parse(new Date("2018-05-03 21:00:00"))
        //   console.log(new Date("2018-05-03"))
        let now = Date.parse(new Date())
        //   console.log(now)
        let daojishi = (now - start) / 1000
        let day = Math.floor(daojishi / 86400);
        let hour = Math.floor(daojishi % 86400 / 3600);
        let minute = Math.floor(daojishi % 86400 % 3600 / 60);
        let sec = Math.floor(daojishi % 86400 % 3600 % 60);
        let time = `${day} 天 ${hour} 小时 ${minute} 分 ${sec} 秒`
        this.setData({
            time
        })
    }
})
