import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../../base/Enviroment';
import { Iproduct, productres } from '../../../iproduct';
import { specificproductres } from '../../../ispecificproduct';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product_id:string="";
  constructor(private _Httpclient:HttpClient) { }

  getproduct():Observable<productres>{
    return this._Httpclient.get<productres>(`${Enviroment.Baseurl}/api/v1/products`)
  }

  getspecificproduct(product_id:string):Observable<specificproductres>{
            return this._Httpclient.get<specificproductres>(`${Enviroment.Baseurl}/api/v1/products/${product_id}`)
  }
}
