window.onload = (ev) => {
    console.log("on book")
    const urlParams = new URLSearchParams(window.location.search);
    init(urlParams.get("id"))

}


function handleJson(r, id) {
    let volumeInfo = r["volumeInfo"]
    let authorName = volumeInfo["authors"]
    let bookTitle = volumeInfo["title"]
    let subTitle = volumeInfo["subtitle"]
    let description = volumeInfo["description"]
    let pageCount = volumeInfo["pageCount"]
    let isEbook = volumeInfo["isEbook"]
    let publishedTime = volumeInfo["publishedDate"]
    document.getElementById("previewImage").src = `https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w480-h690`
    document.getElementById("bookTitle").textContent = `${bookTitle}: ${subTitle}`
    document.getElementById("authorTitle").textContent = `${authorName.toString()}`
    document.getElementById("descriptionContainer").innerHTML = `${description}`
    document.getElementById("pageNumber").textContent = `Page: ${pageCount}`
    document.getElementById("publicationDate").textContent = `PublicationDate: ${publishedTime}`
    if (isEbook === true) {
        document.getElementById("type").textContent = "Type: Ebook"
    } else {
        document.getElementById("type").textContent = "Type: Book"
    }

 }


function init(id) {
    console.log("init called")
    // let id = localStorage.getItem("id")
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then(response => {
            response.json().then(r => {
                handleJson(r, id)
            })
        })
    document.getElementById("freeSample").addEventListener("click", (ev) => {
        let a = document.createElement("a")
        a.target = "_blank"
        a.href = `https://play.google.com/books/reader?id=${id}&pg=GBS.PR3&hl=en_GB`
        a.click()
    })

    document.getElementById("buyBook").addEventListener("click", (ev) => {
        let a = document.createElement("a")
        a.target = "_blank"
        a.href = `https://play.google.com/store/books/details?id=${id}&rdid=book-${id}&rdot=1&source=gbs_api"`
        a.click()
    })
}