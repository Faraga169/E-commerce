
import { CartItem, userorderres} from '../../../iuserorder';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../app/shared/services/order/order.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  constructor(private _orderdervice:OrderService,private _authservice:AuthService){}
    orderlist!:userorderres[];
   userid=this._authservice.userData()['id'];
   createdat:any;
  ngOnInit(): void {
    this.getuserorders()
    
  }


  getuserorders(){
       this._orderdervice.getuserorder(this.userid).subscribe({
          next:(res)=>{
            this.orderlist = res;

            // this.createdat=res[0].createdAt;
            console.log(this.orderlist)
          },
          error:(err)=>{
            console.log(err)
          }
       })
  }

  

}
