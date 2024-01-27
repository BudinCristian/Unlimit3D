import { Component, OnInit } from '@angular/core';
import { Client } from '../models/Client';
import { ClientService } from '../services/client/client.service';
import { Shaper } from '../models/Shaper';
import { ShaperService } from '../services/shaper/shaper.service';
import { Owner } from '../models/Owner';
import { OwnerService } from '../services/owner/owner.service';
import { Login} from '../models/Login';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

function hasEmptyFields(obj: any) {
  let ct = 0;
  for (const key in obj) {
    if (obj[key] === '') {
      ct++;
      break;
    }
  }

  if (ct === 1) {
    return true;
  }
  return false;
}

function hasSameUserEmail(obj1: any, obj2: any, logcheck: any) {
  let ct = 0;
  for (const key in obj1) {
    if (obj1[key].Email === obj2.UserEmail || obj1[key].Username === obj2.UserEmail) {
      ct++;
      logcheck.emailcheck=obj1[key].Email;
      break;
    }
  }

  if (ct === 1) {
    return false;
  }
  return true;
}



function hasSamePassword(obj1: any, obj2: any) {
  let ct = 0;
  for (const key in obj1) {
    if (obj1[key].Password == obj2.Password) {
      ct++;
      break;
    }
  }

  if (ct === 1) {
    return false;
  }
  return true;
}




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  input: any = {
    UserEmail: '',
    Password: ''
  }

  logincheck: String;
  counter: boolean = false;
  logcheck: any = {Usertype:'' ,
  emailcheck:''
  };

  constructor(private clientService: ClientService, private ownerService: OwnerService, private shaperService: ShaperService, private loginService: LoginService,
      private router: Router, private authService : AuthService,  public dialog : MatDialog) { }
  clients: Client[];
  shapers: Shaper[];
  owners: Owner[];


  ngOnInit(): void {
  }

  ClientSignIn() {
    if (this.clients == null)
      this.clientService.getClients().subscribe(clients => {
        this.clients = clients;
      })

    this.logincheck = "Client";
    this.counter = true;
  }

  OwnerSignIn() {
    if (this.owners == null)
      this.ownerService.getOwners().subscribe(owners => {
        this.owners = owners;
      })
    this.logincheck = "Owner";
    this.counter = true;
  }

  ShaperSignIn() {
    if (this.shapers == null)
    this.shaperService.getShapers().subscribe(shapers => {
      this.shapers = shapers;
    })
    this.logincheck = "Shaper";
    this.counter = true;
  }

  onClick() {
    if (this.counter == false) {
      alert("Please select account type!");
      return;
    }

    if (hasEmptyFields(this.input)) {
      alert('No empty fields allowed.');
      return;
    }

    if (this.logincheck == "Client") {

      if (hasSameUserEmail(this.clients, this.input, this.logcheck)) {
        alert('Email or Username could not be found');
        return;
      }

      //if (hasSamePassword(this.clients, this.input)) {
      //  alert('Pasword is incorrect');
      //  return;
      //}
     
      this.authService.loginClient(
        this.input.UserEmail,
        this.input.Password
      );
      return;
    }

    if (this.logincheck == "Owner") {

      if (hasSameUserEmail(this.owners, this.input, this.logcheck)) {
        alert('Email or Username could not be found');
        return;
      }

      //if (hasSamePassword(this.owners, this.input)) {
      //  alert('Pasword is incorrect');
      //  return;
      //}

       this.authService.loginOwner(
        this.input.UserEmail,
        this.input.Password
      );
      return;

    }

    if (this.logincheck == "Shaper") {

      if (hasSameUserEmail(this.shapers, this.input, this.logcheck)) {
        alert('Email or Username could not be found');
        return;
      }

      //if (hasSamePassword(this.shapers, this.input)) {
      //  alert('Pasword is incorrect');
      //  return;
      //}

      alert("Login succesfully!")
      return;
    }
  }

  openForgotPassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "60%" ;
      this.dialog.open(ForgotPasswordComponent,
          {
              width: "500px",
              height: "220px",
              disableClose: true,
    });
  }

  ClickToSignUp(){
    this.router.navigate(['/signup']);
  }

}
