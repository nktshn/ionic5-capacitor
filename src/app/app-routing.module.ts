import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoutingPaths } from './routing-paths';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: RoutingPaths.main,
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: RoutingPaths.profile,
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: RoutingPaths.library,
    loadChildren: () => import('./pages/library/library.module').then( m => m.LibraryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: `${RoutingPaths.game}/:id`,
    loadChildren: () => import('./pages/game/game.module').then( m => m.GamePageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
