/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var isSick;

// Void -> Void
// Changes the users sickness status
function handleClick() {
    if (isSick) { //Handle Becoming Healthy
        network_report_healthy(localStorage['username'], localStorage['token'], function (response) {
            updateButtonUI(false);
        }, function (xhr) {
            displayLogin();
        })
    } else { //Handle Becoming Sick
        window.location.href = "sickness.html";
        updateButtonUI(true);
    }
}

// Boolean -> Void
// Makes the button show what it actually should show
function updateButtonUI(is_sick) {
    isSick = is_sick;
    if (is_sick) { //Handle Becoming Healthy
        document.getElementById("sickOrHealthy").style.backgroundColor = "#4CAF50";
        document.getElementById("sickOrHealthy").getElementsByTagName("span")[0].innerHTML = "You Are Sick: Report Healthy";
    } else { //Handle Becoming Sick
        localStorage['sickRequest'] = null;
        document.getElementById("sickOrHealthy").style.backgroundColor = "rgb(83, 28, 69)";
        document.getElementById("sickOrHealthy").getElementsByTagName("span")[0].innerHTML = "You Are Healthy: Report Sick";
    }
}