var IsJqm =true;
// var host        = 'http://riversm.huntingspeed.com/';
// var jiangleHost = 'http://river.huntingspeed.com/'; //mapfuntion.js
// var smhzz_host  = 'http://www.smhzz.cn/';
// var relativehost = '../resource/mapData/'
// var cityId = GetQueryString('id') || 1;
// var level = GetQueryString('level');
// var account = GetQueryString('account') || 'admin';
// account = decodeURI(decodeURI(account));
// var idparent = parseInt(GetQueryString('idparenty'), 10);
// var userid = parseInt(GetQueryString('userid'), 10)|| 1;
// var riverkmldata = {};
// var riverData = {};
// var pagesize = 10;
// var map1;
// cityId = '' + cityId;
// if (cityId.indexOf(',') != -1) {
//     cityId = cityId.split(',')
// } else {
//     cityId = parseInt(cityId, 10)
// }

var tdtSatelliteLayer = new ol.layer.Tile({
    title: "天地图卫星影像",
    source: new ol.source.XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
    })
});


var tiandituLayer = new ol.layer.Tile({
    title: "天地图",
    type: 'base',
    visible: true,
    source: new ol.source.XYZ({
        url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}",
    })
});

var tdtTextLayer = new ol.layer.Tile({
    title: "天地图标注",
    source: new ol.source.XYZ({
        url: "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}",
    })
});

var map = new ol.Map({
    layers: [
        tiandituLayer, tdtTextLayer
    ],
    view: new ol.View({
        center: ol.proj.transform([117.46, 26.27], 'EPSG:4326', 'EPSG:3857'), // 定义地图显示中心于经度0度，纬度0度处
        zoom: 9,
        minZoom: 8,
        maxZoom: 22
    }),
    target: 'map', //'map'
    controls: ol.control.defaults({
        attributionOptions: ({

            collapsible: false

        })
    })
});
// 全屏控件
map.addControl(new ol.control.FullScreen({}));
//添加比例尺控件
// map.addControl(new ol.control.ScaleLine()); 
//添加缩放控件
map.addControl(new ol.control.Zoom());
//添加缩放滑动控件
// map.addControl(new ol.control.ZoomSlider());
//添加缩放到当前视图滑动控件
// map.addControl(new ol.control.ZoomToExtent());
// map.addControl(new ol.control.OverviewMap({}));
var tileLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});
map.addLayer(tileLayer);
var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: "EPSG:4326",
    className: "custom-mouse-position",
    target: document.getElementById("mouse-position"),
    undefinedHTML: "&nbsp"
});
map.addControl(mousePositionControl);

/*
// 水电站
// picClusterinit()
// map.addLayer(picClusterLayer);
// picClusterLayer.setZIndex(15);

// 切换地图类型
$('.changeMap').click(function() {
    if ($(this).hasClass('vec')) {
        map.removeLayer(tiandituLayer);
        map.addLayer(tdtSatelliteLayer);
        tdtSatelliteLayer.setZIndex(0);
        // areaLineLayer.setZIndex(2);
        tdtTextLayer.setZIndex(3)
        $(this).removeClass('vec');

    } else {
        $(this).addClass('vec')
        map.removeLayer(tdtSatelliteLayer);
        map.addLayer(tiandituLayer);
        tiandituLayer.setZIndex(0);
        // areaLineLayer.setZIndex(2);
        tdtTextLayer.setZIndex(3)
    }
})

var toolbox1 = 597-80,
    toolbox2 = 332-80,
    zzboxright = 564-80;
$('.js-scrollsmall').click(function() {
    if ($(this).hasClass('on')) {
        $('.zz-box').animate({
            width: 0
        }, function() {
            $('.zz-box').hide();
            $('.js-scrollsmall').removeClass('on')

        })
    } else {
        $('.zz-box').show()
        if ($('.mapsearch-box ').width() > 50) {
            $('.zz-box').animate({
                width: $(window).width() - toolbox1
            }, function() {
                $('.js-scrollsmall').addClass('on')
            })
        } else {
            $('.zz-box').animate({
                width: $(window).width() - toolbox2
            }, function() {
                $('.js-scrollsmall').addClass('on')
            })

        }

    }

})

$('.search-all').click(function() {
    var self = $(this);
    if ($(this).hasClass('on')) {
        $('.mapsearch-box').animate({
            width: 32
        }, function() {
            self.removeClass('on')
            $('.mapsearch-box').hide();
            $('.keywords-all').val('')
        })
        $('.notice-box').animate({
            right: 206
        })
        $('.zz-box').animate({
            right: 221,
            width: $(window).width() - toolbox2
        })
    } else {
        $('.mapsearch-box').show()

        $('.mapsearch-box').animate({
            width: 300
        }, function() {
            self.addClass('on')
        })

        $('.notice-box').animate({
            right: 473
        })
        $('.zz-box').animate({
            right: zzboxright,
            width: $(window).width() - toolbox1
        })

    }
})

$('.zz-box').width($(window).width() - toolbox2)

$(window).resize(function() {
    if ($('.mapsearch-box ').width() > 50) {
        $('.zz-box').width($(window).width() - toolbox1)
    } else {
        $('.zz-box').width($(window).width() - toolbox2)
    }
})



$('.js-getchoose').click(function() {
    if ($(this).hasClass('on')) {
        $('.choosetypeicon2').hide()
        $('.choosetypeicon1').show()
        $('.chosetype').hide();
    } else {
        $('.choosetypeicon2').show()
        $('.choosetypeicon1').hide()
        $('.chosetype').show();
    }
    $('.js-getchoose').toggleClass('on')
})


$('.chosetype li').click(function() {
    var textkey = $(this).text();
    $('.current-type').text(textkey);
    $('.chosetype').hide();
    $('.choosetypeicon2').hide()
    $('.choosetypeicon1').show();
    $('.js-getchoose').removeClass('on')
})


$('.right-button').on('click', function() {
    $('.data-box').slideToggle('fast');
    $('.data-box').toggleClass('nav-show');
    $(this).toggleClass('icon-down');
    $('.jsseemessage').removeClass('active');
    $('.check-list').hide()
});

$('.jsseemessage').click(function() {
    $('.check-list1').show();
    $('.data-box').hide()
    $('.button-slider').addClass('icon-down')
    if ($(this).hasClass('active')) {
        $('.check-list').hide();
    }
    $(this).toggleClass('active')

})


$('.message-list').on('click', 'li', function() {
    $('.detail-box').show();
    $('.check-list1').hide();
})


$('.goback1').click(function() {
    $('.detail-box').hide();
    $('.check-list1').show();
})

$('.goback,.sendmessage').click(function() {
    $('.edit-box').hide();
    $('.check-list1').show();
})
$('.addmessage').click(function() {
    $('.edit-box').show();
    $('.check-list1').hide();
})

$('.defaultmes').click(function() {
    $('.message-content').val('好好学习天天向上')

})
// 添加通知公告内容
$('.addnotice').click(function() {
    $('.noticeadd-box').fadeIn()
    $('.noticeadd-box input').val('')
    $('.noticeadd-box textarea').val('')

})


$('.notice-close, .cancel').click(function() {
    $('.noticeadd-box').fadeOut()
})


function getMousePos(event) {
    ev = event || window.event;  
    if(ev.pageX <=10) {
        if(!$('.onlineinfo-box').is(':animated')) {
            $('.onlineinfo-box').animate({
                left:0
            },function(){
                $('.toggle-left').addClass('active')
            })
        }
       
    }

    if(ev.pageX >=$(window).width()-10) {
        if(!$('.mission-box').is(':animated')) {

            $('.mission-box ').animate({
                right:0
            },function(){
                $('.toggle-right').addClass('active')
            })
        }
    }
    }

document.onmousemove = function (e) {
    getMousePos(e)
}
*/