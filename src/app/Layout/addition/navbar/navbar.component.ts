import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../../app/shared/services/cart/cart.service';
import { WishlistService } from '../../../../app/shared/services/wishlist/wishlist.service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MytranslateService } from '../../../shared/services/translate/mytranslate.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  islogin:boolean=false;
  numberitem!:number;
  numberitemwishlist!:number;
  constructor(public _MytranslateService:MytranslateService,public _authservice:AuthService,private _cartservice:CartService,private _wishlistservice:WishlistService){

  }

ngOnInit(){
 
  this.getnumberofcart()
  this.getnumberofwishlist()
  this._authservice.userData.subscribe({
    next:(res)=>{
      console.log(res);
      if(this._authservice.userData.getValue()!=null){
        this.islogin=true;
        console.log(this.islogin)
      }
      else{
        this.islogin=false;
        console.log(this.islogin)
      }


    },
    error:(err)=>{
      console.log(err);
    },
    complete:()=>{

    }
  })

 }

 getnumberofcart(){
  this._cartservice.numberofcartitems.subscribe({
    next:(res)=>{
       this.numberitem=res;
       console.log(this.numberitem)
    }
  })
 }

 getnumberofwishlist(){
  this._wishlistservice.wishlistuser.subscribe({
    next:(res)=>{
      this.numberitemwishlist=res;
      console.log(this.numberitemwishlist);
    }
  })
 }


 getlang(lang:string){
  this._MytranslateService.getlang(lang);
 }
}
