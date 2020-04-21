import { Component, OnInit } from '@angular/core';
import { BanassiService } from 'src/services/banassi.service';


@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit {

  private totalCases:number;
  private totalRecovred:number;
  private totalDeaths:number;
  private totalActiveCases:number;
  private totalNewCasesToday:number;
  private totalNewDeathsToday:number;
  

  constructor(public banassiService:BanassiService) {
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
