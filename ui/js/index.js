//function to send request to backend to get suggestions for search
let mainSearch = document.getElementById("main_search_bar");
mainSearch.addEventListener("change", () => {
  fetch("/search", { method: "GET", mode: "same-origin" })
    .then((response) => response.json)
    .then((response) => {
      // searchList() still needs to be implemented
      searchList(response);
    })
    .catch((error) => console.log(error));
});
