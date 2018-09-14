/*
Template Name: Greeva - Responsive Bootstrap 4 Admin Dashboard
Author: CoderThemes
File: Dashboard
*/

! function ($) {
    "use strict";

    var Dashboard = function () {
        this.$body = $("body"),
        this.charts = []
    };

    Dashboard.prototype.respChart = function(selector,type,data, options) {
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


    //init charts
    Dashboard.prototype.initCharts = function () {
        //chart
        var charts = [];
        // create gradient
        var ctx = document.getElementById('sales-chart').getContext("2d");
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#0acf97");
        gradientStroke.addColorStop(1, "#02a8b5");
        
        //creating lineChart
        var lineChart = {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            datasets: [ {
                label: "Sales",
                fill: true,
                backgroundColor: "rgba(2, 168, 181, 0.1)",
                borderColor: gradientStroke,
                pointBorderColor: gradientStroke,
                pointBackgroundColor: gradientStroke,
                pointHoverBackgroundColor: gradientStroke,
                pointHoverBorderColor: gradientStroke,
                data: [18, 41, 86, 49, 20, 65, 64, 86, 49, 30, 45, 25]
            }]
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

        charts.push(this.respChart($("#sales-chart"), 'Line', lineChart, lineOpts));

        //barchart
        var barChart = {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
            datasets: [
                {
                    label: "Sales Analytics",
                    backgroundColor: "#fa5c7c",
                    borderColor: "#fa5c7c",
                    borderWidth: 1,
                    hoverBackgroundColor: "#fa5c7c",
                    hoverBorderColor: "#fa5c7c",
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
                        color: "rgba(0,0,0,0.03)"
                    }
                }]
            }
        };

        charts.push(this.respChart($("#high-performing-product"), 'Bar', barChart, barOpts));


        //creating line for FUNNEL
        var ctx1 = document.getElementById('conversion-chart').getContext("2d");
        var gradientStroke1 = ctx1.createLinearGradient(0, 300, 0, 100);
        gradientStroke1.addColorStop(0, "#02a8b5");
        gradientStroke1.addColorStop(1, "#0acf97");

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
                        zeroLineColor: "transparent",
                        color: "rgba(0,0,0,0.03)"
                    },
                    ticks: {
                        padding: -28,
                        fontColor: "#dee2e6",
                        fontStyle: "bold"
                    }
                }]
            }
        };

        charts.push(this.respChart($("#conversion-chart"), 'Line', funnelChart, funnelChartOpts));


        //creating lineChart
        var lineChart = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
            datasets: [
                {
                    label: "Sales Analytics",
                    fill: true,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderColor: "#fff",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0,
                    pointBorderColor: "#fff",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 1,
                    pointRadius: 1,
                    pointHitRadius: 5,
                    data: [65, 59, 80, 81, 56, 55, 40, 35, 30]
                }
            ]
        };

        var lineOpts1 = {
            maintainAspectRatio: false,
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
                        maxTicksLimit: 10,
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
                        padding: -20,
                        fontColor: "rgba(0,0,0,0.5)",
                        fontStyle: "bold"
                    }
                }]
            }
        };

        charts.push(this.respChart($("#lineChart"),'Line',lineChart, lineOpts1));


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

        //creating lineChart
        var DataUsesChart = {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
            datasets: [
                {
                    label: "Downloads",
                    fill: true,
                    backgroundColor: "rgba(57, 175, 209, 0.2)",
                    borderColor: "#39afd1",
                    borderWidth: 2,
                    lineTension: 0,
                    pointBorderWidth: 2,
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#39afd1",
                    pointRadius: 3,
                    pointHitRadius: 3,
                    data: [65, 59, 80, 81, 56, 55, 40, 35, 30]
                },
                {
                    label: "Uploads",
                    fill: true,
                    backgroundColor: "rgba(254, 104, 105, 0.2)",
                    borderColor: "#fe6869",
                    borderWidth: 2,
                    lineTension: 0,
                    pointBorderWidth: 2,
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#fe6869",
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

        charts.push(this.respChart($("#datauses-area-1"),'Line',DataUsesChart, lineOpts2));

        return charts;

    },
    //initializing various components and plugins
    Dashboard.prototype.init = function () {

        $('#usa').vectorMap({
			map: 'usa_en',
			enableZoom: true,
			showTooltip: true,
			selectedColor: null,
			hoverColor: null,
			backgroundColor: '#3f4759',
			color: '#5c677f',
			borderColor: '#000',
			colors: {
				mo: '#02c0ce',
				fl: '#02c0ce',
				or: '#02c0ce'
			},
			onRegionClick: function (event, code, region) {
				event.preventDefault();
			}
        });
        
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
    $.Dashboard = new Dashboard, $.Dashboard.Constructor = Dashboard
}(window.jQuery),

    //initializing Dashboard
    function ($) {
        "use strict";
        $.Dashboard.init()
    }(window.jQuery);