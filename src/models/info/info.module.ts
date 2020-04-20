import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InfoModule { 
   //الحالات المؤكدة
   totalCases:number;

   //المتعافون
   totalRecovred:number;

   //الوفيات
   totalDeaths:number;

   //حالات تتلقى العلاج
   totalActiveCases:number;


   constructor(TotalCases:number,totalRecovred:number,totalDeaths:number,totalActiveCases:number){
       this.totalCases = TotalCases;
       this.totalRecovred=totalRecovred;
       this.totalDeaths = totalDeaths;
       this.totalActiveCases = totalActiveCases;
   }
  

}
