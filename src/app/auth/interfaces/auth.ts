export interface Ilogin {
     email: string;
     password: string;
}
export interface IResgester {
     userName: string;
     email: string;
     country: string;
     phoneNumber: string;
     password: string;
     confirmPassword: string;
     profileImage: string;

}

export interface IUserVerify {
     email: string;
     code: string;
}