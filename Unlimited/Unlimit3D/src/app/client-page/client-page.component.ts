import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShaperOrderComponent } from '../shaper-order/shaper-order.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { Client } from '../models/Client';
import { Owner } from '../models/Owner';
import { ClientService } from '../services/client/client.service';
import { OwnerService } from '../services/owner/owner.service';
import { AuthService } from '../services/auth/auth.service';
import { NotifyModalComponent } from './notify-modal/notify-modal.component'
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import {OwnerprofileComponent} from '../ownerprofile/ownerprofile.component';




@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.css']
})
export class ClientPageComponent implements OnInit {


  constructor(private clientService: ClientService, private ownerService: OwnerService, public dialog: MatDialog, public authService: AuthService) { }


  clients: Client[];
  owners: Owner[];
  id: string;
  direct: boolean = false

  ngOnInit(): void {


    this.authService.getClientState().subscribe(clients => {
      this.clients = clients;
    })

    this.ownerService.getOwners().subscribe(owners => {
      this.owners = owners;
    })





  }

  ngOnDestroy(): void {
    this.authService.logout();
  }



  openDialog() {
    for (const key in this.clients) {
      if (this.clients[key] != null) {
        this.id = this.clients[key].id;
        break;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(ShaperOrderComponent,
      {
        width: "600px",
        height: "470px",
        disableClose: true,
        data: {
          id: this.id,
          direct: this.direct
        }
      });
  }

  openProfileModal() {
    for (const key in this.clients) {
      if (this.clients[key] != null) {
        this.id = this.clients[key].Email;
        break;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(ProfileModalComponent,
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
    for (const key in this.clients) {
      if (this.clients[key] != null) {
        this.id = this.clients[key].id;
        break;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(MyOrdersComponent,
      {
        width: "600px",
        height: "400px",
        disableClose: true,
        data: {
          id: this.id,
        }
      });
  }

  openNotify() {
    for (const key in this.clients) {
      if (this.clients[key] != null) {
        this.id = this.clients[key].id;
        break;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(NotifyModalComponent,
      {
        width: "600px",
        height: "400px",
        disableClose: true,
        data: {
          id: this.id,
        }
      });
  }

  openModal(owner: Owner){
    for (const key in this.clients) {
      if (this.clients[key] != null) {
        this.id = this.clients[key].id;
        break;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(OwnerprofileComponent,
      {
        width: "600px",
        height: "470px",
        disableClose: true,
        data: {
          owner: owner,
          id: this.id
        }
      });
  }

  signOut() {
    this.authService.logout();
  }


}
