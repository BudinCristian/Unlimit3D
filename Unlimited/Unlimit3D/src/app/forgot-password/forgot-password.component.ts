import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public authService: AuthService, private afAuth: AngularFireAuth, public dialog : MatDialog) { }

  email : string
  ngOnInit(): void {
  }

  forgotPassFunctionality(){
    if(this.email ==  null)
    {
        alert("Please fill in the form before submitting!")
        return;
    }
    else
    {
      this.afAuth.auth.sendPasswordResetEmail(this.email)
      alert("Email sent!")
      this.dialog.closeAll()
    }
    
  }
}
