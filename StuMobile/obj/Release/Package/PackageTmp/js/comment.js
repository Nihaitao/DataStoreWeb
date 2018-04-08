/// <reference path="E:\NewSM5\StuMobile\html/Video/pathNav.html" />
/// <reference path="E:\NewSM5\StuMobile\html/Video/pathNav.html" />
$(document).ready(function(){
	//评论页面的单个评论的点击事件
	$('.pl-txt').bind('click',function(){
		window.location.href = 'commentcont.html'
	})
	//问答页面单个问答的点击事件
	$('.qa-txt').bind('click',function(){
		window.location.href = 'myQA.html'
	})
	//页面顶部的返回字符
	$(".icon-sanjiao-copy").bind('click',function(){
		history.go(-1);
		return false;
	})
	//个人信息页面的编辑按钮
	$('.write').bind('click',function(){
		window.location.href = 'informationEditor.html'
	})

	//个人设置的密码修改按钮
	$('.changePassword').bind('click',function(){
		window.location.href = 'passwordModify.html'
	})
	//个人设置手机好绑定更改按钮
	$('.changeNum').bind('click',function(){
		$('.phoneBindMask').show()
	})
	//个人设置邮箱绑定按钮
	$('.bindEM').bind('click',function(){
		$('.emailBindMask').show()
	})
	
	//弹出框的X按钮
	$('.icon-cha').bind('click',function(){
		$(this).parent().parent().hide()
	})
	//$('.confirm').bind('click',function(){
	//	$(this).parent().parent().hide()
	//})
	//密码修改页面的确认按钮
	$('.sure').bind('click',function(){
		window.location.href = 'personalIndex.html'	
	})
	//课程页面的单个课程点击事件
	$('.international').bind('click',function(){
		window.location.href = '../Video/pathNav.html'
	})
	//列表首页导航栏字菜单的点击事件
	$('.diqu').find("i").bind('click',function(){
		window.location.href = 'listcont.html'
	})
})
