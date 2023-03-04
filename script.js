const history = JSON.parse(localStorage.getItem("history")) || [];
const searchButton = document.getElementById("Search");

let booksCardDiv = document.getElementById("movieGridWrapper");
let booksData;

let x = 1;
searchButton.addEventListener("click", () => {
  let historyData = {
    id: "",
    search: "",
    time: "",
    date: "",
    bookData: [],
  };
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString();

  let searchValue = document.getElementById("recentSearchInput").value;
  historyData.id = x++;
  historyData.search = searchValue;
  historyData.time = time;
  historyData.date = date;
  history.push(historyData);

  let nameOfSearchedBook = document.getElementById("searchBookName");
  nameOfSearchedBook.innerText = `Book Results For "${searchValue}"`;

  let url = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let items = data.items;
      historyData.bookData = items;
      localStorage.setItem("history", JSON.stringify(history));
      booksData = items.map((item) => {
        return bookCard(item);
      });

      booksCardDiv.innerHTML = booksData.join("");
    });
});

function bookCard(item) {
  let book = item.volumeInfo;
  return `
    <div class="card">
        <div class="bookapp_image" id="bookIMG">
            <img src="${
              book.imageLinks
                ? book.imageLinks.smallThumbnail
                : "image not found"
            }" alt="" class="image" id="Image">
        </div>
        <div class="book_contents" id="bookContents">
            <p class="title" id="Title">Title: ${book.title.slice(0, 40)}</p>
            <p class="author" id="Author">Author: ${
              book.authors ? book.authors : "NA"
            }</p>
            <p class="page_count" id="pageCount">Page Count: ${
              book.pageCount ? book.pageCount : "NA"
            }</p>
            <p class="publisher" id="Publisher">Publisher: ${
              book.publisher ? book.publisher : "NA"
            }</p>
        </div>
        <div class="booknow_button" id="booknowButton">
            <button class="btn" id="BTN">BOOK NOW</button>
        </div>
    </div>
    `;
}

const historyPageButton = document.getElementById("historyNextPageBtn");
historyPageButton.addEventListener("click", () => {
  window.location.href = "history.html";
});
