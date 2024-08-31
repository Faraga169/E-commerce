import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { ShippingAddress } from '../../../ishopcartcash';
import { Observable } from 'rxjs';
import { userorderres } from '../../../iuserorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpclient:HttpClient) { }


   usertoken:string=localStorage.getItem("usertoken")||"";
  createcashorder(cart_id:string,data:ShippingAddress):Observable<any>{
       return this._httpclient.post<any>(`${Enviroment.Baseurl}/api/v1/orders/${cart_id}`,{shippingAddress:data},
        
       )
  }
  checkoutsession(cart_id:string,data:ShippingAddress):Observable<any>{
       return this._httpclient.post<any>(`${Enviroment.Baseurl}/api/v1/orders/checkout-session/${cart_id}?url=${Enviroment.Baseserver}`,{shippingAddress:data},
        
       )
  }

  getuserorder(user_id:string):Observable<userorderres[]>{
    return this._httpclient.get<userorderres[]>(`${Enviroment.Baseurl}/api/v1/orders/user/${user_id}`)
  }
}
