window.onload = function(){
	
	var cparent = document.getElementById("main");
	
	//定位图片位置
	imgLocation("main","box");
	
	//模拟从数据库获取图片的数据
	var imgData = {"data":[{"src":"22.jpg"},{"src":"23.jpg"},{"src":"24.jpg"},{"src":"25.jpg"}]};
	
	//页面滚动时判断是否需要加载图片
	window.onscroll = function(){
		if(checkFlag(cparent)){
//			var cparent = document.getElementById("main");
			for(var i = 0; i < imgData.data.length; i++){
				var ccontent = document.createElement("div");
				ccontent.className = "box";
				cparent.appendChild(ccontent);
				var boximg = document.createElement("div");
				boximg.className = "box-img";
				ccontent.appendChild(boximg);
				var img = document.createElement("img");
				img.src = "img/"+imgData.data[i].src;
				boximg.appendChild(img);
				
				//给新增的图片定位
				imgLocation("main","box");
			}
		}
	}
}

//判断是否需要加载图片
function checkFlag(cparent){
//	var cparent = document.getElementById("main");
	var ccontent = getChildElement(cparent,"box");
	var lastContentHeight = ccontent[ccontent.length-1].offsetTop;//最后一张图片距页面顶端的高度
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;//滚动条高度
	var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;//浏览器可见高度
	if(lastContentHeight < scrollTop + pageHeight){	
		//当最后一张图片的高度小于滚动条高度与页面可见高度之和时返回true，表明需要加载图片了
		return true;
	}
}

//设置每张图片的位置
function imgLocation(parent,content){
	//将parent下面所有的content取出
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);
	var imgWidth = ccontent[0].offsetWidth;
	var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var cols = Math.floor(clientWidth / imgWidth);

	cparent.style.cssText = "width:"+imgWidth*cols+"px;margin:0 auto";
	
	var boxHeightArr = [];
	for(var i = 0; i < ccontent.length; i++){
		if(i < cols){
			boxHeightArr[i] = ccontent[i].offsetHeight;
		}else{
			var minHeight = Math.min.apply(null,boxHeightArr);
			var minIndex = getMinHeightLocation(boxHeightArr,minHeight);
			ccontent[i].style.position = "absolute";
			ccontent[i].style.top = minHeight+"px";
			ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
			//更新数组中最矮的高度
			boxHeightArr[minIndex] += ccontent[i].offsetHeight;
		}
	}
}

//获取高度数组中最小高度的列
function getMinHeightLocation(boxHeightArr,minHeight){
	for(var i in boxHeightArr){
		if(boxHeightArr[i] == minHeight){
			return i;
		}
	}
}

function getChildElement(parent,content){
	var contentArr = [];
	var allcontent = parent.getElementsByTagName("*");
	for(var i = 0; i < allcontent.length; i++){
		if(allcontent[i].className == content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}
