"use strict";

const _closeBtn = document.querySelector(".close_btn");

_closeBtn.addEventListener("click", ()=> {
    window.location = sessionStorage.getItem("location");
});