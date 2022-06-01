"use strict";

const _signIn = document.querySelector("a.sign_in");
const _signUp = document.querySelector("a.sign_up_btn");

const _hiddenMenu = document.querySelector(".top_nav .main_list_top_nav .tools_btn");
console.log(_signUp);
/* Main_Nav */

if (_hiddenMenu != null) {
    _hiddenMenu.addEventListener("click",
        function(event) {
            event.currentTarget.classList.toggle("show_menu");
        }
        , false);
}

// Sign In Button
_signIn.addEventListener("click", ()=> {
    sessionStorage.setItem("location", `${window.location}`);
    window.location.href = "signIn.html";
});
// Sign Up Button
_signUp.addEventListener("click", ()=> {
    sessionStorage.setItem("location", `${window.location}`);
    window.location.href = "signUp.html";
});
