﻿require_js_file(['table', 'form', 'jquery', 'tableExt'],
    function (fnr) {
        var table = layui.table;
        var form = layui.form;
        var tableExt = layui.tableExt;
        var $ = layui.$;
        //搜索条件
        window.rootApp = new Vue({
            el: '#root',
            data: {
                searchKeySetting: {
                    options: [
                        {
                            key: 'StuName',
                            value: '姓名'
                        }, {
                            key: 'Phone',
                            value: '手机号码'
                        }, {
                            key: 'CardNumber',
                            value: '身份证'
                        }
                    ]
                },
                statusSetting: {
                    search: true,
                    options: [
                        {
                            key: '1',
                            value: '启用'
                        }, {
                            key: '0',
                            value: '禁用'
                        }
                    ]
                },
                sourceSetting: {
                    search: true,
                    options: [],
                    fields: { root: 'Data', key: 'ID', value: 'Description' },
                    remote: { url: "/service/public/HDictionary/GetHDictionaryList", data: { Valid: 1, ColumnName: 'Source_ID' }, options: { method: 'get' } }
                },
                queryFormData: {
                    SearchName: 'StuName',
                    SearchValue: '',
                    SearchIsEnable: '',
                    SearchSource: ''
                }
            },
            methods: {
                doSearch: function () {
                    var self = this;
                    //return;
                    listTable.reload({ where: self.queryFormData });
                },
                test: function () {
                    var checkStatus = table.checkStatus('idTest'); //test即为基础参数id对应的值

                },
                addStudent: function () {
                    fnr.openDialog({
                        title: '添加学生',
                        area: ['800px', (parent.document.documentElement || parent.document.body).clientHeight - 140 + "px"],
                        content: ['/Html/Student/WX/add.html'], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                        btn: ['确认添加'],
                        yes: function (index, layero) {
                            var iframeWin = window[layero.find('iframe')[0]['name']];
                            $(iframeWin.document).find(".layui-btn").click();

                        }
                    });
                },
                ExceladdStudent: function () {
                    fnr.openDialog({
                        title: '导入学生',
                        area: ['800px', (parent.document.documentElement || parent.document.body).clientHeight - 140 + "px"],
                        content: ['/Html/Student/WX/Import.html'], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                        btn: ['开始导入'],
                        yes: function (index, layero) {

                        }
                    });
                },
                ExcelExportStudent: function () {
                    var self = this;
                    $.get('/service/edu/Student/GetExcelStudentList', {
                        SearchName: self.queryFormData.SearchName,
                        SearchValue: self.queryFormData.SearchValue,
                        SearchIsEnable: self.queryFormData.SearchIsEnable
                    }, function (result) {
                        if (result.SuccessResponse == false) {
                            layer.msg(result.Message);
                            return false;
                        } else {
                            var Header = ["姓名", "身份证号码", "性别", "手机号码", "学生来源", "学生学历", "学生状态", "添加时间"];
                            JsonToExcel(result.Data, "学生列表", Header);
                        }
                    });
                }
            }
        });
        //绑定列表
        var listTable = table.render({
            elem: '#listTable',
            even: true, //开启隔行背景
            page: true, //页分
            id: 'listTable',
            cols: [
                [
                    { fixed: true, checkbox: true },
                    { field: 'StuName', title: '姓名', width: 120 },
                    { field: 'CardNumber', title: '身份证号码', width: 180 },
                    {
                        field: 'Sex', title: '性别', sort: true, width: 80, templet: function () {
                            return "<div>" + (this.Sex == 1 ? "男" : "女") + "</div>";
                        }
                    },
                    { field: 'Phone', title: '手机号码', width: 140 },
                    { field: 'SourceName', title: '学生来源', sort: true, width: 120 },
                    { field: 'EducationName', title: '学生学历', width: 120 },
                    {
                        field: 'IsEnable', title: '学生状态', width: 100, sort: true, templet: function () {
                            return "<div>" + (this.IsEnable == 1 ? "启用" : "禁用") + "</div>";
                        }
                    },
                    {
                        field: 'AddTime', title: '添加时间', sort: true, width: 200, templet: function () {
                            return fnr.format(this.AddTime, "yyyy-MM-dd HH:mm:ss")
                        }
                    },
                    {
                        fixed: 'right',
                        field: 'name',
                        title: '操作',
                        width: 350,
                        toolbar: function () {
                            var array = new Array();
                            array.push("<button class=\"layui-btn layui-btn-small\" lay-event='editstudent'>编辑</button>");
                            array.push("<button class=\"layui-btn layui-btn-small " + (this.IsEnable == 1 ? "layui-btn-warm" : "layui-btn-normal") + " \" lay-event='editisenable'>" + (this.IsEnable == 1 ? "禁用" : "启用") + "</button>");
                            array.push("<button class=\"layui-btn layui-btn-small layui-btn-danger \" lay-event='delstudent'>删除</button>");
                            array.push("<button class=\"layui-btn layui-btn-small\" lay-event='addContact'>添加联系</button>");
                            array.push("<button class=\"layui-btn layui-btn-small\" lay-event='addOrder'>开课</button>");
                            return "<div>" + array.join("") + "</div>";
                        }
                    }
                ]
            ],
            url: '/service/edu/Student/GetStudentList'
        });
        //监听工具栏事件
        tableExt.addEvent("tool(listTable)",
            {
                //添加联系
                "addContact": function (data) {
                    fnr.openDialog({
                        title: '编辑学生',
                        area: ['800px', "400px"],
                        content: ['/Html/Educational/ContactReminder/addContact.html?StuID=' + data.StuId], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                        btn: ['确认'],
                        yes: function (index, layero) {
                            var iframeWin = window[layero.find('iframe')[0]['name']];
                            $(iframeWin.document).find(".layui-btn").click();

                        },
                        events: {
                            add: function () {
                            },
                            refresh: function (data) {
                                if (data) {
                                    layer.msg("添加联系记录成功")
                                }
                            }
                        }
                    });
                },
                //编辑学生信息
                "editstudent": function (data, obj) {
                    fnr.openDialog({
                        title: '编辑学生',
                        area: ['800px', (parent.document.documentElement || parent.document.body).clientHeight - 140 + "px"],
                        content: ['/Html/Student/WX/Edit.html?StuID=' + data.StuId], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                        btn: ['确认修改'],
                        yes: function (index, layero) {
                            var iframeWin = window[layero.find('iframe')[0]['name']];
                            $(iframeWin.document).find(".layui-btn").click();
                        },
                    });
                },
                //启用or禁用学生状态
                "editisenable": function (data, obj) {
                    layer.confirm("确定要【" + (data.IsEnable == 1 ? "禁用" : "启用") + "该学生吗？", function (index) {
                        $.post('/service/edu/Student/EditStudentInfoIsEnable', { StuID: data.StuId, IsEnable: data.IsEnable == 1 ? 0 : 1 }, function (result) {
                            if (result.SuccessResponse == false) {
                                layer.msg(result.Message);
                                return false;
                            } else {
                                layer.msg(result.Message, { time: 1000 }, function () {
                                    rootApp.doSearch();
                                    //location.href = location.href; //重新加载当前页面
                                });
                            }
                        });
                        layer.close(index);
                    });
                },
                //删除学生
                "delstudent": function (data, obj) {
                    layer.confirm('确定要删除该学生吗？一旦删除便不可恢复！', function (index) {
                        $.post('/service/edu/Student/DeleteStudentInfoByStation', { StuID: data.StuId }, function (result) {
                            if (result.SuccessResponse == false) {
                                layer.msg(result.Message);
                                return false;
                            } else {
                                layer.msg(result.Message, { time: 1000 }, function () {
                                    paging.Refresh(); //重新加载当前页面
                                });
                            }
                        });
                        layer.close(index);
                    });
                },
                //开课
                "addOrder": function (data, obj) {
                    fnr.openDialog({
                        title: '查看开课列表',
                        area: ['1100px', (parent.document.documentElement || parent.document.body).clientHeight - 140 + "px"],
                        content: ['/Html/Educational/Order/StudentOrderList.html?StuID=' + data.StuId], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                       
                    });
                }
            });
    });
