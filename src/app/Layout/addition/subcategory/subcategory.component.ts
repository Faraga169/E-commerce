import { ActivatedRoute } from '@angular/router';
import { SubcategoriesService } from '../../../../app/shared/services/subcategories/subcategories.service';
import { Component, OnInit } from '@angular/core';
import { subcategories } from '../../../isubcategories';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss'
})
export class SubcategoryComponent implements OnInit {
  categoryid:string=""
  subcategorylist:subcategories[]=[]
  isloading:boolean=true;
     constructor(private _subcategoryservice:SubcategoriesService,private _ActivateRoute:ActivatedRoute){

     }

     ngOnInit(): void {
       this.getsubcategory()
     }


     getsubcategory(){
      this._ActivateRoute.params.subscribe({
        next:(res)=>{
           this.categoryid=res['categoryid']
           console.log(this.categoryid)
        }
      })
      this.isloading=true;
      this._subcategoryservice.getspecificsubcategoryfromcategories(this.categoryid).subscribe({
        next:(res)=>{
         this.isloading=false;
         this.subcategorylist=res.data
              console.log(this.subcategorylist)
        },
        error:(err)=>{
          this.isloading=false;
              console.log(err);
        }
      })
     }
}
