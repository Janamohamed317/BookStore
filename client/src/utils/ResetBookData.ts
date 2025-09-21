import type { NewBook } from "../types/Book";

export function resetBookData(setBookData: React.Dispatch<React.SetStateAction<NewBook>>) {
  setBookData({
    title: "",
    author: "",
    description: "",
    cover: "",
    price: 0,
    image: "",
    quantity: 0
  });
}
