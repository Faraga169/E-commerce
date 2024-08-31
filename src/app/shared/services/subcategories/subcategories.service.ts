import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { subcategoriesres } from '../../../isubcategories';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private _httpclient:HttpClient) { }




  getspecificsubcategoryfromcategories(category_id:string):Observable<subcategoriesres>{
    return this._httpclient.get<subcategoriesres>(`${Enviroment.Baseurl}/api/v1/categories/${category_id}/subcategories`)
  }
}
