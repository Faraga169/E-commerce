import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { wishlistres } from '../../../wishlist';
import { addwishlistres } from '../../../addwishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistuser:BehaviorSubject<number>=new BehaviorSubject<number>(0);
    usertoken={
      token:''
    }
  constructor(private _httpclient:HttpClient) {
    if(typeof localStorage!='undefined'){
      this.usertoken.token=localStorage.getItem('usertoken') || '';
    }
  
       this.getloggeduserwishlist().subscribe({
        next:(res)=>{
            this.wishlistuser.next(res.count);
            console.log(this.wishlistuser.getValue())
        }
       })
   }

  Addproducttowishlist(product_id:string):Observable<addwishlistres>{
    return this._httpclient.post<addwishlistres>(`${Enviroment.Baseurl}/api/v1/wishlist`,{"productId":`${product_id}` },

    )
  }



  getloggeduserwishlist():Observable<wishlistres>{
    return this._httpclient.get<wishlistres>(`${Enviroment.Baseurl}/api/v1/wishlist`,
     
    )
  }


  removeproductfromwishlist(product_id:string):Observable<any>{
    return this._httpclient.delete<any>(`${Enviroment.Baseurl}/api/v1/wishlist/${product_id}`,
     
    )
  }
}
