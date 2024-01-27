import { Component, OnInit,Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrdersService } from '../services/orders/orders.service';
import { Order } from '../models/Order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders : Order[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private ordersService : OrdersService) { }

  ngOnInit(): void {
      this.ordersService.getOrderId(this.data.id)
      this.ordersService.getOrderById().subscribe(orders=>{this.orders=orders})    
  }

  closeModal(){
     localStorage.removeItem('orderId');
  }
}
