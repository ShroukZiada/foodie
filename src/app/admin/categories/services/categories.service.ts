import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private _HttpClient: HttpClient,) { }
  // Method to git all categories
  getAllCatogeries(myPram: any): Observable<any> {
    return this._HttpClient.get('Category', { params: myPram })
  }
  // Method to create a new category
  createCategory(nameItem: string): Observable<ICategory> {
    return this._HttpClient.post<ICategory>('Category', { name: nameItem })
  }
  // Method to delete a category by its ID
  deleteCategories(CategoryId: number): Observable<{ raw: [], affected: number }> {
    return this._HttpClient.delete<{ raw: [], affected: number }>(`Category/${CategoryId}`)
  }

  // Method to edit a category by its ID
  editCategories(CategoryId: number, nameItem: string): Observable<ICategory> {
    return this._HttpClient.put<ICategory>(`Category/${CategoryId}`, { name: nameItem })
  }
}
