// document.addEventListener("DOMContentLoaded", (ev) => {
//     init()
// })

window.onload = (ev) => {
    if (localStorage.getItem("search") != null && localStorage.getItem("search") !== "") {
        console.log(localStorage.getItem("search"))
        init()
    } else {
        document.getElementById("loadingScreen").style.display = "none"
        document.getElementById("not_found").classList.remove("hidden")
    }
    console.log("onlog called")
}


function createCard(previewImage, bookTitle, bookDescription, authorName, id) {
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
    a.href = `book_preview_page.html?id=${id}`
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

function add(bookName, authorNames, description, previewImage, id) {
    const cardContainer = document.getElementById('books_blog'); // Assuming you have a container in your HTML to append the cards
    let card = createCard(previewImage, bookName, description, authorNames, id)
    cardContainer.appendChild(card)
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
        add(bookName, authorNames.toString(), description, previewImage, id)
    }
    document.getElementById("loadingScreen").style.display = "none"
    document.getElementById("books_blog").classList.remove("hidden")

}

function getContent(searchTerm) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=40`)
        .then(response => {
            response.json().then(r => {
                handleJson(r)
                // console.log(r)
            })
        })
}

function init() {
    let searchItem = localStorage.getItem("search")
    console.log(localStorage)
    console.log(`search term ${searchItem}`)
    getContent(searchItem)
    localStorage.removeItem("search")
}