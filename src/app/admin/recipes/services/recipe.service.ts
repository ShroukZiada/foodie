import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _HttpClient: HttpClient) { }


  getAllRecipes(myPram: any): Observable<any> {
    return this._HttpClient.get('Recipe', { params: myPram })
  }
  addRecipe(data: FormData): Observable<any> {
    return this._HttpClient.post('Recipe', data);
  }
  getAllTags(): Observable<any> {
    return this._HttpClient.get('tag')
  }
  deleteRecipes(id: number): Observable<any> {
    return this._HttpClient.delete(`Recipe/${id}`)
  }
  
  onEditRecipe(data:FormData,id:number):Observable<any>{
    return this._HttpClient.put(`Recipe/${id}`,data)
    }

}
