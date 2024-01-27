import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientService } from '../services/client/client.service';
import { Client } from '../models/Client';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component'


@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  clients: Client[];
  id: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private clientService : ClientService, public dialog : MatDialog) { }

  ngOnInit(): void {
    console.log(this.data.id);
    this.clientService.getClientByEmail1(this.data.id).subscribe(clients=>{this.clients=clients})

  }

  openDialog(){
    for (const key in this.clients){
      if (this.clients[key] != null)
        this.id = this.clients[key].id;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%" ;
      this.dialog.open(EditProfileModalComponent,
          {
              width: "600px",
              height: "400px",
              data: {
                email: this.data.id,
                id: this.id
              },
      disableClose: true,
    });
  }

}
