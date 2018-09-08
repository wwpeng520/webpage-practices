$(function(){


    var i=0; //轮播计数器
    //复制第一张图片并插入到最后
    var cloneImg = $(".banner .img li").first().clone();
    $(".banner .img").append(cloneImg);
    var imgLength = $(".banner .img li").length;
    for ( var j = 1;j<imgLength;j++ ){
    	var img = $("<img>").attr("src","img/small"+j+".jpg");
    	var li = $("<li><em></em></li>").append(img);
        $(".banner .small-img").append(li);
    }
    $(".small-img li").first().addClass("on");

    //鼠标移入圆点
    $(".banner .small-img li").hover(function () {
        var index = $(this).index();
        i = index;
        $(".banner .img").stop().animate({left:-590*index},500);
        $(this).addClass("on").siblings().removeClass("on");
    });

    //自动轮播
    var t = setInterval(moveR,2000);
    //鼠标移入移出时效果
    $(".banner").hover(function () {
        clearInterval(t);
    },function () {
        t = setInterval(moveR,2000)
    });


    //向右播放按钮
    $(".banner .right").click(function(){
        moveR();
    });
    //向左播放按钮
    $(".banner .left").click(function(){
        moveL();
    });
    //向右播放核心函数
    function moveR() {
        i++;
        if (i == imgLength){
            $(".banner .img").css({left:0});
            i = 1;
        }
        $(".banner .img").stop().animate({left:-590*i},500);
        if (i == imgLength-1){
            $(".banner .small-img li").eq(0).addClass("on").siblings().removeClass("on");
        }else {
            $(".banner .small-img li").eq(i).addClass("on").siblings().removeClass("on");
        }
    }
    //向左播放核心函数
    function moveL() {
        i--;
        if (i == -1){
            $(".banner .img").css({left:-590*(imgLength-1)});
            i = imgLength-2;
        }

        $(".banner .img").stop().animate({left:-590*i},500);
        $(".banner .small-img li").eq(i).addClass("on").siblings().removeClass("on");
    }

});