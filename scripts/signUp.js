"use strict";

import { User } from "./User.js";

const _closeBtn = document.querySelector(".close_btn");
const _signUpBtn = document.querySelector(".signIn_btn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const passwordRepeat = document.getElementById("passwordRepeat");
const errorMessage = document.getElementById("errorMessage");

const url = "http://localhost:3000/";


_closeBtn.addEventListener("click", ()=> {
    window.location = sessionStorage.getItem("location");
});

_signUpBtn.addEventListener("click", signUp);
document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        signUp();
    }
});


// SignUp => Check if Username exist and password matches

async function signUp() {
    const user = new User(username.value, password.value);
    if (user.password !== passwordRepeat.value) {
        username.style.borderColor = "grey";
        password.style.borderColor = "red";
        passwordRepeat.style.borderColor = "red";
        password.value = "";
        passwordRepeat.value = "";
        errorMessage.innerHTML = "Passwords are not identical!";
    } else if (user.username.length < 1) {
        username.style.borderColor = "red";
        password.style.borderColor = "grey";
        passwordRepeat.style.borderColor = "grey";
        password.value = "";
        passwordRepeat.value = "";
        errorMessage.innerHTML = "Type in a username";
    } else if (user.password.length < 6) {
        username.style.borderColor = "grey";
        password.style.borderColor = "red";
        passwordRepeat.style.borderColor = "red";
        password.value = "";
        passwordRepeat.value = "";
        errorMessage.innerHTML = "Your password must have 6 digits";
    } else {
        const response = await fetch(`${url}signUp`, {
            method: "post",
            body: JSON.stringify(user)
        });
        const datapromise = response.text();
        datapromise.then(async ()=> {
            if (await datapromise === "error") {
                errorMessage.innerHTML = "The Username already exists";
                username.style.borderColor = "red";
            } else if (await datapromise === "success") {
                window.location = sessionStorage.getItem("location");
            }
        });
    }
}
