import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../../app/shared/services/wishlist/wishlist.service';
import { wishlist } from '../../../wishlist';
import { CurrencyPipe } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
 wishlist:wishlist[]=[]
 isloading:boolean=true;
  constructor(private _whishlistservice:WishlistService,private toastr:ToastrService){

  }


  ngOnInit(): void {
    this.getloggeduserwishlist()
  }

  getloggeduserwishlist(){
    this.isloading=true;
    this._whishlistservice.getloggeduserwishlist().subscribe({
      next:(res)=>{
        this.isloading=false;
        this.wishlist=res.data;
        console.log(res)
      },
      error:(err)=>{
        this.isloading=false;
        console.log(err)
      }
    })
  }


  removespecificwishlist(product_id:string){
    this._whishlistservice.removeproductfromwishlist(product_id).subscribe({
      next:(res)=>{
        // if(res.count==0){
        //   this._whishlistservice.wishlistuser.next(0);
        // }
        
        this._whishlistservice.wishlistuser.next(res.data.length)
        this.wishlist = this.wishlist.filter(item => item._id !== product_id);
        console.log(this.wishlist)
        this.toastr.success(res.message, '', {
          timeOut: 5000,
          newestOnTop: false,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          titleClass: 'toast-title'
        });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
