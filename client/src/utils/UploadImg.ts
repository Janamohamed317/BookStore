import axios from "axios";
import type { Book } from "../types/Book";

export async function UploadImg(book: Book, file: File | null) {
    if (file) {
        const formData = new FormData();
        formData.append("image", file);

        await axios.post(
            `http://localhost:5000/api/upload/bookImg/${book._id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    }
}
