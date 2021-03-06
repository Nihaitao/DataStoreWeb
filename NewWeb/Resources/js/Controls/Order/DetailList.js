﻿require_js_file(['table', 'form', 'jquery', 'tableExt', 'laydate'],
    function (fnr) {
        var table = layui.table;
        var form = layui.form;
        var tableExt = layui.tableExt;
        var $ = layui.$;
        //绑定列表
        var listTable = table.render({
            elem: '#listTable',
            even: true, //开启隔行背景
            id: 'listTable',
            cols: [
                [
                    { field: 'ID', title: '订单明细编号', width: 120 },
                    { field: 'Name', title: '网课名称', width: 180 },
                    { field: 'OrderNo', title: '订单编号', width: 180 },
                    { field: 'Price', title: '网课金额', width: 120 },
                    { field: 'TotalHours', title: '总课时', width: 140 },
                    {
                        field: 'TeachingMethod', title: '授课方式', sort: true, width: 120, templet: function () {
                            var array = new Array();
                            if (this.TeachingMethod == 1)
                                array.push("<div>录播</div>");
                            else if (this.TeachingMethod == 2)
                                array.push("<div>直播</div>");
                            else if (this.TeachingMethod == 3)
                                array.push("<div>面授</div>");
                            return array.join("");
                        }
                    }
                ]
            ],
            url: '/service/datastore/Order/GetOrderDetailList',
            response: {
                dataName: 'Data'
            },
            where: {orderId:fnr.getQueryString("orderId")}
        });
    });
