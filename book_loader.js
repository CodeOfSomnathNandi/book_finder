// document.addEventListener("DOMContentLoaded", (ev) => {
//     init()
// })

window.onload = (ev) => {
    if (localStorage.getItem("search") != null && localStorage.getItem("search") !== "") {
        console.log(localStorage.getItem("search"))
        init()
    } else {
        document.getElementById("loadingScreen").style.display = "none"
    }

}


function createCard(imageSource, cardTitle, cardText, lastUpdated, buyLink) {
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
    const a = document.createElement("a")
    a.style.textDecoration = "none"
    a.href = buyLink
    a.text = cardTitle;
    titleElement.classList.add('card-title');
    titleElement.appendChild(a)

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

function add(bookName, authorNames, description, previewImage, buyLink) {
    const cardContainer = document.getElementById('books_blog'); // Assuming you have a container in your HTML to append the cards
    let card = createCard(previewImage, bookName, description, authorNames, buyLink)
    cardContainer.appendChild(card)
}




function handleJson(books_json) {
    const books = books_json["items"]
    for (let i = 0; i < books.length; i++) {
        const bookName = books[i]["volumeInfo"]["title"]
        let authorNames = books[i]["volumeInfo"]["authors"]
        const description = books[i]["volumeInfo"]["description"]
        const id =  books[i]["id"]
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
        const  buyLink = `https://play.google.com/store/books/details?id=${id}`
        add(bookName, authorNames.toString(), description, previewImage, buyLink)
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