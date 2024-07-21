import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  isLoading?: boolean;

  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder,
    @Inject(DIALOG_DATA) public data: any,
    private _Router: Router, public _DialogRef: DialogRef,
    private toastr: ToastrService) { }
  verifyForm: FormGroup = this._FormBuilder.group({
    email: [this.data],
    code: ['']
  })

  ngOnInit(): void { }



  // Verification Function

  onVerifyEmail() {
    console.log(this.verifyForm)
    this.isLoading = true
    this._AuthService.verifyUserAccount(this.verifyForm.value).subscribe({
      next: res => {
        this.isLoading = false
        this.toastr.success(res.message)
        this._Router.navigate(['/auth'])
        this._DialogRef.close()
      },
      error: err => {
        this.isLoading = false
        this.toastr.error(err.message)
      }
    })
  }
}
