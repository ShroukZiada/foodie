import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRecipeRoutingModule } from './user-recipe-routing.module';
import { UserRecipeComponent } from './user-recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewUserRecipeComponent } from './components/view-user-recipe/view-user-recipe.component';


@NgModule({
  declarations: [
    UserRecipeComponent,
    ViewUserRecipeComponent
  ],
  imports: [
    CommonModule,
    UserRecipeRoutingModule,
    SharedModule
  ]
})
export class UserRecipeModule { }
