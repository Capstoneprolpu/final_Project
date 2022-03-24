//function to send request to backend to get suggestions for search
let mainsearch = document.getElementById("main_search_bar");
mainsearch.addEventListener("change", (e) => {
  fetch("/search", { method: "GET", mode: "same-origin" })
    .then((response) => response.json)
    .then((response) => {
      searchlist(response);
    })
    .catch((error) => console.log(error));
});
