import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminClassGuard implements CanActivate {
  constructor(private router: Router, private _authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //
    const role = this._authService.role;
    console.log(role);
    if (localStorage.getItem('userToken') !== null && role == 'SuperAdmin') {
      return true;
    }
    else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

}
