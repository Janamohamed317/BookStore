export interface Signup {
    email: string;
    username: string;
    password: string;
    confirmPassword: string
}

export interface Signin {
    email: string;
    password: string;
}


export interface User {
    _id: string;
    username: string;
    email: string;
    blocked: boolean,
};

export interface UpdatedUser {
    username: string | any
    email: string | any
};