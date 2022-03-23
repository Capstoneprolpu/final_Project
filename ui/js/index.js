//functions to toggle the dropdown list from the nav bar
var man_btn=document.getElementById("man_dd");
var nav_dd = document.getElementsByClassName("nav_dd")[0];
var arrowfil = document.getElementsByClassName("arrow_filter")[0];
var stat1="false";
man_btn.addEventListener("click",(e)=>{
    if(stat1=="false"){
    nav_dd.style.visibility="visible";
    arrowfil.style.visibility="visible";
    stat1="true";
    }
    else{
        nav_dd.style.visibility="hidden";
        arrowfil.style.visibility="hidden";
        stat1="false";
    }
});

document.body.addEventListener('click',(e)=>{
    if(!nav_dd.contains(e.target)&&!man_btn.contains(e.target)){
        nav_dd.style.visibility="hidden";
        arrowfil.style.visibility="hidden";
        stat1="false";
    }
})



//function to send request to backend to get suggestions for search
let mainsearch = document.getElementById('main_search_bar');
mainsearch.addEventListener('change',e=>{
    fetch('/search',{method:'GET', mode:'same-origin'}).then(response=>response.json).then(response=>{searchlist(response)}).catch(error=>console.log(error));
})



