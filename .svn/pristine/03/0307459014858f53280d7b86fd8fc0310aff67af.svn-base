/**
 * Paging 组件
 * @description 基于laytpl 、laypage、layer 封装的组件
 * @author Van zheng_jinfan@126.com
 * @link http://m.zhengjinfan.cn
 * @license MIT
 * @version 1.0.1
 */
layui.define(['layer', 'form', 'code', 'laypage', 'laytpl'], function (exports) {
    "use strict";
    layui.code();
    var $ = layui.jquery,
        layer = parent.layui.layer === undefined ? layui.layer : parent.layui.layer,
        laytpl = layui.laytpl, form = layui.form();

    var Paging = function () {
        this.config = {
            url: undefined, //数据远程地址
            type: 'GET', //数据的获取方式  get or post
            elem: "#Container", //内容容器
            params: {
                t: Math.random(),
                PageStatus: 1,
                PageIndex: 1,
                TotalCount: 0
            }, //获取数据时传递的额外参数
            openWait: true, //加载数据时是否显示等待框 
            tempElem: "#Templete", //模板容器
            tempType: 0, //如果等于0则需要设置模板容器，1为提供模板内容
            paged: true,//是否显示分页组件
            pageConfig: { //参数应该为object类型
                elem: "#PageList",
                PageSize: 10 //分页大小
            },
            success: undefined, //type:function
            fail: function (res) {
                console.log(res.msg);
                //layer.msg(res.msg, { icon: 2 });
            }, //type:function
            complate: undefined, //type:function
            serverError: function (xhr, status, error) { //ajax的服务错误
                throwError("错误提示： " + xhr.status + " " + xhr.statusText);
            }
        };
    };

    Paging.prototype.Refresh = function () {
        this.init();
    }
    /**
	 * 版本号
	 */
    Paging.prototype.v = '1.0.3';

    /**
	 * 设置
	 * @param {Object} options
	 */
    Paging.prototype.set = function (options) {
        var that = this;
        $.extend(true, that.config, options);
        return that;
    };
    /**
	 * 初始化
	 * @param {Object} options
	 */
    Paging.prototype.init = function (options) {
        var that = this;
        $.extend(true, that.config, options);
        var _config = that.config;
        if (_config.url === undefined) {
            throwError('Paging Error:请配置远程URL!');
        }
        if (_config.elem === undefined) {
            throwError('Paging Error:请配置参数elem!');
        }
        if ($(_config.elem).length === 0) {
            throwError('Paging Error:找不到配置的容器elem!');
        }
        if (_config.tempType === 0) {
            if (_config.tempElem === undefined) {
                throwError('Paging Error:请配置参数tempElem!');
            }
            if ($(_config.tempElem).length === 0) {
                throwError('Paging Error:找不到配置的容器tempElem!');
            }
        }
        if (_config.paged) {
            var _pageConfig = _config.pageConfig;
            if (_pageConfig.elem === undefined) {
                throwError('Paging Error:请配置参数pageConfig.elem!');
            }
        }
        if (_config.type.toUpperCase() !== 'GET' && _config.type.toUpperCase() !== 'POST') {
            throwError('Paging Error:type参数配置出错，只支持GET或都POST');
        }
        that.get({
            PageSize: _config.pageConfig.PageSize
        });

        return that;
    };
    /**
	 * 获取数据
	 * @param {Object} options
	 */
    Paging.prototype.get = function (options) {
        var that = this;
        var _config = that.config;
        var loadIndex = undefined;
        if (_config.openWait) {
            loadIndex = layer.load(2);
        }
        //_config.pageConfig.PageIndex = loadIndex;
        //默认参数
        var df = {
            PageIndex: _config.params.PageIndex,
            PageSize: _config.pageConfig.PageSize
        };
        $.extend(true, _config.params, df, options);
        $.ajax({
            type: _config.type,
            url: _config.url,
            data: _config.params,
            dataType: 'json',
            success: function (result, status, xhr) {
                if (loadIndex !== undefined)
                    layer.close(loadIndex); //关闭等待层
                if (result.SuccessResponse) {
                    //获取模板
                    var tpl = _config.tempType === 0 ? $(_config.tempElem).html() : _config.tempElem;
                    //渲染数据
                    if (result.ReturnData.Data == null || result.ReturnData.Data.length == 0) {
                        var thLength = $(_config.elem).siblings('thead').find('th').length;
                        $(_config.elem).html('<tr><td colspan="' + thLength + '" style="text-align:center;">暂无数据</td></tr>');
                    } else {
                        laytpl(tpl).render(result.ReturnData.Data, function (html) {
                            if (_config.renderBefore) {
                                _config.renderBefore(html, function (formatHtml) {
                                    $(_config.elem).html(formatHtml);
                                }, result.list);
                            }
                            else {
                                $(_config.elem).html(html);
                            }
                        });
                        if (_config.paged) {
                            if (result.ReturnData.TotalCount === null || result.ReturnData.TotalCount === undefined) {
                                throwError('Paging Error:请返回数据总数！');
                                return;
                            }
                            _config.params.TotalCount = result.ReturnData.TotalCount;
                            var _pageConfig = _config.pageConfig;
                            var PageSize = _pageConfig.PageSize;
                            var pages = result.ReturnData.TotalCount % PageSize == 0 ?
                                (result.ReturnData.TotalCount / PageSize) : (result.ReturnData.TotalCount / PageSize + 1);
                            var defaults = {
                                cont: $(_pageConfig.elem),
                                curr: _config.params.PageIndex,
                                pages: pages,
                                skip: true,
                                TotalCount: _config.params.TotalCount,
                                jump: function (obj, first) {
                                    //得到了当前页，用于向服务端请求对应数据
                                    var curr = obj.curr;
                                    if (!first) {
                                        that.get({
                                            PageIndex: curr,
                                            PageSize: PageSize
                                        });
                                    }
                                }
                            };
                            $.extend(defaults, _pageConfig); //参数合并
                            layui.laypage(defaults); //调用laypage组件渲染分页
                        }
                    }
                    if (_config.success) {
                        _config.success(); //渲染成功
                    }
                } else {
                    var thLength = $(_config.elem).siblings('thead').find('th').length;
                    $(_config.elem).html('<tr><td colspan="' + thLength + '" style="text-align:center;">' + result.Message + '</td></tr>');
                    if (_config.fail) {
                        _config.fail(result); //获取数据失败
                    }
                }

                //初始化全选功能
                form.render('checkbox');
                form.on('checkbox(allChoose)', function (data) {
                    var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
                    child.each(function (index, item) {
                        item.checked = data.elem.checked;
                    });
                    form.render('checkbox');
                });

                if (_config.complate) {
                    _config.complate(); //渲染完成
                }
            },
            error: function (xhr, status, error) {
                if (loadIndex !== undefined)
                    layer.close(loadIndex); //关闭等待层
                _config.serverError(xhr, status, error); //服务器错误
            }
        });
    };
    /**
	 * 抛出一个异常错误信息
	 * @param {String} msg
	 */
    function throwError(msg) {
        throw new Error(msg);
    };

    var paging = new Paging();
    exports('paging', function (options) {
        return paging.set(options);
    });
});