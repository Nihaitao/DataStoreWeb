//底部的导航栏点击跳转事件
$(document).ready(function(){
	$("footer").find("ul").find("li").bind('click',function(){
		console.log($(this).find('p').text())
		$(this).siblings().removeClass('footer_active')
		$(this).addClass('footer_active')
		if($(this).find('p').text() == '首页'){
			window.location.href = '../index.html'
		}else if($(this).find('p').text() == '分类'){
			window.location.href = 'listcont.html'
		}else if($(this).find('p').text() == '我的课程'){
			window.location.href = 'path.html'
		}else if($(this).find('p').text() == '我的'){
			window.location.href = 'personalIndex.html'
		}
	})
})
