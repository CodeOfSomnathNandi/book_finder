// document.addEventListener("DOMContentLoaded", (ev) => {
//     init()
// })

window.onload = (ev) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("q") != null && urlParams.get("q") !== "") {
        init()
    } else {
        document.getElementById("loadingScreen").style.display = "none"
        document.getElementById("not_found").classList.remove("hidden")
    }

}


function createCard(previewImage, bookTitle, bookDescription, authorName, id, nameOfPage) {
    // Create elements
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'mb-3');
    // cardDiv.style.maxWidth = '540px';

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'g-0');

    const imageColDiv = document.createElement('div');
    imageColDiv.classList.add('col-md-2');

    const imgElement = document.createElement('img');
    imgElement.src = previewImage;
    imgElement.style.height = "100%"
    // imgElement.style.width = "100%"
    imgElement.classList.add('img-fluid', 'rounded-start');
    imgElement.alt = '...';

    const contentColDiv = document.createElement('div');
    contentColDiv.classList.add('col-md-8');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    const titleElement = document.createElement('h5');
    const a = document.createElement("a")
    a.style.textDecoration = "none"
    a.href = `book_preview_page.html?id=${id}&type=${nameOfPage}`
    a.text = bookTitle;
    titleElement.classList.add('card-title');
    titleElement.appendChild(a)

    const textElement = document.createElement('p');
    textElement.classList.add('card-text');
    textElement.classList.add("truncate-after-2-lines")
    // <button type="button" class="btn btn-primary btn-sm">Small button</button>
    textElement.textContent = bookDescription;

    const lastUpdatedElement = document.createElement('p');
    lastUpdatedElement.classList.add('card-text');
    const smallElement = document.createElement('small');
    smallElement.classList.add('text-body-secondary');
    smallElement.textContent = authorName;
    lastUpdatedElement.appendChild(smallElement);

    // Assemble elements
    cardDiv.appendChild(rowDiv);
    rowDiv.appendChild(imageColDiv);
    imageColDiv.appendChild(imgElement);
    rowDiv.appendChild(contentColDiv);
    contentColDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(titleElement);
    cardBodyDiv.appendChild(lastUpdatedElement);
    cardBodyDiv.appendChild(textElement);

    return cardDiv;
}

// Example usage:

function add(bookName, authorNames, description, previewImage, id, name) {
    const cardContainer = document.getElementById('books_blog'); // Assuming you have a container in your HTML to append the cards

    let card = createCard(previewImage, bookName, description, authorNames, id, name)
    cardContainer.appendChild(card)
}

function handleInternetArchiveJson(books_json) {
    let books = books_json["response"]["body"]["hits"]["hits"]
    for (let i = 0; i < books.length; i++) {
        let identifier = books[i]["fields"]["identifier"]
        let previewImage = `https://archive.org/services/img/${identifier}`
        let bookTitle = books[i]["fields"]["title"]
        let authorNames = books[i]["fields"]["authors"]
        let description = books[i]["fields"]["description"]
        if (authorNames === undefined || authorNames == null) {
            authorNames = ""
        }
        add(bookTitle, authorNames.toString(), description, previewImage, identifier, "archive")
    }
    document.getElementById("loadingScreen").style.display = "none"
    document.getElementById("books_blog").classList.remove("hidden")
    document.getElementById("footer").classList.remove("hidden")

}


function handleJson(books_json) {
    const books = books_json["items"]
    for (let i = 0; i < books.length; i++) {
        const bookName = books[i]["volumeInfo"]["title"]
        let authorNames = books[i]["volumeInfo"]["authors"]
        const description = books[i]["volumeInfo"]["description"]
        const id =  books[i]["id"]
        let previewImage = `https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w480-h690`

        // addBooksToDom(bookName, authorNames, description)
        if (authorNames === undefined || authorNames == null) {
            authorNames = ""
        }
        add(bookName, authorNames.toString(), description, previewImage, id, "google")
    }
    document.getElementById("loadingScreen").style.display = "none"
    document.getElementById("books_blog").classList.remove("hidden")

}

function getContent(searchTerm, page_number) {
    if (page_number === 1) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40`)
            .then(response => {
                response.json().then(r => {
                    handleJson(r)
                })
            })
    }

    // https://archive.org/search?query=c+language&and%5B%5D=mediatype%3A%22texts%22
    // https://archive.org/services/search/beta/page_production/?user_query=java+language&hits_per_page=100&page=1&filter_map={%22mediatype%22%3A{%22texts%22%3A%22inc%22}}&aggregations=false
    let hits_per_page = 20
    console.log(`page_number: ${page_number}`)
    fetch(`https://archive.org/services/search/beta/page_production/?user_query=${searchTerm}&hits_per_page=${hits_per_page}&page=${page_number}&filter_map={%22mediatype%22%3A{%22texts%22%3A%22inc%22}}&aggregations=false`)
        .then(response => {
            response.json().then(r => {
                let totalPage = Math.floor( Number(r["response"]["body"]["hits"]["total"]) / hits_per_page)
                document.getElementById("totalPage").innerText = `${totalPage}`
                handleInternetArchiveJson(r)
                document.title = `Book List - Page number ${page_number}`
                document.getElementById("previousPage").href = `books.html?q=${searchTerm}&page_number=${page_number}`
                page_number += 1
                document.getElementById("nextPage").href = `books.html?q=${searchTerm}&page_number=${page_number}`

            })
        })

}

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    let searchItem = urlParams.get("q")
    console.log(`search term ${searchItem}`)
    getContent(searchItem, Number(urlParams.get("page_number")))
    localStorage.removeItem("search")
}