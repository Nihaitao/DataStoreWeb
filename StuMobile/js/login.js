$(function () {
    var isT;
    //验证输入框方法
    function checkInput(select, Name, reg) {
        var _this = $(select)
        var btn = $('.nextbtn');
        _this.on("input", function(){
            if (!reg.test(_this.val())) { $(".errMsg").html('请输入正确的' + Name).show(); btn.attr("disabled", "disabled"); return }
            else { $(".errMsg").hide(); btn.removeAttr("disabled"); }
        })
    };
    //获取验证码倒计时
    function setCodeTime(tiemer) {
        if (tiemer==60) {
                isT=setInterval(function () {
                    $(".obtain").html('请稍后（' + tiemer + ")");
                tiemer--;
                if (tiemer < 1) {
                    clearInterval(isT);
                    $(".obtain").html("获取验证码");
                } 
            }, 1000)
        } else {
            clearInterval(isT);
            isT = setInterval(function () {
                $(".obtain").html('请稍后（'+tiemer+")");
                tiemer--;
                if (tiemer < 1) {
                    clearInterval(isT);
                    $(".obtain").html("获取验证码");
                }
            }, 1000)
        }
       
    };
    checkInput('.username', '手机号码', /^1[1-9][0-9]\d{8}$/);
    checkInput('.phoneBack', '验证码', /^\d{6}$/)
    //登录按钮点击事件
    $(".nextbtn").on("click", function () {
        if ($(".username").val()=="") {
            $(".errMsg").html("请输入手机号码").show();
            return;
        };
        if ($(".phoneBack").val() == "") {
            $(".errMsg").html("请输入验证码").show();
            return;
        };
        $.post("/api/user/StudentLogin", {
            Phone: $(".username").val(),
            PhoneCode: $(".phoneBack").val(),
            CardNumber: '',
            Password:'',
            LoginType: 2,//登录方式  1账号密码  2手机验证码
            LoginSource: 2//登录形式（1-PC端 2-移动端）
        }, function (rsp) {
            if (rsp.SuccessResponse) {
                //写入cookie ID
                $('.phoneBack').val('')
                location.href = "/Html/Center/personalIndex.html";
            }
            else {
                layer.open({content: rsp.Message, type: 0, time: 0.5 });
            }
                
        })
    })
    //发送验证码
    $(".obtain").on("click", function () {
        if ($(".username").val() == "") {
            $(".errMsg").html("请输入手机号码").show();
            return;
        };
        $.post("/service/edu/Student/SendPhoneCodeBYLogin", { Phone: $(".username").val()}, function (rsp) {
            if (rsp.SuccessResponse) {
                $('.phoneBack').val(rsp.Data.Code)
                setCodeTime(rsp.Data.Seconds)
                layer.open({ content: rsp.Message, type: 0, time: 0.5 });
            }
            else {
                setCodeTime(rsp.Data.Seconds)
                layer.open({ content: rsp.Message, type: 0, time: 0.5 });
            }
        })
    })
  
})