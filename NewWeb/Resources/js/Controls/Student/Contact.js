var BindContactPage = function (elem) {
    var that = this;
    $(that.document).find(elem).on('click', function () {
        layer.open({
            title: '添加联系记录',
            skin: 'layui-layer-molv', //样式类名
            type: 2,
            area: ['620px', '480px'],
            content: ['/Educational/Contact/ContactAdd', 'no'], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            btn: ['保存'],
            yes: function (index, layero) {
                var iframeWin = window[layero.find('iframe')[0]['name']];
                $(iframeWin.document).find(".layui-btn").click();


            }, cancel: function () {

                //paging.Refresh(); //重新加载当前页面
            }
        });
    })
}

var ListInit = function () {
    layui.use(['table', 'form'], function () {
        var $ = layui.jquery;
        var table = layui.table;
        var form = layui.form;
        //执行渲染
        window.ins1 = table.render({
            elem: '#table' //指定原始表格元素选择器（推荐id选择器）
            , even: true
            , url: '/Base/Aciton'
            , urlData: '/Student/GetStudentList'
            , page: true
            , cols: [[
                { fixed: true, checkbox: true }
                , { field: 'StuName', title: '工作人员', width: 120, sort: true, templet: '<div><a href="javascirpt:;" onclick=BindStudentInfoPage("{{d.StuId}}") class="layui-table-link">{{d.StuName}}</a></div>' }
                , { field: 'Phone', title: '学生姓名', width: 220 }
                , { field: 'CardNumber', title: '联系方式', width: 220 }
                , { field: 'Sex', title: '联系时间', sort: true, width: 280, templet: '#sexTpl' }
                , { field: 'EducationName', title: '联系内容', sort: true, width: 100 }
                , { title: '操作', width: 300, toolbar: '#barDemo' }
            ]]
            , done: function (res, curr, count) {

                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            }
        });

        form.on('switch(filter)', function (data) {
            if (data.elem.checked) {
                var getTpl = Templete.innerHTML;
                laytpl(getTpl).render(data, function (html) {
                    Appointment.innerHTML = html;
                    form.render('select');
                });
            } else {
                Appointment.innerHTML = "";
            }
        });
    });
}

var AddInit = function () {
    layui.use(['laydate', 'layer', 'laytpl', 'form', 'layedit', 'element'], function () {
        var $ = layui.jquery;
        var element = layui.element;
        var laydate = layui.laydate;
        var layer = layui.layer;
        var form = layui.form;
        var layedit = layui.layedit;
        var laytpl = layui.laytpl;

        form.on('switch(filter)', function (data) {
            if (data.elem.checked) {
                var getTpl = Templete.innerHTML;
                laytpl(getTpl).render(data, function (html) {
                    Appointment.innerHTML = html;
                    form.render('select');
                });
            } else {
                Appointment.innerHTML = "";
            }
        });


        //提交按钮监听
        form.on('submit(formDemo)', function (data) {
            //逻辑添加

            layer.msg(JSON.stringify(data.field));

            return false;
        });
    });
}