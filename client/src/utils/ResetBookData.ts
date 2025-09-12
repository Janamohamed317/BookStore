import type { newBook } from "../types/Book";

export function resetBookData(setBookData: React.Dispatch<React.SetStateAction<newBook>>) {
  setBookData({
    title: "",
    author: "",
    description: "",
    cover: "",
    price: 0,
    image: "",
  });
}
