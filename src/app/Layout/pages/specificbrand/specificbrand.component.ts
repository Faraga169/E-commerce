import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../../app/shared/services/brand/brands.service';
import { specificbrand } from '../../../ispecificbrand';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-specificproduct',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './specificbrand.component.html',
  styleUrl: './specificbrand.component.scss'
})
export class Specificbrandcomponent implements OnInit {
  specificbrand!:specificbrand;
  isloading=true;
  brandid:string="";
  constructor(private _brandsservice:BrandsService,private _Activateroue:ActivatedRoute){}

  ngOnInit(): void {
    this.displaybrand();
  }

  displaybrand(){
    this.isloading=true;
    this._Activateroue.params.subscribe({
      next:(res)=>{
     
        this.brandid=res['brandid']
        console.log(this.brandid);
      }
    })
    this._brandsservice.getspecificbrand(this.brandid).subscribe({
      next:(res)=>{
        this.isloading=false;
        this.specificbrand=res.data;
        console.log(this.specificbrand);
      },
      error:(err)=>{
        this.isloading=false;
        console.log(err)
      }
    })
  }
}
