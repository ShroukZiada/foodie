import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  imgSrc: any;

  registerForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.{2,8}$)[a-zA-Z]{1,7}[\d]{1,7}$/)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    country: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,40}$/)]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
    profileImage: new FormControl(null)
  })




  hide: boolean = true;
  ishide: boolean = true;
  error: any;
  verifymail: string = '';
  verifyCode: string = '';

  constructor(private _AuthService: AuthService, private _Router: Router, private toastr: ToastrService, public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  submitRegister(data: FormGroup) {
    console.log(data.value)
    console.log(this.registerForm)
    let myData = new FormData()

    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('country', data.value.country);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.imgSrc);
    console.log(myData);
    this._AuthService.registerForm(myData).subscribe({
      next: (res) => {
        console.log(res);
        console.log(data.value)
        if (data.valid) {
          localStorage.setItem('password', data.value.password);
          this.toastr.success(res.message);
        }
        else {
          this.toastr.error(res.message);
        }
      },
      error: (error: HttpErrorResponse) =>
        this.toastr.error(error.error.message, 'Error'),

    })
  }



  //handle UploadImage
  files: File[] = [];
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files);
    this.imgSrc = this.files[0];
  }
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  openDialog() {
    this.dialog.open(VerifyCodeComponent);
  }
}
