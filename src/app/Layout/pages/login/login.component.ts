import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ForgetpasswordComponent } from '../../addition/forgetpassword/forgetpassword.component';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { wishlist } from '../../../wishlist';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ForgetpasswordComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 errmsg!:string;
 isloading:boolean=false;
 wishlist:wishlist[]=[]
constructor(private _authservice:AuthService,private _Router:Router , private _CartService:CartService,private _wishlistservice:WishlistService){

}

loginform:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)])
})


loginsubmit(){
  this.isloading=true;
  if (this.loginform.valid) {
  this._authservice.postsignin(this.loginform.value).subscribe({
    next:(res)=>{
          console.log(res);
          localStorage.setItem('usertoken',res.token);
          this._authservice.DecodeuserData();
          this.isloading=false;
          this._Router.navigate(['/home']);

          this._CartService.getusercart().subscribe({
            next:(res)=>{
              
              this._CartService.numberofcartitems.next(res.numOfCartItems);
              console.log(this._CartService.numberofcartitems.getValue());
              
            }
           });

           this._wishlistservice.getloggeduserwishlist().subscribe({
            next:(res)=>{
              this._wishlistservice.wishlistuser.next(res.data.length)
              console.log(this._wishlistservice.wishlistuser.getValue())
            },
            error:(err)=>{
              this.isloading=false;
              console.log(err)
            }
          })
    },

    error:(err)=>{
           this.isloading=false;
           this.errmsg="Incorrect email or password"
           console.log(err);
    }
  })
}
  // console.log(this.loginform.get('email')?.value)
 
}





}
