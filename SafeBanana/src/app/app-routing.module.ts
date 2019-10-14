import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },  { path: 'sign', loadChildren: './pages/sign/sign.module#SignPageModule' },
  { path: 'event', loadChildren: './pages/event/event.module#EventPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'home-guest', loadChildren: './pages/home-guest/home-guest.module#HomeGuestPageModule' },
  { path: 'add-guest', loadChildren: './pages/add-guest/add-guest.module#AddGuestPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
