import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  isloading: any;
  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder,
    private _Router: Router, private toastr: ToastrService) { }
  ngOnInit(): void { }
  ForgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
  })


  submiteForgetPassword(ForgetPasswordForm: FormGroup) {
    this.isloading = true
    this._AuthService.forgetPassword(ForgetPasswordForm.value).subscribe({
      next: (res) =>
        this.isloading = false,
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message, 'Error'),
          this.isloading = false
      },
      complete: () => {
        this.isloading = false
        this.toastr.success('Please Check Your E-mail', 'HEADS UP');
        this._Router.navigate(['/auth/reset']);
      }
    })

  }
}
