var child = document.getElementsByClassName('child')[0];
var small = document.getElementsByClassName('small')[0];

//定义small动画执行完毕后的css属性（动画开始前不能显示，动画结束后须保持）
small.addEventListener("webkitAnimationEnd", smallFinalStatus);
small.addEventListener("animationend", smallFinalStatus);
function smallFinalStatus(){
	small.style.top = '42vw';
}

//定义child动画执行完毕后的css属性
child.addEventListener("webkitAnimationEnd", childFinalStatus);
child.addEventListener("animationend", childFinalStatus);
function childFinalStatus(){
	child.getElementsByTagName('img')[0].style.width = '25vw';
}