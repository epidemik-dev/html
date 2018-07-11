/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Void -> Void
// Brings the user back to the map
function go_back() {
    window.location.href = "index.html";
}

// Void -> Void
// Brings the user to symptom selection
function go_to_symptoms() {
    localStorage['disease_name'] = document.getElementById("disease_selector").value;
    window.location.href = 'symptoms.html';
}

// Void -> Void
// Gathers the symptoms to a list and passes them on
function send_sickness() {
    var disease_name = localStorage['disease_name'];
    var symptoms = [];

    var symptomHolder = document.getElementById("symSelector");
    for (var i = 0; i < symptomHolder.childElementCount; i++) {
        var symptom = symptomHolder.childNodes[i];
        if (symptom.childNodes.length === 0) {
            continue;
        }
        if (symptom.childNodes[0].checked) {
            symptoms.push(symptom.id);
        }
    }
    getInfection(disease_name, symptoms);
    isSick = true;
}

// String [List-of Number] -> Void
// Informs the database of the users sickness
// Gets todays date and creates the post string
function getInfection(disease_name, symptoms) {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var username = localStorage['username'];
    var today = yyyy + '-' + mm + '-' + dd;
    var to_send = {
        disease_name: disease_name,
        date_sick: today,
        date_healthy: null,
        symptoms: symptoms
    };
    network_report_sick(username, disease_name, symptoms, localStorage['token'], function (response) {
        window.location.href = "index.html";
    }, function (xhr) {
        displayLogin();
    });
}