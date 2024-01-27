import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShaperOrderComponent } from '../shaper-order/shaper-order.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { Owner } from '../models/Owner';
import { OwnerService } from '../services/owner/owner.service';
import { AuthService } from '../services/auth/auth.service';
import { AcceptModalComponent } from './accept-modal/accept-modal.component';
import { AcceptedOrdersComponent } from './accepted-orders/accepted-orders.component';
import { OrdersService } from '../services/orders/orders.service';
import { Order } from "../models/Order";
import { PrinterProfileComponent } from "../printer-profile/printer-profile.component";
import { OrderInfoModalComponent } from "../order-info-modal/order-info-modal.component";
import { PriceModalComponent } from "../printer-page/price-modal/price-modal.component";
import { NotifyPrinterModalComponent } from '../printer-page/notify-printer-modal/notify-printer-modal.component'
import { OrderSub } from '../models/OrderSub';

@Component({
  selector: 'app-printer-page',
  templateUrl: './printer-page.component.html',
  styleUrls: ['./printer-page.component.css']
})

export class PrinterPageComponent implements OnInit {

  constructor(private ownerService: OwnerService, public dialog: MatDialog, public authService: AuthService, public orderService: OrdersService) { }


  owners: Owner[];
  id: string;
  id1: string;
  orders: Order[];
  orders1: Order[];
  ordersSub: OrderSub[];

  ngOnInit(): void {


    this.authService.getOwnerState().subscribe(owners => {
      this.owners = owners;
    })

    this.orderService.getAccOrders1(this.owners).subscribe(orders => {
      this.orders = orders;
    })

    this.orderService.getOrders().subscribe(orders => {
      this.orders1 = orders;
    })

    this.orderService.getOrderSubById1().subscribe(ordersSub => {
      this.ordersSub = ordersSub;
    })

  }

  ngOnDestroy(): void {
    this.authService.logout();
  }



  openDialog() {
    for (const key in this.owners) {
      if (this.owners[key] != null) {
        this.id = this.owners[key].id;
        break;
      }
    }
    console.log(this.id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(AcceptModalComponent,
      {
        width: "600px",
        height: "400px",
        disableClose: true,
        data: {
          id: this.id,

        }
      });
  }

  openMyOrders() {
    for (const key in this.owners) {
      if (this.owners[key] != null) {
        this.id = this.owners[key].id;
        break;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(PriceModalComponent,
      {
        width: "100px",
        height: "200px",
        disableClose: true,
        data: {
          id: this.id,
        }
      });
  }

  openProfileModal() {
    for (const key in this.owners) {
      if (this.owners[key] != null) {
        this.id = this.owners[key].Email;
        this.id1 = this.owners[key].id;
        break;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(PrinterProfileComponent,
      {
        width: "600px",
        height: "500px",
        disableClose: true,
        data: {
          email: this.id,
          id: this.id1
        }
      });
  }

  openInfoModal(orderid: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(OrderInfoModalComponent,
      {
        width: "600px",
        height: "400px",
        disableClose: true,
        data: {
          id: orderid,
        }
      });
  }

  openPriceModal(orderid: string, ownerid: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(PriceModalComponent,
      {
        width: "250px",
        height: "200px",
        disableClose: true,
        data: {
          ownerid: ownerid,
          orderid: orderid
        }
      });
  }

  openNotify() {
    for (const key in this.owners) {
      if (this.owners[key] != null) {
        this.id = this.owners[key].id;
        break;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(NotifyPrinterModalComponent,
      {
        width: "800px",
        height: "600px",
        disableClose: true,
        data: {
          id: this.id,
        }
      });
  }

  Rejected(orderid: string, ownerid: string) {


    this.orderService.setRefOrders(orderid, ownerid)
  }
  checkorder(order: Order, ownerid: string) {
    if (order.Direct == true)
      return true;

    for (const key in order.DoneOrders)
      if (order.DoneOrders[key] == ownerid)
        return true;
    return false;
  }


  signOut() {
    this.authService.logout();
  }


}





