import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Order } from 'src/app/models/Order';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css']
})
export class AcceptedOrdersComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private clientService:ClientService ,private orderService:OrdersService) { }
  orders : Order[];
  orderaccept = false;
  ngOnInit(): void {
    
    this.orderService.getAcceptedOrderById().subscribe(orders=>{this.orders=orders})
    }
    onClick(index :number){
      this.orderService.finishOrder(this.orders[index],JSON.parse(localStorage.getItem('owner')).uid).then(()=>{
        let order= this.orders[index];
      //  let email= this.clientService.getEmailForId(JSON.parse(localStorage.getItem('owner')).uid)
        this.orders=this.orders.filter(o=>o.id!= order.id)

      })
    }

}

  


