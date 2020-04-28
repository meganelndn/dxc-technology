//global

import {
    endpoint,
    apiKey
} from "./modules/settings";

window.addEventListener("load", init);

//--------------------------------- init -----------------------------------------//

function init() {
    verifyUser();
    setUpForm();
}


//--------------------------------- newUser -----------------------------------------//


function verifyUser(){

    console.log(window.location.pathname)

   
    if (window.location.pathname == "/index.html" && "userName" in localStorage){
        console.log("there IS a user name")
        //1.add modal
        document.querySelector(".modalBackground").classList.add("showModal");
        //set timeOut
        setTimeout((e)=>{(
            location.replace("asset.html")
            //add Button with option to close and go back to index

        )}, 3000)
        //2.redirect to asset
      
    } else {
        console.log("there is NOT a user name")
    }
    
}


//--------------------------------- form -----------------------------------------//
function setUpForm() {

    //1. grab the form
    const form = document.querySelector("form");
    //console.log(form.elements)
    const elements = form.elements;
    console.log(elements)

    window.form = form;
    window.elements = elements;

    //3.novalidate
    form.setAttribute("novalidate", true);

       //remove the error for the Checkbox
       //console.log(document.querySelector("#checkbox-label p"));
       document.querySelector("#checkbox-label p").classList.add("hideCheckError");

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
            location.replace("asset.html");
        } else {
            formElements.forEach((el) => {
                if (!el.checkValidity()) {
                    el.classList.add("invalid");
                    if(form.elements.checkbox.checkValidity() === false){
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
        .then((data) => console.log(data));

}



//********************************* DESIGN ********************************************//

