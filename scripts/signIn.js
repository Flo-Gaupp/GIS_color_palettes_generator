"use strict";

import { User } from "./User.js";

const _closeBtn = document.querySelector(".close_btn");
const _signInBtn = document.querySelector(".signIn_btn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

const url = "http://localhost:3000/";


_closeBtn.addEventListener("click", ()=> {
    window.location = sessionStorage.getItem("location");
});

_signInBtn.addEventListener("click", signIn);
document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        signIn();
    }
});


// SignUp => Check if Username exist and password matches

async function signIn() {
    const user = new User(username.value, password.value);
    if (user.username.length < 1) {
        username.style.borderColor = "red";
        password.style.borderColor = "grey";
        password.value = "";
        errorMessage.innerHTML = "Type in a username";
    } else {
        const response = await fetch(`${url}signIn`, {
            method: "post",
            body: JSON.stringify(user)
        });
        const datapromise = response.text();
        datapromise.then(async ()=> {
            if (await datapromise === "user_error") {
                errorMessage.innerHTML = "The Username does not exist";
                username.style.borderColor = "red";
            } else if (await datapromise === "error_password") {
                errorMessage.innerHTML = "Incorrect password";
            } else if (await datapromise === "success") {
                window.location = sessionStorage.getItem("location");
            }
        });
    }
}
