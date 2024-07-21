export interface ITag {
 id: number;
 name: string;
 creationDate: number;
 modificationDate: number;
}
export interface ICategory {
 id: number;
 name: string;
 creationDate: number;
 modificationDate: number;
}
export interface ITableData {
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  data: IRecipe;
}
export interface IRecipe {
  category:ICategory
  id: number;
  name: string;
  creationDate: number;
  modificationDate: number;
  description:string;
  price:number
  imagePath:string;
tag:ITag;

}

