import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../../iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform( productlist:Iproduct[],userword:string): Iproduct[] {
    return productlist.filter( (item)=>
         item.title.toUpperCase().includes(userword.toUpperCase())
        
    );
    
  }

}
