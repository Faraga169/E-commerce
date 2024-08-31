import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
@Injectable({
  providedIn: 'root'
})
export class MytranslateService {

  constructor(private _TranslateService:TranslateService) { 

      if(typeof localStorage!='undefined'){

        let defaultlang='English';
        let savelang=localStorage.getItem('lang');
        if(savelang){
          defaultlang=savelang
        }
       
        _TranslateService.setDefaultLang(defaultlang);
        _TranslateService.use(defaultlang);
    
    
        this.getdirection(defaultlang);
      }
   
    
  }

  getdirection(lang:string){
    if(lang=='Arabic'){
      document.dir='rtl';
    }
    else if(lang=='English'){
         document.dir='ltr';
    }
  }



  
 getlang(lang:string){
      localStorage.setItem('lang',lang);
      this._TranslateService.setDefaultLang(lang);
      this._TranslateService.use(lang);
      this.getdirection(lang);
 }
}
