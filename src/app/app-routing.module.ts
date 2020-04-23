import { IsLoggedGuard } from './_guard/is-logged.guard';
import { WelcomeCompleteGuard } from './_guard/welcome-complete.guard';
import { WelcomeGuard } from './_guard/welcome.guard';
import { AuthGuard } from './_guard/auth.guard';
import { UserGuard } from './_guard/user.guard';
import { AdminGuard } from './_guard/admin.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [WelcomeGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./_pages/admin/admin.module').then(m => m.AdminPageModule),
        canActivate: [AuthGuard, AdminGuard],
        data: { role: 'Admin' }
      },
      {
        path: 'user',
        loadChildren: () => import('./_pages/user/tabs.module').then(m => m.TabsPageModule),
        canActivate: [AuthGuard, UserGuard],
        data: { role: 'User' }
      },
      {
        path: 'login',
        loadChildren: () => import('./_pages/login/login.module').then(m => m.LoginPageModule),
        canActivate: [IsLoggedGuard]
      },
      {
        path: 'register',
        loadChildren: () => import('./_pages/register/register.module').then(m => m.RegisterPageModule)
      }
    ]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./_pages/welcome/welcome.module').then(m => m.WelcomePageModule),
    canActivate: [WelcomeCompleteGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
