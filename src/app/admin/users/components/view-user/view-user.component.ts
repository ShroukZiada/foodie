import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { IUsers } from '../../interface/users';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent {
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  empImg: string = '../../../assets/images/emp.jpg';
  userData: IUsers | undefined;
  userList: any;
  constructor(
    public dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUsers, private _UsersService: UsersService) { }
  onclick(): void {
    this.dialogRef.close();
  }
}

