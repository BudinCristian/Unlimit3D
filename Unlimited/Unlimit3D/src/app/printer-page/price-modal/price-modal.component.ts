import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrdersService } from '../../services/orders/orders.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-price-modal',
  templateUrl: './price-modal.component.html',
  styleUrls: ['./price-modal.component.css']
})
export class PriceModalComponent implements OnInit {

  price: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public orderService: OrdersService, public dialog : MatDialog) { }
 
  ngOnInit(): void {
  }

  Accepted() {

    console.log(this.price)

  if (this.price != null && this.price > 0)
    this.orderService.setAccOrders(this.data.orderid, this.data.ownerid, this.price)
  else
    alert("Please enter a valid Price!")

  this.price = 0;
  this.dialog.closeAll()
}

}
