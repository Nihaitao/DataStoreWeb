require_js_file(["table", "form", "jquery", "tableExt", "laydate"],
function (fnr) {
    var $ = layui.jquery;
    Vue.filter('format', function (time, format) {
        if (time == undefined || time == null || !time) {
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
    })
    window.rootApp = new Vue({
        el: "#root",
        data: {
            SelectEducation: SelectEducation(), //学历
            NationSetting:NationSetting(), //民族
            SelectSex: SelectSex(), //性别
            provinceSetting: SelectProvinceBind(),//省份
            citySetting: SelectCityBind(),//城市
            areaSetting: SelectDistrictBind(),//区域
            submitForm: {
                StuID:"",
                CardNumber: "",
                Name: "",
                HeadImg: "",
                Sex: 1,
                Phone: "",
                Email: "",
                Education_ID: "",
                QQ: "",
                Phone2: "",
                NowProvince_ID: "",
                NowCity_ID: "",
                NowArea_ID: "",
                NowAddress: "",
                Remark: "",
                HomeAddress: "",
                Nation:"",
                Police:"",
                EffDate:"",
                ExpDate:""
            }
        },
        ready: function () {
            var self = this;
            var laydate = layui.laydate;
            laydate.render({
                elem: "#EffDate",
                type: "date"
                , done: function (value) {
                    self.submitForm.EffDate = value;
                }
            });
            laydate.render({
                elem: "#ExpDate",
                type: "date"
                 , done: function (value) {
                     self.submitForm.ExpDate = value;
                 }
            });
            $.get("/service/edu/Student/GetStudentInfo", { StuID: fnr.getQueryString("StuID") }, function (rsp) {
                if (rsp.SuccessResponse) {
                    fnr.mergeJson(rsp.ReturnData.Data, self.submitForm);//合并ajax值
                }
                else {
                    layer.msg(rsp.Message, { icon: 2 });
                }
           });
        }, 
        methods: {
            //事件监听
            //省份联动
            provinceChange: function () {
                var self = this;
                if (self.submitForm.NowProvince_ID == '') {
                    self.citySetting.remote = {};
                    self.citySetting.remote.url = "";
                    self.citySetting.remote.data = {};
                    self.$refs.city.reset();  //重置select
                } else {
                    fnr.mergeJson(SelectCityBind(self.submitForm.NowProvince_ID), self.citySetting);//合并ajax值
                    self.$refs.city.reset();
                }
                if (self.areaSetting.remote != undefined) {
                    self.areaSetting.remote = {};
                    self.areaSetting.remote.url = "";
                    self.areaSetting.remote.data = {};
                    self.$refs.area.reset();
                }
            },
            cityChange: function () {
                var self = this;
                if (self.submitForm.NowCity_ID.toString() == "") {
                    self.areaSetting.remote = {};
                    self.areaSetting.remote.url = "";
                    self.areaSetting.remote.data = {};
                } else {
                    fnr.mergeJson(SelectDistrictBind(self.submitForm.NowCity_ID), self.areaSetting);//合并ajax值
                }
                self.$refs.area.reset();
            },
            saveUpdate: function (e) {
                var self = this;

                if (!layui.form.checkInput(e)) {
                    return false;
                };
                if (this.submitForm.CardNumber || this.submitForm.Phone) {
                 $.post("/service/edu/Student/EditStudentInfoByStuId", this.submitForm, function (result) {
                    if (result.SuccessResponse) {
                        layer.msg(result.Message, { time: 2000, icon: 1 }, function () {
                            window.parent.layer.close(parent.layer.getFrameIndex(window.name));
                        });
                    }
                    else {
                        layer.msg(result.Message, { icon: 2 });
                    }
                })
                } else {
                    layer.msg("请输入身份证号码或者手机号码")
                }
                return false;
            }
        }
    });
});
