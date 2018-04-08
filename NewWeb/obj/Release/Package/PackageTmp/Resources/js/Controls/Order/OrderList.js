﻿/// <reference path="D:\cuifeng\5.0\SmarrSchool5.0\trunk\NewWeb\Html/Educational/Order/Detail.html" />
/// <reference path="D:\cuifeng\5.0\SmarrSchool5.0\trunk\NewWeb\Html/Educational/Order/Detail.html" />
require_js_file(['table', 'form', 'jquery', 'tableExt', 'laydate'],
    function (fnr) {
        var table = layui.table;
        var form = layui.form;
        var tableExt = layui.tableExt;
        var $ = layui.$;
        var laydate = layui.laydate;
        //搜索条件
        window.rootApp = new Vue({
            el: '#root',
            data: {
                searchKeySetting: {
                    options: [
                        {
                            key: 'Name',
                            value: '姓名'
                        }, {
                            key: 'CardNumber',
                            value: '身份证号码'
                        }, {
                            key: 'OrderNo',
                            value: '订单编号'
                        }
                    ]
                },
                paystatusSetting: {
                    defaultValue: -1,
                    search: true,
                    options: [
                        {
                            key: '1',
                            value: '支付成功'
                        }, {
                            key: '0',
                            value: '未支付'
                        }
                    ]
                },
                paytypeSetting: {
                    defaultValue:-1,
                    search: true,
                    options: [
                        {
                            key: '1',
                            value: '线上支付'
                        }, {
                            key: '0',
                            value: '线下支付'
                        }
                    ]
                },
                queryFormData: {
                    SearchName: 'Name',
                    SearchValue: '',
                    PayStatus: '',
                    PayType: '',
                    PayStartTime: '',
                    PayEndTime: '',
                }
            },
            ready: function () {
                var self = this;
                laydate.render({
                    elem: '#PayStartTime',
                    type: 'datetime',
                    change: function (value, date, endDate) {
                        self.queryFormData.PayStartTime = value;
                    }
                });
                laydate.render({
                    elem: '#PayEndTime',
                    type: 'datetime',
                    change: function (value, date, endDate) {
                        self.queryFormData.PayEndTime = value;
                    }
                });
            },
            methods: {
                doSearch: function () {
                    var self = this;
                    //alert(self.queryFormData.PayStartTime + "---" + self.queryFormData.PayEndTime);
                    //return;
                    listTable.reload({ where: self.queryFormData });
                },
                test: function () {
                    var checkStatus = table.checkStatus('idTest'); //test即为基础参数id对应的值

                },
                //ExcelExportStudent: function () {
                //    var self = this;
                //    $.get('/service/Student/GetExcelStudentList', {
                //        SearchName: self.queryFormData.SearchName,
                //        SearchValue: self.queryFormData.SearchValue,
                //        SearchIsEnable: self.queryFormData.SearchIsEnable
                //    }, function (result) {
                //        if (result.SuccessResponse == false) {
                //            layer.msg(result.Message);
                //            return false;
                //        } else {
                //            var Header = ["姓名", "身份证号码", "性别", "手机号码", "学生来源", "学生学历", "学生状态", "添加时间"];
                //            JsonToExcel(result.ReturnData.Data, "学生列表", Header);
                //        }
                //    });
                //}
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
                    { field: 'Name', title: '姓名', width: 120 },
                    { field: 'CardNumber', title: '身份证号码', width: 180 },
                    { field: 'OrderNo', title: '订单编号', width: 180 },
                    { field: 'PayPrice', title: '支付总额', width: 120 },
                    {
                        field: 'PayStatus', title: '支付状态', sort: true, width: 120, templet: function () {
                            return "<div>" + (this.PayStatus == 1 ? "支付成功" : "未支付") + "</div>";
                        }
                    },
                    {
                        field: 'PayType', title: '支付方式', sort: true, width: 120, templet: function () {
                            return "<div>" + (this.PayType == 1 ? "线上支付" : "线下支付") + "</div>";
                        }
                    },
                    {
                        field: 'PayTime', title: '支付时间', sort: true, width: 200, templet: function () {
                            return fnr.format(this.PayTime, "yyyy-MM-dd HH:mm:ss")
                        }
                    },
                    { field: 'PayCount', title: '购买数量', width: 140 },
                    {
                        fixed: 'right',
                        title: '操作',
                        width: 260,
                        toolbar: function () {
                            var array = new Array();
                            array.push("<button class=\"layui-btn layui-btn-small layui-btn-primary\" lay-event='lookstudent'>查看</button>");
                            return "<div>" + array.join("") + "</div>";
                        }
                    }
                ]
            ],
            url: '/service/datastore/Order/GetOrderList',
            where: {PayStatus:-1,PayType:-1}
        });
        //监听工具栏事件
        tableExt.addEvent("tool(listTable)",
            {
                //查看明细
                "lookstudent": function (data) {
                    fnr.openDialog({
                        title: '查看订单明细',
                        area: ['1000px', "600px"],
                        content: ['/Html/Educational/Order/Detail.html?orderId=' + data.ID] //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                        //btn: ['确认'],
                        //yes: function (index, layero) {
                        //    var iframeWin = window[layero.find('iframe')[0]['name']];
                        //    $(iframeWin.document).find(".layui-btn").click();

                        //}
                    });
                }
            });
    });
