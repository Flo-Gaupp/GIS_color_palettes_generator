"use strict";

/* Main_Nav */

document.querySelector(".top_nav .main_list_top_nav .tools_btn").addEventListener("click",
    function(event) {
        event.currentTarget.classList.toggle("show_menu");
    }
    , false);

