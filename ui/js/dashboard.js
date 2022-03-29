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
