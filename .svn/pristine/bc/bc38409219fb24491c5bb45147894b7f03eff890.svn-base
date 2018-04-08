
function setSwiper() {
    //首页轮播插件js
    var mySwiper = new Swiper('.swiper-container1', {
        loop: true,
        autoplay: 1000,
        pagination: ".swiper-pagination",
        autoplayDisableOnInteraction: false,
    });
    var NavSwiper = new Swiper('.swiper-container2', {
        loop: false,
        slidesPerView: 3,
    });
    var NavSwiper = new Swiper('.swiper-container3', {
        loop: false,
        pagination: ".swiper-pagination1"
    });
    var NavSwiper = new Swiper('.swiper-container4', {
        loop: false,
        slidesPerView: 'auto',
    });
    var NavSwiper = new Swiper('.swiper-container5', {
        loop: false,
        slidesPerView: 7,
    });

    var NavSwiper = new Swiper('.swiper-container6', {
        loop: false,
        slidesPerView: 5.5,
    });
}
//底部的导航栏点击跳转事件
//$(document).ready(function(){
//	$("footer").find("ul").find("li").bind('click',function(){
//		console.log($(this).find('p').text())
//		$(this).siblings().removeClass('footer_active')
//		$(this).addClass('footer_active')
//		if($(this).find('p').text() == '首页'){
//			window.location.href = 'index.html'
//		}else if($(this).find('p').text() == '分类'){
//			window.location.href = 'html/list.html'
//		}else if($(this).find('p').text() == '我的课程'){
//			window.location.href = 'html/path.html'
//		}else if($(this).find('p').text() == '我的'){
//			window.location.href = 'html/personalIndex.html'
//		}
//	})
//	//课程页面的单个课程点击事件
//	$('.international').bind('click',function(){
//		window.location.href = 'html/pathNav.html'
//	})
//	$('.MKS_box').bind('click',function(){
//		window.location.href = 'html/pathNav.html'
//	})
//	$('.curriculum_box').bind('click',function(){
//		window.location.href = 'html/pathNav.html'
//	})
//	$('.subject_box').bind('click',function(){
//		window.location.href = 'html/pathNav.html'
//	})
//})

            //获取所有学科信息
var GetAllDiscipline = function () {
    $.get('/service/NoAuthority/GetAllDisciplineInfo', function (res) {
        console.log(res)
        if (res.SuccessResponse) {
            var data = {
                list: res.ReturnData.Data
            }
            //console.log(res);
            var html = template('course_list', data)
            $(".main").html(html)
            setSwiper();
            $(".place").on("click", 'li', changeCourse)
        } else {
            layer.msg('网络请求出错')
        }

    })
};
GetAllDiscipline();

            //根据学科ID查询课程
var changeCourse = function (e) {
    console.log(e.target)
    var _this = $(e.target);
    
    $.get('/service/NoAuthority/GetCourseList', { Discipline_ID: _this.data("id") }, function (res) {
        
        if (res.SuccessResponse) {
            var data = { CourseList: res.ReturnData.Data }
            var html = template('courseShow', data)
            _this.parents(".placeNav").siblings(".MKS").html(html);
            _this.siblings().removeClass("placeNav_active");
            _this.addClass("placeNav_active")
        }
    });
}
