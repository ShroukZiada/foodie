import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IForgetPassword, IResetPassword, IUserVerify, Ilogin, IResgesterAdmin, ILoginResponse} from '../interfaces/auth';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  role: any;
  constructor(private http: HttpClient, private router: Router) {
    //reload
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
    }
  }



  getProfile() {
    let encoded: any = localStorage.getItem('userToken');

    let decoded: any = jwtDecode(encoded);

    console.log(decoded.userGroup);

    localStorage.setItem('role', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);
    this.getRole();

  }


  getRole() {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('role') !== null) {
      this.role = localStorage.getItem('role')
    }
  }

  // Function To handle user login
  authForm(formData: Ilogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('Users/Login', formData)
  }


  // Function To handle user register
  UserregisterForm(userForm: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('Users/Register', userForm)
  }

   // Function To handle user register
   AdminregisterForm(admivForm: IResgesterAdmin): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('Users/Register', admivForm)
  }

      // Function to create admin user
    createAdmin(adminForm: IResgesterAdmin): Observable<{ message: string }> {
      return this.http.post<{ message: string }>('Users/Create', adminForm)
    }


  // Function to verify user/admin account
  verifyUserAccount(verificationData: IUserVerify): Observable<{ message: string }> {
    return this.http.put<{ message: string }>('Users/verify', verificationData)  
  }


  // Function to send  link to email
  forgetPassword(email: IForgetPassword): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('Users/Reset/Request', email)
  }

 // Function to request password change
  restPassword(passwordData: IResetPassword): Observable<{ message: string }> {
    return this.http.post <{ message: string }>('Users/Reset', passwordData)

  }

  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    this.userData.next(null);
    this.router.navigate(['/auth']);
  }
}
