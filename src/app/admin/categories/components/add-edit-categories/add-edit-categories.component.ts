import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-add-edit-categories',
  templateUrl: './add-edit-categories.component.html',
  styleUrls: ['./add-edit-categories.component.scss']
})
export class AddEditCategoriesComponent implements OnInit {
  name?: any;
  constructor(
    public dialogRef: MatDialogRef<AddEditCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _AuthService: AuthService) { }


  ngOnInit(): void {
    this.name = localStorage.getItem('userName')
    // console.log(this.name);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
