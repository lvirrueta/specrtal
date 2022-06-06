/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', 
    component: HomeComponent,
    children: [
      { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
      { path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule) },
      { path: 'discardered', loadChildren: () => import('./discardered/discardered.module').then(m => m.DiscarderedModule) },
      { path: '**', redirectTo: 'main', pathMatch: 'full' }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
