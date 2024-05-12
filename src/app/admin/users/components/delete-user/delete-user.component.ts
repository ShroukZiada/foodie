import { Component, Inject, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper.service';
import { UsersService } from '../../services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsers } from '../../interface/users'
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _HelperService: HelperService) { }
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  empImg: string = '../../../assets/images/emp.jpg';

  listData?: IUsers;
  ngOnInit(): void {
    this.getUserById()
  }


  id: number = this.data.userId;
  getUserById() {
    this._HelperService.getUserBYiD(this.id).subscribe({
      next: (res) => {
        this.listData = res;
        console.log(res);
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

