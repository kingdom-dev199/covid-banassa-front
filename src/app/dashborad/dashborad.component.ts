import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BanassiService } from 'src/services/banassi.service';
import { BaseChartDirective,Label,Color } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';


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
  
  public chartOptions;

  public lineChartData: ChartDataSets[] = [
    
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  
  constructor(public banassiService:BanassiService) {
    this.getDailycases();
    this.getTotaleCases();

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
         this.dailycases = Object.values(data.timelineitems[0]).map((obj: any) =>
          obj.new_daily_cases).splice(0, 7);


        this.dates = Object.keys(data.timelineitems[0]).splice(0, 7);
      //   for (var i: number = 0; i < 8;i++){
      //     this.dataset.push({ data: this.dates[i], label: this.dailycases[i]})
      //  }
        console.log(this.dailycases);
        console.log(this.dates);
        console.log(this.chartOptions.series);
        console.log(this.chartOptions.xaxis.categories);
      
      }), err => {
        console.log(err);
      };
  }
}
