import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(private _HttpClient: HttpClient) { }
  getGategories(): Observable<any> {
    let pageNumber = '1';
    let pageSize = '1000';

    return this._HttpClient.get('Category', { params: { pageSize, pageNumber } });
  }

  getTags(): Observable<any> {
    return this._HttpClient.get('tag');
  }

  getCurrentUser() {
    return this._HttpClient.get('Users/currentUser');
  }

  changePassword(userData: any) {
    return this._HttpClient.put('Users/ChangePassword', userData);
  }

  getAllUsers(myPram: any): Observable<any> {
    return this._HttpClient.get('Users', { params: myPram })
  }

  getUserBYiD(userID: number): Observable<any> {
    return this._HttpClient.get(`Users/${userID}`)
  }

  deleteUser(id: number): Observable<any> {
    return this._HttpClient.delete(`Users/${id}`)
  }

}
