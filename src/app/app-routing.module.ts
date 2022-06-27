import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutGuard } from './layout/layout.guard';
import { EnsureLoginGuard } from './login/ensure-login.guard';

const routes: Routes = [
  // default
  {
    path:'',
    component:LayoutComponent,
    // canActivate:[LayoutGuard],
    children:[
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'about',
        component:AboutComponent
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      }
    ]
  },
  {
    path:'login',
    component:LoginComponent,
    canDeactivate:[EnsureLoginGuard]
  },
  // 延遲載入
  {
    path:'feature',
    loadChildren: () => import('./feature/feature.module').then(module => module.FeatureModule)
  },

  // otherwise redirect to home
  {
    path:'**',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing:true,
    useHash:true,
    preloadingStrategy:PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
