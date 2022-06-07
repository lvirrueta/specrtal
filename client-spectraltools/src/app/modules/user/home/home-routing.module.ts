import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ReviewComponent } from '../review/review.component';
import { DiscarderedComponent } from '../discardered/discardered.component';
import { MainComponent } from '../main/main.component';


const routes: Routes = [
  { path: '', 
    component: HomeComponent,
    children: [
      { path: 'main', component: MainComponent },
      { path: 'review', component: ReviewComponent },
      { path: 'discardered', component: DiscarderedComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'main' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
