/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// String -> Void
// Checks this users login
// IF VALID: goes to the previous path
// NOT VALID: goes to the login screen
function checkLogin(prevPath) {
    localStorage['prevPath'] = prevPath;
    if(localStorage['token'] === "undefined" || localStorage['token'] === undefined || localStorage['token'] === null 
    || localStorage['username'] === undefined || localStorage['username'] === null) {
        displayLogin();
    } else {
        if(prevPath === "index.html") {
            getStatus();
        }
    }
    
}

// Void -> Void
// Shows the login screen
function displayLogin() {
    window.location.href = "login.html";
}


// Void -> Void
// Updates this users status button
function getStatus() {
    var URL = "http://localhost:3000/api/users/" + localStorage['username'] + "/sickness"
    network_get_status(localStorage['username'], localStorage['token'], function(response) {
        updateButtonUI(response);
    }, function(xhr) {
        displayLogin();
    });
}

