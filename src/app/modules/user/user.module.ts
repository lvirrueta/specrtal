import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReviewComponent } from './review/review.component';
import { DiscarderedComponent } from './discardered/discardered.component';
import { ModalsComponent } from './modals/modals.component';
import { DiscardComponent } from './modals/discard/discard.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ReviewComponent,
    DiscarderedComponent,
    ModalsComponent,
    DiscardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
