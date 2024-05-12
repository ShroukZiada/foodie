import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewUserComponent } from 'src/app/admin/users/components/view-user/view-user.component';
import { IUserRecipe } from 'src/app/user/interfaces/user-recipe';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-view-user-recipe',
  templateUrl: './view-user-recipe.component.html',
  styleUrls: ['./view-user-recipe.component.scss']
})
export class ViewUserRecipeComponent implements OnInit {
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  empImg: string = '../../../assets/images/emp.jpg';
  constructor(
    public dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserRecipe, private user: UserService) { }
  ngOnInit(): void { }

  onclick(): void {
    this.dialogRef.close();
  }
}
