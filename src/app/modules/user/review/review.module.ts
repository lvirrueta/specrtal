import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { SatellitalComponent } from './components/satellital/satellital.component';
import { InfoComponent } from './components/info/info.component';
import { PointsComponent } from './components/points/points.component';

@NgModule({
  declarations: [
    ReviewComponent,
    SatellitalComponent,
    InfoComponent,
    PointsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReviewModule { }
