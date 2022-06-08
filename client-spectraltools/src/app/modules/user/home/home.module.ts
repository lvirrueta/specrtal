// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing 
import { HomeRoutingModule } from './home-routing.module';

// Components
import { HomeComponent } from './home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReviewComponent } from '../review/review.component';
import { DiscarderedComponent } from '../discardered/discardered.component';
import { MainComponent } from '../main/main.component';
import { SatellitalComponent } from '../review/components/satellital/satellital.component';
import { PointsComponent } from '../review/components/points/points.component';
import { InfoComponent } from '../review/components/info/info.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    ReviewComponent,
    DiscarderedComponent,
    MainComponent,
    SatellitalComponent,
    PointsComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
