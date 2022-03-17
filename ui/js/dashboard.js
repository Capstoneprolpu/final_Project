var mens = document.getElementsByClassName("right_s_item");
var menbtns = document.getElementsByClassName("toggle_right");


//adding event listener to left toggle list menu btns
var dropnumber = 1;
for(let i=0; i<menbtns.length; i++){
    menbtns[i].addEventListener('click',(e)=>{handledrops(e , i);});
  }
  function handledrops(e, i){
    e.preventDefault();
    mens[dropnumber].style.visibility="hidden";
    menbtns[dropnumber].classList.remove("selected_nav");
    mens[i].style.visibility="visible";
    menbtns[i].classList.add("selected_nav");
    dropnumber=i;
  }



