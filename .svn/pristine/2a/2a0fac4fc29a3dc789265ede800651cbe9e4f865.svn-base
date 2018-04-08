;
(function ($, window, document, undefined) {
    //定义Page构造函数
    var Page = function (elem, option) {
        _this = this,
            this.$element = elem,
            this.default = {
                pageIndex: option.pageIndex || 1,//初始页码
                totalPages: option.totalPages || 1, //总页数
                totalSize: option.totalSize || '', //总条数
                jump: option.jump || false, // 支持跳转
                callback: option.callback || function () { } // 回调函数
            }
        this.opt = $.extend({}, this.default, option);
        this._init();
    }
    //扩展原型链方法
    Page.prototype = {
        _creatHtml: function () {
            var that = this,
                _html = '',
                pageIndex = this.opt.pageIndex,
                totalSize = this.opt.totalSize, //总条数
                totalPages = this.opt.totalPages; // 总页数
            _html += '<ul class="clearfix" style="display: inline-block;"><span id="firstPage">首页</span><span id="prevPage">上一页</span>';
            //总页数大于6时候
            if (totalPages > 6) {
                if (pageIndex < 5) {
                    for (var i = 1; i < 6; i++) {
                        if (pageIndex == i) {
                            _html += "<li class='active'>" + i + "</li>";
                        } else {
                            _html += "<li>" + i + "</li>";
                        }
                    }
                    _html += "<li>...</li>";
                    _html += "<li>" + totalPages + "</li>";
                } else {
                    //当前页码在末尾的时候
                    if (pageIndex < totalPages - 3) {
                        for (var i = pageIndex - 2; i < pageIndex + 3; i++) {
                            if (pageIndex == i) {
                                _html += "<li class='active'>" + i + "</li>";
                            } else {
                                _html += "<li>" + i + "</li>";
                            }
                        }
                        _html += "<li>...</li>";
                        _html += "<li>" + totalPages + "</li>";
                    } else {
                        _html += "<li>1</li>";
                        _html += "<li>. . .</li>";
                        for (var i = totalPages - 4; i < totalPages + 1; i++) {
                            if (pageIndex == i) {
                                _html += "<li class='active'>" + i + "</li>";
                            } else {
                                _html += "<li>" + i + "</li>";
                            }
                        }
                    }
                }
            } else {
                for (var i = 1; i < totalPages + 1; i++) {
                    if (pageIndex == i) {
                        _html += "<li class='active'>" + i + "</li>";
                    } else {
                        _html += "<li>" + i + "</li>";
                    }
                }
            }
            _html += '<span id="nextPage">下一页</span>';
            _html += '<span id="lastPage">尾页</span></ul>';
            that.$element.html(_html);
            
          
        },
        _bindEvent: function () {
            var that = this;
            this.$element.off('click', 'li,span');
            this.$element.on('click', "li,span", function () {
                var curNum = $(this).html(),
                    totalPages = that.opt.totalPages,
                    id = $(this).attr("id");
                //pageIndex = that.opt.pageIndex;
                if (id == "firstPage") {
                    that.opt.pageIndex = 1;
                } else if (id == "prevPage") {
                    if (that.opt.pageIndex == 1) {
                        return false;
                        //that.opt.pageIndex = 1;
                    } else {
                        that.opt.pageIndex = that.opt.pageIndex - 1;
                    }
                } else if (id == "nextPage") {
                    if (that.opt.pageIndex == totalPages) {
                        return false;
                        //that.opt.pageIndex = totalPages
                    } else {
                        that.opt.pageIndex = that.opt.pageIndex + 1;
                    }
                } else if (id == "lastPage") {
                    that.opt.pageIndex = totalPages;
                } else {
                     that.opt.pageIndex = +curNum;
                }
                that._creatHtml();
                if (that.opt.callback) {
                    that.opt.callback(that.opt.pageIndex);
                }
            })
        },
        _init: function () {
            this._creatHtml();
            this._bindEvent();
        }
    }
    //在插件中使用myPage对象
    $.fn.Page = function (option) {
        //创建Page的实体
        var page = new Page(this, option);
        //调用初始化方法
        return page._init();

    }
})(jQuery, window, document);
