import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Injectable } from '@angular/core';

 
@Injectable({ 
  providedIn: 'root' 
}) 
export class BanassiService { 
 
 
 
  baseUrl ="https://services3.arcgis.com/hjUMsSJ87zgoicvl/arcgis/rest/services/Covid_19/FeatureServer/5/query?where=1%3D1&outFields=*&outSR=4326&f=json"; 
  baseUrlregion ="https://services3.arcgis.com/hjUMsSJ87zgoicvl/arcgis/rest/services/Covid_19/FeatureServer/0/query?where=1%3D1&outFields=RegionAr,Cases,Deaths,Recoveries,Nom_Région_AR,Shape__Area,Shape__Length&outSR=4326&f=json"; 
  
 
  constructor(private http:HttpClient) { 
     this.http = http; 
   } 

  getInfoCovid(){ 
    return this.http.get(this.baseUrl); 
  } 
 
  getInfoCovidByRegion(){ 
    return this.http.get(this.baseUrlregion); 
  } 
 
  
  
















  }
