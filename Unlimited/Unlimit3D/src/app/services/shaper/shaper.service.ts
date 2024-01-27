import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Shaper } from '../../models/Shaper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShaperService {
  shapersCollection: AngularFirestoreCollection<Shaper>;
  shapers: Observable<Shaper[]>;
 userdoc : AngularFirestoreDocument<Shaper>;
  
  

  constructor(public angularfirestore: AngularFirestore) {
    this.shapersCollection = this.angularfirestore.collection('Shaper');
  }

  getShapers() {
    return this.shapers = this.shapersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Shaper;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
    
  }

  getTop3(){
    return this.shapers = this.angularfirestore.collection('Shaper', ref => ref.orderBy('CompleteOrders').limit(3))
    .snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Shaper;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  addShaper(client: Shaper) {
    this.shapersCollection.add(client);
  }

}


