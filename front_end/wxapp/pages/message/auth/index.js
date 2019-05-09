var e = getApp(), t = require("./../../../utils/core.js");

Page({
    data: {
        close: 0,
        text: ""
    },
    onLoad: function(e) {
        this.setData({
            close: e.close,
            text: e.text
        });
    },
    onShow: function() {
        var t = e.getCache("sysset").shopname;
        wx.setNavigationBarTitle({
            title: t || "提示"
        });
    },
    bind: function() {
        var e = this, t = setInterval(function() {
            wx.getSetting({
                success: function(n) {
                    var i = n.authSetting["scope.userInfo"];
                    i && (wx.reLaunch({
                        url: "/pages/index/index"
                    }), clearInterval(t), console.log(i), e.setData({
                        userInfo: i
                    }));
                }
            });
        }, 1e3);
    },
    bindGetUserInfo: function(n) {
        wx.login({
            success: function(i) {
                t.post("wxapp/login", {
                    code: i.code
                }, function(i) {
                    i.error ? t.alert("获取用户登录态失败:" + i.message) : t.get("wxapp/auth", {
                        data: n.detail.encryptedData,
                        iv: n.detail.iv,
                        sessionKey: i.session_key
                    }, function(t) {
                        1 == t.isblack && wx.showModal({
                            title: "无法访问",
                            content: "您在商城的黑名单中，无权访问！",
                            success: function(t) {
                                t.confirm && e.close(), t.cancel && e.close();
                            }
                        }), n.detail.userInfo.openid = t.openId, n.detail.userInfo.id = t.id, n.detail.userInfo.uniacid = t.uniacid, 
                        e.setCache("userinfo", n.detail.userInfo, 7200), e.setCache("userinfo_openid", n.detail.userInfo.openid), 
                        e.setCache("userinfo_id", t.id), wx.reLaunch({
                            url: "/pages/member/index/index"
                        });
                    });
                });
            },
            fail: function() {
                t.alert("获取用户信息失败!");
            }
        });
    }
});