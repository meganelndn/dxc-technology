

import {endpoint, apiKey} from "./modules/settings";

window.addEventListener("load", init);


//--------------------------------- newUser -----------------------------------------//

if(!localStorage.getItem("userName")) {
   //if local storage is empty
   console.log("nothing happens")
   console.log(window.location.pathname)
} else {
    console.log("welcome back")
    //window.location = "asset.html"
    console.log(window.location.pathname)

}

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
        //add to local storage
        localStorage.setItem("userName", form.elements.fullName.value);

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



//********************************* DESIGN ********************************************//


//--------------------------------- scroll line -----------------------------------------//
//source https://www.quanzhanketang.com/howto/howto_js_scrolldrawing.html

// Get the id of the <path> element and the length of <path>
var theLine = document.getElementById("theLine");
var length = theLine.getTotalLength();

// The start position of the drawing
theLine.style.strokeDasharray = length;

// Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
theLine.style.strokeDashoffset = length;

// Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
window.addEventListener("scroll", myFunction);

function myFunction() {
  var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  var draw = length * scrollpercent;

  // Reverse the drawing (when scrolling upwards)
  theLine.style.strokeDashoffset = length - draw;

 }

 //---------------------------------log back-----------------------------------------//




  //--------------------------------------------------------------------------------//




