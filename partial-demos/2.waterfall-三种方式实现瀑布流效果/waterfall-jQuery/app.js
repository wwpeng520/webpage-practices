$(function(){
	
	$(window).on("load",function(){
		imgLocation();
		window.onscroll = function(){
			if(scrollslide()){
				$.each(dataImg.data,function(index,value){
					var box = $("<div>").addClass("box").appendTo($("#main"));
					var boximg = $("<div>").addClass("box-img").appendTo(box);
					$("<img>").attr("src",'img/'+$(value).attr("src")).appendTo(boximg);
				});
				imgLocation();
			}
		};
	});

	//模拟从数据库获取数据
	var dataImg = {
		'data':[{'src':'01.jpg'},{'src':'02.jpg'},{'src':'03.jpg'},{'src':'04.jpg'},{'src':'05.jpg'},
		{'src':'06.jpg'},{'src':'07.jpg'},{'src':'08.jpg'},{'src':'09.jpg'},{'src':'10.jpg'},
		{'src':'11.jpg'},{'src':'12.jpg'},{'src':'13.jpg'},{'src':'14.jpg'},{'src':'15.jpg'},
		{'src':'16.jpg'},{'src':'17.jpg'},{'src':'18.jpg'},{'src':'19.jpg'},{'src':'20.jpg'},
		{'src':'21.jpg'},{'src':'22.jpg'},{'src':'23.jpg'},{'src':'24.jpg'},{'src':'25.jpg'}]
	};

	$(window).on('resize', imgLocation).trigger('resize');
});

//判断是否需要加载图片
function scrollslide(){
	var box = $(".box");
	var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
	var documentHeight = $(document).width();
	var scrollHeight = $(window).scrollTop(); 
	return (lastboxHeight<scrollHeight+documentHeight)?true:false;
}

function imgLocation(){
	//拿到所有的盒子
	var box = $('.box');
	//取出其中一个盒子的高度
	var boxWidth = box.eq(0).width();
	var screenWidth = $(window).width();
	var cols = Math.floor(screenWidth/boxWidth);
	
//	$('#main').css({
//      'width' : cols*boxWidth,
//      'margin' : '0 auto'
//  });

	//定义一个数组保存第一行盒子的高度
	var heightArr = [];
	box.each(function(index, value) {
		//取出单个盒子的高度
		var boxHeight = box.eq(index).height();
		if (index < cols){//拿到第一行盒子
			heightArr[index] = boxHeight;
		} else {//其他的盒子
			//取出高度数组中最矮的高度
			var minBoxHeight = Math.min.apply(null, heightArr);
			//取出最矮的高度的脚标
			var minBoxIndex = $.inArray(minBoxHeight, heightArr);
			//定位
			$(value).css({
				'position':'absolute',
				'top':minBoxHeight+'px',
				'left':box.eq(minBoxIndex).position().left
//				'left':minBoxIndex*boxWidth+'px'
			});
			//更新数组中最矮的高度
//			heightArr[minBoxIndex] += boxHeight;
			heightArr[minBoxIndex] += box.eq(index).height();
		}
	});
}

