import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../services/helper.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup = new FormGroup({})

  constructor(private FB: FormBuilder, private _HelperService: HelperService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<ChangePasswordComponent>
  ) {
    this.changePasswordForm = this.FB.group({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl(''),
    })
  }
  ngOnInit(): void {

  }


  onChangePassword(x: string) {
    this._HelperService.changePassword(this.changePasswordForm.value).subscribe({
      next: (res) => {
        // console.log(res);
        // console.log(this.changePasswordForm.value)
        this.dialog.close();
        this.toastr.success('Password Changed Successfully');
      }
    })
  }

}


