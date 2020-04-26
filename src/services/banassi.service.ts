import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Injectable } from '@angular/core';

 
@Injectable({ 
  providedIn: 'root' 
}) 
export class BanassiService { 
 
 
 
  baseUrl ="https://api.thevirustracker.com/free-api?"; 
  baseUrlBanassa ="http://banassa.com/api/"; 
  baseUrlBanassa2 ="http://banassa.com/covidapi.php"; 
 
  constructor(private http:HttpClient) { 
     this.http = http; 
   } 

  getInfoCovid(){ 
    return this.http.get(this.baseUrl +"countryTotal=MA"); 
  } 
 
  getInfoCovidStats(){ 
    return this.http.get(this.baseUrl +"countryTimeline=MA"); 
  } 
  getBanassaCovidStats(){ 
    return this.http.get(this.baseUrlBanassa +"covidapi.php"); 
  } 
  getBanassaCovidStatsByRegion(){ 
    return this.http.get(this.baseUrlBanassa +"regionapi.php"); 
  } 
  
















  }
