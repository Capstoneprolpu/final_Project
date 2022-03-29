//functions to toggle the dropdown list from the nav bar
const man_btn = document.getElementById("man_dd");
const nav_dd = document.getElementsByClassName("nav_dd")[0];
const arrowfil = document.getElementsByClassName("arrow_filter")[0];
let stat1 = "false";

man_btn.addEventListener("click", () => {
  if (stat1 === "false") {
    nav_dd.style.visibility = "visible";
    arrowfil.style.visibility = "visible";
    stat1 = "true";
  } else {
    nav_dd.style.visibility = "hidden";
    arrowfil.style.visibility = "hidden";
    stat1 = "false";
  }
});

document.body.addEventListener("click", (event) => {
  if (!nav_dd.contains(event.target) && !man_btn.contains(event.target)) {
    nav_dd.style.visibility = "hidden";
    arrowfil.style.visibility = "hidden";
    stat1 = "false";
  }
});

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
