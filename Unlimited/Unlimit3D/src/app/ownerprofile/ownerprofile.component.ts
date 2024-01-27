import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OwnerService } from '../services/owner/owner.service';
import { Owner } from '../models/Owner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import {ShaperOrderComponent} from '../shaper-order/shaper-order.component';

@Component({
  selector: 'app-ownerprofile',
  templateUrl: './ownerprofile.component.html',
  styleUrls: ['./ownerprofile.component.css']
})
export class OwnerprofileComponent implements OnInit {

  owners: Owner[]
  direct: boolean = true
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private ownerService : OwnerService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.ownerService.getOwnersByEmail(this.data.owner.Email).subscribe(owners=>{this.owners=owners})
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%";
    this.dialog.open(ShaperOrderComponent,
      {
        width: "600px",
        height: "420px",
        disableClose: true,
        data: {
          id: this.data.id,
          owner: this.data.owner,
          direct: this.direct
        }
      });
  }
  setPercentage(percent : number){
    return ( percent*20 + '%')

  }
}
