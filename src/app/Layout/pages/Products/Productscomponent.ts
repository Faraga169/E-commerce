import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/products/product.service';
import { Iproduct, productres } from '../../../iproduct';
import { CategorysliderComponent } from '../../addition/categoryslider/categoryslider.component';
import { HomesliderComponent } from '../../addition/homeslider/homeslider.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { CartService } from '../../../../app/shared/services/cart/cart.service';
import { Product } from '../../../iaddproducttocart';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../app/shared/services/wishlist/wishlist.service';
import { addwishlistres } from '../../../addwishlist';
import { wishlist, wishlistres } from '../../../wishlist';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorysliderComponent,FormsModule,HomesliderComponent,RouterLink,SearchPipe,OnsalePipe,DatePipe,CurrencyPipe,NgClass],
  templateUrl: './Products.component.html',
  styleUrl: './Products.component.scss'
})
export class ProductsComponent implements OnInit {
   date=new Date();
   product_id!:string;
   userword:string="";
  //  productid:string="";
  productlist:Iproduct[]=[];
  productcartlist:Product[]=[]
  wishlistid:string[]=[];
  isloading:boolean=false;
  isloadingbtn:boolean=false;
 
constructor(private _Activatedroute:ActivatedRoute,private _productservice:ProductService,private _cartservice:CartService,private toastr: ToastrService,private _wishlistservice:WishlistService){

}

ngOnInit(): void {
  if(typeof localStorage !='undefined'){
    localStorage.setItem('currentpage','/products');
  }

  this._wishlistservice.getloggeduserwishlist().subscribe({
    next : res => {
      console.log(res.data);
      for(let i=0 ; i< res.data.length ; i++)
      {
        this.wishlistid.push(res.data[i]._id);
      }

      console.log(this.wishlistid);
      


      
    }
   });
  
  this.getAllproduct();
 
  
}





getAllproduct(){
  this.isloading=true;
  this._productservice.getproduct().subscribe({
    next:(res)=>{
      this.isloading=false;
      this.productlist=res.data;
      console.log(this.productlist)
    },
    error:(err)=>{
      this.isloading=false;
      console.log(err)
    },
    complete:()=>{

    }
  })
}


getproduct_idtoaddtocart(product_id:string){
  // this._Activatedroute.params.subscribe({
  //   next:(res)=>{
  //     // this.product_id=res['id']
  //         console.log(res);
  //   }
  // })
  this.isloadingbtn=true;
   this._cartservice.Addproducttocart(product_id).subscribe({
    next:(res)=>{
      this.productcartlist=res.data.products
      this._cartservice.numberofcartitems.next(res.numOfCartItems)
         console.log(this.productcartlist);
         this.isloadingbtn=false;
          this.toastr.success(res.message,'',{
            timeOut: 5000,
            newestOnTop:false,
            positionClass:'toast-top-right'	,
            progressBar:true,
            titleClass:'toast-title'
          });
        
    },
    error:(err)=>{
      this.isloadingbtn=false;
      console.log(err);
    },
    complete:()=>{

    }
   })
}


addtowishlist(productid: string) {
        this._wishlistservice.Addproducttowishlist(productid).subscribe({
          next: (res) => {
            this.wishlistid.push(productid);
            this.updatewishlist(productid,true);
            console.log(res);
            console.log(this.wishlistid)
             this._wishlistservice.wishlistuser.next(res.data.length)
          console.log(res);
        this.toastr.success(res.message, '', {
          timeOut: 5000,
          newestOnTop: false,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          titleClass: 'toast-title'
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


removefromwishlist(productid:string){
  this._wishlistservice.removeproductfromwishlist(productid).subscribe({
    next:(res)=>{
      const index = this.wishlistid.indexOf(productid);
      this._wishlistservice.wishlistuser.next(res.data.length)
      this.wishlistid.splice(index,1);
      this.updatewishlist(productid,false)
      console.log(this.wishlistid)
    }
  })
}

updatewishlist(productid:string,isadded:boolean){
     if(isadded){
      document.getElementById(`${productid}`)?.classList.add('text-danger')
      document.getElementById(`${productid}`)?.classList.remove('text-dark')
     
     }
     else{
      document.getElementById(`${productid}`)?.classList.add('text-dark')
      document.getElementById(`${productid}`)?.classList.remove('text-danger')
      
     }
}


tooglewishlist(productid:string){
     if(this.wishlistid.includes(productid)){
      this.removefromwishlist(productid);
     }
     else{
      this.addtowishlist(productid);
     }
}

      }
      



