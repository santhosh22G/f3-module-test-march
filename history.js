const searchNextPageBtn = document.getElementById("searchNextPage");
searchNextPageBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

function showHistory(history, index) {
  return `
    <div class="search_data_tab" id="recentSearchHistoryContentsTab" data-search-id=${index}>
        <p class="sequence_number" id="sequenceNumber">${index}.</p>
        <div class="search_history_contents" id="historyContents" >
            <p class="book_name" id="bookName">${history.search}</p>
            <p class="search_at" id="searchedAt">Searched on: 
                <span class="date_time"  id="dateTime">${history.date} at ${history.time}</span>
            </p>
        </div>
    </div>
    `;
}

let historyTabWrapper = document.getElementById("searchHistoryWrapper");
let historyTabs;
const historyData = JSON.parse(localStorage.getItem("history"));
historyTabs = historyData.map((history, index) =>
  showHistory(history, index + 1)
);
historyTabWrapper.innerHTML = historyTabs.join("");

historyTabWrapper.addEventListener("click", (event) => {
  let searched;
  if (event.target.classList.contains("search_data_tab")) {
    const id = parseInt(event.target.getAttribute("data-search-id"));
    const index = historyData.findIndex((history) => history.id === id);
    if (index !== -1) {
      searched = historyData[index];
      sessionStorage.setItem("searched", JSON.stringify(searched));
      window.location.href = "searched.html";
    }
  }
});

const clearSearchBtn = document.getElementById("clearSearch");
clearSearchBtn.addEventListener("click", () => {
  localStorage.removeItem("history");
  historyTabWrapper.innerHTML = "";
});
