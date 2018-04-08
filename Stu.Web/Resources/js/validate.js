
(function ($) {
    var i = 0;
    var containerListArry = new Array();
    var containerList = null;
    $.fn.GetIndex = i;
    $.fn.validate = function (Index) {
        if (Index != undefined) {
            if (isNaN(Index)) {
                var obj = event.srcElement ? event.srcElement : event.target;
                $.each(containerListArry, function (j) {
                    if (this.submit == $(obj).attr("ID")) {
                        Index = j;
                    }
                });
            }
        } else {
            var _selector = this.selector;
            $.each(containerListArry, function (j) {
                if (this.container == _selector) {
                    Index = j;
                }
            });
        }
        var bool = true;
        containerListArry[Index].containerList.each(function () {
            if (!ValidS(this))
                bool = false;
        });
        return bool;
    }
    $.fn.validator = function (options) {

        var defaultOptions = {
            submit: "",
            blur: false,
            ok: function () {
            }
        };
        options = $.extend(defaultOptions, options);
        containerList = $(this).find("[data-validate]");
        var obj = new Object()
        obj.container = this.selector;
        obj.submit = defaultOptions.submit;
        obj.containerList = containerList;

        containerListArry.push(obj);

        if (options.blur) {
            containerList.blur(function () {
                ValidS(this);
            });
        }

        if (options.submit) {
            $("#" + options.submit).click(function () {
                if ($.fn.validate(this))
                    options.ok.call(this);
            });
        }
        i++;
        return this;
    }

    function ValidS(obj) {
        var bool = true;
        if (obj != null) {
            var value = $.trim($(obj).val());
            var isnull = true;
            if ($(obj).attr("data-isnull") == "false" && value == "") {
                isnull = false;
            }
            var Method = $(obj).attr("data-validate");
            var messagestr = messages[Method];
            if (messagestr == undefined)
                messagestr = "<div style='color:#d44950'>必填字段</div>";
            if (Method == "select")
                messagestr = "<div style='color:#d44950'>请选择</div>";
            if ($(obj).attr("data-error") != undefined && $(obj).attr("data-error") != "")
                messagestr = "<div style='color:#d44950'>" + $(obj).attr("data-error") + "</div>";
            var popoobj = obj;
            if ($(obj).attr("data-container") != undefined)
                popoobj = $(obj).next($(obj).attr("data-container"))
            var popo = $(popoobj).popover({
                trigger: 'manual',
                placement: 'right',//弹出框位置
                container: 'body',
                html: true,
                content: messagestr,
                viewport: { selector: popoobj }
            });

            if (Method == "select") {
                if ($(obj).val() == null || $(obj).val() == $(obj).attr("data-validatevalue")) {
                    popo.popover('show');
                    bool = false;
                }
                else
                    popo.popover('hide');
            }
            else {
                if (!validator(Method, value) && isnull) {
                    popo.popover('show');
                    bool = false;
                } else {
                    popo.popover('hide');
                }
            }
        } else
            bool = false;
        return bool;
    }
    function validator(Method, value) {
        if (Method == "required")
            if (value == "")
                return false;
            else
                return true;
        else
            return new RegExp(regexEnum[Method]).test(value);
    }
    var messages = {
        phone: "<div style='color:#d44950'>请填写正确手机号码</div>",
        mobile: "<div style='color:#d44950'>请填写正确手机号码</div>",
        required: "<div style='color:#d44950'>必填字段</div>"
    }
    var regexEnum =
    {
        phone: "^1\\d{10}$", 				//手机
        intege: "^-?[1-9]\\d*$", 				//整数
        intege1: "^[1-9]\\d*$", 				//正整数
        intege2: "^-[1-9]\\d*$", 				//负整数
        num: "^([+-]?)\\d*\\.?\\d+$", 		//数字
        num1: "^[1-9]\\d*|0$", 				//正数（正整数 + 0）
        num2: "^-[1-9]\\d*|0$", 				//负数（负整数 + 0）
        decmal: "^([+-]?)\\d*\\.\\d+$", 		//浮点数
        decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", //正浮点数
        decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", //负浮点数
        decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
        decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
        decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）

        email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
        color: "^[a-fA-F0-9]{6}$", 			//颜色
        url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
        chinese: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$", 				//仅中文
        ascii: "^[\\x00-\\xFF]+$", 			//仅ACSII字符
        zipcode: "^\\d{6}$", 					//邮编
        mobile: "^(1)[0-9]{10}$", 			//手机
        mobile1: "^(1)[0-9*]{10}$", 			//手机带*号
        ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
        notempty: "^\\S+$", 					//非空
        picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
        rar: "(.*)\\.(rar|zip|7zip|tgz)$", 							//压缩文件
        date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", 				//日期  
        qq: "^[1-9]*[1-9][0-9]*$", 			//QQ号码
        tel: "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
        username: "^\\w+$", 					//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
        letter: "^[A-Za-z]+$", 				//字母
        letter_u: "^[A-Z]+$", 				//大写字母
        letter_l: "^[a-z]+$", 				//小写字母
        idcard: "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)", //身份证
        ps_username: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D_\\w]+$" //中文、字母、数字 _
    }

})(jQuery);
