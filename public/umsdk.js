! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).ULink = t() }(this, (function() { "use strict";

    function e(t) { return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(t) }

    function t(e, t) { for (var n = 0; n < t.length; n++) { var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o) } }

    function n(e) { return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e } return n(function(e) { var t = { exports: {} }; return e(t, t.exports), t.exports }((function(n) {
        function o(t) { return (o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) { return e(t) } : function(t) { return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : e(t) })(t) } var r = function(e) { return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e }(function(e) { var t = { exports: {} }; return function(e, t) { e.exports = function() { var e = { 67: function(e, t, n) { n.r(t), n.d(t, { beforeSend: function() { return b }, enter: function() { return w }, getGateway: function() { return O }, getMetaInfo: function() { return g }, getNextTrackCode: function() { return f }, install: function() { return E }, setGateway: function() { return x }, setLinkInstances: function() { return _ }, setMetaInfo: function() { return v }, trackEvent: function() { return h }, trackLinkConfig: function() { return T }, trackLinkWakeup: function() { return S }, trackShare: function() { return k } }); var o = {};

                                    function r(e) {
                                        (e = e || {}).method = (e.method || "POST").toUpperCase(), e.url = e.url || "", e.data = e.data || null, e.success = e.success || function() {}, e.error = e.error || function() {}; var t = new XMLHttpRequest,
                                            n = []; for (var o in e.data) n.push(o + "=" + encodeURIComponent(e.data[o])); var r = n.join("&"),
                                            i = JSON.stringify(e.data || {}); "POST" === e.method ? (t.open(e.method, e.url, !0), t.setRequestHeader("Content-Type", "text/plain")) : "GET" === e.method && t.open(e.method, e.url + "?" + r, !0), t.withCredentials = !0, t.timeout = 3e3, t.onreadystatechange = function() { if (4 == t.readyState && 200 == t.status) { var n = {}; try { n = JSON.parse(t.responseText) } catch (e) {}
                                                e.success(n) } else 4 == t.readyState && e.error(t.staus) }, "POST" === e.method ? t.send(i) : t.send() }

                                    function i(e) { return "function" == typeof e }

                                    function a(e) { return Array.isArray(e) }
                                    n.r(o), n.d(o, { beforeSend: function() { return b }, enter: function() { return w }, getGateway: function() { return O }, getMetaInfo: function() { return g }, getNextTrackCode: function() { return f }, setGateway: function() { return x }, setLinkInstances: function() { return _ }, setMetaInfo: function() { return v }, trackEvent: function() { return h }, trackShare: function() { return k } }); var c = [],
                                        u = "https://c.umsns.com",
                                        l = { jsver: "1.2.6", trackkey: "um_tc", root_track_key: "um_rtc", appkey: "", oid: "", trackcode: "", root_track_code: "", trackurl: "" },
                                        d = function(e) {},
                                        s = function() { return [] };

                                    function f(e) { r({ url: u + "/ulink/getTC", method: "POST", data: { appkey: l.appkey, openId: l.oid, unionId: l.uid, from: l.from, trackCode: l.trackcode, rootTrackCode: l.root_track_code, url: l.trackurl ? l.trackurl : location.href }, success: function(t) { i(e) && t && t.data && t.data.trackCode ? e(t.data.trackCode) : e("") }, error: function() { i(e) && e("") } }) } var p = null,
                                        m = [];

                                    function h(e, t, n, o) { var r = t || {};
                                        r._um_id = e, r._um_tp = n || 0, r._um_ts = Date.now(), c.push(r), m.push(o); var i = 1e3; return r._um_send_defer ? ("number" == typeof r._um_send_defer && r._um_send_defer >= 0 && (i = r._um_send_defer), clearTimeout(p), void(p = setTimeout((function() { clearTimeout(p), p = null, y() }), i))) : 1 === r._um_tp || 4 === r._um_tp || 5 === r._um_tp ? (i = 0, clearTimeout(p), void(p = setTimeout((function() { clearTimeout(p), p = null, y() }), i))) : void(null === p && (p = setTimeout((function() { clearTimeout(p), p = null, y() }), i))) }

                                    function y() { for (var e = []; c.length > 0;) e.unshift(c.shift()); var t, n;
                                        n = function(e) { for (; m.length > 0;) { var t = m.shift();
                                                i(t) && t(e) } }, a((t = { e: e, h: l }).e) && t.e.length > 0 && (function() { var e = s(),
                                                t = []; if (a(e))
                                                for (var n = 0; n < e.length; n++) e[n] && e[n].opts && t.push(e[n].opts.id);
                                            a(e) && e.length > 0 && v({ lids: t.join(",") }), v({ trackurl: l.trackurl || location.href }) }(), d(t), r({ url: u + "/slink_logs", method: "POST", data: t, success: function(e) { n(!0) }, error: function() { n(!1) } })) }

                                    function k(e, t) { h("_um_share", e || {}, 3, t) }

                                    function w(e, t) { var n = e || {};
                                        n.page = n.page ? n.page : location.href, n.page_name = n.page_name ? n.page_name : document.title, h("_um_pv", n, 1, t) }

                                    function v(e) { return function(e, t) { if (null == e) throw new TypeError("Cannot convert undefined or null to object"); for (var n = Object(e), o = 1; o < arguments.length; o++) { var r = arguments[o]; if (null != r)
                                                    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]) } }(l, e || {}), l }

                                    function g() { return l }

                                    function b(e) { i(e) && (d = e) }

                                    function _(e) { i(e) && (s = e) }

                                    function x(e) { return e && (u = e), u }

                                    function O() { return u }

                                    function T(e, t) { h("_um_config", e || {}, 4, t) }

                                    function S(e, t) { h("_um_wakeup", e || {}, 5, t) }

                                    function E(e, t) { e.tracker = o, _(e.getInstances) } } },
                            t = {};

                        function n(o) { if (t[o]) return t[o].exports; var r = t[o] = { exports: {} }; return e[o](r, r.exports, n), r.exports } return n.d = function(e, t) { for (var o in t) n.o(t, o) && !n.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: t[o] }) }, n.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.r = function(e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n(67) }() }(t), t.exports }()),
            i = navigator.userAgent || "";

        function a(e) { var t = e.toLowerCase(); if (n("android")) return "android"; if (n("ipad") || n("iphone") || n("ipod")) return "ios"; if (n("windows phone")) return "windows phone"; if (n("win32") || n("win64") || n("wow32") || n("wow64")) return "windows"; if (n("mac")) return "os x"; if (n("linux")) return "linux";

            function n(e) { return t.indexOf(e) > -1 } return "unknown" }

        function c() { return console.log(a(i)), "android" === a(i) }

        function u() { return "ios" === a(i) || "os x" === a(i) } var l = i,
            d = /micromessenger\/([\d.]+)/i.test(i),
            s = /qq\/([\d.]+)/i.test(i),
            f = /(qqbrowser)\/([\d.]+)/i.test(i),
            p = /qzone\/.*_qz_([\d.]+)/i.test(i),
            m = /DINGTALK\/([\d.]+)/i.test(i);

        function h(e, t) { for (var n = t || !1, o = {}, r = (e || window.location.search.slice(1)).split("&"), i = 0; i < r.length; i++) { var a = r[i].split("="),
                    c = a[0]; if (c) { var u = "";
                    a.length > 1 && (u = n ? decodeURIComponent(a[1]) : a[1]), o[c] = u } } return o }

        function y(e) { return Array.isArray(e) }

        function k(e) { return "function" == typeof e } var w = Object.freeze({ __proto__: null, isArray: y, isFunction: k, isAndroid: c, isIOS: u, userAgent: l, isWechat: d, isQQ: s, isQQBrowser: f, isQzone: p, isDingTalk: m, getUriParams: h, getUriDecodeParams: function(e) { return h(e, !0) } }),
            v = window.screen || {},
            g = "".concat(window.devicePixelRatio || "");

        function b() { var e = h(),
                t = r.getMetaInfo(),
                n = t.root_track_key,
                o = t.trackkey; if (n && o) { var i = {};
                e[n] && !t.root_track_code && (i.root_track_code = e[n]), e[o] && !t.trackcode && (i.trackcode = e[o]), r.setMetaInfo(i) } }

        function _(e, t, n) { var i = e || {};
            b(); var a = t || function() {},
                l = n || function() {}; if (i.id) { var d = h(),
                    s = i.data || {},
                    f = r.getMetaInfo();
                d.um_from_appkey && (s.um_from_appkey = d.um_from_appkey), d.um_chnnl && (s.um_chnnl = d.um_chnnl), f.root_track_code && (s.um_rtc = f.root_track_code), f.trackcode && (s.um_tc = f.trackcode); var p = "android";
                u() ? p = "ios" : c() && (p = "android"); var m = { linkid: i.id, platform: p, um_from_appkey: d.um_from_appkey, um_chnnl: d.um_chnnl };! function(e) { var t = e || {};
                    t.method = (t.method || "POST").toUpperCase(), t.url = t.url || "", t.data = t.data || null, t.success = t.success || function() {}, t.error = t.error || function() {}; var n = new XMLHttpRequest,
                        o = []; for (var r in t.data)({}).hasOwnProperty.call(t.data, r) && o.push("".concat(r, "=").concat(encodeURIComponent(t.data[r]))); var i = o.join("&"),
                        a = JSON.stringify(t.data || {}); "POST" === t.method ? (n.open(t.method, t.url, !0), n.setRequestHeader("Content-Type", "text/plain")) : "GET" === t.method && n.open(t.method, "".concat(t.url, "?").concat(i), !0), n.withCredentials = !0, n.timeout = 6e3, n.onreadystatechange = function() { if (4 === n.readyState && 200 === n.status) { var e = {}; try { e = JSON.parse(n.responseText) } catch (e) { console.log(e) }
                            t.success(e) } else 4 === n.readyState && t.error(n.staus) }, "POST" === t.method ? n.send(a) : n.send() }({ url: "".concat(r.getGateway(), "/deeplink/init"), data: { linkId: i.id, platform: p, oid: f.oid, uid: f.uid, sw: v.width, sh: v.height, dpr: g, href: window.location.href, data: s }, success: function(e) { 200 === e.code ? ("object" === o(e.data) && (m.appkey = e.data.appkey, m.type = e.data.type, m.wakeupUrl = e.data.wakeupUrl, m.downloadUrl = e.data.downloadUrl, m.code = e.code, m.clipboardToken = e.data.clipboardToken), a(e.data || {}), r.trackLinkConfig(m)) : (l(e), m.code = e.code, r.trackLinkConfig(m)) }, error: function() { l({ code: 999999, msg: "????????????????????????" }), m.code = 999999, r.trackLinkConfig(m) } }) } else l({}) }

        function x(e) { window.top && window.top.location ? window.top.location.href = e : window.location.href = e }

        function O(e, t) { if (console.log("evokeByLocation"), e) { var n = t || {}; if (void 0 !== n.delay) { var o = n.delay || 0;
                    setTimeout((function() { x(e) }), o) } else x(e) } }
        b(); var T, S, E = null;

        function C(e, t) { var n = setTimeout((function() { void 0 !== T && document[T] || e() }), t || 0),
                o = S;
            void 0 !== o ? document.addEventListener(o, (function() { clearTimeout(n) })) : window.addEventListener("pagehide", (function() { clearTimeout(n) })) }

        function D(e, t) { "string" == typeof t && document.addEventListener("click", (function(n) { for (var o = n.target; o && !o.matches(t);) o = o.parentNode, document === o && (o = null);
                o && e(o) })) }

        function I() { var e = [],
                t = !1;

            function n(n) { if (!t && ("readystatechange" !== n.type || "complete" === document.readyState && "interactive" === document.readyState)) { for (var o = 0; o < e.length; o++) e[o].call(document);
                    t = !0 } } return document.addEventListener && (document.addEventListener("DOMContentLoaded", n, !1), document.addEventListener("readystatechange", n, !1), window.addEventListener("load", n, !1)),
                function(n) { t || "complete" === document.readyState || "interactive" === document.readyState ? n.call(document) : e.push(n) } }! function(e) { void 0 !== e.hidden ? (T = "hidden", S = "visibilitychange") : void 0 !== e.msHidden ? (T = "msHidden", S = "msvisibilitychange") : void 0 !== e.webkitHidden && (T = "webkitHidden", S = "webkitvisibilitychange") }(document), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(e) { for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;); return n > -1 }); var L = function(e) { var t; if ("SELECT" === e.nodeName) e.focus(), t = e.value;
                else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) { var n = e.hasAttribute("readonly");
                    n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), n || e.removeAttribute("readonly"), t = e.value } else { e.hasAttribute("contenteditable") && e.focus(); var o = window.getSelection(),
                        r = document.createRange();
                    r.selectNodeContents(e), o.removeAllRanges(), o.addRange(r), t = o.toString() } return t },
            A = function() {
                function n(e) {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, n), this.resolveOptions(e), this.initSelection() } var o, r, i; return o = n, (r = [{ key: "resolveOptions", value: function() { var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = "" } }, { key: "initSelection", value: function() { this.text ? this.selectFake() : this.target && this.selectTarget() } }, { key: "createFakeElement", value: function() { var e = "rtl" === document.documentElement.getAttribute("dir");
                        this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[e ? "right" : "left"] = "-9999px"; var t = window.pageYOffset || document.documentElement.scrollTop; return this.fakeElem.style.top = t + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.fakeElem } }, { key: "selectFake", value: function() { var e = this,
                            t = this.createFakeElement();
                        this.fakeHandlerCallback = function() { return e.removeFake() }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.container.appendChild(t), this.selectedText = L(t), this.copyText(), this.removeFake() } }, { key: "removeFake", value: function() { this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null) } }, { key: "selectTarget", value: function() { this.selectedText = L(this.target), this.copyText() } }, { key: "copyText", value: function() { var e; try { e = document.execCommand(this.action) } catch (t) { e = !1 }
                        this.handleResult(e) } }, { key: "handleResult", value: function(e) { this.emitter.emit(e ? "success" : "error", { action: this.action, text: this.selectedText, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) }) } }, { key: "clearSelection", value: function() { this.trigger && this.trigger.focus(), document.activeElement.blur(), window.getSelection().removeAllRanges() } }, { key: "action", get: function() { return this._action }, set: function(e) { if (void 0 === e && (e = "copy"), this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"') } }, { key: "target", get: function() { return this._target }, set: function(t) { if (void 0 !== t) { if (!t || "object" != e(t) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element'); if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'); if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                            this._target = t } } }, { key: "destroy", value: function() { this.removeFake() } }]) && t(o.prototype, r), i && t(o, i), Object.defineProperty(o, "prototype", { writable: !1 }), n }();

        function U(e) { var t = e.opts || {},
                n = e.solution || {},
                o = ""; if ("string" == typeof n.clipboardToken && n.clipboardToken.length > 0) { if (!0 === t.useClipboard || void 0 === t.useClipboard) o = n.clipboardToken;
                else if ("function" == typeof t.useClipboard) try { o = t.useClipboard.call(e, n.clipboardToken) } catch (e) { console.log(e) }
                "string" == typeof o && o.length > 0 && new A({ action: "copy", container: document.body, emitter: { emit: function() {} }, text: o, trigger: document.body }) } return o } var P = [],
            N = function e(t, n) {
                function r(t) { if ("object" === o(t)) { var n = e.start(t, !0);
                        t.lazy ? (t.auto && n.ready((function(e) { I()((function() { e.wakeup({ action: "load", timeout: t.timeout, proxyOpenDownload: t.proxyOpenDownload, beforeOpenDownload: t.beforeOpenDownload, afterOpenDownload: t.afterOpenDownload }) })) })), D((function(e) { n.ready((function() { n.wakeup({ action: "click", timeout: t.timeout, className: e.className, elementId: e.id, proxyOpenDownload: t.proxyOpenDownload, beforeOpenDownload: t.beforeOpenDownload, afterOpenDownload: t.afterOpenDownload }) })) }), t.selector)) : (n.ready((function(e) { t.auto && I()((function() { e.wakeup({ action: "load", timeout: t.timeout, proxyOpenDownload: t.proxyOpenDownload, beforeOpenDownload: t.beforeOpenDownload, afterOpenDownload: t.afterOpenDownload }) })) })), D((function(e) { n.wakeup({ action: "click", timeout: t.timeout, className: e.className, elementId: e.id, proxyOpenDownload: t.proxyOpenDownload, beforeOpenDownload: t.beforeOpenDownload, afterOpenDownload: t.afterOpenDownload }) }), t.selector)) } } if (n) this.opts = t, P.push(this);
                else if (y(t))
                    for (var i = 0; i < t.length; i++) r(t[i]);
                else r(t) }; for (var M in N.version = "1.1.5", N.prototype = { ready: function(e) { var t = this,
                        n = this.opts || {},
                        o = function() {};
                    k(e) && (k(n.onready) && (o = n.onready), _(n, (function(n) { console.log("U-Link loadSolution success: ", n), t.solution = n, o.call(t, t), e(t) }), (function(n) { console.log("U-Link loadSolution error: ", n), o.call(t, t, n), e(t, n) }))) }, wakeup: function(e) { var t, n, o, i = e || {},
                        a = this,
                        l = 3e3,
                        h = a.opts || {},
                        y = a.solution || {}; if ("scheme" === y.type && (l = 200), "string" == typeof i.action && ["click", "load", "exp"].indexOf(e.action) > -1 && (a.opts.action = i.action), k(i.proxyOpenDownload) && (t = i.proxyOpenDownload), k(i.beforeOpenDownload) && (n = i.beforeOpenDownload), k(i.afterOpenDownload) && (o = i.afterOpenDownload), "number" == typeof i.timeout && (l = i.timeout), d && !u() && (l = 0), U.call(a, a), "scheme" === y.type ? (function(e, t, n, o) { var i, a = n || {},
                                l = o || {},
                                d = t || {},
                                s = "";
                            u() ? s = "ios" : c() && (s = "android"), i = setTimeout((function() { k(e) && e(null, "timeout") }), 1500), r.trackLinkWakeup({ biztype: "dl-wakeup", linkid: d.id || "", wakeupUrl: a.wakeupUrl || "", downloadUrl: a.downloadUrl || "", appkey: a.appkey, action: d.action || "", elementId: l.elementId || "", className: l.className || "", platform: s }, (function(t) { clearTimeout(i), k(e) && e(t) })) }(null, h, y, { className: i.className, elementId: i.elementId }), y.wakeupUrl && (s || u() && (f || p) ? function(e) { console.log("evokeByTagA"); var t = document.createElement("a");
                            t.setAttribute("href", e), t.style.display = "none", document.body.appendChild(t), t.click() }(y.wakeupUrl) : m ? function() { console.log("evokeByDownload"); var e = document.createElement("a");
                            e.setAttribute("download", "u.gif"), e.setAttribute("href", window.location.href), e.style.display = "none", document.body.appendChild(e), e.click() }() : O(y.wakeupUrl))) : y.wakeupUrl && O(y.wakeupUrl), y.downloadUrl) { var w = function(e) { n && n.call(a), "scheme" === y.type && (d || s) && void 0 !== h.useOpenInBrowerTips ? function(e, t) { E || ((E = document.createElement("div")).id = "umeng_mask", "default" === e ? (E.style = "position:fixed;left:0;top:0;background:rgba(0,0,0,0.8);width:100%;height:100%;z-index:19910324;", E.innerHTML = '<div style="text-align:right; margin-top:2%; margin-right:5%;"><img style="width:90%; margin:0 auto;" src="//gw.alicdn.com/imgextra/i4/O1CN01UErd1C1xDN2zSmD5r_!!6000000006409-2-tps-1216-226.png"></div>') : "function" == typeof e && (E.innerHTML = e.call(t, t)), E.onclick = function() { document.body.removeChild(E), E = null }, document.body.appendChild(E)) }(h.useOpenInBrowerTips, a) : function(e) { window.ulinkOpenDownload = function() { window.location.href = e }, E || ((E = document.createElement("div")).style = "position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,0.2);font-size:14px;z-index:99999999999;", E.innerHTML = '<div style="box-sizing:border-box;text-align:left;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:80%;max-width:500px;height:130px;padding:20px;background:#fff;color:#666;">\n    <div onclick="window.ulinkCloseDownloadTip()" style="position:absolute;top:5px;right:5px;font-size:20px;width:20px;text-align:center;color:#999;">???</div>\n    ????????????????????????????????????????????????????????????????????????APP?????????????????????????????????????????????????????????n    <div onclick="window.ulinkOpenDownload()" style="width:30%;height:30px;line-height:30px;margin:20px auto 0;text-align:center;color:#fff;background:#3b82fe;">??????????????????</div>\n  </div>', document.body.appendChild(E), window.ulinkCloseDownloadTip = function() { document.body.removeChild(E), E = null; try { delete window.ulinkOpenDownload, delete window.ulinkCloseDownloadTip } catch (e) { console.log(e) } }) }(y.downloadUrl), o && o.call(a) };
                        C((function() { t ? t.call(a, w, a) : w() }), l) } return a } }, w)({}).hasOwnProperty.call(w, M) && (N[M] = w[M]);
        N.getInstances = function() { return P }, N.use = function(e, t) { return e && k(e.install) && e.install(N, t), k(e) && e(N, t), this }, N.start = function(e) { return new N(e, !0) }, N.setGateway = r.setGateway, N.use(r), n.exports = N }))) }));
//# sourceMappingURL=index.min.js.map