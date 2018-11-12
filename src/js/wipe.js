var canvas = document.getElementById('cas');
var context= canvas.getContext("2d");
var _w = canvas.width;
var _h = canvas.height;
var radius = 20;
var moveX = 0;
var moveY = 0;
var moveZ = 0;
var moveW = 0;
var t = 0;
var isMouseDown = false;//表示鼠标的状态，是否按下，默认未按下false，按下为true；
function drawLine(context){
	if (isMouseDown) {
		context.save();
		context.beginPath();
		context.lineCap = "round";
		context.moveTo(moveX,moveY);
		context.lineWidth=radius*2;
		context.lineTo(moveZ,moveW);
		context.stroke();
		context.restore();
	}
}
function drawRect(context){
	context.fillStyle="#666";
	context.fill();
	context.fillRect(0,0,_w,_h);
	context.globalCompositeOperation = "destination-out";
}
	cas.addEventListener("mousedown",function(evt){
		var event = evt || window.event;
		isMouseDown = true;
		//获取鼠标在视口的坐标，传递参数到drawPornt
		moveX = event.clientX;
		moveY = event.clientY;
		// drawLine(context,moveX,moveY);
	},false);
	cas.addEventListener("mousemove",fn1,false);
	function fn1(evt){
			var event = evt || window.event;
			moveZ = event.clientX;
			moveW = event.clientY;
			drawLine(context,moveX,moveY,moveZ,moveW);
			//每次结束点变成下一次的开始点
			moveX = moveZ;
			moveY = moveW;

	}
	cas.addEventListener('mouseup',function(evt){
		// cas.removeEventListener("mouseup",fn1,false);
		isMouseDown = false;
		if (getTransparencyPercent(context) > 50) {
			// console.log("超过了50%的面积");
			context.clearRect(0,0,_w,_h);
		}
	},false);
	function getTransparencyPercent(context){
		var imgData = context.getImageData(0,0,_w,_h);
		for (var i = 0; i < imgData.data.length; i+=4) {
			var a = imgData.data[i+3];
			if (a === 0) {
				t++;
			}
		}
		var percent = (t/(_w*_h))*100;
		console.log("透明点的个数："+t);
		console.log("占总面积"+Math.ceil(percent)+"%");
		// return ((t/(_w*_h))*100).toFixed
		return Math.round(percent);
	}
window.onload = function(){
	drawRect(context);
	// drawPornt(context);
};

