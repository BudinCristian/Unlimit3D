import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RecaptchaModule} from 'ng-recaptcha';
import { FormsModule} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireStorageModule} from 'angularfire2/storage'

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReCaptchaComponent } from './sign-up/re-captcha/re-captcha.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ClientService } from '../app/services/client/client.service';
import { ShaperService } from '../app/services/shaper/shaper.service';
import { LoginService } from '../app/services/login/login.service';
import { OwnerService } from '../app/services/owner/owner.service';
import { AuthService}from '../app/services/auth/auth.service';
import { OrdersService } from '../app/services/orders/orders.service';

import { SignInComponent } from './sign-in/sign-in.component'
import { ClientPageComponent } from './client-page/client-page.component';
import { ShaperPageComponent } from './shaper-page/shaper-page.component'
import { ShaperOrderComponent } from './shaper-order/shaper-order.component';
import { PartnerModalComponent } from './partner-modal/partner-modal.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PrinterPageComponent } from './printer-page/printer-page.component';
import { AcceptModalComponent } from './printer-page/accept-modal/accept-modal.component';
import { AcceptedOrdersComponent } from './printer-page/accepted-orders/accepted-orders.component';
import { NotifyModalComponent } from './client-page/notify-modal/notify-modal.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { PrinterProfileComponent } from './printer-profile/printer-profile.component';
import { PrinterEditProfileComponent } from './printer-edit-profile/printer-edit-profile.component';
import { OwnerprofileComponent } from './ownerprofile/ownerprofile.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderInfoModalComponent } from './order-info-modal/order-info-modal.component';
import { PriceModalComponent } from './printer-page/price-modal/price-modal.component';
import { CarouselClientComponent } from './carousel-client/carousel-client.component';
import { NotifyPrinterModalComponent } from './printer-page/notify-printer-modal/notify-printer-modal.component';


@NgModule({
  declarations: [
    SignUpComponent,
    AppComponent,
    ReCaptchaComponent,
    SignUpComponent,
    HomepageComponent,
    SignInComponent,
    ShaperPageComponent,
    ClientPageComponent,
    ShaperOrderComponent,
    PartnerModalComponent,
    MyOrdersComponent,
    PrinterPageComponent,
    AcceptModalComponent,
    AcceptedOrdersComponent,
    NotifyModalComponent,
    ForgotPasswordComponent,
    ProfileModalComponent,
    EditProfileModalComponent,
    PrinterProfileComponent,
    PrinterEditProfileComponent,
    OwnerprofileComponent,
    CarouselComponent,
    OrderInfoModalComponent,
    PriceModalComponent,
    CarouselClientComponent,
    NotifyPrinterModalComponent
  ],
  imports: [
    RecaptchaModule,
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MatGridListModule,
      MatIconModule,
      MatDialogModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'Unlimit3D'),
    AngularFirestoreModule,
    NgbModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ShaperService, ClientService, OwnerService,AuthService,OrdersService],
  bootstrap: [AppComponent],
  entryComponents: [ShaperOrderComponent, PartnerModalComponent, MyOrdersComponent, ProfileModalComponent, EditProfileModalComponent,PrinterEditProfileComponent, PrinterPageComponent, ForgotPasswordComponent, NotifyModalComponent, PrinterProfileComponent, OwnerprofileComponent,OrderInfoModalComponent,  PriceModalComponent, NotifyPrinterModalComponent],
})
export class AppModule { }
