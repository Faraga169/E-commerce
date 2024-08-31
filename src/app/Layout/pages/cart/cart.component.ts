import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Iusercart, Product, Product2, usercartres } from '../../../iusercart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  isloading:boolean=false;
  cartList:Iusercart={} as Iusercart ;
  errmsg:string="";
  constructor(private _cartservice:CartService){

  }
  ngOnInit(): void {
    // if(typeof localStorage !='undefined'){
    //   localStorage.setItem('currentpage','/cart');
    // }

    this.getusercart();
   
  }


  getusercart(){
    this.isloading=true;
    this._cartservice.getusercart().subscribe({
      next:(res)=>{
        this.isloading=false;
        this.cartList=res.data;
        console.log(this.cartList)
      },
      error:(err)=>{
        this.isloading=false;
        console.log(err)
        this.errmsg=err.error.message;
        
      },
      complete:()=>{

      }
    })
  }


  updatecart(product_id:string,count:number){
    console.log(count);
    console.log(product_id);

    if(count<=0){
       this.removespecificitem(product_id);
    }

    else{
      this._cartservice.updatecartproduct(product_id,count.toString()).subscribe({
        next:(res)=>{
         this.cartList=res.data
         this._cartservice.numberofcartitems.next(res.numOfCartItems)
             console.log(this.cartList);
             
        },
        error:(err)=>{
          console.log(err)
        }
        })
      }
    }

    
    removespecificitem(product_id:string){
      this._cartservice.removespecificitem(product_id).subscribe({
        next:(res)=>{
          this.cartList=res.data;
          this._cartservice.numberofcartitems.next(res.numOfCartItems)
            console.log(this.cartList);
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

     clearusercart(){
      

      




      this._cartservice.clearusercart().subscribe({
        next:async (res)=>{
          this._cartservice.numberofcartitems.next(0)
          console.log(res);

          if(res.message=='success'){
            this.cartList={} as Iusercart;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-right',
              iconColor: 'danger',
              customClass: {
                popup: 'colored-toast',
              },
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            })
      
            await Toast.fire({
              icon:'success',
              title: 'remove products',
            })
            
          }
        
        }
        ,
        error:(err)=>{
          console.log(err)
        }
      })
    }



   



}
