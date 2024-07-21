import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserClassGuard } from '../core/guards/user-class.guard';
import { AdminClassGuard } from '../core/guards/admin-class.guard';
import { HomeComponent } from '../shared/home/home.component';
import { NotFoundPageComponent } from '../shared/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent ,children: [
      { path: 'home', component: HomeComponent },
      { path: 'admin', canActivate: [AdminClassGuard], loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
      { path: 'user', canActivate: [UserClassGuard], loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
      { path: 'not', component: NotFoundPageComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
