import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { HelperService } from 'src/app/shared/services/helper.service';
import { UsersService } from './services/users.service';
import { IUsers } from './interface/users';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  name: any;
  pageSize: number = 10;
  pageNumber: number = 1;
  categoryItem: string = '';
  listData: IUsers[] = [];
  totalPages: any;
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  empImg: string = '../../../assets/images/emp.jpg'
  searchValue: string = ''
  pramKey: number = 0;
  roleIds: number[] = [];


  constructor(private _UsersService: UsersService, private dialog: MatDialog,
    private _HelperService: HelperService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllUsers()
  }







  getAllUsers() {
    let params = {
      name: this.searchValue,
      [this.pramKey]: this.searchValue,
      groups: this.roleIds,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    this._UsersService.getAllUsers(params).subscribe({
      next: (res) => {
        this.listData = res.data;
        console.log(this.listData);
      },
      error: () => { }
    })
  }


  openUserDialog(userDate: IUsers): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data: userDate
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log(result)
      }
    });
  }

  opendeleteDialog(id: number): void {
    console.log(id)
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { userId: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.onDeleteItem(result)
      }
    });
  }

  onDeleteItem(id: number) {
    this._HelperService.deleteUser(id).subscribe({
      next: (res) => {
        this.toastr.error(res.message);
      },
      error: () => { },
      complete: () => {
        this.getAllUsers()
      }
    })
  }
}
