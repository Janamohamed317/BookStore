export interface OrderedBooks {
    book: string,
    quantity: number,
    title: string,
    image: string,
    price: number
}

export interface Order {
    _id: string,
    orderNumber: string
    books: OrderedBooks[],
    subTotal: number,
    status: string,
    user: string
}
