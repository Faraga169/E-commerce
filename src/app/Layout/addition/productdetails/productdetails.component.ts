import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/products/product.service';
import { specificproduct } from '../../../ispecificproduct';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../../app/shared/services/cart/cart.service';
import { Iproduct } from '../../../iproduct';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../iaddproducttocart';


@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit {
  productdetailslist!:specificproduct;
  product_id:string="";
  isloading:boolean=false;
  isloadingbtn:boolean=false;
  productcartList:Product[]=[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 800,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(private _productservice:ProductService,private _ActivatedRoute:ActivatedRoute,private __cartservice:CartService,private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.getspecificproduct()
  }

  getspecificproduct(){
    this.isloading=true;
    this._ActivatedRoute.params.subscribe({
      next:(res)=>{
        
        this.product_id=res['id']
         console.log(this.product_id)
      }
     })
    this._productservice.getspecificproduct(this.product_id).subscribe({
      next:(res)=>{
        this.isloading=false;
        this.productdetailslist=res.data;
        console.log(this.productdetailslist)
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
     this.__cartservice.Addproducttocart(product_id).subscribe({
      next:(res)=>{
        this.__cartservice.numberofcartitems.next(res.numOfCartItems)
        this.productcartList=res.data.products;
           console.log(this.productcartList);
           this.isloadingbtn=false;
            this.toastr.success(res.message,'',{
              timeOut: 5000,
              progressBar:true,
              positionClass:'toast-top-right',      
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
}
