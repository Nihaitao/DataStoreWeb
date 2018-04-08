;
(function($, window, document, undefined) {
    //定义Sortable构造函数
    var Sortable = function(elem, option) {
        _this = this,
            this.$element = elem,
            this.default = {
                "tree": ".tree-wrap",
                "treeContent": ".tree-content",
                "treeTitle": ".tree-tit",
                "optionArea": ".option-area",
                stop:function(){},
                events: {}

            }
        this.opt = $.extend({}, this.default, option)
    }
    //扩展原型链方法
    Sortable.prototype = {
        _sortable: function() {
            return $(this.opt.tree + "," + this.opt.treeContent).sortable({
                axis: "y",
                placeholder: "state-highlight",
                cursor: "move",
                forceHelperSize: true,
                forcePlaceholderSize: true,
                scroll: true,
                item: this.opt.tree,
                //containment: 'parent',
                //start: function (event, ui) {
                //    var content = ui.item.children(".tree-node").children(".tree-content");
                //    $(content).hide()
                //},
                start:this.opt.start,
                stop: this.opt.stop
            });
        },
        _toggle: function () {
            var clicktag = 0;
            $(this.opt.treeTitle).off("dblclick");
            $(this.opt.treeTitle).on({
                "dblclick": function () {
                    if (clicktag == 0) {
                        clicktag = 1
                        $(this).next(_this.opt.treeContent).slideToggle();
                        setTimeout(function () { clicktag = 0 }, 500);
                    }
                },
            });
            //$(this.opt.treeTitle).dblclick(function () {
            //    if (clicktag == 0) {
            //        clicktag = 1
            //        $(this).next(_this.opt.treeContent).slideToggle();
            //        setTimeout(function () { clicktag = 0 }, 500);
            //    }
            //})
            $('.arrow').off('click')
            $('.arrow').on({
                "click": function (e) {
                    e.stopPropagation();
                    if (clicktag == 0) {
                        clicktag = 1;
                        $($(this).toggleClass('open').parents(".tree-node")[0]).children(".tree-content").slideToggle();
                        setTimeout(function () { clicktag = 0 }, 500);
                    }
                },

                //"mouseover": function () {
                //    $(this).find(_this.opt.optionArea).show()
                //},
                //"mouseout": function () {
                //    $(this).find(_this.opt.optionArea).hide()
                //},
            });
        },
        _addevents: function (e) {
            if (this.opt.events) {
                var self = this;
                for (var cls in this.opt.events) {
                    $(this.opt.optionArea).on("click", "." + cls, { eventName: cls }, function (e) {
                        e.stopPropagation();
                            var event = self.opt.events[e.data.eventName];
                            if (typeof event == 'function') {
                            event($(this).parents(".tree"));
                        }

                    });
                }
            }

        },
        _init: function() {
            this._sortable();
            this._toggle();
            this._addevents();
        }
    }
    //在插件中使用mySortable对象
    $.fn.mySortable = function(option) {
        //创建sortable的实体
        var sortable = new Sortable(this, option);
        //调用初始化方法
        return sortable._init();

    }
})(jQuery, window, document);