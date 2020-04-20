import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Info } from 'src/app/entities/info';

@Injectable({
  providedIn: 'root'
})
export class BanassiService {

  baseUrl ="https://api.thevirustracker.com/free-api?countryTotal=MA";
  
  constructor(private http:HttpClient) {
     this.http = http;
   }
   
  getCases(){
    return this.http.get(this.baseUrl);
  }


















  }
