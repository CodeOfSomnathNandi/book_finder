
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

function forward(searchTerm) {
    let a = document.createElement("a")
    a.href = `books.html?q=${searchTerm}&page_number=1`
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
        searchTerm.replaceAll(" ", "+")
        forward(searchTerm)

    });

    const mainSearch = document.getElementById("mainSearch")

    mainSearch.addEventListener("submit", (event) => {
        event.preventDefault()
        const searchTerm = document.getElementById('mainSearchInput').value;
        if (searchTerm.trim().length !== 0) {
            localStorage.setItem("search", searchTerm)
        }
        searchTerm.replaceAll(" ", "+")
        forward(searchTerm)
    })

});


/**
 * https://archive.org/services/search/beta/page_production/?user_query=c+language&hits_per_page=100&page=1
 *  response -> body -> hits -> hits -> index (i)
 *  user_query=c+language
 *  page=1
 */




