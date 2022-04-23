//function to send request to backend to get suggestions for search
const mainSearch = document.getElementById("main_search_bar");
const searchBtn = document.getElementById("index-search-btn");
const messageElement = document.getElementById("message-search-result");

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const city = mainSearch.value.toLowerCase();
  if (city === "") {
    messageElement.innerText = "Enter a City to search";
    messageElement.style.visibility = "visible";
    setTimeout(() => {
      messageElement.style.visibility = "hidden";
    }, 3000);
    return;
  }
  fetch(`http://localhost:8080/searchcity/${city}`, {
    method: "GET",
    mode: "same-origin",
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.status != "City found") {
        messageElement.innerText = data.status;
        messageElement.style.visibility = "visible";
        setTimeout(() => {
          messageElement.style.visibility = "hidden";
        }, 3000);
      } else {
        window.open("/main", "_self");
      }
    })
    .catch((error) => console.log(error));
});
