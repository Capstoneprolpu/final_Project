var map;
var location1 = {lat: 26.8467, lng: 80.9462};
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: location1,
    zoom: 11
  });

    var marker = new google.maps.Marker({
      map: map,
      position: location1
    });
  }


  const data = fetch()



  //Code for filter buttons

  var filters = document.getElementsByClassName("filter_btn");
  var filext = document.getElementsByClassName("filter_ext");
  var arrowfil = document.getElementsByClassName("arrow_filter")
  var filternumber = 0;
  var filterone = false;
  for(let i=0; i<filters.length; i++){
    filters[i].addEventListener('click',(e)=>{handlefilter(e , i);});
  }
  function handlefilter(e, i){
    if(filternumber!=i){
    filext[filternumber].style.visibility="hidden";
    arrowfil[filternumber].style.visibility="hidden";  
    filext[i].style.visibility="visible";
    arrowfil[i].style.visibility="visible";
    filternumber=i;
    }
    else if(i==0 && filterone == false ){
      filext[i].style.visibility="visible";
      arrowfil[i].style.visibility="visible";
      filterone=true;
    }
    else{
      filext[i].style.visibility="hidden";
      arrowfil[i].style.visibility="hidden";
      filternumber=0;
      filterone=false;
    }
  }
 
  //Code to disappear filters menu

  var subs = document.getElementsByClassName("filter_done");
  for(let i=0;i<subs.length;i++){
    subs[i].addEventListener('click',(e)=>{
      e.preventDefault();
      filext[i].style.visibility="hidden";
      arrowfil[i].style.visibility="hidden";
    })
  }


  document.body.addEventListener('click',(event)=>{
    
    if(!document.getElementsByClassName("filter_ext")[filternumber].contains(event.target)&&!filters[filternumber].contains(event.target)){
    var boxs = document.getElementsByClassName("filter_ext");
    
      boxs[filternumber].style.visibility="hidden";
      arrowfil[filternumber].style.visibility="hidden";
      filternumber=0;
      filterone=false;
    }
  })


  //Code for rent and sale filter

  var rs = document.getElementById("r_s");
  var radCir = document.getElementsByClassName("radio_circles");
  radCir[0].addEventListener('click',(e)=>{
   rs.textContent=radCir[0].value;
  })
  radCir[1].addEventListener('click',(e)=>{
    rs.textContent=radCir[1].value;
    
   })


//Code for filter bedroom and bathroom selection.
var bb = document.getElementById("b_b");

var btns = document.getElementsByClassName("formbtn");
var bds = 0;
for(let i = 0;i<btns.length;i++){
  btns[i].addEventListener('click',(e)=>{
   e.preventDefault()
    btns[i].setAttribute("pressed","true");
    btns[bds].setAttribute("pressed","false");
    bds=i;
   bb.textContent = `${bds}+ Bd, ${bds1}+ Ba`;
   bb.style.borderColor="rgb(0,106,255)";
  })
}
var btns1 = document.getElementsByClassName("formbtn1");
var bds1 = 0;
for(let i = 0;i<btns1.length;i++){
  btns1[i].addEventListener('click',(e)=>{
   e.preventDefault()
    btns1[i].setAttribute("pressed","true");
    btns1[bds1].setAttribute("pressed","false");
    bds1=i;
    bb.textContent = `${bds}+ Bd, ${bds1}+ Ba`;
    bb.style.borderColor="rgb(0,106,255)";
  })
}
 

//Price filters form

var sub = document.getElementById("price_sub")
var mins = document.getElementById("mins");
var maxs = document.getElementById("maxs");
var priceSe = document.getElementsByClassName("price_dd");
var opt = document.getElementsByClassName("op2");
var pricebtn = document.getElementById("pricebtn")
priceSe[0].addEventListener('click',(e)=>{
   e.preventDefault()
   mins.value =priceSe[0].value ;
  var minvalue = +priceSe[0].value+1000;
  for(let i=1;i<opt.length;i++){
    opt[i].textContent = minvalue;
    opt[i].value=minvalue;
    minvalue=minvalue+1000;
  }
  
})
priceSe[1].addEventListener('click',(e)=>{
   e.preventDefault()
   maxs.value =priceSe[1].value;
})
sub.addEventListener('click',(e)=>{
  if(mins.value=="" && maxs.value==""){
    pricebtn.textContent=`Price`
  }
  else if(maxs.value==""){
    pricebtn.textContent=`Rs${mins.value}+`;
    pricebtn.style.borderColor="rgb(0,106,255)";
  }
  else if(mins.value==""){
    pricebtn.textContent=`Upto Rs${maxs.value}`;
    pricebtn.style.borderColor="rgb(0,106,255)";
  }
  else{
    pricebtn.textContent=`Rs${mins.value} - Rs${maxs.value}`;
    pricebtn.style.borderColor="rgb(0,106,255)";
  }
})
 

//Space type filter settings

var subrt = document.getElementById("roomtype")
var space = document.getElementsByClassName("space_type")
var sptybt = document.getElementById("space_type_btn");

subrt.addEventListener('click',(e)=>{
  let count = 0;
  let temp = "";
  for(let i=0;i<space.length;i++){
    if(space[i].checked){
      count++;
      if(count==(space.length-1)){
        temp=temp+space[i].value;
      }
      else{
      temp=temp+space[i].value+",";
      }
    }
  }
  if(count!=3){
    sptybt.textContent=temp;
    sptybt.style.borderColor="rgb(0,106,255)";
  }
})

  




