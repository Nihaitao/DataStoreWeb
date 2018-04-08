$(document).ready(function(){
	//页面转换
	$(".tip").find('span').bind('click',function(){
		console.log(this);
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		if($(this).text() == '待支付'){//点击待支付时 出现待支付的页面 隐藏已支付页面  ,反之出现变隐藏  隐藏变出现
			$('.content1').show();
			$('.content1').siblings().hide();
		}else if($(this).text() == '已支付'){
			$('.content2').show();
			$('.content2').siblings().hide();
		}
	})
	//商品点击
	$('input[type="radio"]').bind('click',function(){//为商品绑定点击事件			
			if($(this).data('waschecked') == true){
				$(this).prop('checked',false);
				$(this).data('waschecked',false);
			}else{
				$(this).prop('checked',true);
				$(this).data('waschecked',true);
			}
			if($(this).prop('class') == 'check-all'){//点击的是全选
				if($(this).data('waschecked') == true){
					$('.check').prop('checked',true);
					$('.check').data('waschecked',true);
				}else{
					$('.check').prop('checked',false);
					$(".check").data('waschecked',false);
				}
			}
			if($(this).prop('class') == 'check'){//点击的是单个商品
				var n = $(".check").length ;//商品的数量
				var j = 0 ;//选中商品的数量
				for(var i = 0; i < n;i++){//遍历每个商品
					if($(".check").eq(i).is(':checked')){//如果商品选中则  j+1
						j++;
					};
				}
				if(n==j){//当商品数量等于选中商品的数量时  '全选框' 的状态为选中 ,反之为不选中
					$('.check-all').prop('checked',true);
					$('.check-all').data('waschecked',true);
				}else{
					$('.check-all').prop('checked',false);
					$(".check-all").data('waschecked',false);
				}
				console.log(j);
			}
		})
	
	//删除商品的按钮点击事件
	$(".del").bind('click',function(){
		//console.log("点击了删除按钮")
		$(".determineDelMask").show()
	})
	//删除弹框的取消键
	$(".no").bind('click',function(){
		$(".determineDelMask").hide()
	})
	//删除弹框的确认键
	$(".yes").bind('click',function(){
		console.log('删除当前这条数据')
		$(".determineDelMask").hide()
	})
	//确认支付按钮点击事件
	$(".bottom").find("button").bind('click',function(){
		$(".payForMoneyMask").show()
	})
	$(".icon-cha").bind('click',function(){
		$(".payForMoneyMask").hide()
	})
})
