import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { Client } from '../../models/Client';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Owner } from 'src/app/models/Owner';
import { IfStmt } from '@angular/compiler';


@Injectable()
export class AuthService {

  clients: Observable<Client[]>;
  owners: Observable<Owner[]>
  newUser: any;
  clientUserData: firebase.User;
  ownerUserData: firebase.User;
  password: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore) {

  }


  //bring logged in client data into client page
  getClientState() {
    if (this.afAuth.auth.currentUser == null) {
      this.clientUserData = JSON.parse(localStorage.getItem('user'));
      this.password = JSON.parse(localStorage.getItem('password'));
      this.afAuth.auth.signInWithEmailAndPassword(this.clientUserData.email, this.password);
    }

    return this.clients = this.afs.collection(`Client`, ref => ref.where('Email', '==', this.clientUserData.email)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Client;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  getOwnerState() {
    if (this.afAuth.auth.currentUser == null) {
      this.ownerUserData = JSON.parse(localStorage.getItem('user'));
      this.password = JSON.parse(localStorage.getItem('password'));
      this.afAuth.auth.signInWithEmailAndPassword(this.ownerUserData.email, this.password);
    }

    return this.owners = this.afs.collection(`Owner`, ref => ref.where('Email', '==', this.ownerUserData.email)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Owner;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }



  //login for client
  loginClient(email: string, password: string) {
    localStorage.setItem('password', JSON.stringify(password));
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        if (userCredentials) {
          localStorage.setItem('user', JSON.stringify(userCredentials.user));
          this.clientUserData = userCredentials.user;
          this.router.navigateByUrl('/clientpage');
        }
      })
      .catch(err => {
        alert(err.message);
      });
  }


  //login for owner
  loginOwner(email: string, password: string) {
    localStorage.setItem('password', JSON.stringify(password));
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        if (userCredentials)
          localStorage.setItem('user', JSON.stringify(userCredentials.user));
        this.ownerUserData = userCredentials.user;
        this.router.navigateByUrl('/ownerpage');
      })
      .catch(err => {
        alert(err.message);
      });
  }

  //sign up
  emailSignup(input: any) {
    this.afAuth.auth.createUserWithEmailAndPassword(input.Email, input.Password)
      .then(userCredentials => {
        this.newUser = input;
        userCredentials.user.updateProfile({
          displayName: input.Username,

        });

        this.insertUserData(userCredentials)
          .then(() => {
            alert("Account Created")
            this.router.navigateByUrl('/signin')
          })

      })
      .catch(error => {
        alert(error);
      });
  }
  //add sign up data into firebase
  insertUserData(userCredentials: firebase.auth.UserCredential) {
    if (this.newUser.UserType == 'Owner')
      return this.afs.doc(`${this.newUser.UserType}/${userCredentials.user.uid}`).set({
        Email: this.newUser.Email,
        FirstName: this.newUser.FirstName,
        LastName: this.newUser.LastName,
        UserType: this.newUser.UserType,
        Phone: this.newUser.Phone,
        Adress: this.newUser.Adress,
        Password: this.newUser.Password,
        ImageURL: '',
        Description: ' '

      })
    else
      return this.afs.doc(`${this.newUser.UserType}/${userCredentials.user.uid}`).set({
        Email: this.newUser.Email,
        FirstName: this.newUser.FirstName,
        LastName: this.newUser.LastName,
        UserType: this.newUser.UserType,
        Phone: this.newUser.Phone,
        Adress: this.newUser.Adress,
        Password: this.newUser.Password,

      })
  }

  //logout the current logged in user
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/homepage']);
    });
  }

  clientguard(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  ownerguard(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }


}
