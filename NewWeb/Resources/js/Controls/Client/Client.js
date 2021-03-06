﻿//学生列表初始化
var ListInit = function () {
    layui.use(['table', 'form', 'element'], function () {
        var $ = layui.jquery;
        var table = layui.table;
        var form = layui.form;
        var element = layui.element;
        //执行渲染
        window.ins1 = table.render({
            elem: '#table' //指定原始表格元素选择器（推荐id选择器）
            , even: true
            , url: '/Base/Aciton'
            , urlData: '/Student/GetStudentList'
            , page: true
            , cols: [[
                { fixed: true, checkbox: true }
                , { field: 'StuName', title: '客户名称', width: 120, sort: true, templet: '<div><a href="javascirpt:;" onclick=BindStudentInfoPage("{{d.StuId}}") class="layui-table-link">{{d.StuName}}</a></div>' }
                , { field: 'CardNumber', title: '联系人', width: 120 }
                , { field: 'Sex', title: '跟进阶段', sort: true, width: 120, templet: '#sexTpl' }
                , { field: 'Sex', title: '重要程度', sort: true, width: 120, templet: '#sexTpl' }
                , { field: 'Sex', title: '客户来源', sort: true, width: 120, templet: '#sexTpl' }
                , { field: 'Sex', title: '所有者', sort: true, width: 120, templet: '#sexTpl' }
                , { field: 'Phone', title: '最新跟进记录', width: 220 }
                , { field: 'EducationName', title: '跟进时间', sort: true, width: 140 }
                , { field: 'IsEnable', title: '下次跟进时间', sort: true, width: 140, templet: '#isEnableTpl' }
                , {  title: '操作', width: 300, toolbar: '#barDemo' }
            ]]
            , done: function (res, curr, count) {

                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            }
        });
    });
}