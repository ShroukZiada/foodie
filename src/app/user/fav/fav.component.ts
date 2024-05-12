import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddEditRecipesComponent } from 'src/app/admin/recipes/components/add-edit-recipes/add-edit-recipes.component';
import { ITag, ICategory } from 'src/app/admin/recipes/interface/recipe';
import { RecipeService } from 'src/app/admin/recipes/services/recipe.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { HelperService } from 'src/app/shared/services/helper.service';
import { IUserRecipe } from '../interfaces/user-recipe';
import { ViewUserRecipeComponent } from '../user-recipe/components/view-user-recipe/view-user-recipe.component';
import { FavService } from './services/Fav.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent {
  name: any;
  pageSize: number = 10;
  pageNumber: number = 1;
  categoryItem: string = '';
  listFav: any;
  totalPages: any;
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  empImg: string = '../../../assets/images/emp.jpg'
  Tags: ITag[] = [];
  Gategories: ICategory[] = [];
  searchValue: string = ''
  tagId: number = 0;
  catId: number = 0;

  feData: boolean = true;

  selectedCategory: ICategory | undefined;
  constructor(private _RecipeService: RecipeService, private dialog: MatDialog,
    private _HelperService: HelperService, private toastr: ToastrService, private _FavService: FavService) {
  }
  ngOnInit(): void {
    this.getAllFav()
  }
  getAllFav() {
    this._FavService.GetAllFavRecipe().subscribe({
      next: (res) => {
        this.listFav = res;
        console.log(this.listFav)
      },
      error: () => {
        this.feData = true
      }, complete: () => {
        this.feData = false

      }
    })
  }


  onDeleteItem(id: number) {
    this._FavService.deleteFavRecipe(id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: () => { },
      complete: () => {
        // this.getAllRescipe()
        this.toastr.error(`Recipe Deleted Successfuly`);
        this.getAllFav()
      }
    })
  }


  openUserDialog(userDate: IUserRecipe): void {
    // console.log();

    const dialogRef = this.dialog.open(ViewUserRecipeComponent, {
      data: userDate
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
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
    this.getAllFav()
  }

}
