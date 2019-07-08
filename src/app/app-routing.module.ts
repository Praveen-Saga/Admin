import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: './main/scrumboard/scrumboard.module#ScrumboardModule' 
  },

  { 
    path: 'actor', 
    loadChildren: './main/actor/actor.module#ActorModule' 
  },
  { 
    path: 'reports', 
    loadChildren: './main/reports/reports.module#ReportsModule' 
  },
  { 
    path: 'banner', 
    loadChildren: './main/banner/banners.module#BannersModule' 
  },
  { 
    path: 'push-notifications', 
    loadChildren: './main/push-notifications/push-notifications.module#PushNotificationsModule' 
  },
  {
    path:'**',
    redirectTo:'login',
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
