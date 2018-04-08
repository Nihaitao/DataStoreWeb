$(document).ready(function(){
	//导航栏的点击
	$(".choise").find("div").bind('click',function(){
		//console.log($(this).siblings());
		$(this).addClass("active");
		$(this).siblings().removeClass('active');
		//console.log($(this).text());
		if($(this).text()=='课程目录'){
			$('.content2').show();
			$('.content2').siblings().hide();
			//console.log($('.content2').siblings());
			
		}else if($(this).text()=='课程概述'){
			$('.content1').show();
			$('.content1').siblings().hide();
		}else if($(this).text()=='学员评论'){
			$('.content3').show();
			$('.content3').siblings().hide();
		}
	})
	
	
})
//学员评论 加载更多
$(window).scroll(function(){
	var canMore = $(".comment").is(".active");//判断是否在学员评论页面		
		//console.log('页面文档的高度:'+$(document).height());
		//console.log('浏览器高度:'+$(window).height());
		//console.log('滚动条的滚动距离:'+$(document).scrollTop());
		var docHeight= $(document).height();
		var winHeight=$(window).height();
		var scrollHeight = $(document).scrollTop();
		
		if(scrollHeight == docHeight - winHeight && canMore){
			console.log('加载更多');
			$(".canClone").append($(".review").clone());
		}
	})
