// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { notLoggedGuard } from './core/guards/home/not-logged.guard';
import { UserGuard } from './core/guards/user/user.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [notLoggedGuard],
    loadChildren: () =>
      import('../app/modules/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'user',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('../app/modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
