import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../services/client/client.service';
import { Client } from '../models/Client';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component'
import { OrdersService } from '../services/orders/orders.service';
import { Order } from '../models/Order';

@Component({
  selector: 'app-order-info-modal',
  templateUrl: './order-info-modal.component.html',
  styleUrls: ['./order-info-modal.component.css']
})
export class OrderInfoModalComponent implements OnInit {

  orders : Order[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private ordersService : OrdersService) { }

  ngOnInit(): void {
      this.ordersService.getOrderByOrderID(this.data.id).subscribe(orders=>{
      this.orders = orders
      })
  }

  closeModal() {
  }



}
