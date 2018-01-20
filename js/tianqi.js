// 获取所有的城市
let citys,weatherobj;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		citys=obj.data;

        for(let i in citys){
        	let section=document.createElement('section');
        	let citys_title=document.createElement('h1');
        	citys_title.className="citys_title";
        	citys_title.innerHTML=i;
        	section.appendChild(citys_title);
        	for(let j in citys[i]){
        		let citys_list=document.createElement('ul');
        		citys_list.className='citys_list';
        		let li = document.createElement('li');
        		li.innerHTML=j;
        		citys_list.appendChild(li);
        		section.appendChild(citys_list);

        	}
        	$(".citys_box").append(section);

        }
	}
})
$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
    getFullweather(remote_ip_info.city);
});     
function getFullweather(nowcity){
     $(".now_city").html(nowcity)

     // 获取当前城市的天气信息
     $.ajax({
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
		dataType:"jsonp",
		success:function(obj){



			weatherobj=obj.data;
			console.log(weatherobj);
			// 获取当前的空气质量
		    $(".now_air_quality").html(weatherobj.weather.quality_level);
		    $(".now_temp_temp").html(weatherobj.weather.current_temperature);
		    $(".now_wind_lever").html(weatherobj.weather.wind_level+"级");
		    $(".now_weather").html(weatherobj.weather.current_condition);
		    // 近期两天的天气
		    // 获取今天的温度
		    $(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
		    $(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
		    $(".today_weather").html(weatherobj.weather.day_condition);
		    $(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
		    $(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");
		    $(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
		    $(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
		    $(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);

		    // 未来24小时的天气的情况
		    

		    let hours_array=weatherobj.weather.hourly_forecast;
		    // console.log(hours_array);
		    for(let i=0;i<hours_array.length;i++){
		    	let hours_list=document.createElement('li');
		        let hours_time=document.createElement('span');
		        hours_time.className='time';
		        let hours_img=document.createElement('img');
		        hours_img.className='hours_img';
		        let hours_temp=document.createElement('span');
		        hours_temp.className='hours_temp';

		        hours_list.appendChild(hours_time);
		        hours_list.appendChild(hours_img);
		        hours_list.appendChild(hours_temp);

		        $(".hours_content").append(hours_list);

		        hours_time.innerHTML=hours_array[i].hour+":00";
		        hours_img.setAttribute('src', "img/"+hours_array[i].weather_icon_id+".png");
		        hours_temp.innerHTML=hours_array[i].temperature+"°";
		    }
		    let date_array=weatherobj.weather.forecast_list;
	        console.log(date_array);
	        for(let i=0;i<date_array.length;i++){
		    	let date_list=document.createElement('li');
		        let date_time=document.createElement('span');
		        date_time.className='date_date_d';
		        let date_day_weather = document.createElement('span');
	            date_day_weather.className = 'date_day_weather';
		        let date_img=document.createElement('img');
		        date_img.className='date_img';
		        let date_max=document.createElement('span');
		        date_max.className='date_max';
		        let date_min=document.createElement('span');
		        date_max.className='date_min';
		        let date_night_weather = document.createElement('span');
	            date_night_weather.className = 'date_night_weather';

		        let date_wind=document.createElement('span');
		        date_wind.className='date_wind';

		        date_list.appendChild(date_time);
		        date_list.appendChild(date_day_weather);
		        date_list.appendChild(date_img);
		        date_list.appendChild(date_max);
		        date_list.appendChild(date_min);
		        date_list.appendChild(date_night_weather);
		        date_list.appendChild(date_wind);

		        $(".date_content").append(date_list);

		        date_time.innerHTML = date_array[i].date.substring(5,7)+"/"+date_array[i].date.substring(8);
		        date_day_weather.innerHTML = date_array[i].condition;

		        date_img.setAttribute('src', "img/"+date_array[i].weather_icon_id+".png");
		        date_max.innerHTML=date_array[i].high_temperature+"°";
		        date_min.innerHTML=date_array[i].low_temperature+"°";
		        date_night_weather.innerHTML = date_array[i].wind_direction;
		        date_wind.innerHTML=date_array[i].wind_level+"级";

		    }
		}
	})
    
}
$(function(){
	$(".now_city").on("click",function(){
		$(".shuru").val("");
    	$(".confirm").html('取消');
		$(".citys").css("display","block");
	})

	$("body").delegate('.citys_list li','click', function() {
		let son = this.innerHTML;
		getFullweather(son);
		$(".citys").css("display","none");
	})
    $("body").delegate('.citys_title','click', function() {
		let son = this.innerHTML;
		getFullweather(son);
		$(".citys").css("display","none");
	})

	$(".shuru").on("focus",function(){
		$(".confirm").html("确认");
	})



    
    	$(".confirm").on("click",function(){
    		if(this.innerText=="取消"){
    			$(".citys").css('display', 'none');
    			console.log(this.innerText);
    		}else if(this.innerText=="确认"){
    			let text=$(".shuru").val();
    			for(let i in citys){
    				if(text==i){
    					getFullweather(text);
    					$(".citys").css('display', 'none');
    					return;
    				}else{
    					for(let j in citys[i]){
    						if(text==j){
    							getFullweather(text);
    					        $(".citys").css('display', 'none');
    					        return;
    						}
    					}
    				}
    			}
    			alert("输入地区有误"); 
    			$(".shuru").val("");
    			$(".confirm").html('取消');
    		}
    	})
    
})




