//function to send request to backend to get suggestions for search
const mainSearch = document.getElementById("main_search_bar");
const searchBtn = document.getElementById("index-search-btn");
const messageElement = document.getElementById("message-search-result");
const mainAcDiv = document.getElementById("autocomplete_list");
const mainAcItem = document.querySelectorAll(".autocomplete_item");

mainAcItem.forEach((element, i) => {
  element.addEventListener("click", (event) => {
    mainSearch.value = mainAcItem[i].innerText;
    hideAllList();
  });
});

const hideAllList = () => {
  mainAcItem.forEach((element) => {
    element.innerText = "";
    element.style.display = "none";
  });
};

mainSearch.addEventListener("input", () => {
  hideAllList();
  if (mainSearch.value.length > 0) {
    fetch(`https://citylocate.herokuapp.com/autocomplete/${mainSearch.value}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data.data);
        for (let i = 0; i < data.data.length; i++) {
          mainAcItem[i].innerText = data.data[i];
          mainAcItem[i].style.display = "block";
        }
      });
  }
  if (mainSearch.value.length == 0) {
    hideAllList();
  }
});

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
  fetch(`/searchcity/${city}`, {
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
