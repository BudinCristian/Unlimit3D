import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/models/Order';


@Component({
  selector: 'app-accept-modal',
  templateUrl: './accept-modal.component.html',
  styleUrls: ['./accept-modal.component.css']
})
export class AcceptModalComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private orderService:OrdersService) { }
  orders : Order[];
  orderaccept = false;
  ngOnInit(): void {
    this.orderService.getNotAcceptedOrderById().subscribe(orders=>{this.orders=orders})
    
    }
    onClick(index :number){
      this.orderService.acceptOrder(this.orders[index],JSON.parse(localStorage.getItem('owner')).uid).then(()=>{
        let order= this.orders[index];
        this.orders=this.orders.filter(o=>o.id!= order.id)
      })
    }

}
