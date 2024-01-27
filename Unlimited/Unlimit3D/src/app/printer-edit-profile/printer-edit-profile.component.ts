import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OwnerService } from '../services/owner/owner.service';
import { Owner } from '../models/Owner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage'
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-printer-edit-profile',
  templateUrl: './printer-edit-profile.component.html',
  styleUrls: ['./printer-edit-profile.component.css']
})
export class PrinterEditProfileComponent implements OnInit {
  event: any;
  finalurl
  event1
  url: any;
  autoID: string
  downloadURL: Observable<string>
  uploadProgress$: Observable<number>
  input: any = {
    FirstName: "",
    LastName: "",
    Phone: "",
    Adress: "",
    Description: "",
    ImageURL: ""
  }
  owners: Owner[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ownerService: OwnerService, public dialog: MatDialog, public fire: AngularFirestore, public afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.ownerService.getOwnersByEmail(this.data.email).subscribe(owners => { this.owners = owners })
  }


  Submit() {
    console.log(this.url)
    for (const key in this.owners) {
      if (this.owners[key] != null) {
        if(this.url != null)
          this.owners[key].ImageURL = this.url;
        if (this.input.LastName == "")
          this.input.LastName = this.owners[key].LastName
        if (this.input.FirstName == "")
          this.input.FirstName = this.owners[key].FirstName
        if (this.input.Phone == "")
          this.input.Phone = this.owners[key].Phone
        if (this.input.Adress == "")
          this.input.Adress = this.owners[key].Adress
        if (this.input.Description == "")
          this.input.Description = this.owners[key].Description
        if (this.input.ImageURL == "")
          this.input.ImageURL = this.owners[key].ImageURL
      }
    }

    alert("Data updated successfully")
    this.ownerService.updateProfile(this.input, this.data.id)
  }

  upload(event) {
    this.event1 = event;
    if (this.event1.target.files[0] == null) {
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
        if (url) {
          this.url = url
        }
        console.log(this.url)
      })
    })
    ).subscribe(url => {
      if (url) {
        this.finalurl = url
      }
    })
  }

}
