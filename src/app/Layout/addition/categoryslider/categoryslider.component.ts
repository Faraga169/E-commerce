import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/categories/category.service';
import { category } from '../../../category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categoryslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss'
})
export class CategorysliderComponent implements OnInit{
  categorylist:category[]=[]
  isloading=false;
  customOptions: OwlOptions = {
    loop: true,
    rtl:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 800,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  constructor(private _categoryservice:CategoryService){}

ngOnInit(): void {
    this.isloading=true;
    this._categoryservice.getcategory().subscribe({
      next:(res)=>{
        this.isloading=false;
        this.categorylist=res.data
          console.log(res)
      },
      error:(err)=>{
        this.isloading=false;
        console.log(err)
      }
    })
  }
}


