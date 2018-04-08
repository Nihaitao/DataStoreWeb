/** layui-v1.0.9_rls MIT License By http://www.layui.com */
;!function (e) {
    "use strict";
    var t = function () {
        this.v = "1.0.9_rls"
    };
    t.fn = t.prototype;
    var n = document, o = t.fn.cache = {}, i = function () {
        var e = n.scripts, t = e[e.length - 1].src;
        return t.substring(0, t.lastIndexOf("js/"))
    }(), r = function (t) {
        e.console && console.error && console.error("Layui hint: " + t)
    }, l = "undefined" != typeof opera && "[object Opera]" === opera.toString(), a = {
        layer: "../js/modules/lay/modules/layer",
        laydate: "../js/modules/lay/modules/laydate",
        laypage: "../js/modules/lay/modules/laypage",
        laytpl: "../js/modules/lay/modules/laytpl",
        layim: "../js/modules/lay/modules/layim",
        layedit: "../js/modules/lay/modules/layedit",
        form: "../js/modules/lay/modules/form",
        upload: "../js/modules/lay/modules/upload",
        tree: "../js/modules/lay/modules/tree",
        table: "../js/modules/lay/modules/table",
        element: "../js/modules/lay/modules/element",
        util: "../js/modules/lay/modules/util",
        flow: "../js/modules/lay/modules/flow",
        carousel: "../js/modules/lay/modules/carousel",
        code: "../js/modules/lay/modules/code",
        jquery: "../js/modules/lay/modules/jquery",
        mobile: "../js/modules/lay/modules/mobile",
        "layui.all": "../js/modules/lay/dest/layui.all"
    };
    o.modules = {}, o.status = {}, o.timeout = 10, o.event = {}, t.fn.define = function (e, t) {
        var n = this, i = "function" == typeof e, r = function () {
            return "function" == typeof t && t(function (e, t) {
                layui[e] = t, o.status[e] = !0
            }), this
        };
        return i && (t = e, e = []), layui["layui.all"] || !layui["layui.all"] && layui["layui.mobile"] ? r.call(n) : (n.use(e, r), n)
    }, t.fn.use = function (e, t, u) {
        function s(e, t) {
            var n = "PLaySTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/;
            ("load" === e.type || n.test((e.currentTarget || e.srcElement).readyState)) && (o.modules[m] = t, y.removeChild(p), function i() {
                return ++v > 1e3 * o.timeout / 4 ? r(m + " is not a valid module") : void(o.status[m] ? c() : setTimeout(i, 4))
            }())
        }

        function c() {
            u.push(layui[m]), e.length > 1 ? f.use(e.slice(1), t, u) : "function" == typeof t && t.apply(layui, u)
        }

        var f = this, d = o.dir = o.dir ? o.dir : i, y = n.getElementsByTagName("head")[0];
        e = "string" == typeof e ? [e] : e, window.jQuery && jQuery.fn.on && (f.each(e, function (t, n) {
            "jquery" === n && e.splice(t, 1)
        }), layui.jquery = jQuery);
        var m = e[0], v = 0;
        if (u = u || [], o.host = o.host || (d.match(/\/\/([\s\S]+?)\//) || ["//" + location.host + "/"])[0], 0 === e.length || layui["layui.all"] && a[m] || !layui["layui.all"] && layui["layui.mobile"] && a[m]) return c(), f;
        var p = n.createElement("script"), h = (a[m] ? d + "lay/" : o.base || "") + (f.modules[m] || m) + ".js";
        return p.async = !0, p.charset = "utf-8", p.src = h + function () {
            var e = o.version === !0 ? o.v || (new Date).getTime() : o.version || "";
            return e ? "?v=" + e : ""
        }(), o.modules[m] ? !function g() {
            return ++v > 1e3 * o.timeout / 4 ? r(m + " is not a valid module") : void("string" == typeof o.modules[m] && o.status[m] ? c() : setTimeout(g, 4))
        }() : (y.appendChild(p), !p.attachEvent || p.attachEvent.toString && p.attachEvent.toString().indexOf("[native code") < 0 || l ? p.addEventListener("load", function (e) {
            s(e, h)
        }, !1) : p.attachEvent("onreadystatechange", function (e) {
            s(e, h)
        })), o.modules[m] = h, f
    }, t.fn.getStyle = function (t, n) {
        var o = t.currentStyle ? t.currentStyle : e.getComputedStyle(t, null);
        return o[o.getPropertyValue ? "getPropertyValue" : "getAttribute"](n)
    }, t.fn.link = function (e, t, i) {
        var l = this, a = n.createElement("link"), u = n.getElementsByTagName("head")[0];
        "string" == typeof t && (i = t);
        var s = (i || e).replace(/\.|\//g, ""), c = a.id = "layuicss-" + s, f = 0;
        a.rel = "stylesheet", a.href = e + (o.debug ? "?v=" + (new Date).getTime() : ""), a.media = "all", n.getElementById(c) || u.appendChild(a), "function" == typeof t && !function d() {
            return ++f > 1e3 * o.timeout / 100 ? r(e + " timeout") : void(1989 === parseInt(l.getStyle(n.getElementById(c), "width")) ? function () {
                t()
            }() : setTimeout(d, 100))
        }()
    }, t.fn.addcss = function (e, t, n) {
        layui.link(o.dir + "css/" + e, t, n)
    }, t.fn.img = function (e, t, n) {
        var o = new Image;
        return o.src = e, o.complete ? t(o) : (o.onload = function () {
            o.onload = null, t(o)
        }, void(o.onerror = function (e) {
            o.onerror = null, n(e)
        }))
    }, t.fn.config = function (e) {
        e = e || {};
        for (var t in e) o[t] = e[t];
        return this
    }, t.fn.modules = function () {
        var e = {};
        for (var t in a) e[t] = a[t];
        return e
    }(), t.fn.extend = function (e) {
        var t = this;
        e = e || {};
        for (var n in e) t[n] || t.modules[n] ? r("模块名 " + n + " 已被占用") : t.modules[n] = e[n];
        return t
    }, t.fn.router = function (e) {
        for (var t, n = (e || location.hash).replace(/^#/, "").split("/") || [], o = {dir: []}, i = 0; i < n.length; i++) t = n[i].split("="), /^\w+=/.test(n[i]) ? function () {
            "dir" !== t[0] && (o[t[0]] = t[1])
        }() : o.dir.push(n[i]), t = null;
        return o
    }, t.fn.data = function (t, n) {
        if (t = t || "layui", e.JSON && e.JSON.parse) {
            if (null === n) return delete localStorage[t];
            n = "object" == typeof n ? n : {key: n};
            try {
                var o = JSON.parse(localStorage[t])
            } catch (i) {
                var o = {}
            }
            return n.value && (o[n.key] = n.value), n.remove && delete o[n.key], localStorage[t] = JSON.stringify(o), n.key ? o[n.key] : o
        }
    }, t.fn.device = function (t) {
        var n = navigator.userAgent.toLowerCase(), o = function (e) {
            var t = new RegExp(e + "/([^\\s\\_\\-]+)");
            return e = (n.match(t) || [])[1], e || !1
        }, i = {
            os: function () {
                return /windows/.test(n) ? "windows" : /linux/.test(n) ? "linux" : /iphone|ipod|ipad|ios/.test(n) ? "ios" : void 0
            }(), ie: function () {
                return !!(e.ActiveXObject || "ActiveXObject" in e) && ((n.match(/msie\s(\d+)/) || [])[1] || "11")
            }(), weixin: o("micromessenger")
        };
        return t && !i[t] && (i[t] = o(t)), i.android = /android/.test(n), i.ios = "ios" === i.os, i
    }, t.fn.hint = function () {
        return {error: r}
    }, t.fn.each = function (e, t) {
        var n, o = this;
        if ("function" != typeof t) return o;
        if (e = e || [], e.constructor === Object) {
            for (n in e) if (t.call(e[n], n, e[n])) break
        } else for (n = 0; n < e.length && !t.call(e[n], n, e[n]); n++) ;
        return o
    }, t.fn.stope = function (t) {
        t = t || e.event, t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
    }, t.fn.onevent = function (e, t, n) {
        return "string" != typeof e || "function" != typeof n ? this : (o.event[e + "." + t] = [n], this)
    }, t.fn.event = function (e, t, n) {
        var i = this, r = null, l = t.match(/\(.*\)$/) || [], a = (t = e + "." + t).replace(l, ""),
            u = function (e, t) {
                var o = t && t.call(i, n);
                o === !1 && null === r && (r = !1)
            };
        return layui.each(o.event[a], u), l[0] && layui.each(o.event[t], u), r
    }, e.layui = new t
}(window);

$(function () {
    layui.use(['tree', 'laydate', 'layer', 'form', 'laypage', 'layedit', 'element'], function () {
        var $ = layui.jquery;
        var element = layui.element();
        var laydate = layui.laydate;
        var layer = layui.layer;
        var form = layui.form();
        var layedit = layui.layedit;


        //laypage
        var laypage = layui.laypage({
            cont: $('#demoPage'),
            pages: 100,
            skip: true
        });

        //layedit
        layedit.build('demo', {
            tool: [
              'strong' //加粗
              , 'italic' //斜体
              , 'underline' //下划线
              , 'del' //删除线

              , '|' //分割线

              , 'left' //左对齐
              , 'center' //居中对齐
              , 'right' //右对齐

              , '|' //分割线

              , 'link' //超链接
              , 'unlink' //清除链接
              , 'image' //插入图片
            ]
        });


        layedit.build('ejectEdit', {
            tool: [
              'link' //超链接
              , 'image' //插入图片
            ],
            height: 200
        })

        //trees
        var options = {
            elem: '#trees',
            nodes: [
                {
                    name: '自学考试',
                    children: [
                        {
                            name: '湖南省',
                            children: [
                                {
                                    name: '湖南大学',
                                    children: [
                                        {
                                            name: '本科',
                                            children: [
                                                {
                                                    name: '经济法学'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: '湘潭大学',
                                    children: [
                                        {
                                            name: '本科'
                                        },
                                        {
                                            name: '专科'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: '贵州省'
                        }
                    ]
                },
                {
                    name: '成人高考',
                    children: [
                        {
                            name: '湖南省',
                            children: [
                                {
                                    name: '湖南大学'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '远程教育',
                    children: [
                        {
                            name: '郑州大学'
                        }
                    ]
                },
                {
                    name: '电大',
                    children: [
                        {
                            name: '中央广播电视大学'
                        }
                    ]
                },
                {
                    name: '职业资格',
                    children: [
                        {
                            name: '导游证'
                        }
                    ]
                }
            ]
        };
        layui.tree(options);

        //form
        form.on('submit(formDemo)', function (data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });

        //全选
        form.on('checkbox(allChoose)', function (data) {
            var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
            child.each(function (index, item) {
                item.checked = data.elem.checked;
            });
            form.render('checkbox');
        });

        //layer
        layer.msg('<h4>内容1</h4>');
        $('.btn1').on('click', function () {
            layer.alert('<h4>内容1</h4>');
        });

        


        //jquery
        $('.mainForm .btnDate').on('click', function () {
            $(this).removeClass('btns-default')
                .addClass('btns-primary');
            $(this).siblings('.btnDate').removeClass('btns-primary').addClass('btns-default')
        });
        $('.tab-menu ul li').on('click', function () {
            if (!$(this).hasClass('this')) {
                $(this).addClass('this');
                $(this).siblings('li').removeClass('this')
            }
        });
        $('.layui-colla-title').on('click', function () {
            if (!$(this).next().hasClass('layui-show')) {
                $(this).next().addClass('layui-show');
                $(this).parent().siblings('.layui-colla-item').children('.layui-colla-content').removeClass('layui-show');
            }
        });

        //laydate
        var start = {
            min: laydate.now()
            , max: '2099-06-16 23:59:59'
            , istoday: false
            , choose: function (datas) {
                end.min = datas;
                end.start = datas
            }
        };
        var end = {
            min: laydate.now()
            , max: '2099-06-16 23:59:59'
            , istoday: false
            , choose: function (datas) {
                start.max = datas;
            }
        };
        document.getElementById('LAY_demorange_s').onclick = function () {
            start.elem = this;
            laydate(start);
        };
        document.getElementById('LAY_demorange_e').onclick = function () {
            end.elem = this;
            laydate(end);
        }

        $('.hoverBtn').on('click', function () {
            $('.dropList').slideToggle();
        });
        $('.dropList a').on('click', function () {
            if (!$(this).parent().hasClass('hoverColor')) {
                $(this).parent().addClass('hoverColor')
                    .siblings().removeClass('hoverColor');
            }
        });

    });
});