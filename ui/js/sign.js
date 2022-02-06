var stat = 1;
const head = document.getElementById('main_sign');
const toggle = document.getElementById("toggle_page");
const inputs = document.getElementsByClassName("form_input");
toggle.addEventListener("click", togglepage);
function togglepage(){
if (head.innerHTML == "Create an account" && stat == 1){
    head.innerHTML = "Sign in"
    document.getElementById("sign_ask").innerHTML="Don't have an account?"
    toggle.innerHTML = "Create one"
    inputs[1].style.display = "none"
    inputs[2].style.display = "none"
    document.getElementById("t_c").innerHTML = "By Signing in, I agree to the Space rental <a>Terms and Conditions</a> and <a>Privacy Statement</a>."
}
else{
    head.innerHTML = "Create an account";
    toggle.innerHTML="Sign in"
    document.getElementById("sign_ask").innerHTML="Already have an account?"
    inputs[1].style.display = "block"
    inputs[2].style.display = "block"
    document.getElementById("t_c").innerHTML = "By creating an account, I agree to the Space rental <a>Terms and Conditions</a> and <a>Privacy Statement</a>."

}
}