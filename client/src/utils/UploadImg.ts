import axios from "axios";
import type { Book } from "../types/Book";

export async function UploadImg(book: Book, file: File | null) {
    if (file) {
        const formData = new FormData();
        formData.append("image", file);

        await axios.post(
            `https://book-store-seven-tan.vercel.app/api/upload/bookImg/${book._id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    }
}
