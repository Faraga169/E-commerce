import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { categoryres } from '../../../category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpclient:HttpClient) { }
  getcategory():Observable<categoryres>{
    return this._httpclient.get<categoryres>(`${Enviroment.Baseurl}/api/v1/categories`)
  }
}
