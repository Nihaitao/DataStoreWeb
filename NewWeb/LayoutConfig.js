var TreeData;
var FeePackage;
require_js_file(['table', 'form', 'jquery', 'tableExt', 'linq', 'laytpl', "customUtil"],
    function (fnr) {
        var table = layui.table;
        var form = layui.form;
        var tableExt = layui.tableExt;
        var $ = layui.$;
        var linq = layui.linq;
        var laytpl = layui.laytpl;

        $.ajax({
            url: '/service/public/CustomSettings/GetLayoutConfig',
            type: 'get',
            data: { BusType: BusType, Other: 1 },
            dataType: 'json',
            success: function (rsp) {
                var LayoutConfigList = new Array();
                fnr.each(rsp.Data, function (index, item) {
                    fnr.each(item.Childs, function (_k, _v) {
                        LayoutConfigList.push(_v);
                    });
                });

                var submitData = {};
                $.each(LayoutConfigList, function (index, item) {
                    submitData[item.FieldName] = '';
                    switch (item.FieldType) {
                        case 100://单行文本
                            item.html = "<input type='text' lay-verify='" + (item.Required == 1 ? 'required' : '') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-input' v-model='submitData." + item.FieldName + "'>";
                            break;
                        case 101://邮箱
                            item.html = "<input type='text' lay-verify='" + (item.Required == 1 ? 'email' : 'empty|email') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-input' v-model='submitData." + item.FieldName + "'>";
                            break;
                        case 102://多行文本
                            item.html = "<textarea type='text' lay-verify='" + (item.Required == 1 ? 'required' : '') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-textarea' v-model='submitData." + item.FieldName + "'></textarea>";
                            break;
                        case 103://单选框
                            //item.html = "<remote-rad v-bind:setting='sexSetting' v-bind:value.sync='submitData." + item.FieldName + "' initial = 'off' layverify= '" + (item.Required == 1 ? 'required' : '') + "'></remote-rad>";
                            item.html = "<custom-rad v-bind:setting='" + item.DataSource+"' v-bind:value.sync='item.value' layverify='" + (item.Required == 1 ? 'required' : '') + "'></custom-rad>";
                            break;
                        case 104://整数
                            item.html = "<input type='text' lay-verify='" + (item.Required == 1 ? 'required' : 'empty|number') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-input' v-model='submitData." + item.FieldName + "'>";
                            break;
                        case 105://小数
                            item.html = "<input type='text' lay-verify='" + (item.Required == 1 ? 'required' : 'empty|number') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-input' v-model='submitData." + item.FieldName + "'>";
                            break;
                        case 106://金额
                            item.html = "<input type='text' lay-verify='" + (item.Required == 1 ? 'required' : 'empty|number') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-input' v-model='submitData." + item.FieldName + "'>";
                            break;
                        case 106://金额
                            item.html = "<input type='text' lay-verify='" + (item.Required == 1 ? 'required' : 'empty|number') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-input' v-model='submitData." + item.FieldName + "'>";
                            break;
                        case 107://图片
                            item.html = "<input type='text' lay-verify='" + (item.Required == 1 ? 'required' : 'empty|number') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-input' v-model='submitData." + item.FieldName + "'>";
                            break;
                        case 108://日期
                            submitData[item.FieldName] = fnr.format(new Date(), "yyyy-MM-dd");
                            item.html = "<lay-date autocomplete='off' placeholder='" + item.Tips + "' layverify='" + (item.Required == 1 ? 'required' : 'empty|number') + "' v-bind:value.sync='submitData." + item.FieldName + "'></lay-date>";
                            break;
                        case 1088://时间
                            submitData[item.FieldName] = fnr.format(new Date(), "yyyy-MM-dd HH:mm");
                            item.html = "<lay-date autocomplete='off' placeholder='" + item.Tips + "' format='yyyy-MM-dd HH:mm' layverify='" + (item.Required == 1 ? 'required' : 'empty|number') + "' v-bind:value.sync='submitData." + item.FieldName + "'></lay-date>";
                            break;
                        case 109://下拉列表
                            item.html = "<custom-sel v-bind:setting='" + item.DataSource +"' v-bind:value.sync='submitData." + item.FieldName + "' v-bind:layverify='" + (item.Required == 1 ? 'email' : 'empty| number') + "'></custom-sel>";
                            break;
                        case 110://多选列表
                            item.html = "<custom-chb v-bind:setting='" + item.DataSource +"' v-bind:value.sync='submitData." + item.FieldName + "' v-bind:layverify='" + (item.Required == 1 ? 'email' : 'empty| number') + "'></custom-chb>";
                            break;


                        case 33://性别
                            submitData[item.FieldName] = 1;
                            item.html = "<remote-rad v-bind:setting='sexSetting' v-bind:value.sync='submitData." + item.FieldName + "' initial = 'off' layverify= '" + (item.Required == 1 ? 'required' : '') + "'></remote-rad>";
                            break;
                        case 111://手机号码
                            item.html = "<input type='tel' lay-verify='" + (item.Required == 1 ? 'required|phone' : 'empty|phone') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-input' v-model='submitData." + item.FieldName + "'>";
                            break;
                        case 56://民族
                            item.html = "<remote-sel layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='NationSetting' v-bind:value.sync='submitData." + item.FieldName + "'></remote-sel>";
                            break;
                        case 57://身份证
                            item.html = "<input type='text' lay-verify='" + (item.Required == 1 ? 'identity' : 'empty|identity') + "' autocomplete='off' placeholder='" + item.Tips + "' class='layui-input' v-model='submitData." + item.FieldName + "'>";
                            break;
                        case 6://学历
                            item.html = "<remote-sel layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='EducationSetting' v-bind:value.sync='submitData." + item.FieldName + "'></remote-sel>";
                            break;
                        case 11://地区
                            item.html = "";
                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:province v-bind:layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='provinceSetting' v-bind:value.sync='submitData.NowProvince_ID'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:city v-bind:layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='citySetting' v-bind:value.sync='submitData.NowCity_ID'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:area v-bind:layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='areaSetting' v-bind:value.sync='submitData.NowArea_ID'></remote-sel></div>";

                            item.html += "<br/><div style='margin-top:10px'><input type='text' autocomplete='off' placeholder='请输入详细地址' class='layui-input' lay-verify='" + (item.Required == 1 ? 'required' : '') + "'  v-model='submitData.NowAddress'></div>";
                            break;
                        case 77://学生来源
                            item.html = "<remote-sel layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='sourceSetting' v-bind:value.sync='submitData." + item.FieldName + "'></remote-sel>";
                            break;
                        case 78://咨询员
                            item.html = "<remote-sel layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='userSetting' v-bind:value.sync='submitData." + item.FieldName + "'></remote-sel>";
                            break;
                        case 81://班主任
                            item.html = "<remote-sel layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='userSetting' v-bind:value.sync='submitData." + item.FieldName + "'></remote-sel>";
                            break;


                        case 1001://自考
                            submitData.Model_ID = 1;
                            item.html = "";
                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:provincebk layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.Province_ID' laytips='选择省份'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:school layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.School_ID' laytips='选择学校'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:level layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.Level_ID' laytips='选择专业层次'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:specialty layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.Specialty_ID' laytips='选择专业'></remote-sel></div>";

                            item.html += "<div v-show='SpecialtyVersionShow' class='layui-input-inline'><remote-sel v-ref:version layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.SpecialtyVersion_ID' laytips='选择专业版本'></remote-sel></div>";

                            item.html += "<br/><div class='layui-input-inline' style='margin-top:10px; float:inherit; display: block;'><remote-sel v-ref:batch laytips='选择注册批次' layverify='" + (item.Required == 1 ? 'required' : '') + "'  v-bind:value.sync='submitData.Batch_ID' v-bind:setting='batchSetting'></remote-sel></div>";
                            break;


                        case 1002://成考
                            submitData.Model_ID = 2;
                            item.html = "";
                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:provincebk layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.Province_ID' laytips='选择省份'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:school layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.School_ID' laytips='选择学校'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:level layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.Level_ID' laytips='选择专业层次'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:specialty layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.Specialty_ID' laytips='选择专业'></remote-sel></div>";


                            item.html += "<br/><div class='layui-input-inline' style='margin-top:10px; float:inherit; display: block;'><remote-sel v-ref:batch laytips='选择注册批次' layverify='" + (item.Required == 1 ? 'required' : '') + "'  v-bind:value.sync='submitData.Batch_ID' v-bind:setting='batchSetting'></remote-sel></div>";
                            break;

                        case 1003://远程
                            submitData.Model_ID = 3;
                            item.html = "";
                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:provincebk layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.Province_ID' laytips='选择省份'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:school layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.School_ID' laytips='选择学校'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:level layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.Level_ID' laytips='选择专业层次'></remote-sel></div>";

                            item.html += "<div class='layui-input-inline'><remote-sel v-ref:specialty layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData.Specialty_ID' laytips='选择专业'></remote-sel></div>";

                            item.html += "<br/><div class='layui-input-inline' style='margin-top:10px; float:inherit; display: block;'><remote-sel v-ref:batch laytips='选择注册批次' layverify='" + (item.Required == 1 ? 'required' : '') + "'  v-bind:value.sync='submitData.Batch_ID' v-bind:setting='batchSetting'></remote-sel></div>";
                            break;

                        case 75://招生点
                            item.html = "<remote-sel layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='stationSetting' v-bind:value.sync='submitData." + item.FieldName + "' laytips='" + item.Tips + "'></remote-sel>";
                            break;
                        case 76://注册点
                            item.html = "<remote-sel layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='registSetting' v-bind:value.sync='submitData." + item.FieldName + "' v-ref:regist laytips='" + item.Tips + "'></remote-sel>";
                            break;
                        case 79://学籍状态
                            item.html = "<remote-sel layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:setting='schoolrollSetting' v-bind:value.sync='submitData." + item.FieldName + "' laytips='" + item.Tips + "'></remote-sel>";
                            break;
                        case 89://收费套餐
                            item.html = "<remote-sel layverify='" + (item.Required == 1 ? 'required' : '') + "' v-bind:value.sync='submitData." + item.FieldName + "' laytips='" + item.Tips + "'v-ref:package v-bind:tag=\"'package'\"></remote-sel>";
                            break;
                    }
                });
                var data = { //数据
                    "LayoutConfigList": LayoutConfigList
                }

                //渲染html
                var template = $("#layountTemplate").html();
                if (template == undefined) {
                    template = "";
                    template += "{{#  layui.each(d.LayoutConfigList, function(index, item){ }}";
                    template += "<div class=\"layui-form-item {{#if(item.Common === 0){ }}layui-hide{{#}}}\">";
                    template += "<label class=\"layui-form-label\">";
                    template += "{{#if(item.Required === 1){ }}<span style=\"color: red; margin-right: 5px; \">*</span>{{#}}}{{item.ShowName}}";
                    template += "</label>";
                    template += "<div class=\"layui-input-block\">";
                    template += "{{item.html}}";
                    template += "</div>";
                    template += "</div>";
                    template += "{{#});}}";
                }
                laytpl(template).render(data, function (html) {
                    $("#layountView").html(html);

                    if ($(".layui-hide").size() > 0)
                        $(".layui-form-item:last").after($("<div class=\"layui-form-item\"><label class=\"layui-form-label\"></label><div class=\"layui-input-block\"><a href=\"javascript: ; \" @click=\"clickshow\">展开更多信息</a></div></div>"));

                    window.layoutApp = new Vue({
                        el: "#root",
                        data: {
                            commonShow: false,
                            SpecialtyVersionShow: false,
                            submitData: submitData,
                            sexSetting: {
                                tags: { name: "Sex" },
                                options: [
                                    { key: "1", value: "男" },
                                    { key: "0", value: "女" }
                                ],
                                defaultValue: 1
                            },
                            NationSetting: {
                                search: true,
                                fields: { key: 'ID', value: 'Name', root: 'Data' },
                                options: [],
                                remote: { url: "/service/public/ProvinceCityDistrict/GetNationList", data: {} }
                            },
                            EducationSetting: {
                                search: true,
                                fields: { key: 'ID', value: 'Description' },
                                options: [],
                                remote: { url: "/service/public/HDictionary/GetHDictionaryList", data: { Valid: 1, ColumnName: 'Education_ID' } }
                            },
                            userSetting: {
                                search: true,
                                options: [],
                                fields: { key: 'Account_ID', value: 'Name', root: "Data" },
                                remote: {
                                    url: '/service/hr/Station/GetListStationAccount',
                                }
                            },
                            sourceSetting: {
                                search: true,
                                fields: { root: "Data", key: 'ID', value: 'Description' },
                                remote: {
                                    url: '/service/public/HDictionary/GetHDictionaryList', data: { Valid: 1, ColumnName: 'Source_ID' }
                                }
                            },
                            provinceSetting: {
                                search: true,
                                fields: { key: 'ProvinceID', value: 'ProvinceName', root: 'Data' },
                                options: [],
                                remote: { url: "/service/public/ProvinceCityDistrict/GetProvinceList", data: {} },
                                defaultValue: 0
                            },
                            citySetting: {
                                search: true,
                                fields: { key: 'CityID', value: 'CityName', root: 'Data' },
                                options: [],
                                defaultValue: 0
                            },
                            areaSetting: {
                                search: true,
                                fields: { key: 'DistrictID', value: 'DistrictName', root: 'Data' },
                                options: [],
                                defaultValue: 0
                            },
                            batchSetting: {
                                search: true,
                                fields: { key: 'ID', value: 'Name', root: "Data" },
                                options: [],
                                defaultValue: 0
                            },
                            stationSetting: {
                                search: true,
                                fields: { key: 'ID', value: 'Name', root: "Data" },
                                options: [],
                                remote: {
                                    url: "/service/edu/BaseSet/QueryStationList", data: { IsDelete: 1, ProxyTypeArr: 0 }
                                }
                            },
                            registSetting: {
                                search: true,
                                fields: { key: 'ID', value: 'Name', root: "Data" },
                                options: [],
                            },
                            schoolrollSetting: {
                                search: true,
                                selectedIndex: 0,
                                options: [],
                                fields: { root: "Data", key: 'ID', value: 'Description' },
                                remote: {
                                    url: '/service/public/HDictionary/GetHDictionaryList',
                                    data: { Valid: 1, ColumnName: 'SchoolRoll_ID' },
                                }
                            }
                        },
                        methods: {
                            clickshow: function () {
                                var self = this;
                                $(".layui-form-item:last").remove();
                                $(".layui-hide").removeClass("layui-hide");

                            },
                            ProvinceData: function () {
                                var self = this;
                                var list = linq.from(TreeData)
                                    .where(i => i.pId == self.submitData.Model_ID)
                                    .select(function (x) { return { key: x.Province_ID, value: x.name }; }).toArray();

                                self.$refs.provincebk.search = true;
                                self.$refs.provincebk.options = list;
                                self.$refs.provincebk.resetData();
                            },
                            SchoolData: function () {
                                var self = this;
                                var list = linq.from(TreeData)
                                    .where(i => i.Model_ID == self.submitData.Model_ID && i.Province_ID == self.submitData.Province_ID && i.School_ID > 0 && i.Level_ID == 0)
                                    .select(function (x) { return { key: x.School_ID, value: x.name }; }).toArray();

                                self.$refs.school.search = true;
                                self.$refs.school.options = list;
                                self.$refs.school.resetData();
                            },
                            LevelData: function () {
                                var self = this;
                                var list = linq.from(TreeData)
                                    .where(i => i.Model_ID == self.submitData.Model_ID && i.School_ID == self.submitData.School_ID && i.Level_ID > 0 && i.Specialty_ID == 0).distinct(x => x.Level_ID)
                                    .select(function (x) { return { key: x.Level_ID, value: x.name }; }).toArray();

                                self.$refs.level.search = true;
                                self.$refs.level.options = list;
                                self.$refs.level.resetData();
                            },
                            SpecialtyData: function () {
                                var self = this;

                                var list = linq.from(TreeData)
                                    .where(i => i.Model_ID == self.submitData.Model_ID && i.School_ID == self.submitData.School_ID && i.Level_ID == self.submitData.Level_ID && i.Specialty_ID > 0).distinct(x => x.Specialty_ID)
                                    .select(function (x) { return { key: x.Specialty_ID, value: x.name }; }).toArray();

                                self.$refs.specialty.search = true;
                                self.$refs.specialty.options = list;
                                self.$refs.specialty.resetData();
                            },
                            SpecialtyVersionData: function () {
                                var self = this;
                                if (self.submitData.Model_ID == 1 && self.submitData.Specialty_ID > 0) {
                                    $.get("/service/edu/SpecialtyVersion/SelectSpecialtyVersionById", { Specialty_ID: self.submitData.Specialty_ID }, function (rsp) {
                                        if (rsp.SuccessResponse) {

                                            var list = linq.from(rsp.Data)
                                                .where(i => i.Valid == 1)
                                                .select(function (x) { return { key: x.ID, value: x.VersionName }; }).toArray();

                                            self.$refs.version.options = list;
                                            self.$refs.version.resetData();

                                            if (list.length == 1) {
                                                self.SpecialtyVersionShow = false;
                                                self.submitData.SpecialtyVersion_ID = list[0].key;
                                            } else if (list.length > 1) {
                                                self.SpecialtyVersionShow = true;
                                            } else {
                                                self.SpecialtyVersionShow = true;
                                            }
                                        }
                                    });
                                }
                            },
                            batchData: function () {
                                var self = this;
                                if (self.submitData.Province_ID == 0) {
                                    self.batchSetting.remote = {};
                                    self.batchSetting.remote.url = "";
                                    self.batchSetting.remote.data = {};
                                    self.$refs.batch.reset();
                                } else if (self.submitData.Province_ID > 0) {
                                    self.batchSetting.remote = { url: "/service/edu/BaseSet/QueryBatchList", data: { IsCurStation: 1, Model_ID: submitData.Model_ID, SystemType: 1, Province_ID: submitData.Province_ID } };
                                    self.$refs.batch.reset();
                                }
                            },
                            registData: function () {
                                var self = this;
                                if (self.submitData.School_ID == 0) {
                                    self.registSetting.remote = {};
                                    self.registSetting.remote.url = "";
                                    self.registSetting.remote.data = {};
                                    self.$refs.regist.reset();
                                } else if (self.submitData.School_ID > 0) {
                                    self.registSetting.remote = { url: "/service/edu/BaseSet/QueryRegistList", data: { valid: 1, Model_ID: submitData.Model_ID, School_ID: submitData.School_ID, IsCurStation: 1 } };
                                    self.$refs.regist.reset();
                                }
                            },
                            getCharCount: function (str, c) {
                                var regex = new RegExp(c, 'g'); // 使用g表示整个字符串都要匹配
                                var result = str.match(regex);
                                var count = !result ? 0 : result.length;
                                return count;
                            },
                            changePackage: function () {
                                var self = this;

                                submitData.Register_ID = submitData.Register_ID == "" ? 0 : submitData.Register_ID;
                                submitData.Batch_ID = submitData.Batch_ID == "" ? 0 : submitData.Batch_ID;

                                submitData.School_ID = submitData.School_ID == "" ? 0 : submitData.School_ID;
                                var Category_ID = 0;
                                if (submitData.Specialty_ID > 0) {
                                    Category_ID = linq.from(TreeData).firstOrDefault(i => i.Specialty_ID == submitData.Specialty_ID).Category_ID;
                                }

                                var RuleIndex = submitData.Model_ID + "_" + submitData.Province_ID + "_" + submitData.School_ID + "_" + submitData.Level_ID + "_" + Category_ID + "_" + submitData.Specialty_ID;
                                while (RuleIndex.endsWith("_0") || RuleIndex.endsWith("_")) {
                                    var index = RuleIndex.lastIndexOf("_");
                                    var char = RuleIndex.substring(index + 1);
                                    if (char != 0) {
                                        break;
                                    }
                                    RuleIndex = RuleIndex.substring(0, index);
                                }
                                var result = new Array();
                                fnr.each(FeePackage, function (k, v) {
                                    fnr.each(v.RuleList, function (_k, _v) {
                                        result.push(_v);
                                    });
                                });
                                //精准匹配
                                var PackageIDArray = linq.from(result)
                                    .where(i => (i.RuleIndex + "_").startsWith(RuleIndex + "_"))
                                    .distinct(x => x.Package_ID)
                                    .select(function (x) { return x.Package_ID }).toArray();
                                //模糊匹配
                                if (PackageIDArray.length == 0) {
                                    result = result.sort(function (a, b) {
                                        return self.getCharCount(a.RuleIndex, '_') > self.getCharCount(a.RuleIndex, '_');
                                    });
                                    var v = linq.from(result).firstOrDefault(x => (RuleIndex + "_").startsWith(x.RuleIndex + "_"));
                                    if (v)
                                        PackageIDArray.push(v.Package_ID)
                                }

                                var list = null;
                                //其他条件匹配
                                if (PackageIDArray.length > 0) {

                                    if (submitData.Batch_ID > 0) {
                                        list = linq.from(FeePackage)
                                            .where(i => $.inArray(i.ID, PackageIDArray) >= 0 && (i.Batch_IDs + ",").indexOf(submitData.Batch_ID + ",") >= 0)
                                            .select(function (x) { return { key: x.ID, value: x.Name }; }).toArray();
                                    }

                                    if (submitData.Register_ID > 0) {
                                        list = linq.from(FeePackage)
                                            .where(i => $.inArray(i.ID, PackageIDArray) >= 0 && (i.Register_IDs + ",").indexOf(submitData.Register_ID + ",") >= 0)
                                            .select(function (x) { return { key: x.ID, value: x.Name }; }).toArray();
                                    }

                                    if (list == null || list.length == 0) {
                                        list = linq.from(FeePackage)
                                            .where(i => $.inArray(i.ID, PackageIDArray) >= 0)
                                            .select(function (x) { return { key: x.ID, value: x.Name }; }).toArray();
                                    }
                                }

                                if (list != null && list.length == 1)
                                    self.submitData.PackageId = list[0].key;
                                self.$refs.package.search = true;
                                self.$refs.package.options = list;
                                self.$refs.package.resetData();
                            },
                            cityData: function () {
                                var self = this;
                                if (self.submitData.NowProvince_ID == 0) {
                                    self.citySetting.remote = {};
                                    self.citySetting.remote.url = "";
                                    self.citySetting.remote.data = {};
                                    self.$refs.city.reset();

                                    self.areaSetting.remote = {};
                                    self.areaSetting.remote.url = "";
                                    self.areaSetting.remote.data = {};
                                    self.$refs.area.reset();
                                } else if (self.submitData.NowProvince_ID > 0) {
                                    self.citySetting.remote = { url: "/service/public/ProvinceCityDistrict/GetCityList", data: { ID: self.submitData.NowProvince_ID } };
                                    self.$refs.city.reset();
                                }
                            },
                            AreaData: function () {
                                var self = this;
                                if (self.submitData.NowCity_ID == 0) {
                                    self.areaSetting.remote = {};
                                    self.areaSetting.remote.url = "";
                                    self.areaSetting.remote.data = {};
                                    self.$refs.area.reset();
                                } else if (self.submitData.NowCity_ID > 0) {
                                    self.areaSetting.remote = { url: "/service/public/ProvinceCityDistrict/GetDistrictList", data: { ID: self.submitData.NowCity_ID } };
                                    self.$refs.area.reset();
                                }
                            }
                        },
                        ready: function () {
                            $.ajaxSetup({
                                async: false
                            });

                            var self = this;
                            //获取报考数据
                            if (self.$refs.school != undefined) {
                                $.get("/service/edu/Specialty/GetSpecialtyTrmmList", [], function (rsp) {
                                    if (rsp.SuccessResponse) {
                                        TreeData = rsp.Data;

                                        self.ProvinceData();
                                    }
                                });
                            }

                            //获取收费套餐数据
                            if (self.$refs.package != undefined) {
                                $.get("/service/edu/FinanceSet/GetFeePackageList", { Valid: 1, Model_ID: submitData.Model_ID }, function (rsp) {
                                    if (rsp.SuccessResponse) {
                                        FeePackage = rsp.Data;

                                        self.changePackage();
                                    }
                                });
                            }

                            if (typeof (layoutReady) == 'function') {
                                layoutReady(self);
                            }
                            self.$nextTick(function () {

                                //报考联动事件
                                if (self.$refs.school != undefined) {
                                    self.$refs.provincebk.change = function () {
                                        self.submitData.School_ID = 0;
                                        self.SchoolData();

                                        self.changePackage();

                                        //注册批次联动
                                        self.submitData.Batch_ID = 0;
                                        self.batchData();
                                    };

                                    //学校联动
                                    self.$refs.school.change = function () {
                                        self.submitData.Level_ID = 0;
                                        self.LevelData();

                                        self.changePackage();

                                        //注册点联动
                                        self.submitData.Register_ID = 0;
                                        self.registData();
                                    };
                                    //专业层次联动
                                    self.$refs.level.change = function () {
                                        self.submitData.Specialty_ID = 0;
                                        self.submitData.SpecialtyVersion_ID = 0;
                                        self.SpecialtyData();

                                        self.changePackage();
                                    };
                                    //专业联动
                                    self.$refs.specialty.change = function () {
                                        self.submitData.SpecialtyVersion_ID = 0;
                                        self.SpecialtyVersionData();

                                        self.changePackage();
                                    };

                                    //注册批次联动
                                    self.$refs.batch.change = function () {
                                        self.changePackage();
                                    };

                                    //注册点联动
                                    self.$refs.regist.change = function () {
                                        self.changePackage();
                                    };
                                }

                                //地区联动事件
                                if (self.$refs.province != undefined) {
                                    self.$refs.province.change = function () {
                                        self.submitData.NowCity_ID = 0;
                                        self.submitData.NowArea_ID = 0;
                                        self.cityData();
                                    };
                                    self.$refs.city.change = function () {
                                        self.submitData.NowArea_ID = 0;
                                        self.AreaData();
                                    }
                                };
                            });

                        }
                    });
                });
            }
        });

    });