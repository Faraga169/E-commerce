import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/categories/category.service';
import { category } from '../../../category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
 categorylist:category[]=[]
 isloading=true;
  constructor(private _categoriesservice:CategoryService){

  }
  ngOnInit(): void {
    if(typeof localStorage !='undefined'){
      localStorage.setItem('currentpage','/categories');
    }
      this.getallcategories();

  }


  getallcategories(){
    this.isloading=true;
    this._categoriesservice.getcategory().subscribe({
      next:(res)=>{
        this.isloading=false;;
        this.categorylist=res.data
        console.log(this.categorylist);
      },
      error:(err)=>{
        this.isloading=false;
        console.log(err)
      }
    })
  }
  
}
