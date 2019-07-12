import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './main/login/auth.guard';

const routes: Routes = [
  { 
    path: 'login', 
    children:[
    {
      path:'',
      loadChildren:'./main/login/login.module#LoginModule',
    },
    {
      path:'reset-password',
      loadChildren:'./main/login/reset-password/reset-password.module#ResetPasswordModule',
    }
    ],
  },
  // { 
  //   path: 'dashboard', 
  //   loadChildren: './main/dashboard/dashboard.module#DashBoardModule' 
  // },
  { 
    path: 'dashboard', 
    loadChildren: './main/scrumboard/scrumboard.module#ScrumboardModule' ,
    canLoad:[AuthGuard]
  },

  { 
    path: 'actor', 
    loadChildren: './main/actor/actor.module#ActorModule' ,
    canLoad:[AuthGuard]
  },
  { 
    path: 'reports', 
    loadChildren: './main/reports/reports.module#ReportsModule' ,
    canLoad:[AuthGuard]
  },
  { 
    path: 'banner', 
    loadChildren: './main/banner/banners.module#BannersModule' ,
    canLoad:[AuthGuard]
  },
  { 
    path: 'push-notifications', 
    loadChildren: './main/push-notifications/push-notifications.module#PushNotificationsModule' ,
    canLoad:[AuthGuard]
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'dashboard',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
