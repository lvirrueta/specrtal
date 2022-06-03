import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', children: [
    // { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
    // { path: 'signin', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) },
    // { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
    // { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
    // { path: 'recovery-password', loadChildren: () => import('./recovery-password/recovery-password.module').then(m => m.RecoveryPasswordModule) },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlotRoutingModule { }
