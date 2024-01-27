import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Login } from '../../models/Login';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginCollection: AngularFirestoreCollection<Login>;
  login: Observable<Login[]>;
  logindoc : AngularFirestoreDocument<Login>;

   constructor(public angularfirestore: AngularFirestore) {
    this.loginCollection = this.angularfirestore.collection('Login');
  }

  getLogin() {
  return this.login = this.loginCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Login;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  updateLogin( log : Login ){
    this.logindoc = this.angularfirestore.doc('Login/CjbjG4bhWW7BjlLloOpQ');
    this.logindoc.update(log);
  }
}
