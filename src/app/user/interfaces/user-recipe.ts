import { CurrencyPipe } from "@angular/common";

export interface IUserRecipe {

 id: number;
 creationDate: number;
 modificationDate: number;
 name: string;
 imagePath: string;
 description: any;
 price: CurrencyPipe;


 // category: [
 //  {
 //   id: number,
 //   name: string,
 //   creationDate: number;
 //   modificationDate: number;
 //  }
 // ],
 //  tag: {
 //   id: number;
 //   name: string;
 //   creationDate: number;
 //   modificationDate: number;
 // }

}
