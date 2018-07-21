var main_url = "https://epidemik.us/api"
//var main_url = "http://localhost:3000"
var version_extension = "?version=1.0"


// String String (String -> Void) (Error -> Void) -> Void
// Logs this user into the server
// Calls the callback when done with the auth token (or failure)
function network_login(username, password, sucess, failure) {
    var URL = main_url + "/login" + version_extension + "&username=" + username + "&password=" + password
    $.ajax({
        method: "POST",
        contentType: 'application/json',
        dataType: 'json',
        url: URL,
        success: sucess,
        error: failure
    });
}

// String String Number Number DateString, String (String -> Void) (Error -> Void) -> Void
// Creates this account
// Calls the callback when done with the auth token (or failure)
function network_create_an_account(username, password, latitude, longitude, dob, gender, sucess, failure) {
    var URL = main_url + "/users" + version_extension
    $.ajax({
        method: "POST",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            username: username,
            password: password, 
            latitude: latitude,
            longitude: longitude,
            gender: gender,
            date_of_birth: dob,
            deviceID: null
        }),
        url: URL,
        success: sucess,
        error: failure
    });
}

// String String (Boolean -> Void) (Error -> Void) -> Void
// Returns the sickness of this user
function network_get_status(username, auth_token, sucess, failure) {
    var URL = main_url + "/users/" + username + "/sickness" + version_extension + "&auth_token=" + auth_token;
    $.ajax({
        method: "GET",
        contentType: 'application/json',
        dataType: 'json',
        url: URL,
        success: sucess,
        error: failure
    });
}

// String String DateString [List-of Number] String (String -> Void) (Error -> Void) -> Void
// Marks this user as sick
function network_report_sick(username, disease_name, symptoms, auth_token, sucess, failure) {
    var date = new Date().toISOString().split("T")[0];
    var URL = main_url + "/users/" + username + "/diseases" + version_extension + "&auth_token=" + auth_token
    $.ajax({
        method: "POST",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            disease_name: disease_name,
            date_sick: date, 
            date_healthy: null,
            symptoms: symptoms
        }),
        url: URL,
        success: sucess,
        error: failure
    });
}

// String ([List-of Disease] -> Void) (Error -> Void) -> Void
// Returns a list of every disease in the system
function network_get_all_diseases(auth_token, sucess, failure) {
    var region = {
        lat_min: -600,
        lat_max: 600,
        long_min: -600,
        long_max: 600
    }
    var URL = main_url + "/diseases" + version_extension + "&auth_token=" + auth_token + "&region=" + JSON.stringify(region)
    $.ajax({
        method: "GET",
        contentType: 'application/json',
        dataType: 'json',
        url: URL,
        success: sucess,
        error: failure
    });
}

// String String ([List-of Disease] -> Void) (Error -> Void) -> Void
// Returns a list of every trend in the system
function network_get_all_trends(username, auth_token, sucess, failure) {
    var URL = main_url + "/trends/" + username + version_extension + "&auth_token=" + auth_token
    $.ajax({
        method: "GET",
        contentType: 'application/json',
        dataType: 'json',
        url: URL,
        success: sucess,
        error: failure
    });
}

// String String (Void -> Void) (Error -> Void) -> Void
// Marks this user as healthy
function network_report_healthy(username, auth_token, sucess, failure) {
    var date = new Date().toISOString().split("T")[0];
    var URL = main_url + "/users/" + username + "/diseases" + version_extension + 
             "&auth_token=" + auth_token + "&date_healthy=" + date
    $.ajax({
        method: "PATCH",
        contentType: 'application/json',
        dataType: 'json',
        url: URL,
        success: sucess,
        error: failure
    });
}

// String (JSON -> Void) (Error -> Void) -> Void
// Loads the data used to diagnose users
function network_load_diagnosis(auth_token, sucess, failure) {
    var URL = main_url + "/diseases/symptoms" + version_extension + 
             "&auth_token=" + auth_token
    $.ajax({
        method: "GET",
        contentType: 'application/json',
        dataType: 'json',
        url: URL,
        success: sucess,
        error: failure
    });
}