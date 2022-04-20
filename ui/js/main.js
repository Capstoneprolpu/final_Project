let map;
let primaryLocation = { lat: 28.679, lng: 77.06971 };

let locations = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: primaryLocation,
    zoom: 11,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    const marker = new google.maps.Marker({
      position,
      label,
      map: map,
    });
  });
}

function updateMapCity(city) {
  toggleLoader();
  fetch(`https://citylocate.herokuapp.com/${city}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      primaryLocation = data.data;
      initMap();
      toggleLoader();
    })
    .catch((e) => console.log(e));
}

//Code for filter buttons
const filters = document.querySelectorAll(".filter_btn");
const filterExt = document.getElementsByClassName("filter_ext");
const arrowFilter = document.getElementsByClassName("arrow_filter");
let filterNumber = 0;
let filterone = false;

filters.forEach((filter, filterIndex) => {
  filter.addEventListener("click", (event) => {
    handleFilter(event, filterIndex);
  });
});

const handleFilter = (event, i) => {
  if (filterNumber !== i) {
    filterExt[filterNumber].style.visibility = "hidden";
    arrowFilter[filterNumber].style.visibility = "hidden";
    filterExt[i].style.visibility = "visible";
    arrowFilter[i].style.visibility = "visible";
    filterNumber = i;
  } else if (i === 0 && filterone === false) {
    filterExt[i].style.visibility = "visible";
    arrowFilter[i].style.visibility = "visible";
    filterone = true;
  } else {
    filterExt[i].style.visibility = "hidden";
    arrowFilter[i].style.visibility = "hidden";
    filterNumber = 0;
    filterone = false;
  }
};

//Code to disappear filters menu
const subs = document.querySelectorAll(".filter_done");
subs.forEach((sub, subIndex) => {
  sub.addEventListener("click", (event) => {
    event.preventDefault();
    filterExt[subIndex].style.visibility = "hidden";
    arrowFilter[subIndex].style.visibility = "hidden";
    filterNumber = 0;
    filterone = false;
  });
});

document.body.addEventListener("click", (event) => {
  if (
    !document
      .getElementsByClassName("filter_ext")
      [filterNumber].contains(event.target) &&
    !filters[filterNumber].contains(event.target)
  ) {
    const boxs = document.getElementsByClassName("filter_ext");

    boxs[filterNumber].style.visibility = "hidden";
    arrowFilter[filterNumber].style.visibility = "hidden";
    filterNumber = 0;
    filterone = false;
  }
});

//variables for filter values and "POST" function

let listingType = "Rent";
let numberofBedrooms = "any";
let numberofBathrooms = "any";
let minPrice = 0;
let maxPrice = "any";
let spaceType = ["Home", "Apartment", "Room"];

const postData = {
  listingType: listingType,
  numberofBedrooms: numberofBedrooms,
  numberofBathrooms: numberofBathrooms,
  minPrice: minPrice,
  maxPrice: maxPrice,
  spaceType: spaceType,
};

const applyFilters = document.getElementById("apply-filters-btn");

applyFilters.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/filters", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log("We got something back!");
      //here next functionalities will applied
    });
});

//Code for rent and sale filter
const rs = document.getElementById("r_s");
const radCir = document.getElementsByClassName("radio_circles");
radCir[0].addEventListener("click", () => {
  rs.textContent = radCir[0].value;
  listingType = "Rent";
});
radCir[1].addEventListener("click", () => {
  rs.textContent = radCir[1].value;
  listingType = "Sale";
});

//Code for filter bedroom and bathroom selection.
const bb = document.getElementById("b_b");
const btns = document.querySelectorAll(".formbtn");
let bds = 0;
btns.forEach((btn, btnIndex) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    btns[btnIndex].setAttribute("pressed", "true");
    btns[bds].setAttribute("pressed", "false");
    bds = btnIndex;
    numberofBedrooms = bds;
    bb.textContent = `${bds}+ Bd, ${bds1}+ Ba`;
    bb.style.backgroundColor = "var(--brandSupport)";
  });
});

const btns1 = document.querySelectorAll(".formbtn1");
var bds1 = 0;
btns1.forEach((btn1, btn1Index) => {
  btn1.addEventListener("click", (event) => {
    event.preventDefault();
    btn1.setAttribute("pressed", "true");
    btns1[bds1].setAttribute("pressed", "false");
    bds1 = btn1Index;
    numberofBathrooms = bds1;
    bb.textContent = `${bds}+ Bd, ${bds1}+ Ba`;
    bb.style.backgroundColor = "var(--brandSupport)";
  });
});

// Price filters form
const sub = document.getElementById("price_sub");
const mins = document.getElementById("mins");
const maxs = document.getElementById("maxs");
const priceSe = document.getElementsByClassName("price_dd");
const opt = document.getElementsByClassName("op2");
const priceBtn = document.getElementById("pricebtn");

//function to change the max-price list according to the selected min value
priceSe[0].addEventListener("click", (event) => {
  event.preventDefault();
  mins.value = priceSe[0].value;

  let minvalue = +priceSe[0].value + 1000;
  for (let i = 1; i < opt.length; i++) {
    opt[i].textContent = minvalue;
    opt[i].value = minvalue;
    minvalue = minvalue + 1000;
  }
  maxs.value = priceSe[1].value;
});

priceSe[1].addEventListener("click", (event) => {
  event.preventDefault();
  maxs.value = priceSe[1].value;
});

sub.addEventListener("click", () => {
  if (mins.value === "" && maxs.value === "") {
    priceBtn.textContent = `Price`;
  } else if (maxs.value === "") {
    priceBtn.textContent = `Rs${mins.value}+`;
    minPrice = mins.value;
    priceBtn.style.backgroundColor = "var(--brandSupport)";
  } else if (mins.value === "") {
    priceBtn.textContent = `Upto Rs${maxs.value}`;
    maxPrice = maxs.value;
    priceBtn.style.backgroundColor = "var(--brandSupport)";
  } else {
    priceBtn.textContent = `Rs${mins.value} - Rs${maxs.value}`;
    minPrice = mins.value;
    maxPrice = maxs.value;
    priceBtn.style.backgroundColor = "var(--brandSupport)";
  }
});

//Space type filter settings
const subrt = document.getElementById("roomtype");
const space = document.getElementsByClassName("space_type");
const sptybt = document.getElementById("space_type_btn");

subrt.addEventListener("click", (e) => {
  let count = 0;
  let temp = "";
  spaceType = [];
  for (let i = 0; i < space.length; i++) {
    if (space[i].checked) {
      count++;
      if (count === space.length - 1) {
        temp = temp + space[i].value;
        spaceType.push(space[i].value);
      } else {
        temp = temp + space[i].value + ",";
        spaceType.push(space[i].value);
      }
    }
  }
  if (count != 3) {
    sptybt.textContent = temp;
    sptybt.style.backgroundColor = "var(--brandSupport)";
  }
});

//js to handle the portal

const portal = document.querySelector("#portal");
const portalDiv = document.querySelector("#main-portal-div");
const closePortalBtn = document.querySelector("#portal-close-btn");

let portalStatus = false;

function togglePortal() {
  if (!portalStatus) {
    portal.style.display = "block";
    portalStatus = true;
  } else {
    portal.style.display = "none";
    portalStatus = false;
  }
}
const portelEvent = () => {
  const listingElements = document.querySelectorAll(".home_item");
  listingElements.forEach((Element, index) => {
    Element.addEventListener("click", () => {
      togglePortal();
    });
  });
};

closePortalBtn.addEventListener("click", () => {
  togglePortal();
});

//js to handle the portal images slideshow
const imgElements = document.querySelectorAll(".portal-img");
const dotElements = document.querySelectorAll(".dot");
const arrowLeft = document.querySelector("#portal-img-left-arrow");
const arrowRight = document.querySelector("#portal-img-right-arrow");

let activeImg = 0;

function imageHide(index) {
  imgElements[index].classList.remove("active");
  dotElements[index].classList.remove("dot-active");
}

function imageShow(index) {
  imgElements[activeImg].classList.add("active");
  dotElements[activeImg].classList.add("dot-active");
}

arrowLeft.addEventListener("click", () => {
  imageHide(activeImg);
  activeImg--;
  if (activeImg < 0) {
    activeImg = imgElements.length - 1;
  }
  imageShow(activeImg);
});

arrowRight.addEventListener("click", () => {
  imageHide(activeImg);
  activeImg++;
  if (activeImg >= imgElements.length) {
    activeImg = 0;
  }
  imageShow(activeImg);
});

dotElements.forEach((element, index) => {
  element.addEventListener("click", () => {
    imageHide(activeImg);
    activeImg = index;
    imageShow(activeImg);
  });
});

//js to handle the data of the city rental data and render it in the concerned div

const searchCityBtn = document.getElementById("city-search-btn");
const searchCityName = document.getElementById("city-name-input");

const listingCreate = (listingData) => {
  const listingDiv = document
    .getElementsByClassName("home_item")[0]
    .cloneNode(true);
  listingDiv.classList.add("active-listing");
  listingDiv.style.display = "block";
  listingDiv.children[0].src = listingData.Image[0];
  listingDiv.children[1].children[0].innerText = `₹${listingData.RentPrice}/mo`;
  listingDiv.children[1].children[1].children[0].innerText = `${listingData.NumberOfBedrooms} Bedrooms`;
  listingDiv.children[1].children[1].children[1].innerText = `${listingData.NumberOfBathrooms} Bathrooms`;
  listingDiv.children[1].children[1].children[2].innerText = `${listingData.AreaSqft} sqft.`;
  listingDiv.children[1].children[2].innerText = `${listingData.HouseNumber}, ${listingData.StreetName}, ${listingData.Landmark}, ${listingData.CityName}`;
  return listingDiv;
};

const mainDivListings = document.getElementById("homelist");
const messageListing = document.getElementById("message-listing");

let listingArray = [];
handleListingData();

function handleListingData() {
  fetch("http://localhost:8080/citiesdata")
    .then((response) => response.json())
    .then((data) => {
      const activeListing = document.getElementsByClassName("active-listing");
      while (activeListing[0]) {
        activeListing[0].remove();
      }
      if (data[0]) {
        messageListing.innerText = "";
        listingArray = data;
        listingArray.map((item, i) => {
          mainDivListings.append(listingCreate(item));
          locations.push({ lat: +item.Latitude, lng: +item.Longitude });
        });
        updateMapCity(listingArray[0].CityName);
        searchCityName.value = listingArray[0].CityName;
        portelEvent();
      } else {
        searchCityName.value = "";
        messageListing.innerText = "No Data from this city";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

searchCityBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = searchCityName.value.toLowerCase().split(" ");
  let cityWithSpace = "";
  if (city.length > 1) {
    cityWithSpace = city[0] + "%20" + city[1];
  } else {
    cityWithSpace = city;
  }
  document.cookie = `city=${cityWithSpace};SameSite=Lax`;
  handleListingData();
});
