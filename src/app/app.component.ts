import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Layout/addition/navbar/navbar.component';
import { FooterComponent } from './Layout/addition/footer/footer.component';
import { CartService } from '../app/shared/services/cart/cart.service';
import { Iusercart } from './iusercart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'E-commerce';
  constructor(private _cartservice:CartService){

  }

  // ngOnInit(): void {
  //     this._cartservice.getusercart().subscribe({
  //       next:(res)=>{
  //         this._cartservice.numberofcartitems.next(res.numOfCartItems)
  //       },
  //       error:(err)=>{
         
  //         console.log(err)
         
          
  //       },
  //       complete:()=>{
  
  //       }
  //     })
  //   }
   }

