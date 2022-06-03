import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    LandingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PublicModule { }
