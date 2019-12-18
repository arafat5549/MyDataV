 var x_PI = 3.14159265358979324 * 3000.0 / 180.0; var PI = 3.1415926535897932384626; var a = 6378245.0; var ee = 0.00669342162296594323; 
function gcj02towgs84 (lng, lat) { 
		var dlat = transformlat(lng - 105.0, lat - 35.0); 
		var dlng = transformlng(lng - 105.0, lat - 35.0); var radlat = lat / 180.0 * PI; 
		var magic = Math.sin(radlat); 
		magic = 1 - ee * magic * magic; 
		var sqrtmagic = Math.sqrt(magic); dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI); 
		dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI); 
		mglat = lat + dlat; 
		mglng = lng + dlng; return [lng * 2 - mglng, lat * 2 - mglat] } 
	function transformlat (lng, lat) { 
		var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 *     Math.sqrt(Math.abs(lng)); 
		ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0; 
		ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
		 ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0; 
		 return ret }
 	function transformlng (lng, lat) { 
 	var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng)); 
 	ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0; 
 	ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0; 
 	ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0; 
 	return ret 

 } /** * 判断是否在国内，不在国内则不做偏移 * @param lng * @param lat * @returns {boolean} */ 

//function out_of_china (lng, lat) { return (lng  137.8347) || ((lat  55.8271) || false); } 
//使用示例 //gps坐标转火星坐标 var lng_lat_1 = wgs84togcj02(113.912743,22.497629); console.log('火星坐标...',lng_lat_1); //火星坐标转百度坐标 var lng_lat_2 = gcj02tobd09(lng_lat_1[0], lng_lat_1[1]); console.log('百度坐标...',lng_lat_2);


function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
 }


var prj= window.prj= prj|| {};
//wgs84转gcj02
prj.gps84_To_Gcj02 = function(lon,lat){
	var pi = 3.1415926535897932384626;
	var a = 6378245.0;
	var ee = 0.00669342162296594323;

	var dLat = transformLat(lon - 105.0, lat - 35.0);
	var dLon = transformLon(lon - 105.0, lat - 35.0);
	var radLat = lat / 180.0 * pi;
	var magic = Math.sin(radLat);
	magic = 1 - ee * magic * magic;
	var sqrtMagic = Math.sqrt(magic);
	dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
	dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
	var mgLat = lat + dLat;
	var mgLon = lon + dLon;
	return [mgLon, mgLat];

	function transformLon(x,y){
		var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0
				* pi)) * 2.0 / 3.0;
		return ret;
	}

	function transformLat(x,y){
		var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
		+ 0.2 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
		return ret;
	}
}

//gcj02转wgs84
prj.gcj02_To_Gps84 = function(lon,lat){
	var pi = 3.1415926535897932384626;
	var a = 6378245.0;
	var ee = 0.00669342162296594323;
		
	var gps = transform(lon,lat);
	var lontitude = lon * 2 - gps[0];
	var latitude = lat * 2 - gps[1];
	return [lontitude,latitude];

	function transform(lon,lat) {
		var dLat = transformLat(lon - 105.0, lat - 35.0);
		var dLon = transformLon(lon - 105.0, lat - 35.0);
		var radLat = lat / 180.0 * pi;
		var magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		var sqrtMagic = Math.sqrt(magic);
		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
		dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
		var mgLat = lat + dLat;
		var mgLon = lon + dLon;
		return [mgLon,mgLat];
	}
		
	function transformLon(x,y){
		var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0
				* pi)) * 2.0 / 3.0;
		return ret;
	}

	function transformLat(x,y){
		var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
		+ 0.2 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
		return ret;
	}
}



function gps84LonLat_to_Gcj02(lonLat) {
    var pnt = prj.gps84_To_Gcj02(lonLat[0], lonLat[1]); //调用prj.js里的方法做偏移
    pnt = ol.proj.transform(pnt, 'EPSG:4326', 'EPSG:3857'); //WGS84转3857
    return pnt;
}

function gcj02_to_gps84LonLat(pnt) {
    var lonLat = ol.proj.transform(pnt, 'EPSG:3857', 'EPSG:4326');
    lonLat = prj.gcj02_To_Gps84(lonLat[0], lonLat[1]); //调用prj.js里的方法做反偏移
    return lonLat;
}


! function(a) {
    "use strict";
    function b(b, d) {
        this.$el = a(b), this.opt = a.extend(!0, {}, c, d), this.init(this)
    }
    var c = {};
    b.prototype = {
        init: function(a) {
            a.initDropdown(a)
        },
        initToggle: function(b) {
            a('#sidenav-toggle').on("click", function(c) {
                var d = a(c.target);
                d.closest(b.$el.data("sidenav-toggle"))[0] ? (b.$el.toggleClass("show"), a("body").toggleClass("sidenav-no-scroll")) : d.closest(b.$el)[0] || (b.$el.removeClass("show"), a("body").removeClass("sidenav-no-scroll"))
            })
        },
        initDropdown: function(b) {
            b.$el.on("click", "[data-sidenav-dropdown-toggle]", function(b) {
                var c = a(this);
                c.siblings("[data-sidenav-dropdown]").slideToggle("fast"), c.find("[data-sidenav-dropdown-icon]").toggleClass("show"), b.preventDefault()
            })
        }
    }, a.fn.sidenav = function(c) {
        return this.each(function() {
            a.data(this, "sidenav") || a.data(this, "sidenav", new b(this, c))
        })
    }
}(window.jQuery);



// slider

jQuery.extend(jQuery.easing,{
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	}
});
(function($){	
	$.fn.xslider=function(settings){
		settings=$.extend({},$.fn.xslider.defaults,settings);
		this.each(function(){
			var scrollobj=settings.scrollobj || $(this).find("ul");
			var maxlength=settings.maxlength || (settings.dir=="H" ? scrollobj.parent().width() : scrollobj.parent().height());//length of the wrapper visible;
			var scrollunits=scrollobj.find("li");//units to move;
			var unitlen=settings.unitlen || (settings.dir=="H" ? scrollunits.eq(0).outerWidth() : scrollunits.eq(0).outerHeight());
			var unitdisplayed=settings.unitdisplayed;//units num displayed;
			var nowlength=settings.nowlength || scrollunits.length*unitlen;//length of the scrollobj;
			var offset=0;
			var sn=0;
			var movelength=unitlen*settings.movelength;
			var moving=false;//moving now?;
			var btnright=$(this).find("a.aright");
			var btnleft=$(this).find("a.aleft");
			
			if(settings.dir=="H"){
				scrollobj.css("left","0px");
			}else{
				scrollobj.css("top","0px");
			}
			if(nowlength>maxlength){
				btnleft.addClass("agrayleft");
				btnright.removeClass("agrayright");
				offset=nowlength-maxlength;
			}else{
				btnleft.addClass("agrayleft");
				btnright.addClass("agrayright");
			}

			btnleft.click(function(){
				if($(this).is("[class*='agrayleft']")){return false;}
				if(!moving){
					moving=true;
					sn-=movelength;
					if(sn>unitlen*unitdisplayed-maxlength){
						jQuery.fn.xslider.scroll(scrollobj,-sn,settings.dir,function(){moving=false;});
					}else{
						jQuery.fn.xslider.scroll(scrollobj,0,settings.dir,function(){moving=false;});
						sn=0;
						$(this).addClass("agrayleft");
					}
					btnright.removeClass("agrayright");
				}
				return false;
			});
			btnright.click(function(){
				if($(this).is("[class*='agrayright']")){return false;}
				if(!moving){
					moving=true;
					sn+=movelength;
					if(sn<offset-(unitlen*unitdisplayed-maxlength)){
						jQuery.fn.xslider.scroll(scrollobj,-sn,settings.dir,function(){moving=false;});
					}else{
						jQuery.fn.xslider.scroll(scrollobj,-offset,settings.dir,function(){moving=false;});//滚动到最后一个位置;
						sn=offset;
						$(this).addClass("agrayright");
					}
					btnleft.removeClass("agrayleft");
				}
				return false;
			});
			
			if(settings.autoscroll){
				jQuery.fn.xslider.autoscroll($(this),settings.autoscroll);
			}
			
		})
	}
})(jQuery);

jQuery.fn.xslider.defaults = {
	maxlength:0,
	scrollobj:null,
	unitlen:0,
	nowlength:0,
	dir:"H",
	autoscroll:null
};
jQuery.fn.xslider.scroll=function(obj,w,dir,callback){
	if(dir=="H"){
		obj.animate({
			left:w
		},500,"easeInSine",callback);
	}else{
		obj.animate({
			top:w
		},500,"easeInSine",callback);	
	}
}
jQuery.fn.xslider.autoscroll=function(obj,time){
	var  vane="right";
	function autoscrolling(){
		if(vane=="right"){
			if(!obj.find("a.agrayright").length){
				obj.find("a.aright").trigger("click");
			}else{
				vane="left";
			}
		}
		if(vane=="left"){
			if(!obj.find("a.agrayleft").length){	
				obj.find("a.aleft").trigger("click");
			}else{
				vane="right";
			}
		}
	}
	var scrollTimmer=setInterval(autoscrolling,time);
	obj.hover(function(){
		clearInterval(scrollTimmer);
	},function(){
		scrollTimmer=setInterval(autoscrolling,time);
	});
}

