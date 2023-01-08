let book = [
    {
        name: "اعتماد نفس",
        numbar: 21,
        amount: "500000",
        due: 1401 / 10 / 10
    },
    {
        name: "عرت نفس",
        numbar: 25,
        amount: "700000",
        due: 1401 / 12 / 10
    }
];
export const getbookes = () => {
    return book;
}
export const getbook = (numbar) => {
    return book.find(book => (book.numbar === numbar));

}
export const deleteBook = (numbar) => {
    book = book.filter(
        (book) => book.numbar !== numbar 
    );

}