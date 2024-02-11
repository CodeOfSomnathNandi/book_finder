// document.addEventListener("DOMContentLoaded", (ev) => {
//     init()
// })

window.onload = (ev) => {
    init()
}

function setBooksToDom(bookName, bookAuthor, bookDescription, previewImage) {
    let booksDiv = document.getElementById("books_blog");

    let cardDiv = document.createElement("div")
    cardDiv.classList.add("card", "mb-3", "mt-3")

    let rowDiv = document.createElement("div")
    rowDiv.classList.add("row", "g-0")
    let colDiv = document.createElement("div")
    colDiv.classList.add("col-md-4")
    let img = document.createElement("img")
    img.classList.add("img-fluid", "rounded-start")
    img.alt = "book"
    img.src = previewImage
    let secondColDiv = document.createElement("div")
    secondColDiv.classList.add("col-md-8")
    let cardBodyDiv = document.createElement("div")
    cardBodyDiv.classList.add("card-body")

    let h5 = document.createElement("h5")
    h5.classList.add("card-title")
    h5.innerText = bookName

    let authorP = document.createElement("p")
    let smallContainer = document.createElement("small")
    smallContainer.classList.add("text-body-secondary")
    smallContainer.innerText = bookAuthor
    authorP.classList.add("card-text")
    authorP.appendChild(smallContainer)

    let descriptionP = document.createElement("p")
    descriptionP.classList.add("card-text")
    descriptionP.innerText = bookDescription

    // appending
    cardBodyDiv.appendChild(h5)
    cardBodyDiv.appendChild(authorP)
    cardBodyDiv.appendChild(descriptionP)

    secondColDiv.appendChild(cardBodyDiv)
    colDiv.appendChild(img)

    rowDiv.appendChild(img)
    rowDiv.appendChild(cardBodyDiv)

    cardDiv.appendChild(rowDiv)

    booksDiv.appendChild(cardDiv)

}


function createCard(imageSource, cardTitle, cardText, lastUpdated) {
    // Create elements
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'mb-3');
    // cardDiv.style.maxWidth = '540px';

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'g-0');

    const imageColDiv = document.createElement('div');
    imageColDiv.classList.add('col-md-4');

    const imgElement = document.createElement('img');
    imgElement.src = imageSource;
    imgElement.style.height = "100%"
    // imgElement.style.width = "100%"
    imgElement.classList.add('img-fluid', 'rounded-start');
    imgElement.alt = '...';

    const contentColDiv = document.createElement('div');
    contentColDiv.classList.add('col-md-8');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    titleElement.textContent = cardTitle;

    const textElement = document.createElement('p');
    textElement.classList.add('card-text');
    textElement.textContent = cardText;

    const lastUpdatedElement = document.createElement('p');
    lastUpdatedElement.classList.add('card-text');
    const smallElement = document.createElement('small');
    smallElement.classList.add('text-body-secondary');
    smallElement.textContent = lastUpdated;
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

function add(bookName, authorNames, description, previewImage) {
    const cardContainer = document.getElementById('books_blog'); // Assuming you have a container in your HTML to append the cards
    let card = createCard(previewImage, bookName, description, authorNames)
    cardContainer.appendChild(card)
}




function handleJson(books_json) {
    const books = books_json["items"]
    for (let i = 0; i < books.length; i++) {
        const bookName = books[i]["volumeInfo"]["title"]
        let authorNames = books[i]["volumeInfo"]["authors"]
        const description = books[i]["volumeInfo"]["description"]
        let previewImage = "default_book.png"
        try {
             previewImage = books[i]["volumeInfo"]["imageLinks"]["smallThumbnail"]
        } catch (e) {
            console.log(`Not found in ${i}`)
        }
        // addBooksToDom(bookName, authorNames, description)
        if (authorNames === undefined || authorNames == null) {
            authorNames = ""
        }
        add(bookName, authorNames.toString(), description, previewImage)
    }
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
    getContent(searchItem)
    localStorage.removeItem("search")
}