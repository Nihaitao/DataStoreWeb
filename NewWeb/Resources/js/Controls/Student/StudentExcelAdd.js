﻿require_js_file(["table", "form", "jquery", "tableExt", "laydate", "element", "upload"],

function (fnr) {
    var table = layui.table;
    var form = layui.form;
    var tableExt = layui.tableExt;
    var $ = layui.$;
    var layer = layui.layer;
    var element = layui.element;
    var upload = layui.upload;
    //搜索条件
    var rootApp = new Vue({
        el: '#root',
        data: {
            //搜索选择框 --- 跟进阶段
            searchKeySetting: {
                options: [
                        { key: "0", value: "直接覆盖" },
                        { key: "1", value: "跳过不操作" }
                ]
            },
            dataTable: [],
            showIndex: 0,
            SucessCount: 0,
            FailCount: 0,
        },
        methods: {
            /*学生Excel模版下载*/
            ExcelTemplateStudentList: function () {
                fnr.download("/service/edu/Student/GetExcelTemplateStudentList2");
            },
            uploadRow: function (rowIndex) {
                var self = this;
                if (rowIndex >= self.dataTable.length) {
                    layer.alert("上传完成");
                    self.showIndex = 2;
                    return;
                }
                $.post("/service/edu/Student/ImportStudentExcel", self.dataTable[rowIndex].data, function (result) {
                    if (result.SuccessResponse) {
                        self.SucessCount++;
                        self.dataTable[rowIndex].model.Status = 1;
                    }
                    else {
                        self.FailCount++;
                        self.dataTable[rowIndex].model.Status = 2;
                        self.dataTable[rowIndex].model.Remark = result.Message;
                    }
                    self.uploadRow(++rowIndex);
                });

            },
            startUpload: function () {
                this.uploadRow(0);
            },
            getStatus: function (status) {
                switch (status) {
                    case 0: {
                        return "未上传"
                    } break;
                    case 1: {
                        return "上传成功"
                    } break;
                    case 2: {
                        return "上传失败"
                    } break;
                }
                return "-";
            }
        }
    });
    var first = true;
    /*学生Excel上传 Start*/
    upload.render({
        elem: '#uploadchoice'
           , url: '/excel/ImportStudent'
           , auto: false
           , accept: 'file' //普通文件
           , exts: "xls|xlsx"
           , bindAction: '#upload'
           , done: function (res) {
               if (!first) {
                   fnr.msg("");
                   return;
               }
               first = false;
               //循环遍历json集合
               $.each(res, function (i, v) {
                   rootApp.dataTable.push({ data: this, model: { Status: 0, Remark: "" } });
               });
               rootApp.showIndex = 1;
               rootApp.startUpload();
           }
    });
    /*学生Excel上传 End*/
});
