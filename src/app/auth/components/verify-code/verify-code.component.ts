import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent {
  constructor(private _AuthService: AuthService, private _Router: Router, private toastr: ToastrService) { }

  verifyForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    code: new FormControl(null, [Validators.required, Validators.maxLength(4), Validators.minLength(4),
    ]),
  });


  // Verification Function
  onVerify(verificationForm: FormGroup) {
    this._AuthService.verifyUserAccount(verificationForm.value).subscribe({
      next: (res) => { },
      error: (error: HttpErrorResponse) =>
        this.toastr.error(error.error.message, 'Error'),
      complete: () => {
        {
          this.toastr.success('Account Verified Successfully', 'Success');
        }
        this._Router.navigate(["/auth"])
      }

    });
  }
}
