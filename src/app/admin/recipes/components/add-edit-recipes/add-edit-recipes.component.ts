import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICategory, ITag } from '../../interface/recipe';
import { HelperService } from 'src/app/shared/services/helper.service';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss']
})
export class AddEditRecipesComponent implements OnInit {

  constructor(
    private _helper: HelperService,
    private _recipe: RecipeService,
    private toastr: ToastrService,
    private _router: Router) { }
  ngOnInit(): void {
    this.getAllGategories()
    this.getAllTags()
  }

  imgSrc: any;
  Tags: ITag[] = [];
  Gategories: ICategory[] = [];
  recipeForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(null),
    recipeImage: new FormControl(null),
  });

  addNewRecipe(data: FormGroup) {
    console.log(data.value);
    let myData = new FormData();
    myData.append('name', data.value.name);
    myData.append('description', data.value.description);
    myData.append('price', data.value.price);
    myData.append('tagId', data.value.tagId);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('recipeImage', this.imgSrc, this.imgSrc.name);

    this._recipe.addRecipe(myData).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['dashboard/admin/recipes']);
      },
      error: () => {
        // this._toastr.error('error');
      },
      complete: () => {
        this.toastr.success(`Recipe Added Successfuly`);
      }
    });
  }

  getAllTags() {
    this._helper.getTags().subscribe({
      next: (res) => {
        this.Tags = res;
        // console.log(this.Tags);
      }
    })
  }

  getAllGategories() {
    this._helper.getGategories().subscribe({
      next: (res) => {
        this.Gategories = res.data
      }
    })
  }
  //handle UploadImage
  files: File[] = [];
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files);
    this.imgSrc = this.files[0];
  }
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
