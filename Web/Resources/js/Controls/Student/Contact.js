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

var paging
var ListInit = function () {
    layui.use(['paging'], function () {

        //绑定列表 分页 模板引擎
        paging = layui.paging();
        paging.init({
            url: 'http://localhost:30400/Station/GetList', //地址
            //elem: '#Container', //内容容器
            params: { //发送到服务端的参数

            },
            //type: 'GET',
            //tempElem: '#Templete', //模块容器
            //pageConfig: { //分页参数配置
            //    PageSize: 10 //分页大小
            //},
            success: function (res) { //成功的回调
            },
            fail: function (msg) { //获取数据失败的回调
            },
            complate: function (res) { //完成的回调
            }
        });

    });
}

var AddInit = function () {
    layui.use(['laydate', 'layer', 'laytpl', 'form', 'layedit', 'element'], function () {
        var $ = layui.jquery;
        var element = layui.element();
        var laydate = layui.laydate;
        var layer = layui.layer;
        var form = layui.form();
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