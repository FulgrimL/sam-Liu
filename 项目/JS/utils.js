//document.write(xxx+"<br/>");

function write(str){
	document.write(str+"<br/>");
}


function log(str){
	console.log(str);
}


//获得一定范围的随机数
function getRandom(start,end){
	
	var d = end+1-start;
	return Math.floor(Math.random()*d+start);
}

//兼容event对象
function getEvent(evt){
	return evt||window.event;
}

//兼容target对象
function getTarget(evt){
	var e = getEvent(evt);
	return e.target||e.srcElement;
	
}

//兼容获得不可见区域的左边缘到可见区域的左边缘的距离
function getScrollLeft(){
	
	return document.documentElement.scrollLeft||document.body.scrollLeft;
}
//兼容获得不可见区域的顶边缘到可见区域的顶边缘的距离
function getScrollTop(){
	
	return document.documentElement.scrollTop||document.body.scrollTop;
}

//兼容阻止默认行为
function stopAction(evt){
	var e = getEvent(evt);
	e.preventDefault?e.preventDefault():e.returnValue = false;
}

//获得时间
function showTime(date){
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minu = date.getMinutes();
	var sec = date.getSeconds();
	return "现在是："+year+"年"+month+"月"+day+"日"+" "+hour+":"+minu+":"+sec;
}


//获得外部样式兼容代码
function getStyle(element,style){
	if(element.currentStyle){
		return element.currentStyle[style];
	}else{
		return getComputedStyle(element)[style];
	}
}
//获取内部样式兼容代码
function getStyleObj(obj){
					if(obj.currentStyle){
						return obj.currentStyle;
					}else{
						return getComputedStyle(obj,null);
					}
					
				}





//根据ID来获得DOM对象
//function $(id){
//	return document.getElementById(id);
//}


//获得Cookie的值
function getCookie(name){
	                          
	//alert(document.cookie);  //name=%E4%B9%90%E5%B8%85; country=%E4%B8%AD%E5%9B%BD
	var cookieValue = null;
	var cookieName = encodeURIComponent(name)+"=";  //country=
	//找到cookiename的开始位置
	var cookieStart = document.cookie.indexOf(cookieName);
	
	if(cookieStart>-1){
		var cookieEnd = document.cookie.indexOf(";",cookieStart);
		//要找的Cookie是不在最后一个
		if(cookieEnd==-1){
			cookieEnd= document.cookie.length;
		}	
	}
	cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
	return cookieValue;
	

}

//封装Cookie
function setCookie(name,value,expires,domain,path,secure){
	var cookieContent = encodeURIComponent(name)+"="+encodeURIComponent(value);
	
	if(expires instanceof Date){
		cookieContent += ";expires="+expires;
	}
	
	if(domain){
		cookieContent +=";domain="+domain;
	}
	
	if(path){
		cookieContent+=";path="+path;
	}
	if(secure){
		cookieContent += ";SECURE";
	}
	
	document.cookie = cookieContent;
	
}

//设置超时时间
function setCookieDate(day){
	 var date = null;
	if(typeof day =="number"&&day>0){
		date = new Date();
		date.setDate(date.getDate()+day);
	}
	return date;
}

//阻止冒泡
function stopBubble(e){
		var evt = e||window.event;
		//alert(window.event);//firefox undefined  IE object Event
		if(window.event){
			//是IE
			evt.cancelBubble = true;
		}else{
			evt.stopPropagation();
		}
		
	}

//创建XMLHttpRequest对象
function createXHR(){
   var xmlhttp;
   if(window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
   }else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }
   return xmlhttp;
}

//传入n,生成n位的验证码
function testCode(n){ 
	var arr = []; //记录每一次生成的验证码
	for(var i = 0; i < n; i++){
		var num = parseInt(Math.random() * 100);
		if(num >= 0 && num <= 9){
			arr.push(num);
		}else if(num >= 10 && num <= 35){
			var charStr = String.fromCharCode(num + 87);
			arr.push(charStr);
		}else if(num >= 65 && num <= 90){
			var charStr = String.fromCharCode(num);
			arr.push(charStr);
		}else{
			i--; //再去将那次无用操作补回来
		}
	}
	return arr.join("");
}









