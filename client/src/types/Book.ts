import type { Author } from "./Author";

export interface Book {
    _id: string,
    title: string,
    author: Author,
    description: string,
    price: number,
    cover: string,
    image: string
}

export interface newBook {
    title: string,
    author: string,
    description: string,
    cover: string,
    price: number,
    image: string
}