export interface signup {
    email: string;
    username: string;
    password: string;
    confirmPassword: string
}

export interface signin {
    email: string;
    password: string;
}


export interface resetPassword {
    password: string;
    confirmPassword: string
}

export interface forgetPassword {
    email: string
}