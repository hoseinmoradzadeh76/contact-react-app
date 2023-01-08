import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getbook, deleteBook } from "../data/data";
const Book = () => {
    const navigates = useNavigate();
    const location = useLocation()
    const params = useParams();
    const book = getbook(parseInt(params.bookId));
    if (book) {
        return (
            <main style={{ padding: "1rem" }}>
                <h2 style={{ color: "red" }}>قیمت کتاب:{`${book.amount} تومان`}</h2>
                <h3>نام کتاب:{book.name}</h3>
                <p style={{ color: "blue" }}>تاریخ انتشار:{book.due}</p>
                <button onClick={() => {
                    deleteBook(book.numbar);
                    navigates("/book/" + location.search)

                }} className="btn btn-primary p-2">حذف کتاب</button>

            </main>
        )

    } else {
        return (
            <main>
                <h3>همچنین کتابی یافت نشد</h3>
            </main>
        )
    }


}
export default Book; 