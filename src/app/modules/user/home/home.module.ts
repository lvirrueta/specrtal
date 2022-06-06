import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
