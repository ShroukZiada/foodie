import { CurrencyPipe } from "@angular/common";

export interface IUserRecipe {

 id: number;
 creationDate: number;
 modificationDate: number;
 name: string;
 imagePath: string;
 description: any;
 price: CurrencyPipe;


}
