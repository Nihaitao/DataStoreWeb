﻿//查询学生明细
function GetStudentInfo(cb) {
    $.get("/service/edu/Student/GetStudentInfo", function (res) {
        if (res.SuccessResponse) {
            if (cb && typeof cb == "function") {
                cb(res)
            }
        }
    })
}
//获取省份
function GetProvince(cb) {
    $.get("/service/ProvinceCityDistrict/GetProvinceList", function (res) {
        if (res.SuccessResponse) {
            if (cb && typeof cb == "function") {
                cb(res)
            }
        }
    })
}
//获取城市
function GetCity(ProvinceID, cb) {
    $.get("/service/ProvinceCityDistrict/GetCityList",{ProvinceID:ProvinceID}, function (res) {
        if (res.SuccessResponse) {
            if (cb && typeof cb == "function") {
                cb(res)
            }
        }
    })
}
//获取区
function GetDistrict(CityID, cb) {
    $.get("/service/ProvinceCityDistrict/GetDistrictList", { CityID: CityID }, function (res) {
        if (res.SuccessResponse) {
            if (cb && typeof cb == "function") {
                cb(res)
            }
        }
    })
}
//获取学历
function GetEducation(Education,cb) {
    $.get("/service/public/HDictionary/GetHDictionaryList", { Valid: 1, ColumnName: 'Education_ID' }, function (res) {
        if (res.SuccessResponse) {
            if (cb && typeof cb == "function") {
                cb(res)
            }
        }
    })
}
//某学生登录记录
function GetStudentLoginList(t,cb) {
    $.get("/service/edu/Student/GetStudentLoginList", { topNum: t }, function (res) {
        if (res.SuccessResponse) {
            if (cb && typeof cb == "function") {
                cb(res)
            }
        }
    })
}
//学生订单列表
function GetOrderDetailListByStuId(PayStatus,cb) {
    $.get("/service/Order/GetOrderDetailListByStuId", { PayStatus: PayStatus }, function (res) {
        if (res.SuccessResponse) {
            if (cb && typeof cb == "function") {
                cb(res)
            }
        }
    })
}
//获取我的课程
function GetOrderListByCourse(t,n,cb) {
    $.get("/service/Order/GetOrderListByCourse", { TeachingMethod: t,topNum:n }, function (res) {
        if (res.SuccessResponse) {
            if (cb && typeof cb == "function") {
                cb(res)
            }
        }
    })
}


//过滤器
template.helper('dataFormat', function (time, format) {
    if (time == undefined) {
        return '';
    }
    var finalTime;
    if (typeof (time) == 'string') {
        time = time.replace("T", " ");
        time = time.replace("Z", " ");
        var timeIOS = time.replace(/\-/g, "/");
        finalTime = new Date(timeIOS);
    } else {
        finalTime = time;
    }

    var t = new Date(finalTime);
    var tf = function (i) { return (i < 10 ? '0' : '') + i };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g,
        function (a) {
            switch (a) {
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        });
});
template.helper('phoneFormat', function (str) {
    if(!(/^1[34578]\d{9}$/.test(str))){ 
        return ''; 
    } else{
        return str.substring(0, 3) + "****" + str.substring(7) 
    }
});
//参数获取
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//退出
$(".Gcenter").on("click", "#exit", function (e) {
    e.preventDefault;
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
        clearCookie();
    }
    location.href = "/Login.shtml"
})
function foreach() {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr.length > 0)
            DelCookie(arr[0]);
    }
}
function GetCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return decodeURIComponent(document.cookie.substring(offset, endstr));
}
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return GetCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
function clearCookie() {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
    }
}
