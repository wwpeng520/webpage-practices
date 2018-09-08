$(document).ready(function(){
    $(window).scroll(function(){
        var top = $(document).scrollTop();          // 定义变量，获取滚动条的高度
        var menu = $("#menu");                      // 定义变量，抓取#menu
        var items = $("#content").find(".item");    // 定义变量，查找.item

        var curId = "";                             // 定义变量，当前所在的楼层item #id 

        items.each(function(){
            var m = $(this);                        // 定义变量，获取当前类
            var itemsTop = m.offset().top;          // 定义变量，获取当前类的top偏移量
            if(top > itemsTop-100){                 // 当滚动条高度距当前类的top偏移量100px以内时，把当前类的id赋给curId变量
                curId = "#" + m.attr("id");
            }else{
                return false;
            }
        });

        //给相应的楼层设置cur,取消其他楼层的cur
        var curLink = menu.find(".cur");
        
        // if( curId && curLink.attr("href") != curId ){   // 当curId存在，且当前有.cur类属性的a标签href值不等于curId时
        //     curLink.removeClass("cur");
        //     menu.find( "[href=" + curId + "]" ).addClass("cur");
        // }

        // 因为item5高度没有达到视口高度，所以默认无法把item5顶部移到视口顶端，导致item5无法实现改变对应颜色
        // 当网页滚动条拉到最底端时，$(document).height() == $(window).height() + $(document).scrollTop()
        if(top+$(window).height() > $(document).height()-100){  // 当item5底部差100px显示完整时
            curLink.removeClass("cur");
            menu.find( "[href='#item5']" ).addClass("cur");
        }else if( curId && curLink.attr("href") != curId ){   // 当curId存在，且当前有.cur类属性的a标签href值不等于curId时
            curLink.removeClass("cur");
            menu.find( "[href=" + curId + "]" ).addClass("cur");
        }
        console.log(top+"+"+$(window).height()+"+"+$(document).height());
    });
});
// 原理：
// 1、先获取页面滚动条位置，并确定当前位置对应着哪个内容（每个内容用id表示），把该id赋值给curId变量
// 2、判断当前情况下包含.cur属性的a标签的href属性是否与curId一致