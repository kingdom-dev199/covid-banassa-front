import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { Component, OnInit } from '@angular/core';
import { BanassiService } from 'src/services/banassi.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  private totalCases:number;
  private totalRecovred:number;
  private totalDeaths:number;
  private totalActiveCases:number;
  private totalNewCasesToday:number;
  private totalNewDeathsToday:number;
  
  public chartOptions;

  constructor(public banassiService:BanassiService) {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };
  }

  ngOnInit(){
    this.banassiService.getInfoCovid()
    .subscribe(data => {
      //الحالات المؤكدة
      this.totalCases = data.countrydata[0].total_cases;
      //المتعافون
      this.totalRecovred=data.countrydata[0].total_recovered;
      //الوفيات
      this.totalDeaths=data.countrydata[0].total_deaths;
      //حالات تتلقى العلاج
      this.totalActiveCases=data.countrydata[0].total_active_cases;
        
      //optionnal if you want to added (not exist in hesspress )
      // new Casse Today
      this.totalNewCasesToday = data.countrydata[0].total_new_cases_today;
      // new Death Today 
      this.totalNewDeathsToday = data.countrydata[0].total_new_deaths_today;


    }),err => {
      console.log(err);
    }
  }



  

}
