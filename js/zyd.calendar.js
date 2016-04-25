(function(){
	var oLeft=document.getElementById('left');
	var oRight=document.getElementById('right');
	var oYear=document.getElementById('year');
	var oMonth=document.getElementById('month');
	var oMLeft=document.getElementById('mleft');
	var oMRight=document.getElementById('mright');
	var aMonth=getClass('week_day');

	window.onload=function(){
		setFirst();     //初始化
		setYear();      //设置年
		setMonth();     //设置月
		mouseMove('navWeekTable','week_day');
		getSelectDate('navWeekTable','week_day');
	};

	//获取所选择的日期
	var getSelectDate=function(sParentsId, sClassName){
		var oParents=document.getElementById(sParentsId);
		oParents.addEvent('click', function(ev){
			var ev=ev||window.event;
			var target=ev.target||ev.srcElement;

			var year=oYear.innerHTML;
			var month=parseInt(oMonth.innerHTML)<10?'0'+parseInt(oMonth.innerHTML):parseInt(oMonth.innerHTML);
			var day='01';

			if(checkClassName(target.className, sClassName)){
				if(aMonth[0].style.backgroundColor!=target.style.backgroundColor){
					day=target.innerHTML<10?'0'+target.innerHTML:target.innerHTML;
					alert(year+'-'+month+'-'+day);
				}
			}
		});
	};

	//初始化
	var setFirst=function(){
		var date=new Date();
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		oYear.innerHTML=year;
		oMonth.innerHTML=month+'月';

		showDate();
	};

	//年份选择
	var setYear=function(){
		oLeft.addEvent('click', function(){
			var year=parseInt(oYear.innerHTML)-1;
			oYear.innerHTML=year;
			showDate();
		});
		oRight.addEvent('click', function(){
			var year=parseInt(oYear.innerHTML)+1;
			oYear.innerHTML=year;
			showDate();
		});
	};

	//月份选择
	var setMonth=function(){
		oMLeft.addEvent('click', function(){
			var month=parseInt(oMonth.innerHTML)-1;
			if(month>=1&&month<=12)
				oMonth.innerHTML=month+'月';
			showDate();
		});
		oMRight.addEvent('click', function(){
			var month=parseInt(oMonth.innerHTML)+1;
			if(month>=1&&month<=12)
				oMonth.innerHTML=month+'月';
			showDate();
		});
	};

	//显示日期表
	var showDate=function(){
		var year=oYear.innerHTML;
		var month=parseInt(oMonth.innerHTML);

		var d=new Date();
		var monthLength=getMonthLength(month, year);
		var firstDay=getFirstWeek(year, month-1, 1, d);
		var day=1,day1=getMonthLength(month-1, year),day2=1;

		var date=new Date();
		var thisYear=date.getFullYear();
		var thisMonth=parseInt(date.getMonth())+1;
		var thisDay=date.getDate();

		if(firstDay==0){
			firstDay=7;
		}
		for(var n=firstDay-1; n>=0; n--){
			aMonth[n].innerHTML=day1--;
			aMonth[n].style.backgroundColor='rgba(150,150,150,0.6)';
		}
		for(var n=firstDay; n<parseInt(monthLength)+firstDay; n++){
			aMonth[n].innerHTML=day;
			if(thisYear==year&&thisMonth==month&&thisDay==day)
				aMonth[n].style.backgroundColor='rgba(45,184,173,0.7)';
			else
				aMonth[n].style.backgroundColor='rgba(245,238,106,0.9)';
			day++;
		}
		for(var n=parseInt(monthLength)+firstDay; n<=41; n++){
			aMonth[n].innerHTML=day2;
			aMonth[n].style.backgroundColor='rgba(150,150,150,0.6)';
			day2++;
		}
	};

	//判断是否为闰年
	var isLeapYear=function(year){
		if(((year%4)==0)&&((year%100)!=0)||((year%400)==0)){
			return true;
		}else{
			return false;
		}
	};

	//获取一月的天数
	var getMonthLength=function(month, year){
		if(month==2){
			if(isLeapYear(year)){
				return 29;
			}else{
				return 28;
			}
		}else if(month==4||month==6||month==9||month==11){
			return 30;
		}else{
			return 31;
		}
	};

	//获取每月第d天的星期数
	var getFirstWeek=function(y, m, d, oDate){
		oDate.setYear(y);
		oDate.setMonth(m);
		oDate.setDate(d);
		return oDate.getDay();
	};

	//鼠标移入、移出效果
	var mouseMove=function(sParentsId, sClassName){
		var oParents=document.getElementById(sParentsId);
		var oldSty=null;
		oParents.addEvent('mouseover', function(ev){
			var ev=ev||window.event;
			var target=ev.target||ev.srcElement;

			if(checkClassName(target.className, sClassName)){
				oldSty=target.style.backgroundColor;
				if(aMonth[0].style.backgroundColor!=oldSty){
					target.style.backgroundColor='rgba(45,184,173,0.7)';
				}
			}
		});
		oParents.addEvent('mouseout', function(ev){
			var ev=ev||window.event;
			var target=ev.target||ev.srcElement;

			if(checkClassName(target.className, sClassName)){
				target.style.backgroundColor=oldSty;
			}
		});
	};

	//通用事件绑定
	Object.prototype.addEvent=function(type, fn){
		if(this.addEventListener){
			this.addEventListener(type, fn, false);
		}else if(this.attachEvent){
			this.attachEvent('on'+type, fn);
		}
	};

	//checkClassName匹配className
	function checkClassName(sClassNames, sClassName){
		var aClassNames=sClassNames.split(' ');
		for(var index in aClassNames){
			if(aClassNames[index]==sClassName){
				return 1;
			}
		}
		return 0;
	}

	//getClass获取class数组
	function getClass(className){
		var oClass=[];
		var oAll=document.getElementsByTagName('*');
		for(var index in oAll){
			if(oAll[index].className==className){
				oClass.push(oAll[index]);
			}
		}
		return oClass;
	}
})();
