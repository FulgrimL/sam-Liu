/*
 *运动的思路： 
 *     1 使用间歇调用
 *     2 需要不断的修改某个属性
 *     3 判断运动结束的条件，如果到达目标结束
 *     4 否则继续运动
 * 
 *  obj 运动的对象
 *  json 目标属性 {left：200,top:-200}
 *  animation(ball,{left:200,top:200});
 * */

function animation(obj,json){
	//首先判断小球现在是否在运动
	if(obj.isMoving){
		return;
	}else{
		obj.isMoving = true;
	}
	//创建一个间歇调用的对象
	obj.timerlist = {};
	
	for(var attr in json){
		//alert(attr+"---"+json[attr]);//属性名--属性值
		//创建一个匿名函数的自运行
		(function(attr){
			//alert(attr)
			//初始化运动速度  添加attr属性
			obj.timerlist[attr] = {speed:0}; // obj.timerlist.left.speed = 0;
			//给obj的每一个timerlist属性添加一个间歇调用对象
			obj.timerlist[attr].timer = setInterval(function(){
				//创建一个当前值
				 var currentValue = 0;
				 //获取当前值
				 currentValue = parseFloat(getStyle(obj,attr));//0.3
				// console.log("---"+currentValue);
				 //获得速度
				 var speed = obj.timerlist[attr].speed; //0
				 speed = (json[attr]-currentValue)/6; //
				 //console.log((typeof speed));
				 //首次判断结果
				 if(Math.abs(json[attr]-currentValue)<0.1){
				 	//停止间歇调用
				 	clearInterval(obj.timerlist[attr].timer);
				 	//删除该属性
				 	delete obj.timerlist[attr];
				 	//判断所有的间歇调用都停止
				 	if(getTimerlistLength(obj.timerlist)==0){
				 		obj.isMoving = false;
				 	}
				 	
				 }else{
				 	//继续执行
				 	if(attr=="opacity"){
				 		obj.style.opacity = (currentValue+speed);
				 		console.log((currentValue+speed)*100);
				 		obj.style.filter = "alpha(opacity="+((currentValue+speed)*100)+")";
				 	}else{
				 		obj.style[attr]= currentValue+speed+"px";
				 	}
				 } 
				 
			},20);
		})(attr);
		
	}	
}

//float:left 
function getStyle(obj,attr){
	if(obj.currentStyle){
		return isNaN(parseFloat(obj.currentStyle[attr]))?0:parseFloat(obj.currentStyle[attr]);
	}else{
		return isNaN(parseFloat(getComputedStyle(obj,null)[attr]))?0:parseFloat(getComputedStyle(obj,null)[attr]);
	}
	
}

//判读所有的间歇调用都停止了
function getTimerlistLength(timerlist){
	var length = 0;
	for(var i in timerlist){
		length++;
	}
	return length;
}
