import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders/orders.service';
import { ClientService } from '../../services/client/client.service';
import { Order } from '../../models/Order';
import { Client } from '../../models/Client';
import { OrderSub } from '../../models/OrderSub';


@Component({
  selector: 'app-notify-printer-modal',
  templateUrl: './notify-printer-modal.component.html',
  styleUrls: ['./notify-printer-modal.component.css']
})
export class NotifyPrinterModalComponent implements OnInit {

  ordersSub: OrderSub[];
  orders: Order[];
  clients: Client[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ordersService: OrdersService, public clientService : ClientService) { }

  ngOnInit(): void {
    this.ordersService.getOrderSubById(this.data.id).subscribe(ordersSub => {
      this.ordersSub = ordersSub;
    })

    this.ordersService.getOrderByOwnerId(this.data.id).subscribe(orders => {
      this.orders = orders;
    })

    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    })

  }

  Rejected(orderid: string, orderSubId: string) {
    this.ordersService.setClosedNotify(orderSubId)
  }

  closeModal() {

  }

}
