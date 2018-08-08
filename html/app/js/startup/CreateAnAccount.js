/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global google */

var username;
var password;
var dob;
var gender;

// Void -> Void
// Adds the boxes nessicarry for account
// Creation to the screen
function addAddress() {

    addLabelAndBox("Address");
    addLabelAndBox("City");
    addLabelAndBox("State");
    addGender();
    addLabel("Date of Birth");
    addDate();

    var parent = document.getElementById("buttons");
    var child = document.getElementById("createAcc");
    parent.removeChild(child);


}

// String -> Void
// Adds a label and textbox with this name as the ID
function addLabelAndBox(name) {
    addLabel(name);
    addTextBox(name);
}

// Void -> Void
// Adds the radio buttons for selecting gender
function addGender() {
    addLabel("Gender");
    var genForm = document.createElement("form");
    genForm.id = "GenderText";
    var br = document.createElement("br");

    var male = document.createElement("input");
    male.name = "gender";
    male.type = "radio";
    male.id = "Male";
    male.value = "Male";

    var female = document.createElement("input");
    female.name = "gender";
    female.type = "radio";
    female.id = "Female";
    female.value = "Female";

    var other = document.createElement("input");
    other.name = "gender";
    other.type = "radio";
    other.id = "Other";
    other.value = "Other";

    genForm.appendChild(male);
    genForm.innerHTML += "<span>Male</span><br>";
    genForm.appendChild(female);
    genForm.innerHTML += "<span>Female</span><br>";
    genForm.appendChild(other);
    genForm.innerHTML += "<span>Other</span><br>";

    var toInsertInto = document.getElementById("loginTexts");
    toInsertInto.appendChild(genForm);
}

// String -> Void
// Adds a label with this name as the info
function addLabel(name) {
    var toInsertInto = document.getElementById("loginTexts");

    var label = document.createElement("label");
    var labelInner = document.createElement("b");
    labelInner.textContent = name;
    label.appendChild(labelInner);

    toInsertInto.appendChild(label);
}

// Void -> Void
// Adds a date selector to the screen
function addDate() {
    var toInsertInto = document.getElementById("loginTexts");

    var dobSelector = document.createElement("input");
    dobSelector.type = "date";
    dobSelector.id = "dob";
    dobSelector.placeholder = "1999-05-31";

    toInsertInto.appendChild(dobSelector);
}

// Strinng -> Void
// Adds a text box with this info
function addTextBox(name) {
    var toInsertInto = document.getElementById("loginTexts");

    var inputPart = document.createElement("input");
    inputPart.type = "text";
    inputPart.id = name + "Text";
    inputPart.placeholder = "Enter " + name;
    inputPart.name = "add";

    toInsertInto.appendChild(inputPart);
}

// Void -> Void
// The function that is called when the user hits the big green button
// Either creates an account or logs in 
function loginReact() {

    var username = document.getElementById("usernameText");
    var password = document.getElementById("passwordText");
    var address = document.getElementById("AddressText");
    var city = document.getElementById("CityText");
    var state = document.getElementById("StateText");
    var gender = $("input[name='gender']:checked")
    var dob = document.getElementById("dob");
    if (address !== null) {
        createAccount(username, password, address.value + " " + city.value + ", " + state.value, gender.val(), dob.value);
    } else {
        login(username, password);
    }
}

// HTML Element, HTML Element -> Void
// Logs this user in
// IF VALID: redirects to the previous path
// NOT VALID: warns the user
function login(username, password) {
    // Sending and receiving data in JSON format using POST method
    network_login(username.value, password.value, function (response) {
        localStorage['username'] = username.value;
        localStorage['token'] = response;
        window.location.href = localStorage['prevPath'];
    }, function (xhr) {
        username.value = "Please Enter A Valid Login";
    })
}

// HTML Element, HTML Element, String String String -> Void
// Creates an account
// IF VALID: redirects to the previous path
// NOT VALID: warns the user
// Also turns the address from string to cordinates
function createAccount(username, password, address, gender, dob) {
    // Sending and receiving data in JSON format using POST method
    this.username = username.value;
    this.password = password.value;
    this.dob = dob;
    this.gender = gender;
    var geocoder = new google.maps.Geocoder();

    //Function to covert address to Latitude and Longitude
    var getLocation = function (address) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                recieveLocation(latitude, longitude);
            }
        });
    };

    //Call the function with address as parameter
    getLocation(address);

}

// Number Number -> Void
// Actually does the account creation
function recieveLocation(lat, long) {
    network_create_an_account(username, password, lat, long, dob, gender, function (response) {
        localStorage['username'] = username;
        localStorage['token'] = response;
        window.location.href = localStorage['prevPath'];
    }, function (xhr) {
        document.getElementById("usernameText").value = "This account already exists";
    });
}