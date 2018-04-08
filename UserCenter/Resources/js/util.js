layui.define(['jquery', 'form'],
    function(exports) {
        var $ = layui.jquery;
        var fnr = { request: {} };


        fnr.debug = function(m) {
            console.log(m);
        }
        fnr.msg = function(options) {
            if (window != window.top) {
                window.top._fnr.msg(options);
            }
            layer.msg(options);
        }
        fnr.dialogArr = [];
        fnr.dialogIdx = [];
        fnr.openDialog = function(options) {
            var defaultOpt = {
                skin: 'layui-layer-molv', //样式类名
                type: 2,
                yes: function(index, layero) {
                    layer.getChildFrame("*[lay-submit]", index).click();
                },
                cancel: function(index, layero) {
                    var dialogId = fnr.dialogIdx[index];
                    if (dialogId) {
                        delete window.top._fnr.dialogArr[dialogId];
                        delete fnr.dialogIdx[index];
                    }
                }
            }
            fnr.mergeJson(defaultOpt, options);
            var dialogId = "dialog" + new Date().getTime();
            if (options.type == 2) {
                var url = options.content[0];
                url += ((url.indexOf("?") > -1 ? "&" : "?") + "_dialog=" + dialogId);
                options.content[0] = url;
            }
            var layeridx = layer.open(options);
            fnr.dialogIdx[layeridx] = dialogId;
            window.top._fnr.dialogArr[dialogId] = options;
        }


        fnr.createQueue = function (size) {
            var list = [];
            //向队列中添加数据
            this.push = function (data) {
                if (data == null) {
                    return false;
                }
                //如果传递了size参数就设置了队列的大小
                if (size != null && !isNaN(size)) {
                    if (list.length == size) {
                        this.pop();
                    }
                }
                list.unshift(data);
                return true;
            }

            //从队列中取出数据
            this.pop = function () {
                return list.pop();
            }

            //返回队列的大小
            this.size = function () {
                return list.length;
            }

            //返回队列的内容
            this.quere = function () {
                return list;
            }
        }

        fnr.download = function (url) {
            debugger
            var iframe = window.top.document.getElementById("downloadiFrame");
            if (!iframe) {
                iframe=  window.top.document.createElement("iframe");
                iframe.attributes.id = "downloadiFrame";
                iframe.style.width = "0px";
                iframe.style.height = "0px";
                window.top.document.body.append(iframe);
            }
            iframe.src = url;
        }

        fnr.getSize = function(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', "GB"];
            if (bytes == 0) return 'n/a';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
        };

        fnr.callDialog = function(eventName, data) {
            var dialogId = fnr.getQueryString("_dialog");
            if (dialogId == undefined) {
                fnr.debug("弹出层缺少参数[_dialog]");
                return;
            }
            var dialogOpt = window.top._fnr.dialogArr[dialogId];
            if (dialogOpt && dialogOpt.events) {
                var fun = dialogOpt.events[eventName];
                if (typeof fun == 'function') {
                    fun(data);
                }
            }
        }
        fnr.closeDialog = function() {
            var index = window.parent.layer.getFrameIndex(window.name);
            window.parent.layer.close(index);
            var dialogId = fnr.getQueryString("_dialog");
            if (dialogId != undefined) {
                delete window.top._fnr.dialogArr[dialogId];
            }
        }
        fnr.Cookie = {
            get: function(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)) return arr[2];
                return null;
            },
            set: function(name, value) {
                var Days = 30;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
            }
        };
        fnr.getQueryString = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return undefined;
        };
        fnr.format = function(time, format) {
            if (time == undefined) {
                return '';
            }
            var finalTime;
            if (typeof (time) == 'string') {
                time = time.replace("T", " ");
                time = time.replace("Z", " ");
                var timeIOS = time.replace(/\-/g, "/");
                finalTime = new Date(timeIOS);
            } else {
                finalTime = time;
            }

            var t = new Date(finalTime);
            var tf = function(i) { return (i < 10 ? '0' : '') + i };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g,
                function(a) {
                    switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                    }
                });
        };
        /*根据日期获取星期几*/
        fnr.getWeekDay = function(temp) {
            var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            var weekDay = weekArray[new Date(temp).getDay()];
            return weekDay;
        };
        // 单位转换成元
        fnr.formatNumber = function(numbers) {
            return Number(numbers / 100).toFixed(2);
        };

        // 判断数组是否包含某元素
        fnr.contains = function(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        };

        fnr.each = function(object, func) {
            for (var k in object) {
                func(k, object[k]);
            }
        };
        fnr.deleteItem = function(object, item) {
            var index = $.inArray(item, object);
            if (index > -1) {
                object.splice(index, 1);
            }
        }
        fnr.clearVueList = function(list) {
            if (list)
                while (list.length > 0) {
                    list.$remove(list[0]);
                }
        };
        fnr.mergeJson = function(from, to) {
            if (from == undefined) return to;
            this.each(from,
                function(k, v) {
                    if (v == undefined) return;
                    to[k] = v;
                });
            return to;
        };
        fnr.getElFromJson = function(json, el) {
            if (el == undefined || el == '') return json;
            var arr = el.split('.');
            var result = json;
            fnr.each(arr,
                function(k, v) {
                    if (!result[v]) {
                        result = {};
                    } else {
                        result = result[v];
                    }
                });
            return result;
        };


        fnr.getAddDate = function(dateTemp, days) {
            var dateTemp = dateTemp.split("-");
            var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
            var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
            var rDate = new Date(millSeconds);
            var year = rDate.getFullYear();
            var month = rDate.getMonth() + 1;
            if (month < 10) month = "0" + month;
            var date = rDate.getDate();
            if (date < 10) date = "0" + date;
            return (year + "-" + month + "-" + date);
        };

        fnr.ajaxJson = function(url, data, options) {
            var defaultOption = {
                url: url,
                data: data,
                method: "get",
                contentType: "application/json",
                error: function(a, e) {
                    fnr.debug(e);
                },
                complete: function(xhr, textStatus) {
                }
            }
            fnr.mergeJson(defaultOption, options);
            return $.ajax(options);
        };


        this.DEFAULTROOTNODE = "ReturnData.Data";

        Vue.component('remote-sel',
            {
                template:
                    '<select class="form-control" id="{{ setting.tags.id }}" lay-verify="{{layverify}}" lay-verify-group="{{layverifygroup}}" lay-tips="{{laytips}}" name="{{ setting.tags.name }}" lay-filter="{{ layfilter }}" lay-search="{{search}}" v-model="value"><option v-for="option in setting.options" v-bind:value="option.key">{{ option.value }}</option></select>',
                props: ['setting', 'value', 'change', 'layverify', 'layverifygroup', 'laytips'],
                data: function() {
                    return {
                        search: true,
                        selectedIndex: undefined,
                        options: {},
                        fields: { root: DEFAULTROOTNODE, key: 'key', value: 'value' },
                        remote: { url: '', data: {}, options: { method: 'POST' }, success: function() {}, resp: [] },
                        layfilter: '',
                    };
                },
                watch: {
                    'value': function(val) {
                        //fnr.debug("select layfilter=" + this.layfilter + " changed，value=" + val);
                        layui.form.render('select');
                        if (typeof this.change == 'function') {
                            this.change.call(this, this);
                        }
                    }
                },
                ready: function() {
                    this.initEvent();
                    this.search = this.setting.search || false;
                    this.selectedIndex = this.setting.selectedIndex;
                    fnr.mergeJson(this.setting.fields, this.fields);
                    fnr.mergeJson(this.setting.remote, this.remote);
                    fnr.mergeJson(this.setting.options, this.options);
                    this.resetData();
                },
                methods: {
                    initEvent: function() {
                        var self = this;
                        this.layfilter = "layfilter" + (Math.random() + "").substr(2);
                        layui.form.on("select(" + this.layfilter + ")",
                            function(data) {
                                self.value = data.value;
                            });
                    },
                    resetData: function() {
                        var self = this;
                        fnr.clearVueList(self.setting.options);
                        fnr.each(self.options,
                            function(k, v) {

                                var item = { key: v[self.fields.key], value: v[self.fields.value] };
                                self.setting.options.$set(self.setting.options.length, item);
                            });

                        if (this.remote.url == undefined || this.remote.url == '') {
                            this.init();
                            return;
                        }

                        var deferred;
                        if (typeof this.remote.url == 'function') {
                            deferred = this.remote.link(this.remote.data);
                        } else {
                            deferred = fnr.ajaxJson(this.remote.url, this.remote.data, this.remote.options);
                        }

                        $.when(deferred).then(function(resp) {
                            self.resp = resp;
                            var respData = fnr.getElFromJson(resp, self.fields.root);
                            fnr.each(respData,
                                function(k, v) {
                                    var item = { key: v[self.fields.key], value: v[self.fields.value] };
                                    self.setting.options.$set(self.setting.options.length, item);
                                });
                            if (typeof self.selectedIndex != 'undefined' && self.selectedIndex < respData.length) {
                                self.value =
                                    respData[self.selectedIndex][self.fields.key];
                            }
                            if (typeof self.remote.ajaxSuccess == 'function') {
                                self.$nextTick(function() {
                                    self.remote.ajaxSuccess.call(self.$root, respData);
                                });
                            }
                            self.init();
                        });
                    },
                    init: function() {
                        var self = this;
                        var flag = false;
                        fnr.each(this.setting.options,
                            function(k, v) {
                                if (v.key == self.value) flag = true;
                            });
                        if (flag == false) this.value = '';
                        this.$nextTick(function() {
                            layui.form.render('select');
                        });
                    },
                    reset: function() {
                        fnr.mergeJson(this.setting.fields, this.fields);
                        fnr.mergeJson(this.setting.remote, this.remote);
                        this.resetData();
                    }
                }
            });
        Vue.component('remote-rad',
            {
                template:
                    '<template v-for="option in setting.options"><input type="radio" lay-filter="{{ layfilter }}" name="{{ setting.tags.name }}" v-bind:value="option.key" v-bind:title="option.value" v-bind:checked="option.key==value"></template>',
                props: ['setting', 'value', 'lay-verify', 'lay-verify-group'],
                data: function() {
                    return {
                        options: {},
                        fields: { root: DEFAULTROOTNODE, key: "key", value: "value" },
                        remote: { url: "", data: {}, options: { method: 'POST' }, resp: [] },
                        layfilter: ""
                    };
                },
                watch: {
                    'value': function(val) {
                        //fnr.debug("radio layfilter=" + this.layfilter + " changed，value=" + val);
                        layui.form.render('radio');
                    }
                },
                ready: function() {
                    this.initEvent();
                    fnr.mergeJson(this.setting.fields, this.fields);
                    fnr.mergeJson(this.setting.remote, this.remote);
                    fnr.mergeJson(this.setting.options, this.options);
                    this.resetData();
                },
                methods: {
                    initEvent: function() {
                        var self = this;
                        this.layfilter = "layfilter" + (Math.random() + "").substr(2);
                        layui.form.on("radio(" + this.layfilter + ")",
                            function(data) {
                                self.value = data.value;
                            });
                    },
                    resetData: function() {
                        var self = this;
                        fnr.clearVueList(self.setting.options);
                        fnr.each(self.options,
                            function(k, v) {

                                var item = { key: v[self.fields.key], value: v[self.fields.value] };
                                self.setting.options.$set(self.setting.options.length, item);
                            });

                        if (this.remote.url == undefined || this.remote.url == '') {
                            this.init();
                            return;
                        }

                        var deferred;
                        if (typeof this.remote.url == 'function') {
                            deferred = this.remote.link(this.remote.data);
                        } else {
                            deferred = fnr.ajaxJson(this.remote.url, this.remote.data, this.remote.options);
                        }

                        $.when(deferred).then(function(resp) {
                            self.resp = resp;
                            fnr.each(fnr.getElFromJson(resp, self.fields.root),
                                function(k, v) {
                                    var item = { key: v[self.fields.key], value: v[self.fields.value] };
                                    self.setting.options.$set(self.setting.options.length, item);
                                });
                            self.init();
                        });
                    },
                    init: function() {
                        var self = this;
                        var flag = false;
                        fnr.each(this.setting.options,
                            function(k, v) {
                                if (v.key == self.value) flag = true;
                            });
                        if (flag == false) this.value = '';

                        this.$nextTick(function() {
                            layui.form.render('radio');
                        });
                    },
                    reset: function() {
                        fnr.mergeJson(this.setting.remote, this.remote);
                        this.resetData();
                    }
                }
            });
        Vue.component('remote-chb',
            {
                template:
                    '<template v-for="option in setting.options"><input type="checkbox" lay-skin="primary" id="{{ setting.tags.id }}" name="{{ setting.tags.name }}" lay-filter="{{ layfilter }}" value="{{option.key}}" title="{{option.value}}" v-model="value" /></template>',
                props: ['setting', 'value'],
                data: function() {
                    return {
                        options: {},
                        fields: { root: DEFAULTROOTNODE, key: "key", value: "value" },
                        remote: { url: "", data: {}, options: { method: 'POST' }, resp: [] },
                        layfilter: ""
                    };
                },
                watch: {
                    'value': function(val) {
                        //fnr.debug("checkbox layfilter=" + this.layfilter + " changed，value=" + val);
                        layui.form.render('checkbox');
                    }
                },
                ready: function() {
                    this.initEvent();
                    if (!this.setting) {
                        this.setting = {};
                    }
                    if (this.setting.fields)
                        fnr.mergeJson(this.setting.fields, this.fields);
                    if (this.setting.options)
                        fnr.mergeJson(this.setting.remote, this.remote);
                    if (this.setting.fields)
                        fnr.mergeJson(this.setting.options, this.options);

                    this.resetData();
                },
                methods: {
                    initEvent: function() {
                        var self = this;
                        this.layfilter = "layfilter" + (Math.random() + "").substr(2);
                        layui.form.on("checkbox(" + this.layfilter + ")",
                            function(data) {
                                if (data.elem.checked) {
                                    self.value.push(data.value);
                                } else {
                                    fnr.deleteItem(self.value, data.value);
                                }
                            });
                    },
                    resetData: function() {
                        var self = this;
                        fnr.clearVueList(self.setting.options);
                        fnr.each(self.options,
                            function(k, v) {

                                var item = { key: v[self.fields.key], value: v[self.fields.value] };
                                self.setting.options.$set(self.setting.options.length, item);
                            });

                        if (this.remote.url == undefined || this.remote.url == '') {
                            this.init();
                            return;
                        }

                        var deferred;
                        if (typeof this.remote.url == 'function') {
                            deferred = this.remote.link(this.remote.data);
                        } else {
                            deferred = fnr.ajaxJson(this.remote.url, this.remote.data, this.remote.options);
                        }

                        $.when(deferred).then(function(resp) {
                            self.resp = resp;
                            fnr.each(fnr.getElFromJson(resp, self.fields.root),
                                function(k, v) {
                                    var item = { key: v[self.fields.key], value: v[self.fields.value] };
                                    self.setting.options.$set(self.setting.options.length, item);
                                });
                            self.init();
                        });
                    },
                    init: function() {
                        this.$nextTick(function() {
                            layui.form.render('checkbox');
                        });
                    },
                    reset: function() {
                        fnr.mergeJson(this.setting.remote, this.remote);
                        this.resetData();
                    }
                }
            });
        Vue.component('local-switch',
            {
                template:
                    '<input type="checkbox" id="{{setting.tags.id}}" name="{{setting.tags.name}}" lay-skin="switch" lay-filter="{{layfilter}}" lay-text="{{text||\'ON|OFF\'}}" v-model="value" />',
                props: ['setting', 'value', "text"],
                data: function() {
                    return {
                        layfilter: ""
                    };
                },
                watch: {
                    'value': function(val) {
                        layui.form.render('checkbox');
                    }
                },
                ready: function() {
                    this.initEvent();
                    this.$nextTick(function() {
                        layui.form.render('checkbox');
                    });
                },
                methods: {
                    initEvent: function() {
                        var self = this;
                        this.layfilter = "layfilter" + (Math.random() + "").substr(2);
                        layui.form.on("switch(" + this.layfilter + ")",
                            function(data) {
                                self.value = data.elem.checked;
                            });
                    }
                }
            });
        window._fnr = fnr;
        exports('fnr', fnr);
    });