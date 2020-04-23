import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import{HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { CartsComponent } from './carts/carts.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboradComponent,
    FooterComponent,
    CartsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
