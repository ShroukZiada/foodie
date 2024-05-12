import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    VerifyCodeComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
  ]

})
export class AuthModule {

}
