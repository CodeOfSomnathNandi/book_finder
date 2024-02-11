
function setStyleTag() {
    let linker = document.createElement("link")
    linker.rel = "stylesheet"
    linker.href = "style.css"
    document.head.appendChild(linker)
}

function handleJson(books_json) {
    let table_body = document.getElementById("table-body")
    table_body.innerHTML = '';
    const books = books_json["items"]
    for (let i = 0; i < books.length; i++) {
        const bookName = books[i]["volumeInfo"]["title"]
        const authorNames = books[i]["volumeInfo"]["authors"]
        const description = books[i]["volumeInfo"]["description"]
        // addBooksToDom(bookName, authorNames, description)
    }
}

function forward() {
    let a = document.createElement("a")
    a.href = "books.html"
    a.click()
}




setStyleTag()
// search listener
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Perform your search functionality here
        const searchTerm = document.getElementById('searchInput').value;
        if (searchTerm.trim().length === 0) {
            console.log("length === 0")
        } else {
            localStorage.setItem("search", searchTerm)
        }

        forward()
        // if (searchTerm === "") {
        //     console.log("Empty string")
        //     return;
        // }
        //
        // searchTerm.replaceAll(" ", "+")

        // fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40`)
        //     .then(response => {
        //         response.json().then(r => {
        //             handleJson(r)
        //         })
        //     })

    });

    const mainSearch = document.getElementById("mainSearch")

    mainSearch.addEventListener("submit", (event) => {
        event.preventDefault()
        const searchTerm = document.getElementById('mainSearchInput').value;
        if (searchTerm.trim().length !== 0) {
            localStorage.setItem("search", searchTerm)
        }
        forward()
    })

});








