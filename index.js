
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


/**
 * https://archive.org/services/search/beta/page_production/?user_query=c+language&hits_per_page=100&page=1&aggregations=false&uid=R%3A7c30397b5ace95d1508f-S%3A1c937e84f0b502797079-P%3A1-K%3Ah-T%3A1707684312929&client_url=https%3A%2F%2Farchive.org%2Fsearch%3Fquery%3Dc%2Blanguage
 */




