import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  NgxSpinnerModule } from 'ngx-spinner';
//import { CollapseModule } from 'ngx-bootstrap/collapse';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { HomeModule } from './home/home.module';
import { ShopModule } from './shop/shop.module';
//import { NavBarComponent } from './nav-bar/nav-bar.component';
//import { NavBarModule } from './core/nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    AppComponent,
  //  NavBarComponent
  ],
  imports: [
    BrowserModule,
  //  ShopModule,
  //  NavBarModule,
    CoreModule,
    HttpClientModule,
  //  CollapseModule.forRoot(),
  //  BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
