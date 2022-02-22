var formparts = document.getElementsByClassName("add_form");
var formvisible = 0;
function visibilitytoggle(ins){
    for(let i=0;i<formparts.length;i++){
        formparts[i].style.visibility="hidden";
    }
    formparts[ins].style.visibility="visible"; 
}
var nav_for_btn = document.getElementsByClassName("form_for");
for(let i = 0; i< nav_for_btn.length;i++){
    nav_for_btn[i].addEventListener("click",(e)=>{
        e.preventDefault();
        visibilitytoggle(i+1);
    })
}
var nav_bac_btn = document.getElementsByClassName("form_bac");
for(let i = 0; i< nav_bac_btn.length;i++){
    nav_bac_btn[i].addEventListener("click",(e)=>{
        e.preventDefault();
        visibilitytoggle(i);
    })
}


//to preview images selected:
const preview = document.getElementById("previews");
const inputElement = document.getElementById("pic_files");
const imgtxt = document.getElementById("add_img_txt");


inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
    if(imgtxt){
        imgtxt.remove();
    }
    const selectedFiles = inputElement.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
  
      if (!file.type.startsWith('image/')){ continue }
  
      const img = document.createElement("img");
      img.classList.add("preview_item");
      img.file = file;
      preview.appendChild(img); 
  
      const reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
      reader.readAsDataURL(file);
    }
  }
  