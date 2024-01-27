import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from '../auth/auth.service'
import { AuthGuard } from './auth.guard';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthOwnerGuardGuard implements CanActivate {
  constructor(private auth : AuthService, private router : Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.auth.ownerguard() != true) {
        window.alert("PleaseLogInFirst")
        this.router.navigateByUrl('/signin')
       }
       else
        return true;
  }
  
}
