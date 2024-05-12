import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';


@NgModule({
  declarations: [
    UsersComponent,
    ViewUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
