import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide: boolean = true;
  ishide: boolean = true;
  userData: any = {};
  error: string = ''
  localPss: any;
  constructor(private _router: Router, private auth: AuthService,
    private toastr: ToastrService,
    private _HelperService: HelperService) { }

  authForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)])
  })

  ngOnInit(): void { }




  submitAuthForm(authForm: FormGroup) {
    console.log(authForm)
    this.auth.authForm(authForm.value).subscribe({
      next: (res) => {
        console.log(authForm.value.password);
        localStorage.setItem('userToken', res.token);
        this.auth.getProfile();
        // console.log(res);
      },
      error: (res) => {
        this.toastr.error(res.error.message);
      },
      complete: () => {
        this._HelperService.getCurrentUser().subscribe({
          next: (res) => {
            this.userData = res
            console.log(this.userData.userName);
            this.toastr.success(`Hello ${this.userData.userName} We are excited to have you join this team! :)`);
            this._router.navigate(['/dashboard']);
          }
        });
      },
    })
  }









}
