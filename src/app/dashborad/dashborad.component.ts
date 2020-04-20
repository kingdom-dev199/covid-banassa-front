import { Component, OnInit } from '@angular/core';
import { BanassiService } from 'src/services/banassi.service';
import { InfoModule } from 'src/models/info/info.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit {
  
  private result;

  constructor(public banassiService:BanassiService) {

   }

  ngOnInit(): void {
    this.result = this.banassiService.getTotalCasses()
    .subscribe(cases => {
      this.result = cases;
      console.log("Result ========== "+this.result.toString());
    });
  
    
  }

  

}
