import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DeleteComponent } from './delete/delete.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NotifierModule } from 'angular-notifier';
import { MatSelectModule } from '@angular/material/select';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
@NgModule({
  declarations: [
    SharedComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    DeleteComponent,
    ChangePasswordComponent,
    NotFoundPageComponent,
    NoDataFoundComponent,

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    NotifierModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    }),
    ButtonModule,
    MatSidenavModule
  ],
  exports: [
    ReactiveFormsModule,
    NgxDropzoneModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatPaginatorModule,
    NotifierModule,
    MatSelectModule,
    ToastrModule,
    ButtonModule,
    NotFoundPageComponent,
    MatSidenavModule,
    NoDataFoundComponent

  ]
})
export class SharedModule { }
