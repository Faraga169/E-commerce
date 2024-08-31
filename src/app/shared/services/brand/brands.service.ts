import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';
import { allbrandres } from '../../../iallbrands';
import { specificbrandres } from '../../../ispecificbrand';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _httpclient:HttpClient) { }


  getallbrands():Observable<allbrandres>{
    return this._httpclient.get<allbrandres>(`${Enviroment.Baseurl}/api/v1/brands`)
  }


  getspecificbrand(brand_id:string):Observable<specificbrandres>{
    return this._httpclient.get<specificbrandres>(`${Enviroment.Baseurl}/api/v1/brands/${brand_id}`)
  }
}
