require_js_file(["table", "form", "jquery", "tableExt"],
    function (fnr) {
        var $ = layui.$;
        function setCookie(name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }
        window.rootApp = new Vue({
            el: "#root",
            data: {
                submitForm: {
                    Phone: "",
                    PhoneCode: ""
                },
                status: {
                    disabled: false,
                    tipText: '发送'
                },
                isWxShow: true,
            },
            ready: function () {
                //显示页面标题
                $.get("/service/edu/BaseSet/GetStationInfo", {}, function (resp) {
                    if (resp.SuccessResponse)
                        document.title = resp.Data.Name + "_登录";
                }, "json");
            },
            methods: {
                wxLogin: function () {
                    this.isWxShow = false;
                },
                phoneLogin: function () {
                    this.isWxShow = true;
                },
                setCodeTime: function (Seconds, e) {
                    var self = this;
                    if (Seconds > 0) {
                        self.status.disabled = true;
                        self.status.tipText = Seconds + "秒";
                        var timer = setInterval(function () {
                            Seconds = Seconds - 1;
                            if (Seconds > 0)
                                self.status.tipText = Seconds + "秒";
                            else {
                                clearInterval(timer);
                                self.status.tipText = "发送";
                                self.status.disabled = false;
                            }
                        }, 1000);
                    } else
                        self.status.disabled = false;
                    return false;
                },
                SendPhoneCode: function (e) {

                    if (!layui.form.checkInput(e, "phone")) {
                        return false;
                    }
                    var self = this;
                    if (self.status.disabled) {
                        return;
                    }
                    self.status.disabled = true;
                    $.post("/service/hr/Station/SendPhoneCode2", this.submitForm, function (rsp) {
                        if (rsp.SuccessResponse) {
                            window.rootApp.submitForm.PhoneCode = rsp.Data.Num;
                            self.setCodeTime(rsp.Data.Seconds, e)
                            layer.msg(rsp.Message, { icon: 1 });
                        }
                        else {

                            self.setCodeTime(rsp.Data.Seconds, e)
                            layer.msg(rsp.Message, { icon: 2 });
                        }
                    })
                    return false;
                },
                saveUpdate: function (e) {
                    if (!layui.form.checkInput(e)) {
                        return false;
                    }
                    $.post("/service/hr/Station/Login", this.submitForm, function (rsp) {
                        if (rsp.SuccessResponse) {
                            //写入cookie ID
                            setCookie('AccountID', rsp.Data.Account_ID);
                            setCookie('AccountName', rsp.Data.Name);
                            location.href = "/Default.html";
                        }
                        else
                            layer.msg(rsp.Message, { icon: 2 });
                    })
                    return false;
                }
            }
        });
    });