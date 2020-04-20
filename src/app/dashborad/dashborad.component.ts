import { Component, OnInit } from '@angular/core';
import { BanassiService } from 'src/services/banassi.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit {
  
  private result:any;

  constructor(public banassiService:BanassiService) {

  }

  ngOnInit(){
    this.banassiService.getTotalCases()
    .subscribe(data => {
      this.result = data;
    }),err => {
      console.log(err);
    }
  }



  

}
