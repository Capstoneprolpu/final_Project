const formParts = document.querySelectorAll(".add_form");
const toggleVisibility = (ins) => {
  formParts.forEach((formPart) => {
    formPart.style.visibility = "hidden";
  });
  formParts[ins].style.visibility = "visible";
};

const navForBtns = document.querySelectorAll(".form_for");
navForBtns.forEach((navForBtn, btnIndex) => {
  navForBtn.addEventListener("click", (event) => {
    event.preventDefault();
    toggleVisibility(btnIndex + 1);
  });
});

const navBacBtns = document.querySelectorAll(".form_bac");
navBacBtns.forEach((navBacBtn, btnIndex) => {
  navBacBtn.addEventListener("click", (event) => {
    event.preventDefault();
    toggleVisibility(btnIndex);
  });
});

//to preview images selected:
const preview = document.getElementById("previews");
const inputElement = document.getElementById("pic_files");
const imgTxt = document.getElementsByClassName("add_img_txt");
let noOfPics = 0;

const handleFiles = () => {
  while (imgTxt[0]) {
    imgTxt[0].remove();
  }
  const selectedFiles = inputElement.files;
  if (selectedFiles.length > 4) {
    return;
  }

  for (const file of selectedFiles) {
    if (!file.type.startsWith("image/")) {
      continue;
    }

    if (noOfPics === 4) {
      break;
    }

    const img = document.createElement("img");
    img.classList.add("preview_item");
    img.file = file;
    preview.appendChild(img);

    const reader = new FileReader();
    reader.onload = (
      (aImg) => (event) =>
        (aImg.src = event.target.result)
    )(img);
    reader.readAsDataURL(file);
    noOfPics += 1;
  }
};

inputElement.addEventListener("change", handleFiles, false);

//function to remove previewed pictures

const rempic = document.getElementById("remove_pics");
rempic.addEventListener("click", (e) => {
  e.preventDefault();
  const temp = document.getElementsByClassName("preview_item");
  while (temp[0]) {
    temp[0].remove();
    noOfPics = 0;
  }
});

//portel js

const openMapBtn = document.querySelector("#open-map");
const portel = document.querySelector("#portel");
const portelDiv = document.querySelector("#main-portel-div");
const closePortelBtn = document.querySelector("#portel-close-btn");
const portelSubmitBtn = document.querySelector("#portel-submit-btn");

let portelStatus = false;

function togglePortel() {
  if (!portelStatus) {
    portel.style.display = "block";
    portelStatus = true;
  } else {
    portel.style.display = "none";
    portelStatus = false;
  }
}

const latitudeInput = document.getElementById("latitude-input");
const longitudeInput = document.getElementById("longitude-input");

const portelLatitudeInput = document.getElementById("portel-map-latitude");
const portelLongitudeInput = document.getElementById("portel-map-longitude");

const cityInput = document.getElementById("city-input");

let primaryLocation = { lat: 10.234, lng: 35.24 };
let zoom = 4;

const updateMap = async () => {
  let city = cityInput.value.toLowerCase();
  if (city === "") {
    togglePortel();
    return;
  }
  fetch(`https://citylocate.herokuapp.com/${city}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      primaryLocation = data.data;
      zoom = 11;
      initMap();
      togglePortel();
    })
    .catch((e) => console.log(e));
};

openMapBtn.addEventListener("click", (event) => {
  event.preventDefault();
  updateMap();
});
closePortelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  togglePortel();
});
portelSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  togglePortel();
});

const updateLatLng = (lat, lng) => {
  latitudeInput.value = lat;
  longitudeInput.value = lng;
  portelLatitudeInput.value = lat;
  portelLongitudeInput.value = lng;
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: primaryLocation,
    zoom: zoom,
  });

  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: primaryLocation,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    const lat = mapsMouseEvent.latLng.toJSON().lat;
    const lng = mapsMouseEvent.latLng.toJSON().lng;
    updateLatLng(lat, lng);
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
}
