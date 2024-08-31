import { Enviroment } from './../../../base/Enviroment';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Isignup } from '../../../isignup';
import { BehaviorSubject, Observable } from 'rxjs';
import { Signin } from '../../../signin';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Forgetpassword } from '../../../forgetpassword';
import { Icode } from '../../../icode';
import { Iresetpassword } from '../../../iresetpassword';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
// use it to monitor userData
   userData:BehaviorSubject<any>=new BehaviorSubject(null);
  

 constructor(private _httpclient:HttpClient,private _Router:Router,@Inject(PLATFORM_ID)private x:object){
    if(isPlatformBrowser(this.x)){
      if(localStorage.getItem('usertoken')){
        this.DecodeuserData();
        // this._Router.navigate([localStorage.getItem('currentpage')]);
       }
      //  else{
      //   this.userData = new BehaviorSubject(null)
      // }
      
       
    }
 }

postsignin(data:Signin):Observable<any>{
   return this._httpclient.post(`${Enviroment.Baseurl}/api/v1/auth/signin`,data)
}

  postsignup(data:Isignup):Observable<any>{
   return this._httpclient.post(`${Enviroment.Baseurl}/api/v1/auth/signup`,data)
  }


  DecodeuserData(){
    // Decode
    // store Decode in userData
    // this.userData = new BehaviorSubject(null)
    const token = JSON.stringify(localStorage.getItem('usertoken'));
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    console.log("Data",this.userData.getValue());
  }


  logout(){
    localStorage.removeItem('usertoken');
    this.userData.next(null);
    this._Router.navigate(['/login'])

  }


  forgotpassword(data:Forgetpassword):Observable<any>{
            return this._httpclient.post(`${Enviroment.Baseurl}/api/v1/auth/forgotPasswords`,data)
  }

  verifyresetpassword(data:Icode):Observable<any>{

    return this._httpclient.post(`${Enviroment.Baseurl}/api/v1/auth/verifyResetCode`,data)
  }

  resetpassword(data:Iresetpassword):Observable<any>{
    return this._httpclient.put(`${Enviroment.Baseurl}/api/v1/auth/resetPassword`,data)
  }


  
}
