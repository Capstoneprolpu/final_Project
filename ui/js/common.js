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
