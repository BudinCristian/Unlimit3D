import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientService } from '../services/client/client.service';
import { Client } from '../models/Client';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.css']
})
export class EditProfileModalComponent implements OnInit {
input: any = {
  FirstName: "",
  LastName: "",
  Phone: "",
  Adress: ""
}
clients: Client[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private clientService : ClientService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.clientService.getClientByEmail1(this.data.email).subscribe(clients=>{this.clients=clients})
  }


  Submit() {
    for (const key in this.clients){
      if (this.clients[key] != null){
        if (this.input.LastName == "")
        this.input.LastName = this.clients[key].LastName
        if (this.input.FirstName == "")
        this.input.FirstName = this.clients[key].FirstName
        if (this.input.Phone == "")
        this.input.Phone = this.clients[key].Phone
        if (this.input.Adress == "")
        this.input.Adress = this.clients[key].Adress
      
      }
    }

    alert("Data updated successfully")
    this.clientService.updateProfile(this.input, this.data.id)
  }

}
