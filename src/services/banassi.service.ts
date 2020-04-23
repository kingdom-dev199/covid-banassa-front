import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Injectable } from '@angular/core';

 
@Injectable({ 
  providedIn: 'root' 
}) 
export class BanassiService { 
 
 
 
  baseUrl ="https://api.thevirustracker.com/free-api?"; 
 
  constructor(private http:HttpClient) { 
     this.http = http; 
   } 

  getInfoCovid(){ 
    return this.http.get(this.baseUrl +"countryTotal=MA"); 
  } 
 
  getInfoCovidStats(){ 
    return this.http.get(this.baseUrl +"countryTimeline=MA"); 
  } 
 
















  }
