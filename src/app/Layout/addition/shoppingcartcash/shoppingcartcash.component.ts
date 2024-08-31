import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../../app/shared/services/order/order.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shoppingcartcash',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './shoppingcartcash.component.html',
  styleUrl: './shoppingcartcash.component.scss'
})
export class ShoppingcartcashComponent  {
  constructor(private _Activatedroute:ActivatedRoute,private _order:OrderService,private _Router:Router){}
  cart_id:string=""
  errormessage!:string;
  // ngOnInit(): void {
  //   if(typeof localStorage !='undefined'){
  //     localStorage.setItem('currentpage','/Shoppingcartcash');
  //   }
  // }

  // getcart_id(){
  //   return this._cartservice.getusercart();
  // }

  shoppingcartform:FormGroup=new FormGroup({
    details:new FormControl(null,[Validators.required,Validators.pattern(/^\d+\s[A-Za-z0-9\s,'\-\.]+$/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^[011||012||015||010][0-9]{10}$/)]),
    city:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Za-z\s\-']+$/)]),
})


checkshoppingcartform(){
  
  if(this.shoppingcartform.valid){
    this._Activatedroute.params.subscribe({
      next:(p)=>{
        this.cart_id=p['cartid'];
        if (this.cart_id=="undefined") {
          this.errormessage = "Cart ID is missing. Please select a cart.";
          return; // Stop execution if cart_id is not present
        }
        console.log(this.cart_id);
      }
    });
    this._order.checkoutsession(this.cart_id,this.shoppingcartform.value).subscribe({
      next:(res)=>{
        console.log(res);
        window.open(res.session.url, '_self');
},
error:(err)=>{
  this.errormessage=err.error.message;
  console.log(this.errormessage)
}
    })
    // console.log(this.shoppingcartform);
  }

 }



 checkshoppingcartformcash(){
  
  if(this.shoppingcartform.valid){
    this._Activatedroute.params.subscribe({
      next:(p)=>{
        this.cart_id=p['cartid'];
        if (this.cart_id=="undefined") {
          this.errormessage = "Cart ID is missing. Please select a cart.";
          return; // Stop execution if cart_id is not present
        }
        console.log(this.cart_id);
      }
    });
    this._order. createcashorder(this.cart_id,this.shoppingcartform.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._Router.navigate(['/allorders'])
        
},

error:(err)=>{
  
     this.errormessage=err.error.message;
     console.log(err)
  
 
  
  
}
    });
    // console.log(this.shoppingcartform);
  }

 }



}
