let stat = 1;
let form1 = document.getElementById("form1");
let form2 = document.getElementById("form2");

const primaryToggle = document.getElementById("toggle_page");
const secondaryToggle = document.getElementById("toggle_page1");

form2.remove();

const togglePage = () => {
  if (stat === 1) {
    form1.replaceWith(form2);
    form2.style.display = "block";
    stat = 2;
  } else {
    form2.replaceWith(form1);
    stat = 1;
  }
};

primaryToggle.addEventListener("click", togglePage);
secondaryToggle.addEventListener("click", togglePage);
