import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OwnerService} from '../services/owner/owner.service';
import { Owner } from '../models/Owner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { PrinterEditProfileComponent } from '../printer-edit-profile/printer-edit-profile.component'

@Component({
  selector: 'app-printer-profile',
  templateUrl: './printer-profile.component.html',
  styleUrls: ['./printer-profile.component.css']
})
export class PrinterProfileComponent implements OnInit {


  owners : Owner[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private ownerService : OwnerService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.ownerService.getOwnersByEmail(this.data.email).subscribe(owners=>{this.owners=owners})
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%" ;
      this.dialog.open(PrinterEditProfileComponent,
          {
              width: "700px",
              height: "503px",
              data: {
                email: this.data.email,
                id: this.data.id
              },
      disableClose: true,
    });
  }

  setPercentage(percent : number){
    return ( percent*20 + '%')

  }

}
