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
