layui.define(['table', 'form', 'jquery', 'tableExt', 'element', 'customUtil', 'linq'],
    function (exports) {
        var fnr = layui.fnr;
        var table = layui.table;
        var tableExt = layui.tableExt;
        var linq = layui.linq;
        var $ = layui.jquery;

        function GetSetting() {
            var Setting = fnr.Cookie.get("setting");
            if (Setting == null || Setting == undefined) {
                Setting = [];
                $.get('/service/public/Mechanism/GetSetlist', function (rsp) {
                    if (rsp.SuccessResponse) {
                        if (rsp.Data) {
                            rsp.Data.Home_Html = "";
                            Setting = rsp.Data;
                            fnr.Cookie.set("setting", JSON.stringify(Setting));
                        }
                    } else {
                        layer.msg(res.Message);
                    }
                });
            } else {
                Setting = eval("(" + unescape(Setting) + ")");
            }
            return Setting;
        }

        function GetConfig() {
            var Config = fnr.Cookie.get("config");
            if (Config == null || Config == undefined) {
                Config = [];
                $.get('/service/datastore/HConfiguration/GetConfiguration', function (rsp) {
                    if (rsp.SuccessResponse) {
                        if (rsp.Data) {
                            Config = rsp.Data;
                            fnr.Cookie.set("config", JSON.stringify(Config));
                        }
                    } else {
                        layer.msg(res.Message);
                    }
                });
            } else
                Config = eval("(" + unescape(Config) + ")");
            return Config;
        }

        function GetStudentInfo() {
            var studentinfo = fnr.Cookie.get("studentinfo");
            if (studentinfo == null || studentinfo == undefined || studentinfo == "") {
                return null;
            } else
                studentinfo = eval("(" + unescape(studentinfo) + ")");
            return studentinfo;
        }
        exports('wxconfig', {
            GetConfig: GetConfig,
            GetSetting: GetSetting,
            GetStudentInfo: GetStudentInfo
        });
    })
