import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse } from '../models/responses';
import { Category } from '../models/category';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  getAll():Observable<DataResponse<Category[]>>{

    return this.httpClient.get<DataResponse<Category[]>>(environment.getApiUrl("/categories/get-all"))
   }
   create(category:Category):Observable<Response>{
    return this.httpClient.post<Response>(environment.getApiUrl("/categories/create"),category)

   }
}
