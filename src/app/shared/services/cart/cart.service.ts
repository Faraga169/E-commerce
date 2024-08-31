import { Addproducttocartres } from './../../../iaddproducttocart';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { usercartres } from '../../../iusercart';
import { isPlatformBrowser } from '@angular/common';
import { platformBrowser } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class CartService {
numberofcartitems=new BehaviorSubject<number>(0);

    userToken={token:''}
  constructor(private _Httpclient:HttpClient,@Inject(PLATFORM_ID) private platformId:Object) { 
    if(isPlatformBrowser(this.platformId)){
      this.userToken.token=localStorage.getItem('usertoken') || '';
    }
   
      this.getusercart().subscribe({
        next:(res)=>{
          
          this.numberofcartitems.next(res.numOfCartItems);
          console.log(this.numberofcartitems.getValue());
          
        }
       })
    
      
    
     
  }


  Addproducttocart(product_id:string):Observable<Addproducttocartres>
  {
    return this._Httpclient.post<Addproducttocartres>(`${Enviroment.Baseurl}/api/v1/cart`,{productId:product_id},
  
    )
  }

  getusercart():Observable<usercartres>{
    return this._Httpclient.get<usercartres>(`${Enviroment.Baseurl}/api/v1/cart`,
     
    )
  }


  updatecartproduct(product_id:string,_count:string):Observable<usercartres>{
    return this._Httpclient.put<usercartres>(`${Enviroment.Baseurl}/api/v1/cart/${product_id}`,{count: _count},
      
    )
  }


  removespecificitem(product_id:string):Observable<usercartres>{
    return this._Httpclient.delete<usercartres>(`${Enviroment.Baseurl}/api/v1/cart/${product_id}`,  )
  }


  clearusercart():Observable<any>{
    return this._Httpclient.delete<any>(`${Enviroment.Baseurl}/api/v1/cart`,
      
    )
  }
}
