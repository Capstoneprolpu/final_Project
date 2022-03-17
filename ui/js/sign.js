var stat = 1;
var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
const toggle = document.getElementById("toggle_page");
const toggle1 = document.getElementById("toggle_page1");
form2.remove();

toggle.addEventListener("click", togglepage);
toggle1.addEventListener("click", togglepage);
function togglepage(){
if (stat == 1){
form1.replaceWith(form2);
form2.style.display='block';
stat=2;
}
else{
    form2.replaceWith(form1)
    stat=1;
    
}
}