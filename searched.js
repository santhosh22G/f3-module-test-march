const searched = JSON.parse(sessionStorage.getItem("searched"));
let bookImgDiv = document.getElementById("movieGridWrapper");
let tab = document.getElementById("searchHistoryWrapper");
let histories;
let historiesTab;
histories = searched.bookData.map((item) => {
  return bookImg(item);
});
bookImgDiv.innerHTML = histories.join("");

historiesTab = historyTab(searched, 0);
tab.innerHTML = historiesTab;

function bookImg(item) {
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

function historyTab(searched, index) {
  return `
    <div class="search_data_tab" id="recentSearchHistoryContentsTab">
        <p class="sequence_number" id="sequenceNumber">${index + 1}.</p>
        <div class="search_history_contents" id="historyContents" >
            <p class="book_name" id="bookName">${searched.search}</p>
            <p class="search_at" id="searchedAt">Searched on: 
                <span class="date_time"  id="dateTime">${searched.date} at ${
    searched.time
  }</span>
            </p>
        </div>
    </div>
    `;
}

const backButton = document.getElementById("backPage");
backButton.addEventListener("click", () => {
  window.location.href = "history.html";
});
