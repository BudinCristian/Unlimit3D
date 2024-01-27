import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client/client.service';
import { Client } from '../models/Client';
import { Owner } from '../models/Owner';
import { OwnerService } from '../services/owner/owner.service';
import { Shaper } from '../models/Shaper';
import { ShaperService } from '../services/shaper/shaper.service';
import { AuthService} from '../services/auth/auth.service';




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

function hasSameEmail(obj1: any, obj2: any) {
  let ct = 0;
  for (const key in obj1) {
    if (obj1[key].Email == obj2.Email) {
      ct++;
      break;
    }
  }

  if (ct === 1) {
    return true;
  }
  return false;
}

function hasSameUsername(obj1: any, obj2: any) {
  let ct = 0;
  for (const key in obj1) {
    if (obj1[key].Username == obj2.Username) {
      ct++;
      break;
    }
  }

  if (ct === 1) {
    return true;
  }
  return false
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {


  input: any = {
    Username: '',
    Email: '',
    Adress: '',
    FirstName: '',
    LastName: '',
    Phone: '',
    Password: '',
    UserType: '',
  }


  confirmedPassword: string;
  signupCheck: string;
  email: string;
  password: string;
  counter: boolean = false;

  constructor(private clientService: ClientService, private ownerService: OwnerService, private shaperService: ShaperService, private authService: AuthService) { }
  clients: Client[];
  owners: Owner[];
  shapers: Shaper[];


  ngOnInit(): void {
    var scrollElm = document.scrollingElement;
    scrollElm.scrollTop = 0;
  }

  ClientSignUp() {
    if(this.clients == null)
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    })

    this.signupCheck = 'Client';
    this.counter = true;
    this.input.UserType = 'Client';
  }

  ShaperSignUp() {
    if(this.shapers == null)
    
    this.shaperService.getShapers().subscribe(shapers => {
      this.shapers = shapers;
    })
    this.signupCheck = 'Shaper';
    this.counter = true;
    this.input.UserType = 'Shaper';
  }

  OwnerSignUp() {
    if(this.owners == null)
    this.ownerService.getOwners().subscribe(owners => {
      this.owners = owners;
    })
  
    this.signupCheck = 'Owner';
    this.counter = true;
    this.input.UserType = 'Owner';
  }

  onClick() {


    if (this.counter == false) {
      alert('Please select account type');
      return;
    }

    if (hasEmptyFields(this.input)) {
      alert('No empty fields allowed.');
      return;
    }

    if (this.confirmedPassword !== this.input.Password) {
      alert('Password and Confirmed Password Fields must have the same value.');
      return;
    }

    
      
 
   
    if (this.signupCheck == 'Client') {

      if (hasSameUsername(this.clients, this.input)) {
        alert('Username already exists');
        return;
      }

      this.authService.emailSignup(
        this.input
        );
     // this.clientService.addClient(this.input);
  
      return;


    }


    if (this.signupCheck == 'Shaper') {


      if (hasSameUsername(this.shapers, this.input)) {
        alert('Username already exists');
        return;
      }


      this.authService.emailSignup(
        this.input
        );
      //this.shaperService.addShaper(this.input);

      return;

    }

    if (this.signupCheck == 'Owner') {

  

      if (hasSameUsername(this.owners, this.input)) {
        alert('Username already exists');
        return;
      }

      this.authService.emailSignup(
        this.input
        );
     // this.ownerService.addOwner(this.input);

      return;
    }


  }
}


