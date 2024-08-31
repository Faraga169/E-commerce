import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent  {
  
  isloading:boolean=false;
  isloadingcode:boolean=false;
  isloadingreset:boolean=false;
  errmsg!:string;
  errmsgcode!:string;
  errmsgreset!:string;
  emailformflag:boolean=true;
  codeformflag:boolean=false;
  resetformflag:boolean=false;
  constructor(private _Authservice:AuthService,private _Router:Router){

  }
  forgetpasswordform:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
   })
  resetpasswordform:FormGroup=new FormGroup({
    // {value:this.forgetpasswordform.get('email')?.value,disabled:true}
    email:new FormControl(localStorage.getItem('email'),[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)])
   })

  codeform:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{3,}$/)]),
   })

  




   checkresetpasswordform(){
   
    this.isloadingreset=true;
    this._Authservice.resetpassword(this.resetpasswordform.value).subscribe({
      next:(res)=>{
        this.isloadingreset=false;
        localStorage.setItem('usertoken',res.token);
        this._Authservice.DecodeuserData();
        this._Router.navigate(['/home'])
       


           console.log(res)
      },
      error:(err)=>{
        this.isloadingreset=false;
        this.errmsgreset=err.error.message;
        console.log(err)
      },
      complete:()=>{

      }
    })
    console.log(this.resetpasswordform);
   }

   checkcodeform(){
   
    this.isloading=true;
    this._Authservice.verifyresetpassword(this.codeform.value).subscribe({
      next:(res)=>{
        this.isloadingcode=false;
        this.codeformflag=false;
        this.resetformflag=true;
           console.log(res)
      },
      error:(err)=>{
        this.isloadingcode=false;
        this.errmsgcode=err.error.message;
        console.log(err)
      },
      complete:()=>{

      }
    })
    console.log(this.codeform);
   }

   checkforgetpassword(){
    this.isloading=true;
   this._Authservice.forgotpassword(this.forgetpasswordform.value).subscribe({
    next:(res)=>{
      localStorage.setItem('email',this.forgetpasswordform.get('email')?.value)
      this.isloading=false;
      this.codeformflag=true;
      this.emailformflag=false;
         console.log(res)
    },
    error:(err)=>{
      this.isloading=false;
      this.errmsg=err.error.message;
      
      console.log(err)
    },
    complete:()=>{

    }
   })
    console.log(this.forgetpasswordform)
   }


}
