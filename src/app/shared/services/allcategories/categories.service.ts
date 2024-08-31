import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { categoryres } from '../../../category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _Httpclent:HttpClient) { }



  getallcategories():Observable<categoryres>{
   return this._Httpclent.get<categoryres>(`${Enviroment.Baseurl}/api/v1/categories`)
  }

  
}
