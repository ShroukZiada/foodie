import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserVerify, Ilogin } from '../interfaces/auth';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


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
  authForm(formData: Ilogin): Observable<any> {
    return this.http.post('Users/Login', formData)
  }
  registerForm(data: FormData): Observable<any> {
    return this.http.post('Users/Register', data)
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

  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    this.userData.next(null);
    this.router.navigate(['/auth']);
  }
  // Function to verify user account
  verifyUserAccount(verificationData: IUserVerify): Observable<{ message: string }> {
    return this.http.put<{ message: string }>('Users/verify', verificationData);
  }

}
