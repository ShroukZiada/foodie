import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { ICategory, ITag } from './interface/recipe';
import { HelperService } from 'src/app/shared/services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  name: any;
  pageSize: number = 10;
  pageNumber: number = 0;
  categoryItem: string = '';
  recipeList: any;
  totalPages: any;
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  empImg: string = '../../../assets/images/emp.jpg'
  Tags: ITag[] = [];
  Gategories: ICategory[] = [];
  searchValue: string = ''
  tagId: number = 0;
  catId: number = 0;


  selectedCategory: ICategory | undefined;
  constructor(private _RecipeService: RecipeService, private dialog: MatDialog,
    private _HelperService: HelperService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllRescipe()
    this.getAllTags()
    this.getAllGategories()
  }
  getAllRescipe() {
    let params = {
      name: this.searchValue,
      tagId: this.tagId,
      categoryId: this.catId,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    this._RecipeService.getAllRecipes(params).subscribe({
      next: (res) => {
        this.recipeList = res;
        console.log(res)
      },
      error: () => { }
    })
  }

  getAllTags() {
    this._HelperService.getTags().subscribe({
      next: (res) => {
        this.Tags = res;
        // console.log(this.Tags);

      }
    })
  }

  getAllGategories() {
    this._HelperService.getGategories().subscribe({
      next: (res) => {
        this.Gategories = res.data
      }
    })
  }

  openRecipeDialog(): void {
    const dialogRef = this.dialog.open(AddEditRecipesComponent, {
      data: {}
    });
    // console.log(categoryData.name);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(result)

        // this.onEditCategory(categoryData.id, result)
      }
    });
  }

  opendeleteDialog(id: number): void {
    // console.log(id)
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
    this._RecipeService.deleteRecipes(id).subscribe({
      next: (res) => {
        // console.log(res)
      },
      error: () => { },
      complete: () => {
        this.getAllRescipe()
        this.toastr.error(`Recipe Deleted Successfuly`);
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
    // console.log(e);

    //any change in pageSize , pageNumber call el Gatogery
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getAllRescipe()
  }

}
