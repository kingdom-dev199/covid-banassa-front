import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { DatePipe, WeekDay } from '@angular/common';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps  from "@amcharts/amcharts4/maps";
import * as  am4charts from "@amcharts/amcharts4/charts";

import am4geodata_moroccoLow from "@amcharts/amcharts4-geodata/moroccoLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { Chart } from 'chart.js';
import { BanassiService }from 'src/services/banassi.service';


@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit, AfterViewInit {

   totalCases:number;
   totalRecovred:number;
   totalDeaths:number;
   totalActiveCases:number;
   totalNewCasesToday:number;
   totalNewDeathsToday:number;
   totalNewRecovery:number;
   totalExclusCases:number;
   dataset=[];
   dailycases=[];
   dates=[];
  chart = []; // This will hold our chart info
  chartAsc = [];
  chartPie = [];
  chartCases = [];
  chartRec = [];
  chartDeath = [];
  
  mapName: string;
  seriesData: any;
  markersData: any;
  mapOptions: any;
  lastUpdate: any;
  defaultColors: any = {
    markerColor: '#23b7e5',      // the marker points
    bgColor: 'transparent',      // the background
    scaleColors: ['#878c9a'],    // the color of the region in the serie
    regionFill: '#bbbec6'       // the base region color
  };
  barChartRace=[];
   day = new Date("03/03/2020");

  private chartMap: am4maps.MapChart;

  constructor(public banassiService:BanassiService,private datePipe: DatePipe,private zone: NgZone) {
   
  }

  ngAfterViewInit(){
 
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chartMap) {
        this.chartMap.dispose();
      }
    });
  }
  ngOnInit(){
  //  this.getDailycases();
   this.getTotaleCases();
   this.getTotaleCasesByHerokuApi();
    // this.getTotalDailyCases();
    // this.getBanassaCovidStats();
  this.getTotalDailyByRigin();
    }
    private getTotaleCasesByHerokuApi() {
      this.banassiService.getDatabyHerokup()
        .subscribe((data:any)  => {
          //الحالات المؤكدة
          console.log(data)
  
         
          this.totalCases = data.data[data.data.length - 1].confirmed;
          this.lastUpdate = new Date(data.data[data.data.length - 1].pub_date).toLocaleDateString('ar-Ma',{weekday: 'short', day: 'numeric', month: 'short',hour:'numeric',minute:'numeric'});
  
          
          //المتعافون
          this.totalRecovred = data.data[data.data.length-1].recovered;
          // //الوفيات
           this.totalDeaths = data.data[data.data.length-1].deaths;
           
  
  
          //حالات تتلقى العلاج
          this.totalActiveCases = this.totalCases-this.totalDeaths-this.totalRecovred;
  
          this.totalExclusCases=data.data[data.data.length-1].excluded;
         
          this.totalNewCasesToday = (data.data[data.data.length - 1].confirmed)-data.data[data.data.length - 2].confirmed;
          this.totalNewDeathsToday = (data.data[data.data.length - 1].deaths)-data.data[data.data.length - 2].deaths;
          this.totalNewRecovery = (data.data[data.data.length - 1].recovered)-data.data[data.data.length - 2].recovered;
       

        });  
      }  
  private getTotaleCases() {
    this.banassiService.getInfoCovid()
      .subscribe((data:any)  => {
        //الحالات المؤكدة
        console.log(data)

        // let cuerrentObject=data.features.find((item: any) => new Date(item.attributes.Date).getDate() == new Date().getDate())
        // if(cuerrentObject.length>1)
        // {
        //   if (cuerrentObject[cuerrentObject.length - 1].attributes.Cas_confirmés != null)
        //   this.totalCases = cuerrentObject[cuerrentObject.length - 1].attributes.Cas_confirmés;
        //   else
        //   this.totalCases = cuerrentObject[cuerrentObject.length - 2].attributes.Cas_confirmés;
        // } else if (cuerrentObject.length ==1 )
        // {
        //   this.totalCases = cuerrentObject[cuerrentObject.length - 1].attributes.Cas_confirmés;

        // }
        // //المتعافون
        // this.totalRecovred = data.features[data.features.length-2].attributes.Retablis;
        // // //الوفيات
        //  this.totalDeaths = data.features[data.features.length-2].attributes.Décédés;


        // //حالات تتلقى العلاج
        // this.totalActiveCases = this.totalCases-this.totalDeaths-this.totalRecovred;

        // this.totalExclusCases=data.features[data.features.length-2].attributes.Negative_tests;
       
        // this.totalNewCasesToday = data.features[data.features.length - 2].attributes.Cas_Jour;
        // this.totalNewDeathsToday = data.features[data.features.length - 2].attributes.Deces_jour;
        // this.totalNewRecovery = data.features[data.features.length - 2].attributes.Rtabalis_jour;
        this.initRace(data);

        this.chartAsc = new Chart('canvas2', {
          type: 'line',
          data: {
            labels: data.features.map((item:any)=>this.datePipe.transform(new Date(item.attributes.Date),"MM-dd")).splice(data.features.length-58,data.features.length-1),
            datasets: [
              {
                label:'الحالات المؤكدة',
                data: data.features.map((item:any)=>item.attributes.Cas_confirmés).splice(data.features.length-58,data.features.length-1),
                borderColor: "#3cba9f",
                fill: false
              },

              {
                label:'المتعافون',
                data: data.features.map((item:any)=>item.attributes.Retablis).splice(data.features.length-58,data.features.length-1),
                borderColor: "#3AB43A",
                fill: false
              },

              {
                label:'الوفيات',
                data: data.features.map((item:any)=>item.attributes.Décédés).splice(data.features.length-58,data.features.length-1),
                borderColor: "#b22222",
                fill: false
              },
              
        
              
            ]
             
          },
          options: {
            maintainAspectRatio: false,
            legend: {
              display: true,
              rtl:'right'
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: data.features.map((item:any)=>this.datePipe.transform(new Date(item.attributes.Date),"MM-dd")).splice(data.features.length-8,data.features.length-1),
            datasets: [
              {
                label:'الحالات المؤكدة',
                data: data.features.map((item:any)=>item.attributes.Cas_Jour).splice(data.features.length-8,data.features.length-1),
                backgroundColor: "#3cba9f",
                fill: false
              },

              {
                label:'المتعافون',
                data: data.features.map((item:any)=>item.attributes.Rtabalis_jour).splice(data.features.length-8,data.features.length-1),
                backgroundColor: "#3AB43A",
                fill: false
              },

              {
                label:'الوفيات',
                data: data.features.map((item:any)=>item.attributes.Deces_jour).splice(data.features.length-8,data.features.length-1),
                backgroundColor: "#b22222",
                fill: false
              },
              
        
              
            ]
             
          },
          options: {
          
            maintainAspectRatio: false,
            legend: {
              display: true,
              rtl:'right'
            },
            scales: {
              xAxes: [{
                gridLines: {
                  drawOnChartArea: false
                },
                display: true
              }],
              yAxes: [{
                gridLines: {
                  drawOnChartArea: false
                },
                display: true
              }],
            }
          }
        });
        this.chartCases = new Chart('canvas6', {
          type: 'line',
          data: {
            labels: data.features.map((item:any)=>this.datePipe.transform(new Date(item.attributes.Date),"MM-dd")).splice(data.features.length-8,data.features.length-1),
            datasets: [
              {
                label:'الحالات المؤكدة',
                data: data.features.map((item:any)=>item.attributes.Cas_Jour).splice(data.features.length-8,data.features.length-1),
                backgroundColor: "#3cba9f",
                fill: true
              } 
            ]
             
          },
          options: {
          
            maintainAspectRatio: false,
            legend: {
              display: true,
              rtl:'right'
            },
            scales: {
              xAxes: [{
                gridLines: {
                  drawOnChartArea: false
                },
                display: true
              }],
              yAxes: [{
                gridLines: {
                  drawOnChartArea: false
                },
                display: true
              }],
            }
          }
        });
        this.chartRec = new Chart('canvas4', {
          type: 'line',
          data: {
            labels: data.features.map((item: any) => this.datePipe.transform(new Date(item.attributes.Date), "MM-dd")).splice(data.features.length - 8, data.features.length - 1),
            datasets: [
          
              {
                label: 'المتعافون',
                data: data.features.map((item: any) => item.attributes.Rtabalis_jour).splice(data.features.length - 8, data.features.length - 1),
                backgroundColor: "#3AB43A",
                fill: true
              },

             
            ]

          },
          options: {

            maintainAspectRatio: false,
            legend: {
              display: true,
              rtl: 'right'
            },
            scales: {
              xAxes: [{
                gridLines: {
                  drawOnChartArea: false
                },
                display: true
              }],
              yAxes: [{
                gridLines: {
                  drawOnChartArea: false
                },
                display: true
              }],
            }
          }
        });
        this.chartDeath = new Chart('canvas5', {
          type: 'line',
          data: {
            labels: data.features.map((item: any) => this.datePipe.transform(new Date(item.attributes.Date), "MM-dd")).splice(data.features.length - 8, data.features.length - 1),
            datasets: [
            
              {
                label: 'الوفيات',
                data: data.features.map((item: any) => item.attributes.Deces_jour).splice(data.features.length - 8, data.features.length - 1),
                backgroundColor: "#b22222",
                fill: true
              },



            ]

          }, 
          options: {

            maintainAspectRatio: false,
            legend: {
              display: true,
              rtl: 'right'
            },
            scales: {
              xAxes: [{
                gridLines: {
                  drawOnChartArea: false
                },
                display: true
              }],
              yAxes: [{
                gridLines: {
                  drawOnChartArea: false
                },
                display: true
              }],
            }
          }
        });

      }), err => {
        console.log(err);
      };
  }

  

    
    private getTotalDailyByRigin(){
      this.banassiService.getInfoCovidByRegion()
      .subscribe((res: any)=> {
        console.log('test');
        console.log(res);

        this.chartAsc = new Chart('canvas3', {
          type: 'doughnut',
          data: {
            labels: res.features.map((item:any)=>item.attributes.Nom_Région_AR),
             
            datasets: [
              {
                data: res.features.map((item:any)=>item.attributes.Cases),
                backgroundColor: ["#F7EA0F", "#8DBE67", "#159645", "#65B17E", "#192167", "#0167A7", "#681C66", , "#941365", , "#C81A20", "#D24B2D", "#E07F2D", "#E7A021"],
                fill: true,
           
              } 
            ]
             
          },
          options: {
            
              responsive:true,
              maintainAspectRatio: false,
            legend: {
              display: true,
              position:'top',
              rtl:true,
              Align:'right',
              labels: {
              fontSize:15,
              boxWidth:10,
              padding:2,
              usePointStyle:true
            }
            },
            scales: {
              xAxes: [{
                display: false
              }],
              yAxes: [{
                display: false
              }],
            }
          }
        });


        this.zone.runOutsideAngular(() => {
          let map= am4core.create("chartdiv", am4maps.MapChart);
          map.geodata = am4geodata_moroccoLow;
    
          // Set projection
          map.projection = new am4maps.projections.Miller;
          
          // Create map polygon series
          let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
          polygonSeries.useGeodata = true;
          
          // Configure series
          let polygonTemplate = polygonSeries.mapPolygons.template;
          polygonTemplate.tooltipText = "{name} {value}";
          polygonTemplate.fill = am4core.color("#999");
          // ... chart code goes here ...
        
          let hs = polygonTemplate.states.create("hover");
          hs.properties.fill = am4core.color("#367B25");
          polygonSeries.heatRules.push({
            "property": "fill",
            "target": polygonSeries.mapPolygons.template,
            "min": am4core.color("#00FF7F"),
            "max": am4core.color("#006400")
          });
          // add heat legend
          let heatLegend = map.chartContainer.createChild(am4maps.HeatLegend);
          heatLegend.valign = "bottom";
          heatLegend.align = "right";
          heatLegend.width = am4core.percent(100);
          heatLegend.series = polygonSeries;
          heatLegend.orientation = "vertical";
          heatLegend.padding(50, 30, 0, 250);
          heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
          heatLegend.valueAxis.renderer.minGridDistance = 40;
    
          polygonSeries.mapPolygons.template.events.on("over", event => {
            handleHover(event.target);
          });
    
          polygonSeries.mapPolygons.template.events.on("hit", event => {
            handleHover(event.target);
          });
    
          function handleHover(mapPolygon) {
            if (!isNaN(mapPolygon.dataItem.value)) {
              heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
            } else {
              heatLegend.valueAxis.hideTooltip();
            }
          }
    
          polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
          polygonSeries.mapPolygons.template.events.on("out", event => {
            heatLegend.valueAxis.hideTooltip();
          });
    
          map.zoomControl = new am4maps.ZoomControl();
          map.zoomControl.valign = "top";
          polygonSeries.data = [
            {
              "id": "MA-01",
              "name": "طنجة - تطوان - الحسيمة",
            "value": res.features[11].attributes.Cases,
            
          },{
            "id": "MA-02",
            "name": " الشرق",
            "value": res.features[6].attributes.Cases,
            
          },{
            "id": "MA-03",
            "name": "فاس - مكناس",
            "value": res.features[10].attributes.Cases,
            
          },{
            "id": "MA-04",
            "name": "الرباط - سلا - القنيطرة",
            "value": res.features[7].attributes.Cases,
            
          },{
            "id": "MA-05",
            "name": "بني ملال - خنيفرة",
            "value": res.features[4].attributes.Cases,
            
          },{
            "id": "MA-06",
            "name": "الدار البيضاء - سطات",
            "value": res.features[9].attributes.Cases,
            
          },{
            "id": "MA-07",
            "name": "مراكش - آسفي",
            "value": res.features[5].attributes.Cases,
            
          },{
            "id": "MA-08",
            "name": "درعة - تافيلالت",
            "value": res.features[0].attributes.Cases,
            
          },{
            "id": "MA-09",
            "name": "سوس - ماسة",
            "value": res.features[8].attributes.Cases,
            
          },{
            "id": "MA-10",
            "name": "كلميم - واد نون",
            "value": res.features[2].attributes.Cases,
            
          },{
            "id": "MA-11",
            "name": "العيون - الساقية الحمراء",
            "value": res.features[3].attributes.Cases,
            
          }, {
            "id": "MA-12",
            "name": "الداخلة - وادي الذهب",
            "value": res.features[1].attributes.Cases,
            
          }];
          
          // Bind "fill" property to "fill" key in data
          polygonTemplate.propertyFields.fill = "fill";
          this.chartMap = map;
        });


      });
      


      
    }




 initRace(data:any)
{
   let nindex = 0

   let items=[]
  /*let items2=[]
   data.features.forEach((element:any) => {
     items1.push({ value: element.attributes.Cases, region: element.attributes.Nom_Région_AR})
     items2.push({ value: 0, region: element.attributes.Nom_Région_AR})
     nindex++;

    });*/
   let dataObje = {} 

   data.features.forEach((element:any) => {
     items=[]
     items.push({
       value: element.attributes.Cas_Jour, region: "الحالات المؤكدة" })
     items.push({ value: element.attributes.Deces_jour, region: "الوفيات" })
     items.push({ value: element.attributes.Rtabalis_jour, region: "المتعافون" })
                
    dataObje[nindex]=items
     nindex++;

    });
   

  console.log("dataObje")
  console.log(dataObje)
  /* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

let chart = am4core.create("chartdiv2", am4charts.XYChart);
chart.padding(40, 40, 40, 40);
 
chart.numberFormatter.bigNumberPrefixes = [
  { "number": 1e+3, "suffix": "K" },
  { "number": 1e+6, "suffix": "M" },
  { "number": 1e+9, "suffix": "B" }
];

let label = chart.plotContainer.createChild(am4core.Label);
label.x = am4core.percent(97);
label.y = am4core.percent(95);
label.horizontalCenter = "right";
label.verticalCenter = "middle";
label.dx = -15;
label.fontSize = 50;

let playButton = chart.plotContainer.createChild(am4core.PlayButton);
playButton.x = am4core.percent(97);
playButton.y = am4core.percent(95);
playButton.dy = -2;
playButton.verticalCenter = "middle";
playButton.events.on("toggled", function(event) {
  if (event.target.isActive) {
    play();
  }
  else {
    stop();
  }
})

let stepDuration = 1000;

let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
   categoryAxis.dataFields.category = "region";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = true;

let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;

let series = chart.series.push(new am4charts.ColumnSeries());
   series.dataFields.categoryY = "region";
   series.dataFields.valueX = "value";
   series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.template.column.cornerRadiusTopRight = 5;
series.interpolationDuration = stepDuration;
series.interpolationEasing = am4core.ease.linear;

let labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "right";
labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
labelBullet.label.textAlign = "end";
labelBullet.label.dx = -10;

chart.zoomOutButton.disabled = true;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", function(fill, target){
  return chart.colors.getIndex(target.dataItem.index);
});
   label.text = new Date(data.features[0].attributes.Date).getDate() + "/" + (new Date(data.features[0].attributes.Date).getMonth() + 1);

let interval;
let index=0;
function play() {
  interval = setInterval(function(){
    nextDay();
  }, stepDuration)
  nextDay();
}

function stop() {
  if (interval) {
    clearInterval(interval);
  }
}

function nextDay() {
    index++;
  if (index > nindex) {
     index=0
  }

  let newData = allData[index];
  let itemsWithNonZero = 0;
  

  for (var i = 0; i < chart.data.length; i++) {
    chart.data[i].value = newData[i].value;
    if (chart.data[i].value > 0) {
      itemsWithNonZero++;
    }
  }
    if (index == 0) {
    series.interpolationDuration = stepDuration / 4;
    valueAxis.rangeChangeDuration = stepDuration / 4;
  }
  else {
    series.interpolationDuration = stepDuration;
    valueAxis.rangeChangeDuration = stepDuration;
  }

  chart.invalidateRawData();
  label.text = new Date(data.features[index].attributes.Date).getDate() + "/" + (new Date(data.features[index].attributes.Date).getMonth()+1);
  categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
}
 

categoryAxis.sortBySeries = series;

   let allData: any = dataObje
console.log('allData')
console.log(allData)
   chart.data = JSON.parse(JSON.stringify(allData[index]));
categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

series.events.on("inited", function() {
  setTimeout(function() {
    playButton.isActive = true; // this starts interval
  }, 1000)
})
}







}
