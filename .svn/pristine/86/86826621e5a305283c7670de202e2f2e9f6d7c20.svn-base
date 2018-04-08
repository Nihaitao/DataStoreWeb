


//个人中心 请求数据学生个人数据
$(function () {
    $.get("/service/edu/Student/GetStudentInfo", function (rsp) {
        if (rsp.SuccessResponse) {
            //个人中心首页
            $(".pic img").attr('src', rsp.Data.HeadImg ? rsp.Data.HeadImg : '../../Resources/img/head.png');
            $(".mine p.name").html(rsp.Data.Name)

            //基本信息填充内容
            
            $("main p[data-name]").map(function (a, b) {
                console.log($(b).attr("data-name"))
                $(b).find("span.txt").html(rsp.Data[$(b).attr("data-name")])
            });
            $("main p[data-name=Sex_n]>.txt").html(rsp.Data.Sex == 1 ? "男" : "女")
            $("main p[data-name=address]>.txt").html(rsp.Data.ProvinceName + rsp.Data.CityName +(rsp.Data.DistrictName?rsp.Data.DistrictName:""))
        } else {
            layer.open({ content: "网络请求出错", type: 0, time: 0.5 });
        }
    })
})

