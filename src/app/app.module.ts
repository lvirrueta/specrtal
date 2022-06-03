import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/home/login/login.component';
import { MainComponent } from './modules/home/main/main.component';
import { LandingComponent } from './modules/home/landing/landing.component';
import { ReviewComponent } from './modules/plot/review/review.component';
import { DiscarderedComponent } from './modules/plot/discardered/discardered.component';
import { DiscardComponent } from './modules/plot/modals/discard/discard.component';

@NgModule({
  declarations: [
    AppComponent,
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
