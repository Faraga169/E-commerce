import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../../app/shared/services/brand/brands.service';
import { allbrand } from '../../../iallbrands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  allbrands:allbrand[]=[]
  isloading=true;
  constructor(private _brandsservice:BrandsService){

  }
  ngOnInit(): void {
    if(typeof localStorage !='undefined'){
      localStorage.setItem('currentpage','/brands');
    }
   this.getallbrands()
}


getallbrands(){
  this.isloading=true;
  this._brandsservice.getallbrands().subscribe({
next:(res)=>{
  this.allbrands=res.data;
  this.isloading=false;
console.log(this.allbrands)
},
error:(err)=>{
  this.isloading=false;
  console.log(err)
}
  })
}



}
