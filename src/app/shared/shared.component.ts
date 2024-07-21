import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HelperService } from './services/helper.service';


@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent {
  changePasswordForm: any;
  shared: any;
  constructor(
    private formBuilder: FormBuilder,
    private _HelperService: HelperService,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<ChangePasswordComponent>) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl(''),
    });
  }

  ngOnInit(): void { }

  onResetRequest(data: string) {
    this.shared
      .changePassword(this.changePasswordForm.value)
      .subscribe((res: any) => {
        debugger;
        this.toastr.success('Password Changed Successfully');
        this.dialog.close();
      });
  }
}
