import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { AddEditCategoriesComponent } from './components/add-edit-categories/add-edit-categories.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ICategory, ITag } from '../recipes/interface/recipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  name: any;
  pageSize: number = 10;
  pageNumber: number = 1;
  categoryItem: string = '';
  listData: any;
  totalPages: any;
  id: any;
  Tags: ITag[] = [];
  Gategories: ICategory[] = [];
  searchValue: string = ''
  tagId: number = 0;
  catId: number = 0;
  value = 'Clear me';

  constructor(private _CategoriesService: CategoriesService,
    public dialog: MatDialog, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.name = localStorage.getItem('userName')
    console.log(this.name);
    this.getCategories();
  }

  getCategories() {
    let params = {
      name: this.searchValue,
      tagId: this.tagId,
      categoryId: this.catId,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    this._CategoriesService.getAllCatogeries(params).subscribe({
      next: (res) => {
        this.listData = res;
        console.log(res)
      },
      error: () => { }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoriesComponent, {
      data: { name: this.categoryItem },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.addCategoryItems(result);
      }
    });
  }

  addCategoryItems(categoryName: string) {
    this._CategoriesService.addCategories(categoryName).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => { },
      complete: () => {
        this.toastr.success(`Category Added Successfuly`);
        this.getCategories();
      }
    })
  }


  ////*!handle paginator
  length = 50;
  pageIndex = 0;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  handlePageEvent(e: PageEvent) {
    console.log(e);

    //any change in pageSize , pageNumber call el Gatogery
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getCategories()
  }

  opendeleteDialog(id: number): void {
    console.log(id)
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { categoryId: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(result);
        this.onDeleteItem(result)


      }
    });
  }

  onDeleteItem(id: number) {
    this._CategoriesService.deleteCategories(id).subscribe({
      next: (res) => {
        // console.log(res)
      },
      error: () => { },
      complete: () => {
        this.toastr.error(`Category Deleted Successfuly`);
        this.getCategories()
      }
    })
  }


  openEditDialog(categoryData: any): void {
    const dialogRef = this.dialog.open(AddEditCategoriesComponent, {
      data: { categoryData }
    });
    console.log(categoryData.name);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.onEditCategory(categoryData.id, result)
      }
      //  console.log(result)
    });
  }

  onEditCategory(id: number, name: string) {
    this._CategoriesService.editCategories(id, name).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.message);
      },
      complete: () => {
        console.log('category updated');
        // this.ToastrService.success('category updated', 'Success');
        this.getCategories();
      },
    });
  }



}
