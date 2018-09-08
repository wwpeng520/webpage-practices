$(function(){

    var i=0;      //自动播放计数器，等于轮播图片数量
    //代码初始化
    var length=$(".img li").length;
    for (var j=1;j<=length;j++){
        var li="<li>"+j+"</li>";
        $(".num").append(li);
    }

    //手动控制图片轮播
    $(".img li").first().show(); //加载时默认加载第一张图片
    $(".num li").first().addClass("active");
    $(".num li").mouseover(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index();
        i=index;   //手动控制也自动统一进度
        $(".img li").eq(index).stop().fadeIn().siblings().stop().fadeOut();
    });

    //自动切换轮播图
    var t = setInterval(moveR,2000);
    //鼠标移入时图片停止播放；移出时图片继续播放
    $(".out").hover(function(){
        clearInterval(t);
    },function(){
        t = setInterval(moveR,2000);
    });

    $(".out .left").click(function(){
        moveL();
    });
    $(".out .right").click(function(){
        moveR();
    });
    //核心图片播放函数(向后播放)
    function moveR(){
        i++;
        if (i == length){
            i = 0;    
        }
        $(".num li").eq(i).addClass("active").siblings().removeClass("active"); //圆点按钮的播放效果
        $(".img li").eq(i).fadeIn().siblings().fadeOut();                       //图片的切换效果
    }
    //核心图片播放函数(向前播放)
    function moveL(){
        i--;
        if (i == -1){
            i = length-1;    
        }
        $(".num li").eq(i).addClass("active").siblings().removeClass("active"); //圆点按钮的播放效果
        $(".img li").eq(i).fadeIn().siblings().fadeOut();                       //图片的切换效果
    }

});