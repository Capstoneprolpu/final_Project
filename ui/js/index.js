
var man_btn=document.getElementById("man_dd");
var nav_dd = document.getElementsByClassName("nav_dd")[0];
var stat1="false";
man_btn.addEventListener("click",(e)=>{
    if(stat1=="false"){
    nav_dd.style.visibility="visible";
    stat1="true";
    }
    else{
        nav_dd.style.visibility="hidden";
        stat1="false";
    }
});

let mainsearch = document.getElementById('main_search_bar');
mainsearch.addEventListener('change',e=>{
    fetch('/search',{method:'GET', mode:'same-origin'}).then(response=>response.json).then(response=>{searchlist(response)}).catch(error=>console.log(error));
})



