
function clickMeChat() {
    var domain = !!location.href.match(/((?:\w+\.){1}(?:cn|top|com\.cn|com\.tw|com))/) ? location.href.match(/((?:\w+\.){1}(?:cn|top|com\.cn|com\.tw|com))/)[1] : '';
    document.domain = domain;
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.open({
            type: 2,
            area: ['400px', '550px'],
            fixed: false, //不固定
            maxmin: true,
            title: '欢迎登陆',
            content: 'http://wx.eol.cn/usercenter/login_model.html',
        });
    });
}