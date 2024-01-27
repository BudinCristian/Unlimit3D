import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PartnerModalComponent } from '../partner-modal/partner-modal.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
})

export class HomepageComponent implements OnInit {

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "225px";
        document.getElementById("logoImg").style.marginLeft = "17%";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("logoImg").style.marginLeft = "2%";
    }

  toHome(){
    document.getElementById("home").scrollIntoView({behavior:"smooth"});
  }

  toAboutus(){
    document.getElementById("aboutus").scrollIntoView({behavior:"smooth"});
  }

  toAboutapp(){
    document.getElementById("aboutapp").scrollIntoView({behavior:"smooth"});
  }

  toPartners(){
    document.getElementById("partners").scrollIntoView({behavior:"smooth"});
  }

    openDialog(id:any) {
      console.log(id);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.width = "60%";
        this.dialog.open(PartnerModalComponent,
            {
                width: "400px",
                height: "450px",
                disableClose: true,
                data: {
                  id: id
                }
            });
    }

    

}

