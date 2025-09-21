export interface Author {
    _id: string;
    fullName: string;
    image?: string;
    nationality: string;
}


export interface NewAuthor {
    fullName: string;
    image?: string;
    nationality: string;
}

export interface BookAuthor {
    fullName: string;
}

