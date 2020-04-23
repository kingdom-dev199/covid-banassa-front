import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';
import { BanassiService } from 'src/services/banassi.service';


@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit {

   totalCases:number;
   totalRecovred:number;
   totalDeaths:number;
   totalActiveCases:number;
   totalNewCasesToday:number;
   totalNewDeathsToday:number;
   dataset=[];
   dailycases=[];
   dates=[];
  chart = []; // This will hold our chart info


  constructor(public banassiService:BanassiService) {
   

  }

  
  ngOnInit(){
    this.getDailycases();
    this.getTotaleCases();

    
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
        let dailycasesss = Object.values(data.timelineitems[0]).map((obj: any) => obj.new_daily_cases);
        let dailycasessss = Object.values(data.timelineitems[0]).map((obj: any) => obj.new_daily_cases);
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: dates.splice(dates.length - 7, dates.length),
            datasets: [
              {
                data: Object.values(dailycases).splice(dailycases.length-7, dailycases.length),
                borderColor: "#3cba9f",
                fill: false
              }
              
            ]
          },
          options: {
            legend: {
              display: false
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
}
