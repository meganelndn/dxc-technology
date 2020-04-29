//global

import {
    endpoint,
    apiKey
} from "./modules/settings";

window.addEventListener("load", init);

//--------------------------------- init -----------------------------------------//

function init() {
    
    //if there is a form, fire setUpForm, otherwise, user is kicked to index.html(verifyUser)
    const form = document.querySelector("form");
    if (form) {
        setUpForm();
    }
    
    verifyUser();
}


//--------------------------------- newUser -----------------------------------------//


function verifyUser() {

    console.log(window.location.pathname)

    //User comes from the INDEX page
    if (window.location.pathname.includes("index.html") && "userName" in localStorage) {
        console.log("there IS a user name")
        //1.add modal
        document.querySelector(".modalBackground").classList.add("showModal");
        //option to sign out
        document.querySelector(".signOutModal").addEventListener("click", (e) => {
            (
                localStorage.removeItem("userName")
            )
        }, 100);
        //set timeOut
        setTimeout((e) => {
            
                //for dev mode:
                window.location = "asset.html";
                //when upload:
                //window.location.replace("https://pbstyle.dk/3sem/dxc/asset.html")
                //add Button with option to close and go back to index

            
        }, 5000)
        //2.redirect to asset

    }

    //User comes from the ASSET page
    else if (window.location.pathname.includes("asset.html") && !("userName" in localStorage)) {
        console.log("there is NOT a user name")
        //send user back to Index
        //when upload:
        //window.location.replace("https://pbstyle.dk/3sem/dxc/index.html#formSection");
        //when dev mode:
        window.location.replace("index.html");
    }


}



//--------------------------------- form -----------------------------------------//
function setUpForm() {
    
    window.form = form;
    window.elements = elements;

    //console.log(document.querySelector("#formSection"))
    //1. grab the form
    const form = document.querySelector("form");
    
    console.log(form.elements)
    const elements = form.elements;
    console.log(elements)


    //3.novalidate
    form.setAttribute("novalidate", true);

    //remove the error for the Checkbox
    //console.log(document.querySelector("#checkbox-label p"));
    document.querySelector("#checkbox-label p").classList.add("hideCheckError")

    //2. send basic structure
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        //1.select all inputs
        const formElements = form.querySelectorAll("input");



        //2.loop through them and check if are valid or not
        formElements.forEach((el) => {
            el.classList.remove("invalid");
        })

        //console.log("submit form")
        //3. clicked on submit, check validity
        if (form.checkValidity()) {
            postSubscription({
                fullName: form.elements.fullName.value,
                email: form.elements.email.value,
                country: form.elements.country.value,
                jobTitle: form.elements.jobTitle.value
            });


            //1- info is added to localStoage for later
            localStorage.setItem("userName", form.elements.fullName.value);

            //2- if form is valid user is sent to Asset
           // 
        } else {
            formElements.forEach((el) => {
                if (!el.checkValidity()) {
                    el.classList.add("invalid");
                    if (form.elements.checkbox.checkValidity() === false) {
                        //show Error
                        document.querySelector("#checkbox-label p").classList.remove("hideCheckError");
                    } else {
                        document.querySelector("#checkbox-label p").classList.add("hideCheckError");
                    }
                }
            })
        }


    })

}
//--------------------------------- post -----------------------------------------//

function postSubscription(userInfo) {
    const postData = JSON.stringify(userInfo);
    fetch(endpoint + "rest/dxc-technology", {
            method: "post",
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": apiKey,
                "cache-control": "no-cache",
            },
            body: postData,
        })
        .then((res) => res.json())
        .then((data) => {location.replace("asset.html")});

}



//********************************* DESIGN ********************************************//

// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.documentElement.scrollTop > 600) {
        document.querySelector("header").style.opacity = "0.8";
    } else {
        document.querySelector("header").style.opacity = "1";
    }
}