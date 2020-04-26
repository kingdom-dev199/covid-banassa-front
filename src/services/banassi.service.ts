import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Injectable } from '@angular/core';

 
@Injectable({ 
  providedIn: 'root' 
}) 
export class BanassiService { 
 
 
 
  baseUrl ="https://services3.arcgis.com/hjUMsSJ87zgoicvl/arcgis/rest/services/Covid_19/FeatureServer/5/query?where=1%3D1&outFields=*&outSR=4326&f=json"; 
  baseUrlBanassa ="https://banassa.com/api/"; 
  baseUrlBanassa2 ="https://banassa.com/covidapi.php"; 
 
  constructor(private http:HttpClient) { 
     this.http = http; 
   } 

  getInfoCovid(){ 
    return this.http.get(this.baseUrl); 
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
