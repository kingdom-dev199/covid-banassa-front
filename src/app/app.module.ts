import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { ChartsModule } from 'ng2-charts';
import{HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DashboradComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
