//var echarts = require('echarts');

// 引入 ECharts 主模块
// var echarts = require('echarts/lib/echarts');
// // 引入柱状图
// require('echarts/lib/chart/bar');
// // 引入提示框和标题组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
var charBoxIdList = ["main","main2","main3","main4","main9"];
var cahrtMap = new Map();
for (var i = charBoxIdList.length - 1; i >= 0; i--) {
    var chart =echarts.init(document.getElementById(charBoxIdList[i]) , 'light');
    cahrtMap.set(charBoxIdList[i], chart);
}
// 基于准备好的dom，初始化echarts实例
var myChart = cahrtMap.get("main");
//myChart.on('legendselectchanged', eConsole);
option1 = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        //selectedMode:false,
        data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        //type: 'value'
        type: 'category',
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        
    },
    toolbox:{
            show:true,
            orient: 'horizontal',
            showTitle: true,
            feature:{
                magicType: {
                    type: ['line', 'bar']
                },
                dataView:{
                    show: true,
                    title: '统计数据',
                    readOnly:true,
                    lang:['数据视图','关闭','刷新','测试'],
                    //lang:[['关闭']],
                    optionToContent: function(opt) {
                        var colName = "序号";
                        var typeName = "月份";
                        var dataview = opt.toolbox[0].feature.dataView;  //获取dataview
                        var table = '<div style="position:absolute;top: 5px;left: 0px;right: 0px;line-height: 1.4em;text-align:center;font-size:14px;">'+dataview.title+'</div>'
                        table += getTable(opt,colName,typeName);
                        return table;
                    }
                },
                saveAsImage:{
                    type:'png',
                    show:true,
                    title:'保存为图片',
                },
                restore:{show:true}
            }
    },
    series: [
        {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
};
// 绘制图表
myChart.setOption(option1);


var myChart2 = cahrtMap.get("main2");
myChart2.showLoading();
myChart2.on('click', eConsole2);
$.get('assets/geojson/area/中国(省级)/福建省.json', function (geoJson) {
    myChart2.hideLoading();
    echarts.registerMap('FJ', geoJson);
    myChart2.setOption(option = {
        title: {
            text: '福建省人口密度 2015）',
            subtext: '人口密度数据来自福建省统计局',
            sublink: 'http://www.fujian.gov.cn/zc/tjxx/tjgb/201605/t20160510_1134355.htm'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (万人 / 平方千里)'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
            }
        },
        visualMap: {
            min: 200,
            max: 1000,
            text:['High','Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue','yellow', 'orangered']
            }
        },
        series: [
            {
                name: '福建省人口密度 ',
                type: 'map',
                mapType: 'FJ', // 自定义扩展图表类型
                itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data:[
                    {name: '福州市', value: 749},
                    {name: '厦门市', value: 385},
                    {name: '莆田市', value: 287},
                    {name: '三明市', value: 253},
                    {name: '泉州市', value: 850},
                    {name: '漳州市', value: 499},
                    {name: '南平市', value: 264},
                    {name: '龙岩市', value: 260},
                    {name: '宁德市', value: 287}
                ]
            }
        ]

    });
});

//
option = {
    title: {
        //text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            //saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
cahrtMap.get("main3").setOption(option);
//pie
option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
};
cahrtMap.get("main4").setOption(option);

//
var myChart9 = cahrtMap.get("main9")
// 绘制图表
myChart9.setOption({
    title: {
        text: 'ECharts打印区域外'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [15, 120, 36, 10, 210, 20]
    }]
});

//########################################################################################//
//                                                                                        //
//########################################################################################//

var triggerAction = function(action, selected) {
        legend = [];
        for ( name in selected) {
            if (selected.hasOwnProperty(name)) {
                legend.push({name: name});
            }
        }
        myChart.dispatchAction({
            type: action,
            batch: legend
        });
    };

var isFirstUnSelect = function(selected) {

    var unSelectedCount = 0;
    for ( name in selected) {
        if (!selected.hasOwnProperty(name)) {
            continue;
        }

        if (selected[name] == false) {
            ++unSelectedCount;
        }
    }
    return unSelectedCount==1;
};

var isAllUnSelected = function(selected) {
    var selectedCount = 0;
    for ( name in selected) {
        if (!selected.hasOwnProperty(name)) {
            continue;
        }
        // 所有 selected Object 里面 true 代表 selected， false 代表 unselected
        if (selected[name] == true) {
            ++selectedCount;
        }
    }
    return selectedCount==0;
};

function eConsole(param){
    var selected = param.selected;
    var legend = param.name;
    // 使用 legendToggleSelect Action 会重新触发 legendselectchanged Event，导致本函数重复运行
    // 使得 无 selected 对象
    if (selected != undefined) {
        if (isFirstUnSelect(selected)) {
            triggerAction('legendToggleSelect', selected);
        } else if (isAllUnSelected(selected)) {
            triggerAction('legendSelect', selected);

        }
    }
}

function eConsole2(param) {
    if (typeof param.seriesIndex == 'undefined') {
        return;
    }
    if (param.type == 'click') {
        //alert(param.data+1);
        console.log(param.data)
        if(param.data && param.data.name=='福州市')
        {
            //console.log(param)
            $.get('assets/geojson/area/中国/福建省/福州市.json', function (geoJson) {
                myChart2.hideLoading();
                echarts.registerMap('FJ-FZ', geoJson);
                console.log(geoJson.features)
                myChart2.setOption(option = {
                    title: {
                        text: '福建省人口密度 2015）',
                        subtext: '人口密度数据来自福建省统计局',
                        sublink: 'http://www.fujian.gov.cn/zc/tjxx/tjgb/201605/t20160510_1134355.htm'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{c} (万人 / 平方千里)'
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                        }
                    },
                    visualMap: {
                        min: 200,
                        max: 1000,
                        text:['High','Low'],
                        realtime: false,
                        calculable: true,
                        inRange: {
                            color: ['lightskyblue','yellow', 'orangered']
                        }
                    },
                    series: [
                        {
                            name: '福建省人口密度 ',
                            type: 'map',
                            mapType: 'FJ-FZ', // 自定义扩展图表类型
                            itemStyle:{
                                normal:{label:{show:true}},
                                emphasis:{label:{show:true}}
                            },
                            data:[
                                {name: '福州市', value: 749},
                                {name: '厦门市', value: 385},
                                {name: '莆田市', value: 287},
                                {name: '三明市', value: 253},
                                {name: '泉州市', value: 850},
                                {name: '漳州市', value: 499},
                                {name: '南平市', value: 264},
                                {name: '龙岩市', value: 260},
                                {name: '宁德市', value: 287}
                            ]
                        }
                    ]

                });
            });//
        }
    }
}

//##############################################打印#############################################//
  function getTable(opt,colName,typeName){
        var axisData = opt.xAxis[0].data;//获取图形的data数组
        var series = opt.series;//获取series
        console.log(series,axisData)
        var num = 0;//记录序号
        var sum = new Array();//获取合计数组（根据对应的系数生成相应数量的sum）
        for(var i=0; i< series.length; i++){
            sum[i] = 0;
        }
        var table = '<table class="bordered"><thead><tr>'
            + '<th>'+colName+'</th>'
            + '<th>'+typeName+'</th>';
        for(var i=0; i<series.length;i++){
            table += '<th>'+series[i].name+'</th>'
        }
        table += '</tr></thead><tbody>';
        for (var i = 0, l = axisData.length; i < l; i++) {
            num += 1;
            for(var n=0;n<series.length;n++){
                if(series[n].data[i]){
                    sum[n] += Number(series[n].data[i]);
                }else{
                    sum[n] += Number(0);
                }
 
            }
            table += '<tr>'
                + '<td>' + num + '</td>'
                + '<td>' + axisData[i] + '</td>';
            for(var j=0; j<series.length;j++){
                if(series[j].data[i]){
                    table += '<td>' + series[j].data[i] + '</td>';
                }else{
                    table += '<td>' + 0 + '</td>';
                }
 
            }
            table += '</tr>';
        }
        //最后一行加上合计
        table += '<tr>'+ '<td>' + (num+1) + '</td>' + '<td>合计</td>';
        for(var n=0;n<series.length;n++){
            if(String(sum[n]).indexOf(".")>-1)
                table += '<td>' + (Number(sum[n])).toFixed(2)  + '</td>';
            else
                table += '<td>' + Number(sum[n])  + '</td>';
        }
        table += '</tr></tbody></table>';
        return table;
    }



function change_map(){

}


function print_page_pre() {
    console.log("print_page_pre");
    if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
         remove_ie_header_and_footer();
    }
    //window.print();
}



function remove_ie_header_and_footer() {
    var hkey_path;
    hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
    try {
        var RegWsh = new ActiveXObject("WScript.Shell");
        RegWsh.RegWrite(hkey_path + "header", "");
        RegWsh.RegWrite(hkey_path + "footer", "");
    } catch (e) {
    }
}



function btnPrintClick(type)
{
        

        for (var i = charBoxIdList.length - 1; i >= 0; i--) 
        {
            var node = document.getElementById(charBoxIdList[i]);
            if(node != null)
            {
                var chartBox = $(node);
                //console.log(chartBox,node);
                var imgBoxname = charBoxIdList[i]+"_imgbox";
                var imgBox = $("#"+imgBoxname);
                if (imgBox.length <= 0) {
                    chartBox.after('<div id="'+imgBoxname+'"></div>');
                    imgBox = $("#"+imgBoxname);
                }
                imgBox.html('<img src="' + cahrtMap.get(charBoxIdList[i]).getDataURL() + '"/>').css('display','block');
                chartBox.css('display','none');
                var img = imgBox.find('img');
                var imgWidth = img.width();
                var showWidth = 1000; // 显示宽度，即图片缩小到的宽度
                if (imgWidth > showWidth) { // 只有当图片大了才缩小
                    var imgNewHeight = img.height() / (imgWidth / showWidth);
                    img.css({'width': showWidth + 'px', 'height': imgNewHeight + 'px'});
                }
            }
        }
        // 打印
       // print_page_pre()
        if(type==1)
        {
            console.log("btnPrintClick1");
           $("#container").jqprint();
         }else if(type==2){
             console.log("btnPrintClick2");
            // $("#container").print({
            //     globalStyles: true,
            //     mediaPrint: false,
            //     stylesheet: null,
            //     noPrintSelector: ".no-print",
            //     iframe: true,
            //     append: null,
            //     prepend: null,
            //     manuallyCopyFormValues: true,
            //     deferred: $.Deferred(),
            //     timeout: 750,
            //     title: null,
            //     doctype: '<!doctype html>'
            // });
             $("#container").print({
                globalStyles : true,
                mediaPrint : false,
                iframe : false,
                noPrintSelector : ".avoid-this",
            });
         }else{
            // $("#container").printThis({
            //       debug: false,                   // show the iframe for debugging
            //       importCSS: true,                // import parent page css
            //       importStyle: false,             // import style tags
            //       printContainer: true,           // grab outer container as well as the contents of the selector
            //       loadCSS: "path/to/my.css",      // path to additional css file - use an array [] for multiple
            //       pageTitle: "",                  // add title to print page
            //       removeInline: false,            // remove all inline styles from print elements
            //       removeInlineSelector: "body *", // custom selectors to filter inline styles.  must be true
            //       printDelay: 333,                // variable print delay
            //       header: null,                   // prefix to html
            //       footer: null,                   // postfix to html
            //       base: false,                    // preserve the BASE tag, or accept a string for the URL
            //       formValues: true,               // preserve input/form values
            //       canvas: false,                  // copy canvas elements
            //       doctypeString: '...',           // enter a different doctype for older markup
            //       removeScripts: false,           // remove script tags from print content
            //      copyTagClasses: false           // copy classes from the html & body tag
            //       beforePrintEvent: null,         // callback function for printEvent in iframe
            //       beforePrint: null,              // function called before iframe is filled
            //       afterPrint: null                // function called before iframe is removed
            //   });
            $('#container').printThis({
                canvas: true,   
                importCSS: false,
                header: "<h1>自定义页眉</h1>",
                footer: "<h2>自定义页脚</h2>"
            });
         }
       
        

        for (var i = charBoxIdList.length - 1; i >= 0; i--) {
            var node = document.getElementById(charBoxIdList[i]);
            if(node!=null){
                var chartBox = $(node);
                var imgBoxname = charBoxIdList[i]+"_imgbox";
                var imgBox = $("#"+imgBoxname);
                chartBox.css('display','block');
                imgBox.css('display','none');
            }
            
        }
}

$("#printBtn1").on("click",function(){
    btnPrintClick(1);
});
$("#printBtn2").on("click",function(){
    btnPrintClick(2);
});
$("#printBtn3").on("click",function(){
    btnPrintClick(3);
});
//########################################################################################//
//                                                                                        //
//########################################################################################//
