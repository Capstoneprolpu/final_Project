const NAME_PATTERN = /^[a-zA-Z]{3,25}$/;
const PASSWD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$%&^@!])[a-zA-Z0-9#$%^&@!]{8,}$/;

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
      fetch(`/deletelisting/${listingData._id}`)
        .then((data) => data.json())
        .then((data) => {
          if (data.status === "successfull") {
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
        .then((data) => data.json())
        .then((data) => {
          if (data.status === "successfull") {
            listingDiv.remove();
          }
        })
        .catch((err) => console.log(err));
    });
  }

  return listingDiv;
};

const mainRequestDiv = document.getElementById("requests-div");
const sentRequestDiv = document.getElementById("sent-req-div");

const tempRequestElem = document.getElementsByClassName("req_item")[0];
tempRequestElem.style.display = "none";

const requestEleCreate = (requestData, mode) => {
  const RequestDiv = tempRequestElem.cloneNode(true);
  RequestDiv.style.display = "grid";
  RequestDiv.children[0].children[0].src = requestData.Image;
  RequestDiv.children[0].children[1].children[0].innerText =
    requestData.Listing;
  RequestDiv.children[0].children[1].children[1].innerText =
    requestData.Address;

  if (mode === true) {
    RequestDiv.children[1].children[0].src = requestData.TenantImage;
    RequestDiv.children[1].children[1].children[0].innerText = `${requestData.TenantFirstName} ${requestData.TenantLastName}`;
    RequestDiv.children[1].children[1].children[1].innerText =
      requestData.Tenant;
    RequestDiv.children[2].children[0].addEventListener("click", (event) => {
      event.preventDefault();
      fetch(`/acceptreq/${requestData._id}`)
        .then((data) => data.json())
        .then((data) => {
          console.log(data.status);
          if (data.status === "successfull") {
            RequestDiv.remove();
          }
        })
        .catch((err) => console.log(err));
    });
    RequestDiv.children[2].children[1].addEventListener("click", (event) => {
      event.preventDefault();
      fetch(`/rejectreq/${requestData._id}`)
        .then((data) => data.json())
        .then((data) => {
          if (data.status === "successfull") {
            RequestDiv.remove();
          }
        })
        .catch((err) => console.log(err));
    });
  } else {
    RequestDiv.children[1].children[0].src = requestData.OwnerImage;
    RequestDiv.children[1].children[1].children[0].innerText = `${requestData.OwnerFirstName} ${requestData.OwnerLastName}`;
    RequestDiv.children[1].children[1].children[1].innerText =
      requestData.Owner;

    RequestDiv.children[2].children[0].remove();
    RequestDiv.children[2].children[0].remove();
    RequestDiv.children[2].children[0].innerText = "Status:";
    RequestDiv.children[2].children[1].innerText = requestData.Status;
    switch (requestData.Status) {
      case "Pending":
        RequestDiv.children[2].children[1].style.color = "var(--brandSupport)";
        break;
      case "Accepted":
        RequestDiv.children[2].children[1].style.color = "var(--green)";
        break;
      case "Rejected":
        RequestDiv.children[2].children[1].style.color = "var(--red)";
        break;
      default:
        RequestDiv.children[2].children[1].style.color = "var(--black)";
    }
  }

  return RequestDiv;
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
      if (data.requestsReceived[0]) {
        data.requestsReceived.map((item, i) => {
          mainRequestDiv.append(requestEleCreate(item, true));
        });
      }
      if (data.requestsSent[0]) {
        data.requestsSent.map((item, i) => {
          sentRequestDiv.append(requestEleCreate(item, false));
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

updateListingsData();

const validateInput = (
  inputType,
  formSubmitBtn,
  formInput,
  inputPattern,
  inputErrorElement,
  inputConstraintsElement = ""
) => {
  const validate = (inputVal) => {
    if (inputType === "confirm password") {
      if (formInput.value === inputPattern.value) {
        formSubmitBtn.removeAttribute("disabled");
        formInput.classList.remove("invalid-input");
        inputErrorElement.classList.add("hide");
      } else {
        formSubmitBtn.setAttribute("disabled", "");
        formInput.classList.add("invalid-input");
        inputErrorElement.innerText = `Passwords don't match !`;
        inputErrorElement.classList.remove("hide");
      }
    } else {
      if (inputPattern.test(inputVal) === false) {
        formSubmitBtn.setAttribute("disabled", "");
        formInput.classList.add("invalid-input");
        inputErrorElement.innerText = `Please enter a valid ${inputType}`;
        inputErrorElement.classList.remove("hide");
        if (inputConstraintsElement !== "") {
          inputConstraintsElement.classList.remove("hide");
        }
      } else {
        formSubmitBtn.removeAttribute("disabled");
        formInput.classList.remove("invalid-input");
        inputErrorElement.classList.add("hide");
        if (inputConstraintsElement !== "") {
          inputConstraintsElement.classList.add("hide");
        }
      }
    }
  };

  formInput.addEventListener("input", () => {
    let formInputVal = formInput.value;
    validate(formInputVal.trim());
  });
};

const profileSaveBtn = document.querySelector("#pfbtn_right");

const passwdInput = document.querySelector("#form_password");
const passwdErrorElement = document.querySelector("#passwd-error");
const passwdConstraintsElement = document.querySelector("#passwd-constraints");

validateInput(
  "password",
  profileSaveBtn,
  passwdInput,
  PASSWD_PATTERN,
  passwdErrorElement,
  passwdConstraintsElement
);

const confPasswdInput = document.querySelector("#form_con_password");
const confPasswdErrorElement = document.querySelector("#conf-passwd-error");

validateInput(
  "confirm password",
  profileSaveBtn,
  confPasswdInput,
  passwdInput,
  confPasswdErrorElement
);

const firstNameInput = document.querySelector('input[name="FirstName"]');
const firstNameErrorElement = document.querySelector("#first-name-error");
const firstNameConstraintsElement = document.querySelector(
  "#first-name-constraints"
);

validateInput(
  "first name",
  profileSaveBtn,
  firstNameInput,
  NAME_PATTERN,
  firstNameErrorElement,
  firstNameConstraintsElement
);

const lastNameInput = document.querySelector('input[name="LastName"]');
const lastNameErrorElement = document.querySelector("#last-name-error");
const lastNameConstraintsElement = document.querySelector(
  "#last-name-constraints"
);

validateInput(
  "last name",
  profileSaveBtn,
  lastNameInput,
  NAME_PATTERN,
  lastNameErrorElement,
  lastNameConstraintsElement
);
