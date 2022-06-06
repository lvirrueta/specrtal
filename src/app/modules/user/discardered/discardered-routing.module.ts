import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscarderedComponent } from './discardered.component';

const routes: Routes = [
  { path: '', component: DiscarderedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscarderedRoutingModule {}
