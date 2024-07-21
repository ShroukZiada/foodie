import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { IResgesterAdmin } from '../../interfaces/auth';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';
import { NgxFileDropEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  imgSrc: any;
  hidePaasword: boolean = false;
  hideCOMFPaasword: boolean = false;
  error: any;
  verifymail: string = '';
  verifyCode: string = '';
  toggleRegister: boolean = false;
  youremail: string = '';
  email: string = ''
  localPss: any;
  isLoading: boolean = false;
  loading: any;

  // ?registerForm Validators
  userRegisterForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.{2,8}$)[a-zA-Z]{1,7}[\d]{1,7}$/)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    country: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,40}$/)]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required, this.passwordMatchValidator.bind(this),]),
    profileImage: new FormControl(null)
  })

  adminRegisterForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.{2,8}$)[a-zA-Z]{1,7}[\d]{1,7}$/)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    country: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,40}$/)]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
    confirmPassword: new FormControl(null, [Validators.required, this.passwordMatchValidator.bind(this),]),
    profileImage: new FormControl(null)
  })

  constructor(private _AuthService: AuthService, private _Router: Router,
    private toastr: ToastrService, public dialog: MatDialog,) { }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, email: string): void {
    this.dialog.open(VerifyCodeComponent, {
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: email
    });
  }


  ngOnInit(): void { }

  // ? submitUserRegisterForm Function
  userSubmitRegister(userForm: FormGroup) {
    this.isLoading = true
    let myData = new FormData()
    myData.append('userName', userForm.value.userName);
    myData.append('email', userForm.value.email);
    myData.append('country', userForm.value.country);
    myData.append('phoneNumber', userForm.value.phoneNumber);
    myData.append('password', userForm.value.password);
    myData.append('confirmPassword', userForm.value.confirmPassword);
    myData.append('profileImage', this.imgSrc);
    // console.log(myData);
    this._AuthService.UserregisterForm(myData).subscribe({
      next: (res) => {
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
        this.toastr.error(error.message, 'Error')
      },
      complete: () => {
        this.isLoading = false
        this.openDialog('500ms', '350ms', this.email)
        this.toastr.success('User Account Registered Successfully', 'Success')
      },
    })
  }

  // ? submitAdminRegisterForm Function

  adminSubmitRegister(adminForm: FormGroup) {
    this.isLoading = true
    const registrationFormData = new FormData();
    Object.entries<string>(adminForm.value).forEach(([key, value]) => {
      registrationFormData.append(key, value);
    });
    registrationFormData.append('profileImage', this.imgSrc);

    // Convert registerData array to an object of type IRegister
    const AdminData: { key: string, value: any }[] = [];
    registrationFormData.forEach((value, key) => {
      AdminData.push({ key: key, value: value });
    });
    const adminObject: IResgesterAdmin = {
      userName: '',
      email: '',
      country: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      profileImage: '',
    };

    AdminData.forEach(({ key, value }) => {
      adminObject[key as keyof IResgesterAdmin] = value
    })

    this._AuthService.AdminregisterForm(adminObject).subscribe({
      next: (res) => { },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
        this.toastr.error(error.error.message, 'Error')
      },
      complete: () => {
        this.isLoading = false
        this.openDialog('500ms', '350ms', this.email)
        this.toastr.success('Admin Account Registered Successfully', 'Success')
      },
    })
  }

  // ? Password and confirm password Match Function
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const confirmPassword = control.value;
    const password = this.userRegisterForm?.get('password')?.value;

    if (password !== confirmPassword) {
      return { passwordMisMatch: true };
    }

    return null;
  }

  imageUrl: string = '';
  uploadedFile!: File ; // Property to store the uploaded file
  imageUploaded:boolean=false;

 //ngx file drop
 public files: NgxFileDropEntry[] = [];
 
 public dropped(files: NgxFileDropEntry[]) {

   const droppedFile = files[0]; // Access the first dropped file
   if (droppedFile.fileEntry.isFile) {
     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
     fileEntry.file((file: File) => {
       // Here you can access the dropped file
       console.log('Dropped file:', file);
       // Assuming imageUrl is the URL to display the uploaded image
       this.imageUrl = URL.createObjectURL(file);

       this.uploadedFile = file;

       this.imageUploaded = true;
     });
   }

   }


   public fileOver(event:any){
    console.log(event);
  }

  public fileLeave(event:any){
    console.log(event);
  }

}
