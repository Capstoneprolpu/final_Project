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
