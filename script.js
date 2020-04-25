//global

import {endpoint, apiKey} from "./modules/settings";

window.addEventListener("load", init);

//--------------------------------- init -----------------------------------------//

function init(){
    setUpForm();
}


//--------------------------------- form -----------------------------------------//
function setUpForm(){

//1. grab the form
const form = document.querySelector("form");
//console.log(form.elements)
const elements = form.elements;
console.log(elements)

window.form = form;
window.elements = elements;

//3.novalidate
form.setAttribute("novalidate", true);
//2. send basic structure
form.addEventListener("submit", (e)=>{
    e.preventDefault();

        //1.select all inputs
        const formElements = form.querySelectorAll("input");
        //2.loop through them and check if are valid or not
        formElements.forEach((el)=>{
            el.classList.remove("invalid");
    
        })
    
    //console.log("submit form")
    //3. clicked on submit, check validity
    if(form.checkValidity()){
        postSubscription({
            fullName: form.elements.fullName.value,
            email: form.elements.email.value,
            country: form.elements.country.value,
            jobTitle: form.elements.jobTitle.value

        });
        location.replace("asset.html");
    } else {
          formElements.forEach((el)=>{
            if(!el.checkValidity()){
                el.classList.add("invalid");
            }
        })
    }


})

}
//--------------------------------- post -----------------------------------------//

function postSubscription(userInfo){
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
        .then((data) =>  console.log(data));

}
