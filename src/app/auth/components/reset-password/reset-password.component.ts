import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  isloading: any;
  hidePaasword: boolean = false;
  hideCOMFPaasword: boolean = false;

  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder,
    private _Router: Router, private toastr:ToastrService ) { }

  // * Form group for the reset password formng s --o
  resetPasswordForm = new FormGroup({
    //? Email form control with validation
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),

    //? Seed form control with validation for OTP
    seed: new FormControl(null, [Validators.required,Validators.pattern(/^([a-zA-Z]{4}|\d{4}|[a-zA-Z\d]{4})$/)]),

    //? Password form control with validation
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),

    //? Confirm password form control with custom validation
    confirmPassword: new FormControl(null, [Validators.required, this.passwordMatchValidator.bind(this),]),
  });


// * Rest Password Function
 resetPassword(resetPasswordForm:FormGroup){
  this._AuthService.restPassword(resetPasswordForm.value).subscribe({
    next(res){},
    error: (error: HttpErrorResponse) => this.toastr.error(error.error.message, 'Error'),
    complete:()=> {
      this.toastr.success('Password Reset Successfully', 'Success');
      this._Router.navigate(['../']);
    },
  });
 }



  // * Password and confirm password Match Function
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const confirmPassword = control.value;
    const password = this.resetPasswordForm?.get('password')?.value;

    if (password !== confirmPassword) {
      return { passwordMisMatch: true };
    }
    return null;
  }
}
