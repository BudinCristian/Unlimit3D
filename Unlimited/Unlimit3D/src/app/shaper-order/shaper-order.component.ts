import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../services/orders/orders.service';
import { Order } from '../models/Order';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-shaper-order',
  templateUrl: './shaper-order.component.html',
  styleUrls: ['./shaper-order.component.css']
})
export class ShaperOrderComponent implements OnInit {

  orderDetail: string;
  orderTitle: string;
  event: any;
  finalurl
  event1
  url: any;
  autoID: string
  downloadURL: Observable<string>
  uploadProgress$: Observable<number>


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ordersService: OrdersService, public dialog: MatDialog, public fire: AngularFirestore, public afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  onClick() {
    
    if (this.orderDetail == null || this.orderTitle == null) {
      alert("Please fill in the form before submitting!")
      return;
    }

    

    if (this.data.direct == false)
      this.ordersService.getOrderId1(this.data.id, this.orderTitle, this.orderDetail, this.url).then(value => {
        alert("Order placed!")
        this.dialog.closeAll()
      })
        .catch(value => {
          alert("Something went wrong!")
        })
    else
      this.ordersService.getOrderId2(this.data.id, this.orderTitle, this.orderDetail, this.data.owner, this.data.direct, this.url).then(value => {
        alert("Order placed!")
        this.dialog.closeAll()
      })
        .catch(value => {
          alert("Something went wrong!")
        })
  }

  upload(event) {
    this.event1 = event;
    if(this.event1.target.files[0] == null){
      alert("Please upload a file")
      return
    }
    const autoID = this.fire.createId();
    const ref = `Models/${autoID}`;
    const fileref = this.afStorage.ref(ref)
    const task = this.afStorage.upload(ref, this.event1.target.files[0])
    this.uploadProgress$ = task.percentageChanges()
    task.snapshotChanges().pipe(finalize(() => {
      this.downloadURL = fileref.getDownloadURL()
      this.downloadURL.subscribe(url => {
        if(url){
          this.url = url
        }
        console.log(this.url)
      })
      })
    ).subscribe(url => {
      if(url){
        this.finalurl = url
      }
    })
  }

  

}
