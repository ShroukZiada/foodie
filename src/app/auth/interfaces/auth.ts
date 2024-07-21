export interface Ilogin {
     email: string;
     password: string;
}

export interface ILoginResponse {
     token: string;
     expiresIn: string;
   }
   
export interface IResgesterUser {
     userName: string;
     email: string;
     country: string;
     phoneNumber: string;
     password: string;
     confirmPassword: string;
     profileImage: string;

}
export interface IResgesterAdmin {
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
export interface IResetPassword {
     email: string;
     password: string;
     confirmPassword: string;
     seed: string;
}
export interface IForgetPassword {
     email: string;
}
export interface IResetPassword {
     email: string,
     password: string,
     confirmPassword: string,
     seed: string
}
