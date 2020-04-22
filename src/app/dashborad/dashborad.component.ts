import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

import { BanassiService } from 'src/services/banassi.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
   totalCases:number;
   totalRecovred:number;
   totalDeaths:number;
   totalActiveCases:number;
   totalNewCasesToday:number;
   totalNewDeathsToday:number;
   dataset=[];
   dailycases=[];
   dates=[];
  
  public chartOptions;

  constructor(public banassiService:BanassiService) {
    this.getDailycases();
    this.getTotaleCases();
    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: this.dailycases
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.dates
      }
    };
    console.log(this.chartOptions)

  }

  
  ngOnInit(){
   
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
        this.dailycases = Object.values(data.timelineitems[0]).map((obj: any) => obj.new_daily_cases).splice(0, 7);
        this.dates = Object.keys(data.timelineitems[0]).splice(0, 7);
      //   for (var i: number = 0; i < 8;i++){
      //     this.dataset.push({ data: this.dates[i], label: this.dailycases[i]})
      //  }
        console.log(this.dailycases);
        console.log(this.dates);
        console.log(this.chartOptions.series.data);
        console.log(this.chartOptions.xaxis.categories);
      
      }), err => {
        console.log(err);
      };
  }
}
