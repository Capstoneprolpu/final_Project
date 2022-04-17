//functions to toggle the dropdown list from the nav bar
var man_btn = document.getElementById("man_dd");
var nav_dd = document.getElementsByClassName("nav_dd")[0];
var arrowfils = document.getElementsByClassName("arrow_nav")[0];
var stat1 = "false";
man_btn.addEventListener("click", (e) => {
  if (stat1 == "false") {
    nav_dd.style.visibility = "visible";
    arrowfils.style.visibility = "visible";
    stat1 = "true";
  } else {
    nav_dd.style.visibility = "hidden";
    arrowfils.style.visibility = "hidden";
    stat1 = "false";
  }
});

document.body.addEventListener("click", (e) => {
  if (!nav_dd.contains(e.target) && !man_btn.contains(e.target)) {
    nav_dd.style.visibility = "hidden";
    arrowfils.style.visibility = "hidden";
    stat1 = "false";
  }
});

//js for waiting loader
const loader = document.getElementById("loader-bg");
let loaderStatus = false;
const toggleLoader = () => {
  if (!loaderStatus) {
    loader.style.display = "block";
    loaderStatus = true;
  } else {
    loader.style.display = "none";
    loaderStatus = false;
  }
};
