import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders/orders.service';
import { OwnerService } from '../../services/owner/owner.service';
import { Order } from '../../models/Order';
import { Owner } from '../../models/Owner';
import { OrderSub } from '../../models/OrderSub';

@Component({
  selector: 'app-notify-modal',
  templateUrl: './notify-modal.component.html',
  styleUrls: ['./notify-modal.component.css']
})
export class NotifyModalComponent implements OnInit {

  orders: Order[];
  ordersSub: OrderSub[];
  owners : Owner[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ordersService: OrdersService, public ownerService : OwnerService) { }

  ngOnInit(): void {
    this.ordersService.getAccOrders(this.data.id).subscribe(orders => {
      this.orders = orders
    })

    this.ordersService.getOrderSubCol().subscribe(ordersSub => {
      this.ordersSub = ordersSub
    })

    this.ownerService.getOwners().subscribe(owners => {
      this.owners = owners
    })
  }

  closeModal() {
  }

  Rejected(orderid: string, ownerid: string, ordersubid: string) {
    this.ordersService.setRefNotify(ownerid, orderid, ordersubid)
  }

  Accepted(orderid: string, ownerid: string, price: string, ordersubid : string) {
    this.ordersService.setOrderId(ownerid, orderid, price, ordersubid)
  }

}
