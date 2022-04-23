const mens = document.querySelectorAll(".right_s_item");
const menuBtns = document.querySelectorAll(".toggle_right");

//adding event listener to left toggle list menu btns
let dropNumber = 1;
menuBtns.forEach((menuBtn, menuBtnIndex) => {
  menuBtn.addEventListener("click", (event) => {
    handleDrops(event, menuBtnIndex);
  });
});

function handleDrops(event, i) {
  event.preventDefault();
  mens[dropNumber].style.visibility = "hidden";
  menuBtns[dropNumber].classList.remove("selected_nav");
  mens[i].style.visibility = "visible";
  menuBtns[i].classList.add("selected_nav");
  dropNumber = i;
}

//functions to handle profile form
//to preview changed profile pic

const picInput = document.getElementById("profile_pic_input");
const picChangeBtn = document.getElementById("change_profile_pic");
const profilePicImg = document.getElementById("form_profile_pic");

picInput.addEventListener("change", (event) => {
  let fileTypes = ["image/jpeg", "image/png"];
  const file = picInput.files[0];
  if (fileTypes.includes(file.type)) {
    profilePicImg.src = window.URL.createObjectURL(file);
  }
});

//to handle form submission
const formUserName = document.getElementById("profile_username_main");
const formUserEmail = document.getElementById("profile_email_main");
const formFirstName = document.getElementById("form_firstname");
const formLastName = document.getElementById("form_lastname");

document.getElementById("pfbtn_right").addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Entering");
  if (
    document.getElementById("form_password").value ===
    document.getElementById("form_con_password").value
  ) {
    console.log("submitting");
    document.getElementById("profile_edit_form").submit();
  }
});

//main user data update

const userPic = document.getElementById("left-profile-pic");
const userName = document.getElementById("main-left-user-name");
const userEmail = document.getElementById("main-left-user-email");

const updateUserInfo = () => {
  fetch("/userinfo")
    .then((data) => data.json())
    .then((data) => {
      userPic.src = data.image;
      profilePicImg.src = data.image;
      userName.innerText = `${data.firstname} ${data.lastname}`;
      formUserName.innerText = `${data.firstname} ${data.lastname}`;
      userEmail.innerText = data.email;
      formUserEmail.innerText = data.email;
      formFirstName.value = data.firstname;
      formLastName.value = data.lastname;
    })
    .catch((err) => console.log(err));
};

updateUserInfo();

//to show listings of user

const mainListingDiv = document.getElementById("user_rentals");
const mainRentedDiv = document.getElementById("user_rentedLis_div");

const tempListingElem = document.getElementsByClassName("user_rentals_item")[0];
tempListingElem.style.display = "none";

const listingEleCreate = (listingData, mode) => {
  const listingDiv = tempListingElem.cloneNode(true);
  listingDiv.style.display = "block";
  listingDiv.children[0].children[0].src = listingData.Image[0];
  listingDiv.children[0].children[1].src = listingData.Image[1];
  listingDiv.children[1].children[0].children[0].innerText =
    listingData.HomeType;
  listingDiv.children[1].children[0].children[1].children[0].innerText = `₹${listingData.RentPrice}/month`;
  listingDiv.children[1].children[0].children[1].children[1].innerText = `${listingData.AreaSqft} sqft.`;
  listingDiv.children[1].children[0].children[1].children[2].innerText = `${listingData.NumberOfBedrooms} Bedrooms`;
  listingDiv.children[1].children[0].children[1].children[3].innerText = `${listingData.NumberOfBathrooms} Bathrooms`;
  listingDiv.children[1].children[0].children[1].children[4].innerText = `${listingData.HouseNumber}, ${listingData.StreetName}, ${listingData.Landmark}, ${listingData.CityName}`;

  if (mode === true) {
    listingDiv.children[2].children[1].addEventListener("click", (event) => {
      event.preventDefault();
      fetch(`/delete/${listingData._id}`)
        .then((data) => data.json)
        .then((data) => {
          if (data.status === "deleted successful") {
            listingDiv.remove();
          }
        })
        .catch((err) => console.log(err));
    });
  } else {
    listingDiv.children[2].children[1].innerText = "Remove";
    listingDiv.children[2].children[1].addEventListener("click", (event) => {
      event.preventDefault();
      fetch(`/removetenant/${listingData._id}`)
        .then((data) => data.json)
        .then((data) => {
          if (data.status === "removed successful") {
            listingDiv.remove();
          }
        })
        .catch((err) => console.log(err));
    });
  }

  return listingDiv;
};

const updateListingsData = () => {
  fetch("/userdashboarddata")
    .then((response) => response.json())
    .then((data) => {
      if (data.owner[0]) {
        data.owner.map((item, i) => {
          mainListingDiv.append(listingEleCreate(item, true));
        });
      }
      if (data.tenant[0]) {
        data.tenant.map((item, i) => {
          mainRentedDiv.append(listingEleCreate(item, false));
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

updateListingsData();
