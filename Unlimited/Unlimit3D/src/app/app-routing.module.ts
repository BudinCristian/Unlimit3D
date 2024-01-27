import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { AuthGuard } from './services/guard/auth.guard'
import { AuthOwnerGuardGuard} from './services/guard/auth-owner-guard.guard'
import{PrinterPageComponent} from './printer-page/printer-page.component'
const routes : Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'ownerpage', component: PrinterPageComponent, canActivate: [AuthOwnerGuardGuard] },
  { path: '', component: HomepageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'clientpage', component: ClientPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
