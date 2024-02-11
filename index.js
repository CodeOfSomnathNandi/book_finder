
function setStyleTag() {
    let linker = document.createElement("link")
    linker.rel = "stylesheet"
    linker.href = "style.css"
    document.head.appendChild(linker)
}


function addBooksToDom(bookName, bookAuthors, bookDescription) {
    let bookTd = document.createElement("td")
    bookTd.innerText = bookName
    let bookAuthorTd = document.createElement("td")

    if (bookAuthors === undefined || bookAuthors == null) {
        bookAuthorTd.innerText = ""
    } else {
        bookAuthorTd.innerText = bookAuthors.toString()
    }

    let bookDescriptionTd = document.createElement("td")
    bookDescriptionTd.innerText = bookDescription
    bookDescriptionTd.classList.add("narrow-column")
    let tr = document.createElement("tr")
    tr.appendChild(bookTd)
    tr.appendChild(bookAuthorTd)
    tr.appendChild(bookDescriptionTd)
    let table_body = document.getElementById("table-body")
    table_body.appendChild(tr)
}

function indexPage() {

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

setStyleTag()
// search listener
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Perform your search functionality here
        const searchTerm = document.getElementById('searchInput').value;
        if (searchTerm === "") {
            console.log("Empty string")
            return;
        }
        console.log('Searching for:', searchTerm);
        searchTerm.replaceAll(" ", "+")

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40`)
            .then(response => {
                response.json().then(r => {
                    handleJson(r)
                })
            })

    });

    const mainSearch = document.getElementById("mainSearch")

    mainSearch.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log("main search")
    })

});




