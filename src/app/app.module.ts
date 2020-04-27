import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import{HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { CartsComponent } from './carts/carts.component';
import { CartComponent } from './cart/cart.component';
import { VectorMapDirective } from './vector-map.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboradComponent,
    FooterComponent,
    CartsComponent,
    CartComponent,
    VectorMapDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
