/* eslint-disable max-len */
"use strict";

const _signIn = document.querySelector("a.sign_in");
const _signUp = document.querySelector("a.sign_up_btn");
const welcomeUser = document.getElementById("welcome_username");
const url = "http://localhost:3000/";


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
_signIn.addEventListener("click", signInListener);

function signInListener() {
    sessionStorage.setItem("location", `${window.location}`);
    window.location.href = "signIn.html";
}

function logOutListener() {
    fetch(`${url}logOut`);
    location.reload(true);
}

// Sign Up Button
_signUp.addEventListener("click", signUpListener);

function signUpListener() {
    sessionStorage.setItem("location", `${window.location}`);
    window.location.href = "signUp.html";
}


async function checkSignStatus() {
    const response = await fetch(`${url}signStatus`);
    const datapromise = response.text();
    datapromise.then(async ()=> {
        if (await datapromise !== "none signed in user") {
            _signIn.innerHTML = "Log out";
            _signIn.removeEventListener("click", signInListener);
            _signIn.addEventListener("click", logOutListener);
            _signUp.innerHTML = "my profile";
            _signUp.removeEventListener("click", signUpListener);
            _signUp.addEventListener("click", ()=> {
                window.location.href = "user_palettes.html";
            });
            welcomeUser.innerHTML = `Welcome ${await datapromise}!`;
        }
    });
}

checkSignStatus();

