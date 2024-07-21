import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AddEditRecipesComponent } from 'src/app/admin/recipes/components/add-edit-recipes/add-edit-recipes.component';
import { ITag, ICategory } from 'src/app/admin/recipes/interface/recipe';
import { RecipeService } from 'src/app/admin/recipes/services/recipe.service';
import { IUsers } from 'src/app/admin/users/interface/users';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { HelperService } from 'src/app/shared/services/helper.service';
import { ViewUserRecipeComponent } from './components/view-user-recipe/view-user-recipe.component';
import { IUserRecipe } from '../interfaces/user-recipe';
import { FavService } from '../fav/services/Fav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrls: ['./user-recipe.component.scss']
})
export class UserRecipeComponent implements OnInit {
  name: any;
  pageSize: number = 10;
  pageNumber: number = 1;
  categoryItem: string = '';
  userRecipeList: any;
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
    private _HelperService: HelperService, private toastr: ToastrService,
    private _FavService: FavService, private router: Router) { }
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
        this.userRecipeList = res;
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
        console.log(result)

        // this.onEditCategory(categoryData.id, result)
      }
    });
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
    this._RecipeService.deleteRecipes(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: () => { },
      complete: () => {
        this.getAllRescipe()
        this.toastr.error(`Recipe Deleted Successfuly`);
      }
    })
  }

  recipeID?: number;
  addToWishList(id: number, event: any) {
    let fillCondition = Array.from(event.target.classList).includes('pi-heart')

    if (fillCondition) {
      this._FavService.AddFavRecipe(id).subscribe({
        next: res => {
          this.recipeID = res?.recipe
          console.log(this.recipeID);

          event.target.classList.replace('pi-heart', 'pi-heart-fill')
          // console.log(event.target);
          // this._FavService.numOfwishList.next(res.data.length)
          this.toastr.success('Recipe Added to favourite ' )
        }
      })

    }

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
    this.getAllRescipe()
  }


  openUserDialog(userDate: IUserRecipe): void {

    const dialogRef = this.dialog.open(ViewUserRecipeComponent, {
      data: userDate
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
  }



}
