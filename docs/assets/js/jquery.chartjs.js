/*
Template Name: Greeva - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
File: Chartjs 
*/

! function ($) {
    "use strict";

    var ChartJs = function () {
        this.$body = $("body"),
        this.charts = []
    };

    ChartJs.prototype.respChart = function(selector,type,data, options) {
        var draw = Chart.controllers.line.prototype.draw;
        Chart.controllers.line.prototype.draw = function () {
            draw.apply(this, arguments);
            var ctx = this.chart.chart.ctx;
            var _stroke = ctx.stroke;
            ctx.stroke = function () {
                ctx.save();
                ctx.shadowColor = '#65708a';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 4;
                _stroke.apply(this, arguments);
                ctx.restore();
            }
        };
        //default config
        Chart.defaults.global.defaultFontColor = "rgba(255,255,255,0.5)";
        // get selector by context
        var ctx = selector.get(0).getContext("2d");
        // pointing parent container to make chart js inherit its width
        var container = $(selector).parent();

        // this function produce the responsive Chart JS
        function generateChart(){
            // make chart width fit with its container
            var ww = selector.attr('width', $(container).width() );
            var chartObj;
            switch(type){
                case 'Line':
                chartObj = new Chart(ctx, {type: 'line', data: data, options: options});
                    break;
                case 'Doughnut':
                    chartObj = new Chart(ctx, {type: 'doughnut', data: data, options: options});
                    break;
                case 'Pie':
                    chartObj = new Chart(ctx, {type: 'pie', data: data, options: options});
                    break;
                case 'Bar':
                    chartObj = new Chart(ctx, {type: 'bar', data: data, options: options});
                    break;
                case 'Radar':
                    chartObj = new Chart(ctx, {type: 'radar', data: data, options: options});
                    break;
                case 'PolarArea':
                    chartObj = new Chart(ctx, {data: data, type: 'polarArea', options: options});
                    break;
            }
            return chartObj;
        };
        // run function - render chart at first load
        return generateChart();
    },


    //initializing various components and plugins
    ChartJs.prototype.initCharts = function () {
        var charts = [];

        // create gradient
        var ctx = document.getElementById('line-chart-example').getContext("2d");
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#8360c3");
        gradientStroke.addColorStop(1, "#2ebf91");
        var gradientStrokealt = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStrokealt.addColorStop(0, "#22c1c3");
        gradientStrokealt.addColorStop(1, "#fdbb2d");
        
        //creating lineChart
        var lineChart = {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            datasets: [ {
                label: "Sales",
                fill: false,
                borderColor: gradientStroke,
                pointBorderColor: gradientStroke,
                pointBackgroundColor: gradientStroke,
                pointHoverBackgroundColor: gradientStroke,
                pointHoverBorderColor: gradientStroke,
                data: [18, 41, 86, 49, 20, 65, 64, 86, 49, 30, 45, 25]
            },
            {
                label: "Sales",
                fill: false,
                borderDash: [5, 5],
                borderColor: gradientStrokealt,
                pointBorderColor: gradientStrokealt,
                pointBackgroundColor: gradientStrokealt,
                pointHoverBackgroundColor: gradientStrokealt,
                pointHoverBorderColor: gradientStrokealt,
                data: [36, 25, 61, 52, 45, 20, 48, 71, 26, 64, 29, 56]
            }
        ]
        };

        var lineOpts = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false
            },
            animation: {
                easing: "easeInOutBack"
            },
            scales: {
                yAxes: [{
                    display: false,
                    ticks: {
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold",
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        padding: 0
                    },
                    gridLines: {
                        drawTicks: false,
                        display: false
                    }
                }],
                xAxes: [{
                    display: false,
                    gridLines: {
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        padding: 0,
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold"
                    }
                }]
            }
        };

        charts.push(this.respChart($("#line-chart-example"), 'Line', lineChart, lineOpts));

        //barchart
        var barChart = {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            datasets: [
                {
                    label: "Sales Analytics",
                    backgroundColor: "#0082c8",
                    borderColor: "#0082c8",
                    borderWidth: 1,
                    hoverBackgroundColor: "#0082c8",
                    hoverBorderColor: "#0082c8",
                    data: [65, 59, 80, 81, 56, 89, 40, 32,65, 59, 80, 81, 56, 89, 40, 32,65, 59, 80, 81, 56, 89, 40, 32,65, 59, 80, 81, 56, 89, 40]
                }
            ]
        };
        var barOpts = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        max: 100,
                        min: 20,
                        stepSize: 20
                    }
                }],
                xAxes: [{
                    barPercentage: 0.2,
                    gridLines: {
                        color: "rgba(0,0,0,0.05)"
                    }
                }]
            }
        };

        charts.push(this.respChart($("#bar-chart-example"), 'Bar', barChart, barOpts));


        //creating area chart
        var ctx1 = document.getElementById('area-chart-example').getContext("2d");
        var gradientStroke1 = ctx1.createLinearGradient(0, 300, 0, 100);
        gradientStroke1.addColorStop(0, "#FF416C");
        gradientStroke1.addColorStop(1, "#FF4B2B");

        var funnelChart = {
            labels: ["", "", "", "", "", "", "", ""],
            datasets: [ {
                label: "Conversion Funnels",
                fill: true,
                backgroundColor: gradientStroke1,
                borderColor: gradientStroke1,
                pointBorderColor: gradientStroke1,
                pointBackgroundColor: gradientStroke1,
                pointHoverBackgroundColor: "transparent",
                pointHoverBorderColor: "transparent",
                data: [28, 34, 46, 76, 60, 62,26, 14]
            }]
        };

        var funnelChartOpts = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            animation: {
                easing: "easeInOutBack"
            },
            elements: {
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 5
                }
            },
            tooltips: {
                enabled: false
            },
            scales: {
                yAxes: [{
                    display: false,
                    ticks: {
                        suggestedMin: 0
                    }
                }],
                xAxes: [{
                    scaleShowLabels : false,
                    gridLines: {
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        padding: -28,
                        fontColor: "#dee2e6",
                        fontStyle: "bold"
                    }
                }]
            }
        };

        charts.push(this.respChart($("#area-chart-example"), 'Line', funnelChart, funnelChartOpts));


        //donut chart
        var donutChart = {
            labels: [
                "Wallet Balance",
                "Travels",
                "Food & Drinks"
            ],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#02a8b5",
                        "#fa5c7c",
                        "#ebeff2"
                    ],
                    borderColor: "transparent",
                    borderWidth: "3",
                }]
        };
        var donutOpts = {
            maintainAspectRatio: false,
            cutoutPercentage: 80,
            legend: {
                display: false
            }
        };
        charts.push(this.respChart($("#doughnut"),'Doughnut',donutChart, donutOpts));

        //radar chart
        var radarChart = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "Desktops",
                    backgroundColor: "rgba(89, 193, 115,0.2)",
                    borderColor: "#59C173",
                    pointBackgroundColor: "#59C173",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#59C173",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "Tablets",
                    backgroundColor: "rgba(161, 127, 224,0.2)",
                    borderColor: "#a17fe0",
                    pointBackgroundColor: "#a17fe0",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#a17fe0",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };
        var polarRadarOpts = {
            scale: {
                ticks: {
                    fontColor: 'white', // labels such as 10, 20, etc
                    backdropColor: '#253138'
                },
                pointLabels: {
                    fontColor: '#98a6ad' // labels around the edge like 'Running'
                },
                gridLines: {
                    color: '#596275'
                },
                angleLines: {
                    color: '#596275' // lines radiating from the center
                }
            }
            
        };
        charts.push(this.respChart($("#radar-chart-example"),'Radar',radarChart,polarRadarOpts));

        //creating lineChart
        var DataUsesChart = {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
            datasets: [
                {
                    label: "Downloads",
                    fill: true,
                    backgroundColor: "rgba(101, 78, 163, 0.2)",
                    borderColor: "#654ea3",
                    borderWidth: 2,
                    lineTension: 0,
                    pointBorderWidth: 2,
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#654ea3",
                    pointRadius: 3,
                    pointHitRadius: 3,
                    data: [65, 59, 80, 81, 56, 55, 40, 35, 30]
                },
                {
                    label: "Uploads",
                    fill: true,
                    backgroundColor: "rgba(0, 131, 176, 0.2)",
                    borderColor: "#0083B0",
                    borderWidth: 2,
                    lineTension: 0,
                    pointBorderWidth: 2,
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#0083B0",
                    pointRadius: 3,
                    pointHitRadius: 3,
                    data: [22, 28, 42, 38, 12, 22, 18, 9, 3]
                }
            ]
        };

        var lineOpts2 = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            animation: {
                easing: "easeInOutBack"
            },
            plugins: {
				filler: {
					propagate: false
				}
			},
            scales: {
                yAxes: [{
                    display: false,
                    ticks: {
                        fontStyle: "bold",
                        beginAtZero: true,
                        padding: 0
                    },
                    gridLines: {
                        drawTicks: false,
                        display: false
                    }
                }],
                xAxes: [{
                    display: true,
                    gridLines: {
                        zeroLineColor: "transparent"
                    },
                    ticks: {
                        padding: 5,
                        fontStyle: "bold"
                    }
                }]
            }
        };

        charts.push(this.respChart($("#filled-line-chart"),'Line',DataUsesChart, lineOpts2));
        return charts;
    },

    ChartJs.prototype.init = function() {
        // make chart responsive
        var $this = this;
        // init charts
        $this.charts = this.initCharts();
        $(window).on('resize', function (e) {
            $.each($this.charts, function (index, chart) {
                try {
                    chart.destroy();
                }
                catch (err) {
                    console.log(err);
                }
            });
            $this.charts = $this.initCharts();
        });
    },

    //init flotchart
    $.ChartJs = new ChartJs, $.ChartJs.Constructor = ChartJs
}(window.jQuery),

    //initializing ChartJs
    function ($) {
        "use strict";
        $.ChartJs.init()
    }(window.jQuery);