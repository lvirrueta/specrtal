import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscarderedComponent } from './discardered.component';
import { DiscarderedRoutingModule } from './discardered-routing.module';


@NgModule({
  declarations: [
    DiscarderedComponent
  ],
  imports: [
    CommonModule,
    DiscarderedRoutingModule
  ]
})
export class DiscarderedModule { }
