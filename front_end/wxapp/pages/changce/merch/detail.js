function h(t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t;
}
var t = getApp(), a = t.requirejs("core"), b = t.requirejs("jquery"), s = t.requirejs("biz/diyform"), c = t.requirejs("biz/goodspicker"), l = t.requirejs("foxui");
// t.requirejs("jquery");
var o = t.requirejs("foxui");
Page({
    data: {
        merchid: 0,
        merch: [],
        cateid: 0,
        page: 1,
        isnew: 0,
        isrecommand: 0,
        loading: !1,
        loaded: !1,
        list: [],
        numtotal:[],
        approot: t.globalData.approot,
        modelShow: !1,
        count: 0,
        params: {
          keywords: "",
          order: "",
          by: "desc",
        },
        listmode: "block",
        tempname:"",
        formdataval: {},
        showPicker: !1,
        limits: !0,
        modelShow: !1,
        showgoods: !0,
        hidegoodsprice : 1,
        level: 0
    },
    onLoad: function(t) {
      var i = this;
      this.setData({
          merchid: t.id,
      }), this.getMerch(), this.getList(),
        a.get("quick/index/getCart", {
          quickid: ""
        }, function (t) {
          var a = [];
          for (var e in t.simple_list) a[e] = t.simple_list[e];
          i.setData({
            numtotal: a,
            main: t
          });
        }), wx.hideLoading(), wx.setNavigationBarTitle({
          title: t.pagetitle
        });
    
        //this.shopCarList();
    },
    getMerch: function() {
        var t = this;
        a.get("changce/merch/get_detail", {
            id: t.data.merchid
        }, function(a) {
            t.setData({
                merch: a.merch
            });
        });
    },
    getList: function() {
        var t = this;
        a.loading(), this.setData({
            loading: !0
        }), a.get("changce/merch/goods_list", {
            page: this.data.page,
            cateid: this.data.cateid,
            id: t.data.merchid,
            isnew: this.data.isnew,
            isrecommand: this.data.isrecommand,
            order: this.data.params.order,
            by: this.data.params.by,
            keywords: this.data.params.keywords,
        }, function(e) {
            var i = {
              loading: !1,
              count: e.total,
              pagesize: e.pagesize,
              hidegoodsprice: e.hidegoodsprice,
              level: e.level
            };
            e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list), 
            e.list.length < e.pagesize && (i.loaded = !0), t.setSpeed(e.list)), t.setData(i), 
            a.hideLoading();
        });
    },
    clickrec: function() {
        this.setData({
            isrecommand: 1,
            isnew: 0,
            page: 1,
            loading: !1,
            loaded: !1,
            list: []
        }), this.getList();
    },
    clicknew: function() {
        this.setData({
            isrecommand: 0,
            isnew: 1,
            page: 1,
            loading: !1,
            loaded: !1,
            list: []
        }), this.getList();
    },
    clickall: function() {
        this.setData({
            isrecommand: 0,
            isnew: 0,
            page: 1,
            loading: !1,
            loaded: !1,
            list: []
        }), this.getList();
    },
    setSpeed: function(t) {
        if (t && !(t.length < 1)) for (var a in t) {
            var e = t[a];
            if (!isNaN(e.lastratio)) {
                var i = e.lastratio / 100 * 2.5, s = wx.createContext();
                s.beginPath(), s.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), 
                s.setStrokeStyle("rgba(0,0,0,0.2)"), s.setLineWidth(4), s.stroke(), s.beginPath(), 
                s.arc(34, 35, 30, .5 * Math.PI, i * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), s.setStrokeStyle("#ffffff"), 
                s.setLineWidth(4), s.setLineCap("round"), s.stroke();
                var n = "coupon-" + e.id;
                wx.drawCanvas({
                    canvasId: n,
                    actions: s.getActions()
                });
            }
        }
    },
    bindTab: function(t) {
        var e = a.pdata(t).cateid;
        this.setData({
            cateid: e,
            page: 1,
            list: []
        }), this.getList();
    },
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.count || this.getList();
    },
    jump: function(t) {
        var e = a.pdata(t).id;
        e > 0 && wx.navigateTo({
            url: "/pages/sale/coupon/detail/index?id=" + e
        });
    },
    goBack: function(t) {
        wx.navigateBack({});
    },
    selectPicker: function (t) {
      var e = this;
      e.setData({
        total: 1,
        active: "",
      });
      //console.log(e);
      wx.getSetting({
        success: function (a) {
          var limits = a.authSetting["scope.userInfo"];
          if (limits) {
            c.selectpicker(t, e, "goodslist");
          } else e.setData({
            modelShow: !0
          });
        }
      }); 
  },
  emptyActive: function () {
    this.setData({
      active: "",
      slider: "out",
      tempname: "",
      specsTitle: ""
    });
  },
  buyNow: function (t) {
    var e = this;
    c.buyNow(t, e);
  },
  getCart: function (t) {
    var i = this;
    c.getCart(t, i);
    a.get("quick/index/getCart", {
      quickid: ""
    }, function (t) {
      var a = [];
      for (var e in t.simple_list) a[e] = t.simple_list[e];
      i.setData({
        numtotal: a,
        main: t
      });
    }), wx.hideLoading(), wx.setNavigationBarTitle({
      title: t.pagetitle
    });
  },
  select: function () {
    var t = this;
    c.select(t);
  },
  inputNumber: function (t) {
    var e = this;
    c.inputNumber(t, e);
  },
  number: function (t) {
    var e = this;
    c.number(t, e);
  },
  bindSort: function (t) {
    var e = t.currentTarget.dataset.order, a = this.data.params;
    if ("" == e) {
      if (a.order == e) return;
      a.order = "", this.setData({
        listorder: ""
      });
    } else if ("minprice" == e) this.setData({
      listorder: ""
    }), a.order == e ? "desc" == a.by ? a.by = "asc" : a.by = "desc" : a.by = "asc",
      a.order = e, this.setData({
        listorder: a.by
      }); else if ("sales" == e) {
        if (a.order == e) return;
        this.setData({
          listorder: ""
        }), a.order = "sales", a.by = "desc";
      }
    this.setData({
      params: a,
      page: 1,
      list: [],
      loading: !0,
      loaded: !1
    }), this.getList();
  },
  changeMode: function () {
    "block" == this.data.listmode ? this.setData({
      listmode: ""
    }) : this.setData({
      listmode: "block"
    });
  },
  bindSearch: function (t) {
    t.target, this.setData({
      list: [],
      loading: !0,
      loaded: !1
    });
    var a = b.trim(t.detail.value), i = this.data.params;
    "" != a ? (i.keywords = a, this.setData({
      page: 1,
      params: i,
      fromsearch: !1
    }), this.getList()) : (i.keywords = "", this.setData({
      page: 1,
      params: i,
      listorder: "",
      fromsearch: !1
    }), this.getList());
  },
  bindInput: function (t) {
    var a = b.trim(t.detail.value), s = this.data.params;
    s.keywords = a;
    this.setData({
      page: 1,
      list: [],
      loading: !0,
      loaded: !1,
      params: s,
      fromsearch: !0
    }), this.getList();
  },
  bindFocus: function (t) {
    console.log(t); 
    "" == b.trim(t.detail.value) && this.setData({
      fromsearch: !0
    });
  },
  bindback: function () {
    var s = this.data.params;
    s.keywords = "";
    this.setData({
      page: 1,
      list: [],
      loading: !0,
      loaded: !1,
      params: s,
      fromsearch: !1,
    }), this.getList();
  },
  shopCarList: function () {
    var t = this;
    this.setData({
      clickCar: !0,
      cartcartArr: [],
      showPicker: !0
    });
    a.get("quick/index/getCart", {
      quickid: a
    }, function (a) {
      t.setData({
        main: a
      });
      for (var r = [], i = 0; i < a.list.length; i++) r[i] = a.list[i].goodsid;
      t.setData({
        tempcartid: r
      });
    });
  },
  gopay: function () {
    var e = this;
    console.log(e.data.limits);
    if (e.data.limits) {
      var t = 1 == this.data.main.cartdata ? this.data.pageid : "";
      this.data.main.list.length ? wx.navigateTo({
        url: "/pages/order/create/index?fromquick=" + t
      }) : l.toast(this, "请先添加商品到购物车");
    } else e.setData({
      modelShow: !0
    });
  },
  shopCarHid: function () {
    var e = this;
    console.log(e.data);
    if (e.data.limits) {
      this.setData({
        clickCar: !1,
        showPicker: !1
      });
    } else e.setData({
      modelShow: !0
    });
  },
  cartaddcart: function (t) {
    var b = this, e = 1 == this.data.main.cartdata ? this.data.pageid : "", i = "0" == t.currentTarget.dataset.id ? t.currentTarget.dataset.goodsid : t.currentTarget.dataset.id, o =     t.currentTarget.dataset.add;
    t.currentTarget.dataset.min == t.currentTarget.dataset.num && "reduce" == o && (o = "delete"),
      a.get("quick/index/update", {
        quickid: e,
        goodsid: t.currentTarget.dataset.goodsid,
        optionid: "0" == t.currentTarget.dataset.id ? "" : t.currentTarget.dataset.id,
        update: "",
        total: "",
        type: o,
        typevalue: 1
      }, function (e) {
        if (console.log(e), 0 == e.error) {
          var r = b.data.cartcartArr;
          r[i] = e.goodsOptionTotal || 0 == e.goodsOptionTotal ? e.goodsOptionTotal : e.goodstotal;
          var o = b.data.main;
          o.total = e.total, o.totalprice = e.totalprice;
          var n = b.data.numtotal;
          n[t.currentTarget.dataset.goodsid] = e.goodstotal, b.setData({
            cartcartArr: r,
            main: o,
            numtotal: n
          });
        } else l.toast(b, e.message);
      });
  },
  clearShopCartFn: function (t) {
    var b = this, e = 1 == this.data.main.cartdata ? this.data.pageid : "";
    a.get("quick/index/clearCart", {
      quickid: e
    }, function (t) {
      console.log(t);
      var e = b.data.main;
      console.log(111);
      console.log(e);
      e.list=[];
      e.total = 0;
      e.totalprice = 0;
      for (var r = b.data.tempcartid, i = [], s = 0; s < r.length; s++){ 
        i[Number(r[s])] = -1;
      }
      b.setData({
        main: e,
        clickCar: !1,
        numtotal: i,
        clearcart: !1,
        showPicker: !1
      });
    });
  },
  cancelclick: function () {
    this.setData({
      modelShow: !1
    });
  },
  confirmclick: function () {
    this.setData({
      modelShow: !1
    }), wx.openSetting({
      success: function (t) { }
    });
  }
});