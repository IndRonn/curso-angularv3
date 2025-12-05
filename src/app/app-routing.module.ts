import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { sessionGuard } from '@core/guards/session.guard';
import { LifecycleDemoComponent } from './shared/components/lifecycle-demo/lifecycle-demo.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'lifecycle',
    component: LifecycleDemoComponent,
  },
  {
    path: '', // https://localhost:4200/
    component: HomePageComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [sessionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
