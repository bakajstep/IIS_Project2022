export interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
    admin: boolean
}

export interface IUserModel {
    id: number,
    name: string,
    surname: string,
    email: string
}

export interface IUserUpdate {
    name: string,
    surname: string,
    email: string,
}

export interface IUserLogin {
    email: string,
    password: string
}

export interface IUserRegister {
    name: string,
    surname: string,
    email: string,
    password: string,
    admin: boolean
}

export interface IUserPasswordUpdate {
    old_password: string;
    new_password: string;
}