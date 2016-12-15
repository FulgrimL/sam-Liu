window.onload=function(){
			 var flag;
			 var  regist_name=document.getElementById("regist_name");
			 var  regist_nametips=document.getElementById("regist_nametips");
			 var regist_email=document.getElementById("regist_email");
			 var regist_emailtips=document.getElementById("regist_emailtips");
			 var name;//用户名
			 var email;//邮箱
			 var mbpn;//电话号码
			 var code;//验证码
			 //验证用户名
			 regist_name.onfocus=function(){
			 	if(this.value=="用户名"){this.value="";}; 
			 	regist_name.style.borderColor="#00abdd";
			 }
			 regist_name.onblur=function(){
			 	if(this.value==""){this.value="用户名";};
			 	name = this.value.replace(/ /g, "");
				this.value = name;
				if (/[\u4e00-\u9fa5_a-zA-Z0-9_]{4,20}/.test(name)) {
					flag=true;
					regist_nametips.innerHTML="4-20位字符，可由中文、英文、数字或符号“_”组成";
					regist_nametips.style.color="#AAAAAA";
				}else{flag=false;
					console.log("用户名错误");
					regist_nametips.innerHTML="请输入正确的用户名"
					regist_nametips.style.color="red";
					regist_name.style.borderColor="red";
				}
			 }
			//验证邮箱
			regist_email.onfocus=function(){
			 	if(this.value=="邮箱地址"){this.value="";}; 
			 	regist_email.style.borderColor="#00abdd";
			 }
			regist_email.onblur=function(){
				if(this.value==""){this.value="邮箱地址";};
			 	email = this.value.replace(/ /g, "");
				this.value = email;
				if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ .test(email)) {
					flag=true;
					regist_emailtips.innerHTML="请输入常用邮箱，可用作登录账户，接受订单通知和找回密码之用";
					regist_emailtips.style.color="#AAAAAA";
					regist_email.style.borderColor="#AAAAAA"
				}else{flag=false;	
					console.log("邮箱错误");
					regist_emailtips.innerHTML="请输入正确的邮箱地址";					
					regist_emailtips.style.color="red";
					regist_email.style.borderColor="red";
				}
			}
			//验证密码
			var pwd=document.getElementById("password");
			var pwd_tips=document.getElementById("password_tips");
			var pass1;
			var pass2;
			
			pwd.onblur=function(){
				pass1=pwd.value;
				if (/[\u4e00-\u9fa5_a-zA-Z0-9_]{6,20}/.test(pass1)) {
					flag=true;
					pwd_tips.innerHTML="6-20位字符，可由中文、英文、数字或符号组成";
					pwd_tips.style.color="#AAAAAA";
	 				pwd.style.borderColor="#AAAAAA"
				}else{
					flag=false;	
					pwd_tips.innerHTML="请输入正确的密码格式";					
					pwd_tips.style.color="red";
					pwd.style.borderColor="red";
				}
			}
			
			//验证确认密码
			var pwd2=document.getElementById("regist_pwd");
			var pwd2_tips=document.getElementById("regist_pwdtips");
			 
			pwd2.onblur=function(){
				pass2=pwd2.value;
				if (pass1!=pass2) {
					pwd2_tips.innerHTML="两次输入的密码不一致"
					flag=false;
					pwd2_tips.style.color="red";
					pwd2.style.borderColor="red";
					console.log(pass2);
					console.log(pass1);
				}else{
					flag=true;
					pwd2_tips.innerHTML="";
	 				pwd2.style.borderColor="#AAAAAA"
				}
			}
			
			//验证手机号码
			var regist_pn=document.getElementById("regist_phoneNum");
			var pntips=document.getElementById("regist_phoneNumtips");
			regist_pn.onfocus=function(){
			 	if(this.value=="您的手机号"){this.value="";}; 
			 	regist_pn.style.borderColor="#00abdd";
			 }
			regist_pn.onblur=function(){
				if(this.value==""){this.value="您的手机号";};
			 	mbpn = this.value.replace(/ /g, "");
				this.value = mbpn;
				if (/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ .test(mbpn)) {
					flag=true;
					pntips.innerHTML="";
					pntips.style.color="#AAAAAA";
					regist_pn.style.borderColor="#AAAAAA"
				}else{flag=false;	
					pntips.innerHTML="请输入正确的电话号码";					
					pntips.style.color="red";
					regist_pn.style.borderColor="red";
				}
			}
			//生成验证码
			var refresh_code=document.getElementById("refresh-code");
			refresh_code.innerHTML=testCode(4);
			refresh_code.onclick=function(){
				this.innerHTML=testCode(4);
			}	
			//验证验证码
			var regist_code=document.getElementById("regist_code");
			var codetips=document.getElementById("codetips");
			regist_code.onfocus=function(){
			 	if(this.value=="验证码"){this.value="";}; 
			 	regist_pn.style.borderColor="#00abdd";
			 }
			regist_code.onblur=function(){
				refreshcode=refresh_code.innerHTML.toLowerCase();
				if(this.value==""){this.value="验证码";};
			 	code = this.value.replace(/ /g, "");
				this.value = code;
				if (code.toLowerCase()==refreshcode) {
					flag=true;
					codetips.innerHTML="";
					console.log("正确")
					codetips.style.color="#AAAAAA";
					regist_code.style.borderColor="#AAAAAA"
				}else{flag=false;	
					codetips.innerHTML="验证码不正确";					
					codetips.style.color="red";
					regist_code.style.borderColor="red";
					console.log(code);
					console.log(refreshcode);
				}
			}
			
			//提交
			var login=document.getElementById("submit");
			login.onclick=function(){
				if (flag==true) {
					javascript:window.location.href='index.html';
					console.log(name);
					console.log(email);
					console.log(mbpn);
					console.log(pass1);
					console.log(pass2);
					console.log(code);
					console.log(flag);
					$.cookie('name',name);
					$.cookie('password',pass2);
					
				}else{
					alert("信息错误");
				}
				
				
			}
			
				
			}