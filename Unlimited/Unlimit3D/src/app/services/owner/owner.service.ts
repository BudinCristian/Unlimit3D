import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Owner } from '../../models/Owner';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  ownersCollection: AngularFirestoreCollection<Owner>;
  owners: Observable<Owner[]>;

  constructor(public angularfirestore: AngularFirestore) {
    this.ownersCollection = this.angularfirestore.collection('Owner');
  }

  getOwners() {
    return this.owners = this.ownersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Owner;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  getOwnersByEmail(email : string) {
    return this.owners = this.angularfirestore.collection('Owner', ref => ref.where('Email', '==', email)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Owner;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  getTop3(){
    return this.owners = this.angularfirestore.collection('Owner', ref => ref.limit(3)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Owner;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  addOwner(owner: Owner){
  this.ownersCollection.add(owner);
  }

  updateProfile(input: any, idOwner: string) {

    this.angularfirestore.collection('Owner').doc(idOwner).update({
        Description : input.Description,
        FirstName: input.FirstName,
        LastName: input.LastName,
        Phone: input.Phone,
        Adress: input.Adress,
        ImageURL: input.ImageURL
    })
      
  }
}
