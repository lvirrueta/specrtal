import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { MainComponent } from './home/main/main.component';
import { LandingComponent } from './home/landing/landing.component';
import { ReviewComponent } from './plot/review/review.component';
import { DiscarderedComponent } from './plot/discardered/discardered.component';
import { DiscardComponent } from './plot/modals/discard/discard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    LandingComponent,
    ReviewComponent,
    DiscarderedComponent,
    DiscardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
