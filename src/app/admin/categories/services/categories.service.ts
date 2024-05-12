import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private _HttpClient: HttpClient,) { }

  getAllCatogeries(myPram: any): Observable<any> {
    return this._HttpClient.get('Category', { params: myPram })
  }

  addCategories(nameItem: string): Observable<any> {
    return this._HttpClient.post('Category', { name: nameItem })
  }

  deleteCategories(id: number): Observable<any> {
    return this._HttpClient.delete(`Category/${id}`)
  }

  editCategories(id: number, nameItem: string): Observable<any> {
    return this._HttpClient.put(`Category/${id}`, { name: nameItem })
  }
}
