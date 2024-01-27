import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage'
import { Observable } from 'rxjs';
import { Order } from '../../models/Order';
import { finalize, map } from 'rxjs/operators';
import { ClientService } from '../client/client.service';
import { firestore } from 'firebase/app';
import { stringify } from '@angular/compiler/src/util';
import { Owner } from 'src/app/models/Owner';
import { OrderSub } from 'src/app/models/OrderSub';
import { Directionality } from '@angular/cdk/bidi';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersCollection: AngularFirestoreCollection<Request>;
  orders: Observable<Order[]>;
  id: string;
  autoID: any;
  autoFileID: any
  accept: boolean;
  idow: firebase.User;
  idowner: firebase.User;
  ordersSub : Observable<OrderSub[]>;
 
  

  constructor(public angularfirestore: AngularFirestore, public afStorage : AngularFireStorage) {
    this.ordersCollection = this.angularfirestore.collection('Request');
  }

  getOrderId(id: string) {
    localStorage.setItem('orderId', JSON.stringify(id));
  }

  getOrderId1(id: string, title: string, detail: string, url : any) {
    this.autoID = this.angularfirestore.createId();
    
    this.angularfirestore.doc(`Request/${this.autoID}`).set({
      Title: title,
      Detail: detail,
      ModelURL: url,
      IDClient: id,
      IDOwner: "",
      Possible: firestore.FieldValue.arrayUnion(""),
      DoneOrders: firestore.FieldValue.arrayUnion(""),
      accept: false,
    })
   

    return this.angularfirestore.collection('Request').doc(this.autoID).update({
      Possible: firestore.FieldValue.arrayRemove(""),
      DoneOrders: firestore.FieldValue.arrayRemove("")
    })

  }
  getOrderId2(id: string, title: string, detail: string, owner: Owner, direct: boolean, url : any) {
    this.autoID = this.angularfirestore.createId();

    this.angularfirestore.doc(`Request/${this.autoID}`).set({
      Direct: direct,
      Title: title,
      Detail: detail,
      ModelURL:  url,
      IDClient: id,
      IDOwner: "",
      Possible: firestore.FieldValue.arrayUnion(owner.id),
      DoneOrders: firestore.FieldValue.arrayUnion(""),
      accept: false,
    })
    return this.angularfirestore.doc(`Request/${this.autoID}`).update({
      DoneOrders: firestore.FieldValue.arrayRemove(""),
    })
  }
  getOrderId23(id: string, idowner: string, detail: string) {
    this.autoID = this.angularfirestore.createId();
    return this.angularfirestore.doc(`Request/${this.autoID}`).set({
      Detail: detail,
      IDClient: id,
      IDOwner: idowner,
      accept: true,
    })
  }
  finishOrder(order: Order, idowner: string) {
    return this.angularfirestore.doc(`Request/${order.id}`).set({
      Detail: order.Detail,
      IDClient: order.IDClient,
      IDOwner: idowner,
      accept: true,
      done: true
    })
  }
  acceptOrder(order: Order, idowner: string) {
    return this.angularfirestore.doc(`Request/${order.id}`).set({
      Detail: order.Detail,
      IDClient: order.IDClient,
      IDOwner: idowner,
      accept: true,

    })
  }
  getAcceptedOrderById() {
    this.id = JSON.parse(localStorage.getItem('owner')).uid;
    return this.orders = this.angularfirestore.collection('Request', ref => ref.where('IDOwner', '==', this.id).where('accept', '==', true)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }
  getNotAcceptedOrderById() {
    return this.orders = this.angularfirestore.collection('Request', ref => ref.where('accept', '==', false)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }
  getOrderById() {
    this.id = JSON.parse(localStorage.getItem('orderId'));
    return this.orders = this.angularfirestore.collection('Request', ref => ref.where('IDClient', '==', this.id)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  getAccOrders(owners: any) {
    this.idow = JSON.parse(localStorage.getItem('user'));
    return this.orders = this.angularfirestore.collection('Request', ref => ref.where('IDClient', "==", this.idow.uid)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )

  }

  getAccOrders1(owners: any) {
    this.idow = JSON.parse(localStorage.getItem('user'));
    return this.orders = this.angularfirestore.collection('Request', ref => ref.where('IDOwner', "==", "")).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )

  }

  getOrders() {
    this.idowner = JSON.parse(localStorage.getItem('user'))
    return this.orders = this.angularfirestore.collection('Request', ref=> ref.where('IDOwner', '==', this.idowner.uid)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  setAccOrders(orderid : string, ownerid : string, price: number){
      this.angularfirestore.collection('Request').doc(orderid).update({
        Possible: firestore.FieldValue.arrayUnion(ownerid),
        DoneOrders: firestore.FieldValue.arrayUnion(ownerid)
      })
      this.autoID = this.angularfirestore.createId();
      this.angularfirestore.collection('Request').doc(orderid).update({
        DirectOrder : 2
      })
      this.angularfirestore.collection('OrderSub').doc(this.autoID).set({
        IDOwner: ownerid,
        Price : price,
        OrderId : orderid,
        Notification : 0 
      })
  }

  setRefOrders(orderid : string, ownerid : string){
    this.angularfirestore.collection('Request').doc(orderid).update({
      DoneOrders: firestore.FieldValue.arrayUnion(ownerid)
    })
  }

  setOrderId(ownerid: string, orderid: string, price: string, ordersubid: string){
    this.angularfirestore.collection('Request').doc(orderid).update({
      IDOwner: ownerid,
      Price: price,
    })

    this.angularfirestore.collection('OrderSub').doc(ordersubid).update({
      Notification : 2
    })
  }

  setRefNotify(ownerid : string, orderid : string, ordersubid: string){
    this.angularfirestore.collection('OrderSub').doc(ordersubid).update({
      Notification : 1
    })

    this.angularfirestore.collection('Request').doc(orderid).update({
      Possible: firestore.FieldValue.arrayRemove(ownerid),
    })
  }

  getOrderSubCol(){
    return this.ordersSub = this.angularfirestore.collection('OrderSub').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as OrderSub;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  getOrderSubById(ownerid: string){
    return this.ordersSub = this.angularfirestore.collection('OrderSub', ref => ref.where("IDOwner", "==", ownerid)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as OrderSub;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  getOrderSubById1(){
    this.idowner = JSON.parse(localStorage.getItem('user'))
    return this.ordersSub = this.angularfirestore.collection('OrderSub', ref => ref.where("IDOwner", "==", this.idowner.uid)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as OrderSub;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  getOrderByOwnerId(ownerid : string){
    return this.orders = this.angularfirestore.collection('Request').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }

  setClosedNotify(ordersubid: string){
    this.angularfirestore.collection('OrderSub').doc(ordersubid).update({
      Notification : 3
    })
  }

  getOrderByOrderID(orderid: string){
    return this.orders = this.angularfirestore.collection('Request').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    })
    )
  }
}
