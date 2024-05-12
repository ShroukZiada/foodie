export interface IUsers {
 id: number;
 userName: string;
 email: string;
 country: string;
 phoneNumber: string;
 imagePath: string;
 group: {
  name: string;
  creationDate: number;
  modificationDate: number;
 };
}
