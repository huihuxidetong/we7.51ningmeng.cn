function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e, s = getApp(), i = s.requirejs("core"), o = s.requirejs("wxParse/wxParse"), n = s.requirejs("biz/diypage"), r = s.requirejs("biz/diyform"), d = s.requirejs("biz/goodspicker"), c = (s.requirejs("foxui"), 
s.requirejs("jquery"));

Page((e = {
    onPullDownRefresh: function() {
        var t = this;
        n.get(this, "home", function(a) {
            console.log(132), t.getDiypage(a), 0 == a.error && wx.stopPullDownRefresh();
        });
    },
    data: (a = {
        imgUrls: [ "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963648306&di=1194f5980cccf9e5ad558dfb18e895ab&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de87bbdad39ceef01f3a29797f.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963737453&di=b1472a710a2c9ba30808fd6823b16feb&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fwenwen%2Fuploads%2Fpic.wenwen.soso.com%2Fp%2F20160830%2F20160830220016-586751007.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3004162400,3684436606&fm=11&gp=0.jpg" ],
        indicatorDotss: !0,
        autoplays: !0,
        intervals: 2e3,
        durations: 500,
        circulars: !0,
        adveradmin: !0,
        clock: "",
        diypage: "true",
        route: "home",
        icons: s.requirejs("icons"),
        shop: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        storeRecommand: [],
        total: 1,
        page: 1,
        loaded: !1,
        loading: !0,
        indicatorDotsHot: !1,
        autoplayHot: !0,
        intervalHot: 5e3,
        durationHOt: 1e3,
        circularHot: !0,
        hotimg: "/static/images/hotdot.jpg",
        notification: "/static/images/notification.png",
        saleout1: "/static/images/saleout-1.png",
        saleout2: "/static/images/saleout-2.png",
        saleout3: "/static/images/saleout-3.png",
        play: "/static/images/video_play.png",
        mute: "/static/images/icon/mute.png",
        voice: "/static/images/icon/voice.png",
        specs: [],
        options: [],
        diyform: {},
        specsTitle: ""
    }, t(a, "total", 1), t(a, "active", ""), t(a, "slider", ""), t(a, "tempname", ""), 
    t(a, "buyType", ""), t(a, "areas", []), t(a, "closeBtn", !1), t(a, "soundpic", !0), 
    t(a, "modelShow", !1), t(a, "limits", !0), t(a, "result", {}), t(a, "showcoupon", !1), 
    t(a, "showcoupontips", !1), t(a, "topmenu", {}), t(a, "topmenuDataType", ""), t(a, "tabbarData", {}), 
    t(a, "tabbarDataType", ""), t(a, "istopmenu", !1), t(a, "seckillinfo", {}), t(a, "timer", 0), 
    t(a, "lasttime", 0), t(a, "hour", "-"), t(a, "min", "-"), t(a, "sec", "-"), a),
    getShop: function() {
        var t = this;
        i.get("shop/get_shopindex", {}, function(a) {
            o.wxParse("wxParseData", "html", a.copyright, t, "5"), t.setData({
                shop: a
            });
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand();
    },
    getRecommand: function() {
        var t = this;
        "true" != t.data.diypage && i.get("shop/get_recommand", {
            page: t.data.page
        }, function(a) {
            var e = {
                loading: !1,
                total: a.total
            };
            t.setData({
                loading: !1,
                total: a.total,
                show: !0
            }), a.list || (a.list = []), a.list.length > 0 && (t.setData({
                storeRecommand: t.data.storeRecommand.concat(a.list),
                page: a.page + 1
            }), a.list.length < a.pagesize && (e.loaded = !0));
        });
    },
    onLoad: function(t) {
        t = t || {};
        var a = this;
        wx.getSetting({
            success: function(t) {
                console.error(t), t.authSetting["scope.userInfo"] ? a.setData({
                    modelShow: !1
                }) : a.setData({
                    modelShow: !0
                });
            }
        });
        var e = decodeURIComponent(t.scene);
        if (!t.id && e) {
            var o = i.str2Obj(e);
            t.id = o.id, o.mid && (t.mid = o.mid);
        }
        setTimeout(function() {
            a.setData({
                areas: s.getCache("cacheset").areas
            });
        }, 3e3), s.url(t), n.get(this, "home", function(t) {
            if (console.log(t), a.getDiypage(t), void 0 != a.data.startadv && "" != a.data.startadv) {
                0 != a.data.startadv.status && "" != a.data.startadv || wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] && a.get_nopayorder();
                    }
                });
                var e = a.data.startadv.params;
                if ("default" == e.style) {
                    var i = e.autoclose;
                    !function t(e) {
                        a.setData({
                            clock: i
                        }), i <= 0 ? a.setData({
                            adveradmin: !1
                        }) : setTimeout(function() {
                            i -= 1, t(e);
                        }, 1e3);
                    }(a);
                }
                if (1 == e.showtype) {
                    var o = 1e3 * e.showtime * 60, n = s.getCache("startadvtime"), r = +new Date(), d = !0;
                    a.setData({
                        adveradmin: !0
                    }), n && r - n < o && (d = !1), a.setData({
                        adveradmin: d
                    }), d && s.setCache("startadvtime", r);
                }
                a.data.startadv.status;
            }
        }), a.setData({
            cover: !0,
            showvideo: !1
        }), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowWidth / 1.7;
                a.setData({
                    swiperheight: e
                });
            }
        });
    },
    onHide: function() {
        this.setData({
            adveradmin: !1,
            unpaid: !1
        });
    },
    onShow: function() {
        console.log(1235);
        var t = this, a = wx.getSystemInfoSync(), e = s.getCache("sysset");
        t.getShop(), t.getRecommand(), t.get_hasnewcoupon(), t.get_cpinfos(), wx.getSetting({
            success: function(a) {
                var e = a.authSetting["scope.userInfo"];
                console.log(e), t.setData({
                    limits: e
                });
            }
        });
        var i = e.shopname || "商城首页";
        t.data.pages && "" != t.data.pages.title && (i = t.data.diytitle), wx.setNavigationBarTitle({
            title: i
        }), t.data.pages && wx.setNavigationBarColor({
            frontColor: t.data.pages.titlebarcolor,
            backgroundColor: t.data.pages.titlebarbg
        }), t.setData({
            screenWidth: a.windowWidth
        });
    },
    goodsicon: function(t) {
        this.setData({
            iconheight: t.detail.height,
            iconwidth: t.detail.width
        });
    },
    getDiypage: function(t) {
        var a = this;
        c.each(t.diypage.items, function(t, e) {
            if ("topmenu" == e.id) {
                a.setData({
                    topmenu: e
                });
                var s = e.data[0].linkurl;
                i.get("diypage/getInfo", {
                    dataurl: s
                }, function(t) {
                    e.data[0].data = t.goods.list;
                });
            }
            if ("seckillgroup" == e.id) {
                var o = {};
                o.status = e.data.status, o.endtime = e.data.endtime, o.starttime = e.data.starttime, 
                a.initSeckill(o);
            }
        });
    },
    onShareAppMessage: function() {
        return i.onShareAppMessage();
    },
    imagesHeight: function(t) {
        var a = t.detail.width, e = t.detail.height, s = t.target.dataset.type, i = this;
        wx.getSystemInfo({
            success: function(t) {
                i.data.result[s] = t.windowWidth / a * e, (!i.data[s] || i.data[s] && result[s] < i.data[s]) && i.setData({
                    result: i.data.result
                });
            }
        });
    },
    bindInput: function(t) {
        this.setData({
            inputValue: t.detail.value
        });
    },
    t1: function(t) {
        n.fixedsearch(this, t);
    },
    startplay: function(t) {
        var a = t.target.dataset.cover;
        this.setData({
            cover: a,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("Video"), this.videoContext.play();
    },
    unpaidcolse: function(t) {
        var a = "";
        a = "open" == t.target.dataset.type, this.setData({
            unpaid: a
        });
    },
    unpaidcolse2: function(t) {
        this.setData({
            unpaidhide: !0
        });
    },
    get_nopayorder: function() {
        var t = this;
        i.get("shop/get_nopayorder", {}, function(a) {
            1 == a.hasinfo && t.setData({
                nopaygoods: a.goods,
                nopaygoodstotal: a.goodstotal,
                nopayorder: a.order,
                unpaid: !0
            });
        });
    },
    get_hasnewcoupon: function() {
        var t = this;
        i.get("shop/get_hasnewcoupon", {}, function(a) {
            1 == a.hasnewcoupon && t.setData({
                showcoupontips: !0
            });
        });
    },
    get_cpinfos: function() {
        var t = this;
        i.get("shop/get_cpinfos", {}, function(a) {
            1 == a.hascpinfos && t.setData({
                showcoupon: !0,
                cpinfos: a.cpinfos
            });
        });
    },
    adverclose: function() {
        this.setData({
            adveradmin: !1
        }), this.get_nopayorder();
    },
    indexChangebtn: function(t) {
        var a = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: a
        });
    }
}, t(e, "unpaidcolse", function(t) {
    var a = "";
    a = "open" == t.target.dataset.type, this.setData({
        unpaid: a
    });
}), t(e, "unpaidcolse2", function(t) {
    this.setData({
        unpaidhide: !0
    });
}), t(e, "selectPicker", function(t) {
    var a = this;
    wx.getSetting({
        success: function(e) {
            if (e.authSetting["scope.userInfo"]) {
                d.selectpicker(t, a, "goodslist"), a.setData({
                    cover: "",
                    showvideo: !1
                });
            } else a.setData({
                modelShow: !0
            });
        }
    });
}), t(e, "specsTap", function(t) {
    var a = this;
    d.specsTap(t, a);
}), t(e, "emptyActive", function() {
    this.setData({
        active: "",
        slider: "out",
        tempname: "",
        specsTitle: ""
    });
}), t(e, "buyNow", function(t) {
    var a = this;
    d.buyNow(t, a);
}), t(e, "getCart", function(t) {
    var a = this;
    d.getCart(t, a);
}), t(e, "select", function() {
    var t = this;
    d.select(t);
}), t(e, "inputNumber", function(t) {
    var a = this;
    d.inputNumber(t, a);
}), t(e, "number", function(t) {
    var a = this;
    d.number(t, a);
}), t(e, "onChange", function(t) {
    return r.onChange(this, t);
}), t(e, "DiyFormHandler", function(t) {
    return r.DiyFormHandler(this, t);
}), t(e, "selectArea", function(t) {
    return r.selectArea(this, t);
}), t(e, "bindChange", function(t) {
    return r.bindChange(this, t);
}), t(e, "onCancel", function(t) {
    return r.onCancel(this, t);
}), t(e, "onConfirm", function(t) {
    return r.onConfirm(this, t);
}), t(e, "getIndex", function(t, a) {
    return r.getIndex(t, a);
}), t(e, "changevoice", function() {
    this.data.sound ? this.setData({
        sound: !1,
        soundpic: !0
    }) : this.setData({
        sound: !0,
        soundpic: !1
    });
}), t(e, "phone", function() {
    var t = this.data.phonenumber + "";
    wx.makePhoneCall({
        phoneNumber: t
    });
}), t(e, "cancelclick", function() {
    this.setData({
        modelShow: !1
    });
}), t(e, "confirmclick", function() {
    this.setData({
        modelShow: !1
    });
}), t(e, "navigate", function(t) {
    var a = t.currentTarget.dataset.url, e = t.currentTarget.dataset.phone, s = t.currentTarget.dataset.appid, i = t.currentTarget.dataset.appurl;
    a && wx.navigateTo({
        url: a
    }), e && wx.makePhoneCall({
        phoneNumber: e
    }), s && wx.navigateToMiniProgram({
        appId: s,
        path: i
    });
}), t(e, "closecoupon", function() {
    this.setData({
        showcoupon: !1
    });
}), t(e, "closecoupontips", function() {
    this.setData({
        showcoupontips: !1
    });
}), t(e, "tabtopmenu", function(t) {
    var a = this, e = a.data.diypages, s = (e.items, t.currentTarget.dataset.id, t.currentTarget.dataset.url), o = t.currentTarget.dataset.type, n = a.data.topmenu, r = t.currentTarget.dataset.index;
    if (a.setData({
        topmenuindex: r
    }), "" != s && void 0 != s) {
        if (1 == s.indexOf("pages")) {
            var d = s.lastIndexOf("="), u = s.substring(d + 1, s.length);
            i.get("diypage", {
                id: u
            }, function(t) {
                if (0 == t.error) {
                    var e = [];
                    for (var s in t.diypage.items) e.push(t.diypage.items[s]);
                    e.unshift(n);
                    var i = new Object();
                    for (var r in e) i[r] = e[r], "topmenu" == e[r].id && (e[r].status = o);
                    t.diypage.items = i, a.setData({
                        diypages: t.diypage,
                        topmenuDataType: ""
                    });
                }
            });
        } else i.get("diypage/getInfo", {
            dataurl: s
        }, function(t) {
            a.data.topmenu;
            i.get("diypage", {
                type: "home"
            }, function(e) {
                var s = e.diypage;
                c.each(s.items, function(a, e) {
                    if ("topmenu" == e.id) {
                        e.status = o;
                        for (var s in e.data) s == o && (e.data[s].data = t.goods.list, t.goods.list.length <= 8 && (console.log(t.goods.list.length), 
                        e.data[s].showmore = !0, console.log(e.data[s])));
                    }
                }), 0 == e.error && a.setData({
                    diypages: e.diypage,
                    topmenuDataType: t.type
                });
            });
        });
        a.setData({
            diypages: e
        });
    }
}), t(e, "tabwidget", function(t) {
    var a = this, e = a.data.diypages, s = e.items, o = t.currentTarget.dataset.id, n = t.currentTarget.dataset.url, r = t.currentTarget.dataset.type;
    for (var d in s) d == o && (s[d].status = r);
    e.items = s, a.setData({
        diypages: e
    }), "" != n && void 0 != n && i.get("diypage/getInfo", {
        dataurl: n
    }, function(t) {
        console.error(e);
        for (var s in e.items) s == o && (e.items[s].data[r].data = t.goods.list, e.items[s].data[r].type = t.type, 
        e.items[s].type = t.type, t.goods.list.length <= 8 && (e.items[s].data[r].showmore = !0), 
        console.log(e.items[s]), a.setData({
            diypages: e
        }));
    });
}), t(e, "getstoremore", function(t) {
    var a = this, e = t.currentTarget.dataset.id, s = a.data.diypages;
    c.each(s.items, function(t, o) {
        if (t == e) if (void 0 == o.status || "" == o.status) {
            if (-1 != o.data[0].linkurl.indexOf("stores")) d = "stores"; else d = "goods";
            var n = o.data[0].linkurl, r = o.data[0].data.length;
            i.get("diypage/getInfo", {
                dataurl: n,
                num: r,
                paramsType: d
            }, function(t) {
                o.data[0].data = t.goods.list, console.error(t.goods), o.data[0].data.length == t.goods.count && (o.data[0].showmore = !0), 
                a.setData({
                    diypages: s
                });
            });
        } else {
            if (-1 != o.data[o.status].linkurl.indexOf("stores")) d = "stores"; else var d = "goods";
            var n = o.data[o.status].linkurl, r = o.data[o.status].data.length;
            i.get("diypage/getInfo", {
                dataurl: n,
                num: r
            }, function(t) {
                o.data[o.status].data = t.goods.list, console.error(t.goods.count), o.data[o.status].data.length == t.goods.count && (o.data[o.status].showmore = !0), 
                a.setData({
                    diypages: s
                });
            });
        }
    });
}), t(e, "userinfo", function(t) {
    var a = t.detail.iv, e = t.detail.encryptedData;
    s.getUserInfo(null, null, {
        iv: a,
        encryptedData: e
    });
}), t(e, "initSeckill", function(t) {
    var a = this, e = parseInt(t.status), i = t.starttime, o = t.endtime;
    if (-1 != e) {
        var n = 0, r = 0, d = s.globalData.approot;
        wx.request({
            url: d + "map.json",
            success: function(s) {
                var d = new Date(s.header.Date) / 1e3;
                n = 0 == e ? o - d : i - d, a.setData({
                    lasttime: n
                }), clearInterval(a.data.timer), a.setTimer(t), r = a.setTimerInterval(t), a.setData({
                    timer: r
                });
            }
        });
    }
}), t(e, "setTimer", function(t) {
    var a = this, e = 0;
    if (-1 != t.status && parseInt(a.data.lasttime) % 10 == 0) {
        var i = s.globalData.approot;
        wx.request({
            url: i + "map.json",
            success: function(s) {
                var i = new Date(s.header.Date) / 1e3;
                e = 0 == t.status ? t.endtime - i : t.starttime - i, a.setData({
                    lasttime: e
                });
            }
        });
    }
    e = parseInt(a.data.lasttime) - 1;
    var o = a.formatSeconds(e);
    a.setData({
        lasttime: e,
        hour: o.hour,
        min: o.min,
        sec: o.sec
    }), e <= 0 && a.onLoad();
}), t(e, "setTimerInterval", function(t) {
    var a = this;
    return setInterval(function() {
        a.setTimer(t);
    }, 1e3);
}), t(e, "formatSeconds", function(t) {
    var a = parseInt(t), e = 0, s = 0;
    return a > 60 && (e = parseInt(a / 60), a = parseInt(a % 60), e > 60 && (s = parseInt(e / 60), 
    e = parseInt(e % 60))), {
        hour: s < 10 ? "0" + s : s,
        min: e < 10 ? "0" + e : e,
        sec: a < 10 ? "0" + a : a
    };
}), e));