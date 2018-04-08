//学生列表初始化
var paging
var ListInit = function () {
    layui.use(['paging'], function () {
        console.log(AppUrl);
        //绑定列表 分页 模板引擎
        paging = layui.paging();
        paging.init({
            url: 'http://localhost:30400/Student/GetStudentList', //地址
            //elem: '#Container', //内容容器
            //params: { //发送到服务端的参数

            //},
            //type: 'GET',
            //tempElem: '#Templete', //模块容器
            //pageConfig: { //分页参数配置
            //    PageSize: 5 //分页大小
            //},
            success: function (res) { //成功的回调
                BindStudentInfoPage(".StudentInfo");

                BindContactPage(".bt1")
            },
            fail: function (msg) { //获取数据失败的回调
            },
            complate: function (res) { //完成的回调
            }
        });
        BindAddStudentPage("#btnAdd"); //绑定添加学生事件
        SearchStudentPage("#btnSearch");
    });
}

//查询事件
var SearchStudentPage = function (elem) {
    var that = this;
    $(that.document).find(elem).on('click', function () {
        ListInit();
    })
}


//绑定添加学生事件
var BindAddStudentPage = function (elem) {
    var that = this;
    $(that.document).find(elem).on('click', function () {
        layer.open({
            title: '添加学生',
            skin: 'layui-layer-molv', //样式类名
            type: 2,
            area: ['730px', '600px'],
            content: ['/Student/WX/StudentAdd', 'no'], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
            btn: ['确认添加'],
            yes: function (index, layero) {
                var iframeWin = window[layero.find('iframe')[0]['name']];
                $(iframeWin.document).find(".layui-btn").click();

            }, cancel: function () {

                //paging.Refresh(); //重新加载当前页面
            }
        });
    })
}

//绑定学生信息
var BindStudentInfoPage = function (elem) {
    var that = this;
    $(that.document).find(elem).on('click', function () {
        layer.open({
            title: '学生信息',
            skin: 'layui-layer-molv', //样式类名
            type: 2,
            shadeClose: true,
            area: ['730px', '600px'],
            content: ['/Student/WX/StudentInfo', 'no'], //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
        });
    })
}

//添加学生初始化
var AddInit = function () {
    layui.use(['laydate', 'layer', 'form', 'layedit', 'element'], function () {
        var $ = layui.jquery;
        var element = layui.element();
        var laydate = layui.laydate;
        var layer = layui.layer;
        var form = layui.form();
        var layedit = layui.layedit;

        //提交按钮监听
        form.on('submit(formDemo)', function (data) {
            //逻辑添加
            //layer.msg(JSON.stringify(data.field));
            AddStudentInfo(data.field);
        });
    });
}

//添加学生方法 
var AddStudentInfo = function (s_json) {
    $.post(AppUrl + "/Student/InsertStudentInfo", s_json, function (result) {
        if (result.SuccessResponse == false) {
            layer.msg(result.Message);
            return false;
        } else {
            layer.msg(result.Message, { time: 2000 }, function () {
                ListInit();
                parent.layer.close(parent.layer.getFrameIndex(window.name));
            });

        }
    });
}


var InfoInit = function () {
    layui.use(['element'], function () {
        var $ = layui.jquery;
        var element = layui.element();
        element.on('tab(docDemoTabBrief)', function (i) {
            console.log(i.index)
            alert(i.index)
        });
    });
}