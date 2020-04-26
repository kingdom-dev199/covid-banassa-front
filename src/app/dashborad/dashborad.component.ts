import { Component, OnInit, AfterViewInit } from '@angular/core';

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

  constructor(public banassiService:BanassiService) {
    this.mapName = 'world_mill_en';

    this.mapOptions = {
      markerColor: this.defaultColors.markerColor,
      bgColor: this.defaultColors.bgColor,
      scale: 1,
      scaleColors: this.defaultColors.scaleColors,
      regionFill: this.defaultColors.regionFill
    };

    this.seriesData = {
      'CA': 11100,   // Canada
      'DE': 2510,    // Germany
      'FR': 3710,    // France
      'AU': 5710,    // Australia
      'GB': 8310,    // Great Britain
      'RU': 9310,    // Russia
      'BR': 6610,    // Brazil
      'IN': 7810,    // India
      'CN': 4310,    // China
      'US': 839,     // USA
      'SA': 410      // Saudi Arabia
    };

    this.markersData = [
      { latLng: [41.90, 12.45], name: 'Vatican City' },
      { latLng: [43.73, 7.41], name: 'Monaco' },
      { latLng: [-0.52, 166.93], name: 'Nauru' },
      { latLng: [-8.51, 179.21], name: 'Tuvalu' },
      { latLng: [7.11, 171.06], name: 'Marshall Islands' },
      { latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis' },
      { latLng: [3.2, 73.22], name: 'Maldives' },
      { latLng: [35.88, 14.5], name: 'Malta' },
      { latLng: [41.0, -71.06], name: 'New England' },
      { latLng: [12.05, -61.75], name: 'Grenada' },
      { latLng: [13.16, -59.55], name: 'Barbados' },
      { latLng: [17.11, -61.85], name: 'Antigua and Barbuda' },
      { latLng: [-4.61, 55.45], name: 'Seychelles' },
      { latLng: [7.35, 134.46], name: 'Palau' },
      { latLng: [42.5, 1.51], name: 'Andorra' }
    ];

  }

  ngAfterViewInit(){

  }
  ngOnInit(){
    this.getDailycases();
    this.getTotaleCases();
    this.getTotalDailyCases();
    this.getBanassaCovidStats();
    this.getTotalDailyByRigin();
    }

  private getBanassaCovidStats() {
    this.banassiService.getBanassaCovidStats()
      .subscribe((data:any)  => {
        //الحالات المؤكدة
        this.totalExclusCases = data[0].nb_cas;
      
      }), err => {
        console.log(err);
      };
  }
  
  private getTotaleCases() {
    this.banassiService.getInfoCovid()
      .subscribe((data:any)  => {
        //الحالات المؤكدة
        this.totalCases = data.countrydata[0].total_cases;
        //المتعافون
        this.totalRecovred = data.countrydata[0].total_recovered;
        //الوفيات
        this.totalDeaths = data.countrydata[0].total_deaths;


        //حالات تتلقى العلاج
        this.totalActiveCases = data.countrydata[0].total_active_cases;
        //optionnal if you want to added (not exist in hesspress )
        // new Casse Today
        this.totalNewCasesToday = data.countrydata[0].total_new_cases_today;
        // new Death Today 
        this.totalNewDeathsToday = data.countrydata[0].total_new_deaths_today;
      }), err => {
        console.log(err);
      };
  }

  private getDailycases() {
    this.banassiService.getInfoCovidStats()
      .subscribe((data: any)=> {
        console.log(data.timelineitems);
        let dates = Object.keys(data.timelineitems[0]);
        let dailycases = Object.values(data.timelineitems[0]).map((obj: any) => obj.new_daily_cases);
        let new_daily_deaths = Object.values(data.timelineitems[0]).map((obj: any) => obj.new_daily_deaths);
        let total_recoveries = Object.values(data.timelineitems[0]).map((obj: any) => obj.total_recoveries);
 
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: dates.splice(dates.length - 7, dates.length),
            datasets: [
              {
                data: Object.values(dailycases).splice(dailycases.length-7, dailycases.length),
                borderColor: "#3cba9f",
                fill: false
              },
              // {
              //   data: Object.values(new_daily_deaths).splice(new_daily_deaths.length-7, new_daily_deaths.length),
              //   borderColor: "#b22222",
              //   fill: false
              // },
              
              {
                data: Object.values(total_recoveries).splice(total_recoveries.length-7, total_recoveries.length),
                borderColor: "#006400",
                fill: false
              }
              
            ]
          },
          options: {
            legend: {
              display: true
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
      });
    }

    private getTotalDailyCases(){
      this.banassiService.getInfoCovidStats()
      .subscribe((data: any)=> {
        console.log(data.timelineitems);
        let dates = Object.keys(data.timelineitems[0]);
        //الحالات المؤكدة
        let total_cases = Object.values(data.timelineitems[0]).map((obj: any) => obj.total_cases);
        //حالات تتلقى العلاج  
        let total_active_cases = Object.values(data.timelineitems[0]).map((obj: any) => obj.total_active_cases);
       //  المتعافون 
        let total_recoveries = Object.values(data.timelineitems[0]).map((obj: any) => obj.total_recoveries);
        //  الوفيات
        let total_deaths = Object.values(data.timelineitems[0]).map((obj: any) => obj.total_deaths);
        
        this.chartAsc = new Chart('canvas2', {
          type: 'line',
          data: {
            labels: dates.splice(dates.length - 7, dates.length),
            datasets: [
              {
                data: Object.values(total_cases).splice(total_cases.length-7, total_cases.length),
                borderColor: "#3cba9f",
                fill: false
              },

              {
                data: Object.values(total_active_cases).splice(total_active_cases.length-7, total_active_cases.length),
                borderColor: "#FFA500",
                fill: false
              },

              {
                data: Object.values(total_deaths).splice(total_deaths.length-7, total_deaths.length),
                borderColor: "#b22222",
                fill: false
              },
              
              {
                data: Object.values(total_recoveries).splice(total_recoveries.length-7, total_recoveries.length),
                borderColor: "#006400",
                fill: false
              }
              
            ]
             
          },
          options: {
            legend: {
              display: true
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
        


      });


      
    }
    private getTotalDailyByRigin(){
      this.banassiService.getBanassaCovidStatsByRegion()
      .subscribe((res: any)=> {
        console.log('test');
        console.log(res);
          
        this.chartAsc = new Chart('canvas3', {
          type: 'pie',
          data: {
            labels: ['طنجة تطوان الحسيمة',
              'الشرق',
              'فاس مكناس',
              'الرباط سلا القنيطرة',
              'بني ملال خنيفرة',
              'الدار البيضاء سطات',
              'مراكش آسفي',
              'درعة تافيلالت',
              'جهة سوس ماسة',
              'جهة كلميم واد نون',
              'جهة العيون الساقية الحمراء',
              'جهة الداخلة وادي الذهب'],
            datasets: [
              {
                data: [res[0].tanger, res[0].oriental, res[0].fes, res[0].rabat, res[0].benimalal, res[0].casa, res[0].marrakech, res[0].daraa, res[0].souss_massa, res[0].guelmim, res[0].laayoune, res[0].dakhla],
                backgroundColor: ["#F7EA0F", "#8DBE67", "#159645", "#65B17E", "#192167", "#0167A7", "#681C66", , "#941365", , "#C81A20", "#D24B2D", "#E07F2D", "#E7A021"],
                fill: true,
           
              } 
            ]
             
          },
          options: {
            
              responsive: false,
            
            legend: {
              display: true,
              position:'right',
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
        


      });


      
    }














}
