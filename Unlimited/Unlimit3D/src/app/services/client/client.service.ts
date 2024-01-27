import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Client } from '../../models/Client';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;
  
  constructor(public angularfirestore: AngularFirestore, public afAuth: AngularFireAuth) {
    this.clientsCollection = this.angularfirestore.collection('Client');
    
  }
  getEmailForId(id : String){
    this.clients.subscribe((c)=> {
      for (let client of c){
        if(client.id == id)
          return client.Email;
      }
    })
  }
  getClients() {
    return this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Client;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  getClientByEmail(){
    return this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Client;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  addClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClientByEmail1(dataId: string){
    console.log(dataId);
    return this.clients = this.angularfirestore.collection("Client", ref=>ref.where("Email", "==", dataId)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Client;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  updateProfile(input: any, idClient: string) {
    console.log(idClient)
    console.log(input.Email)
   


    this.angularfirestore.collection('Client').doc(idClient).update({
        
        FirstName: input.FirstName,
        LastName: input.LastName,
        Phone: input.Phone,
        Adress: input.Adress
    })
      
  }
}


