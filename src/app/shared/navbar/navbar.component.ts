import { Component, Inject, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userData: any = {};
  imgURL = 'https://upskilling-egypt.com:443/';
  constructor(private _HelperService: HelperService,
    private authService: AuthService, private router: Router,
    private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._HelperService.getCurrentUser().subscribe({
      next: (res) => {
        this.userData = res
        console.log(this.userData)
      }
    })
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/auth']);
    this.toastr.success(`Thank You Visiy Us Again ;)`);

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log(result);
      }
    });
  }
}

