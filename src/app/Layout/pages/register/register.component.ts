import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Isignup } from '../../../isignup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {

  data:Isignup[]=[];
  errMsg!:string;
  isloading:boolean=false;
constructor(private _AuthService:AuthService,private _Router:Router){

}




 registerform:FormGroup=new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]),
  rePassword:new FormControl(null,Validators.required),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

 },this.checkrepasswordmatch)

 
 submitform():void{
  console.log(this.registerform);
  this.isloading=true;
  if(this.registerform.valid){
    this._AuthService.postsignup(this.registerform.value).subscribe({
      next:(res)=>{
          //  this.data=res;
           console.log(res)
           this.isloading=false;
          //  navigate home , login>> programtic routing
          this._Router.navigate(['/login'])
      },
  
      error:(err)=>{
        console.log(err);
        this.isloading=false;
        this.errMsg="Account already exist"
      },
  
      complete:()=>{
        
      }
    })
  }
  
  
  
 }


 checkrepasswordmatch(g:AbstractControl){
  if(g.get('password')?.value===g.get('rePassword')?.value){
    return null
  }
  else{
    g.get('rePassword')?.setErrors({mismatch:true})
    return {mismatch:true}
  }
 }
}
