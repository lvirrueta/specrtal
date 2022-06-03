import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notLoggedGuard } from './core/guards/home/not-logged.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [notLoggedGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    canActivate: [notLoggedGuard],
    loadChildren: () => import('./modules/plot/plot.module').then(m => m.PlotModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
