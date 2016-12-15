window.onload=function(){
////获取导航栏数据
				var xhr=createXHR();
				xhr.open("GET","newnav.json",true);
				xhr.send();
				var nav_ul=document.getElementsByClassName("nav_ul")[0];
				
				xhr.onreadystatechange=function(){
					if (xhr.status==200&&xhr.readyState==4) {
						var responseText=xhr.responseText;
						var arr=JSON.parse(responseText);
						var nav_li=nav_ul.getElementsByTagName("li");
						var nav_div=document.getElementsByClassName("nav_div");
						
						for (var i =0 ;i<arr.length;i++) {
							nav_li[i].index=i;
							//创建每个nav标签内的dl
	
							for (var j=0 ;j<arr[i].a1.length;j++) {
								 		var dl=document.createElement("dl");
								 		nav_div[i].appendChild(dl);
								 		var dt=document.createElement("dt");
								 		dl.appendChild(dt);
								 		var a=document.createElement("a");
								 		dt.appendChild(a);
								 		a.innerHTML=arr[i].a1[j].b1[0][0];
								 		
//								 		console.log(i);
								 		//创建dd
								 		for (var n=1;n<arr[i].a1[j].b1.length;n++) {
								 			var dd=document.createElement("dd");
								 			dl.appendChild(dd);
								 			dd.innerHTML=arr[i].a1[j].b1[n][n];
								 		}
								}
							
							nav_li[i].onmouseover=function(){
								nav_div[this.index].style.display="block";
							}
							nav_li[i].onmouseout=function(){	
								nav_div[this.index].style.display="none";
							}
						}
					}
				}
				
//左侧导航动画
				for(var i = 0;i <$(".sea_list").length;i++){
		var list_left_li =$(".sea_list");
		list_left_li[i].index=i;
		list_left_li[i].onclick=function(){
			var list_display = $(".sea_list_sub").eq(this.index).css("display");
			if(list_display == "none"){
				$(".sea_list_sub").eq(this.index).css("display", "block");
				$(".sea_list_img").eq(this.index).find("img").attr("src", "img/list/icon_down.png")
			}else{
				$(".sea_list_sub").eq(this.index).css("display", "none");
				$(".sea_list_img").eq(this.index).find("img").attr("src", "img/list/icon_top.png")
			}
		}
	}
			}	
				
//右侧列表生成  更多推荐生成
		$(function(){$.ajax({
		url:"list.json",
		type:"GET",
		success:function(res){
			var html = '';
//			console.log(res.nuts[1].img)
			for(var i = 0; i < res.nuts.length; i++){
				html += '<li><div class="lits_godsslist_div"><img src='+res.nuts[i].img+'/><div class="pro-title"><a href="#"><a style="display:block;">'+res.nuts[i].detail1+'</a><span>'+res.nuts[i].detail2+'</span>'+'</div><div class="pro-price"><b style="color:#0069aa">'+res.nuts[i].price+'</b></div><div class="pro-sl"><span class="goods-sub">-</span><input type="text" value="1"/><span id="" class="goods-add">+</span></div><div class="pro-sr"><span class="list-addcart">加入购物车</span></div></div></li>';
			}
			$("#lits-goddslist").html(html);
			var inner='';
			for (var i = 0; i < res.recommend.length; i++ ) {			console.log(res.recommend[i]);
			inner+='<li><img src='+res.recommend[i].img+'/><p class="recommend-p"><a>'+res.recommend[i].detail1+'</a></p><span>'+res.recommend[i].detail2+'</span></li>';
			}
			$(".recommend-ul").eq(0).html(inner)
		
		
		//加入购物车数量增减
		var addBtn = $(".goods-add");
		for(var i = 0; i < $(".goods-add").length;i++){
			addBtn[i].index = i;
			addBtn[i].onclick=function(){
				var num = $(".pro-sl").eq(this.index).find("input").val();
				num++;
				$(".pro-sl").eq(this.index).find("input").val(num);
			}
		}
		var subBtn = $(".goods-sub");
		for(var i = 0; i < $(".goods-sub").length;i++){
			subBtn[i].index = i;
			subBtn[i].onclick=function(){
				var num = $(".pro-sl").eq(this.index).find("input").val();
				num--;
				if(num == -1){num =0}
				$(".pro-sl").eq(this.index).find("input").val(num);
			}
		}
	
		var addCart = $(".list-addcart");
		sc_car();
		for(var i = 0;i<addCart.length;i++){
			addCart[i].index = (i+1);
			addCart[i].onclick=function(){
				var first = $.cookie('goods')==null?true:false;
				var same = false;
				if(first){
					var num1 = $(".pro-sl").eq(this.index-1).find("input").val();
					$.cookie('goods','[{id:'+this.index+',num:1}]');
					$.cookie('first','false');
				}else{
					var num1 = $(".pro-sl").eq(this.index-1).find("input").val();
					var str = $.cookie('goods');
					var arr = eval(str);
					for(var attr in arr){
					if(arr[attr].id == this.index){		
						arr[attr].num = parseFloat(arr[attr].num) + parseFloat(num1);  //让json结构中num自增。
						var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
						$.cookie('goods',cookieStr);
						same = true;
						}
					}
					if(!same){
						var obj  = {id:this.index,num:num1};
						arr.push(obj);
						var cookieStr = JSON.stringify(arr);
						$.cookie('goods',cookieStr);
					}
				}
				sc_car();
			}
			
		}
		function sc_car(){
			var sc_str = $.cookie('goods');
//			console.log(sc_str);
			if(sc_str){//如果购物车cookie不为空。
				var sc_obj = eval(sc_str);
				var sc_num = 0 ; 
				for(var i in sc_obj){
					sc_num = Number(sc_obj[i].num) + sc_num;
				}
				$('.float-goods-tit-num').html(sc_num);
				$('#float-box-num').html(sc_num);
			}
		}
		
		sc_car1();
		//左侧购物车添加功能
		var addCart1 = $(".llh-addcart-a");
//		console.log(addCart1.length);
		for(var i = 0; i < addCart1.length; i++){
			addCart1[i].index = i;
			addCart1[i].onclick=function(){
				console.log(this.index);
				var first = $.cookie('goods')==null?true:false;
				var same = false;
				if(first){
					$.cookie('goods','[{id:'+this.index+',num:1}]');
					$.cookie('first','false');
				}else{
					var str = $.cookie('goods');
					var arr = eval(str);
					for(var attr in arr){
					if(arr[attr].id == this.index){		
						arr[attr].num = arr[attr].num + 1;  //让json结构中num自增。
						var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
						$.cookie('goods',cookieStr);
						same = true;
					}
				}
					if(!same){
						var obj  = {id:this.index,num:1};
						arr.push(obj);
						var cookieStr = JSON.stringify(arr);
						$.cookie('goods',cookieStr);
					}
				}
				sc_car1();
			}
		}
		function sc_car1(){
			var sc_str = $.cookie('goods');
			console.log(sc_str);
			if(sc_str){//如果购物车cookie不为空。
				var sc_obj = eval(sc_str);
				var sc_num = 0 ; 
				for(var i in sc_obj){
					sc_num = Number(sc_obj[i].num) + sc_num;
				}
				$('.float-goods-tit-num').html(sc_num);
				$('#float-box-num').html(sc_num);
			}
		}
		
		
		
		
		}
	})
	
	
	
	
	
})

	$().extend({
			size: function(){
				return this.elements.length;
			}
	})
			
				
			
			