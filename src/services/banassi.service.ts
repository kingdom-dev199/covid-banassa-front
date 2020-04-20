import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { InfoModule } from 'src/models/info/info.module';

@Injectable({
  providedIn: 'root'
})
export class BanassiService {



  baseUrl ="https://api.thevirustracker.com/free-api?countryTotal=MA";

  infoModule : InfoModule;
  
  constructor(private http:HttpClient) {

   }
   private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

   getTotalCasses():Observable<InfoModule>{
    return this.http.get(this.baseUrl)
    .pipe(
      map((res:InfoModule) => {
        this.infoModule = res;
        return this.infoModule;
      }), catchError(this.handleError));
   
  }


  }
