//functions to toggle the dropdown list from the nav bar
var man_btn = document.querySelectorAll(".man_dd");
var nav_dd = document.getElementsByClassName("nav_dd");
var arrowfils = document.getElementsByClassName("arrow_nav");
var stat1 = false;

if (man_btn[0]) {
  man_btn.forEach((ele, i) => {
    ele.addEventListener("click", (e) => {
      if (stat1 === false || stat1 != i) {
        console.log("what I'm here for");
        nav_dd[i].style.visibility = "visible";
        arrowfils[i].style.visibility = "visible";
        stat1 = i;
      } else {
        console.log("i'm here");
        nav_dd[i].style.visibility = "hidden";
        arrowfils[i].style.visibility = "hidden";
        stat1 = false;
      }
    });
  });

  document.body.addEventListener("click", (e) => {
    if (stat1 !== false) {
      if (
        !nav_dd[stat1].contains(e.target) &&
        !man_btn[stat1].contains(e.target)
      ) {
        for (let i = 0; i < nav_dd.length; i++) {
          nav_dd[i].style.visibility = "hidden";
          arrowfils[i].style.visibility = "hidden";
        }
        stat1 = false;
      }
    }
  });
}

const signBtn = document.getElementById("sign_btn");
const userDiv = document.getElementById("user_nav");

if (userDiv) {
  fetch("/userinfo")
    .then((response) => response.json())
    .then((data) => {
      if (data.firstname) {
        userDiv.children[0].src = data.image;
        userDiv.children[1].innerText = data.firstname;
        signBtn.style.display = "none";
        userDiv.style.display = "flex";
      }
    })
    .catch((err) => console.log(err));
}
