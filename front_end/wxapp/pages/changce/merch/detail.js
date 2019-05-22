
var t = getApp(), a = t.requirejs("core"), b = t.requirejs("jquery"), s = t.requirejs("biz/diyform"), c = t.requirejs("biz/goodspicker");
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
        approot: t.globalData.approot,
        modelShow: !1,
        count: 0,
        params: {
          keywords: "",
          order: "",
          by: "desc",
        },
        listmode: "block",
    },
    onLoad: function(t) {
        this.setData({
            merchid: t.id,
        }), this.getMerch(), this.getList();
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
                pagesize: e.pagesize
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
    var e = this;
    c.getCart(t, e);
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
});