// document.addEventListener("DOMContentLoaded", (ev) => {
//     init()
// })

window.onload = (ev) => {
    init()
}

function handleJson(books_json) {
    const books = books_json["items"]
    for (let i = 0; i < books.length; i++) {
        const bookName = books[i]["volumeInfo"]["title"]
        const authorNames = books[i]["volumeInfo"]["authors"]
        const description = books[i]["volumeInfo"]["description"]
        const previewImage = books[i]["volumeInfo"]["imageLinks"]["smallThumbnail"]
        // addBooksToDom(bookName, authorNames, description)
    }
}

function getContent(searchTerm) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40`)
        .then(response => {
            response.json().then(r => {
                handleJson(r)
            })
        })
}

function init() {
    let searchItem = localStorage.getItem("search")
    getContent(searchItem)
    localStorage.removeItem("search")
}