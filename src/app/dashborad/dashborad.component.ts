import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_moroccoLow from "@amcharts/amcharts4-geodata/moroccoLow";

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
   totalExclusCases:number;
   dataset=[];
   dailycases=[];
   dates=[];
  chart = []; // This will hold our chart info
  chartAsc = [];
  chartPie = [];
  mapName: string;
  seriesData: any;
  markersData: any;
  mapOptions: any;
  defaultColors: any = {
    markerColor: '#23b7e5',      // the marker points
    bgColor: 'transparent',      // the background
    scaleColors: ['#878c9a'],    // the color of the region in the serie
    regionFill: '#bbbec6'       // the base region color
  };
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
    // this.getTotalDailyCases();
    // this.getBanassaCovidStats();
     this.getTotalDailyByRigin();
    }

 
  
  private getTotaleCases() {
    this.banassiService.getInfoCovid()
      .subscribe((data:any)  => {
        //الحالات المؤكدة
        console.log(data)
        this.totalCases = data.features[data.features.length-1].attributes.Cas_confirmés;
        //المتعافون
        this.totalRecovred = data.features[data.features.length-1].attributes.Retablis;
        // //الوفيات
         this.totalDeaths = data.features[data.features.length-1].attributes.Décédés;


        //حالات تتلقى العلاج
        this.totalActiveCases = this.totalCases-this.totalDeaths-this.totalRecovred;

        this.totalExclusCases=data.features[data.features.length-1].attributes.Negative_tests;
       
        
        this.chartAsc = new Chart('canvas2', {
          type: 'line',
          data: {
            labels: data.features.map((item:any)=>this.datePipe.transform(new Date(item.attributes.Date),"MM-dd")).splice(data.features.length-8,data.features.length-1),
            datasets: [
              {
                label:'الحالات المؤكدة',
                data: data.features.map((item:any)=>item.attributes.Cas_confirmés).splice(data.features.length-8,data.features.length-1),
                borderColor: "#3cba9f",
                fill: false
              },

              {
                label:'المتعافون',
                data: data.features.map((item:any)=>item.attributes.Retablis).splice(data.features.length-8,data.features.length-1),
                borderColor: "#3AB43A",
                fill: false
              },

              {
                label:'الوفيات',
                data: data.features.map((item:any)=>item.attributes.Décédés).splice(data.features.length-8,data.features.length-1),
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
          type: 'pie',
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
              maintainAspectRatio: true,
            legend: {
              display: true,
              position:'bottom',
              rtl:true,
              Align:'end',
              labels: {
              fontSize:20,
              boxWidth:40,
              padding:10
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














}
