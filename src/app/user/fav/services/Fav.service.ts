import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private _HttpClient: HttpClient) { }

  GetAllFavRecipe(): Observable<any> {
    return this._HttpClient.get('userRecipe')
  }
  AddFavRecipe(id: number): Observable<any> {
    return this._HttpClient.post('userRecipe', { recipeId: id })
  }

  deleteFavRecipe(id: number): Observable<any> {
    return this._HttpClient.delete(`userRecipe/${id}`)
  }
}
