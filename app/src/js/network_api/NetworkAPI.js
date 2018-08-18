//var main_url = "https://epidemik.us/api"
var main_url = "http://localhost:3000"
var version_extension = "?version=1.0"

export default class NetworkAPI {

    // String String (String -> Void) (Error -> Void) -> Void
    // Logs this user into the server
    // Calls the callback when done with the auth token (or failure)
    static network_login(username, password, sucess, failure) {
        var URL = main_url + "/login" + version_extension + "&username=" + username + "&password=" + password
        fetch(URL, {
            method: "POST"
        }).then(response => response.json().then(result => sucess(result))).catch(failure)
    }

    // String String Number Number DateString, String (String -> Void) (Error -> Void) -> Void
    // Creates this account
    // Calls the callback when done with the auth token (or failure)
    static network_create_an_account(username, password, latitude, longitude, dob, gender, sucess, failure) {
        var URL = main_url + "/users" + version_extension
        var body = JSON.stringify({
            username: username,
            password: password,
            latitude: latitude,
            longitude: longitude,
            gender: gender,
            date_of_birth: dob,
            deviceID: null
        })
        fetch(URL, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            }).then(sucess).catch(failure)
    }

    // String String (Boolean -> Void) (Error -> Void) -> Void
    // Returns the sickness of this user
    static network_get_status(username, auth_token, sucess, failure) {
        var URL = main_url + "/users/" + username + "/sickness" + version_extension + "&auth_token=" + auth_token;
        fetch(URL).then(response => response.json().then(result => sucess(result))).catch(failure)
    }

    // String String DateString [List-of Number] String (Void -> Void) (Error -> Void) -> Void
    // Marks this user as sick
    static network_report_sick(username, disease_name, symptoms, auth_token, sucess, failure) {
        var date = new Date().toISOString().split("T")[0];
        var URL = main_url + "/users/" + username + "/diseases" + version_extension + "&auth_token=" + auth_token
        fetch(URL, {
            method: "POST",
            body: JSON.stringify({
                disease_name: disease_name,
                date_sick: date,
                date_healthy: null,
                symptoms: symptoms
            })
        }).then(response => response.json().then(result => sucess(result))).catch(failure)
    }

    // String -> Promise(List-of Disease])
    // Returns a list of every disease in the system
    static network_get_all_diseases(auth_token) {
        var region = {
            lat_min: -600,
            lat_max: 600,
            long_min: -600,
            long_max: 600
        }
        var URL = main_url + "/diseases" + version_extension + "&auth_token=" + auth_token + "&region=" + JSON.stringify(region)
        return fetch(URL).then(response => response.json())
    }

    // String String ([List-of Disease] -> Void) (Error -> Void) -> Void
    // Returns a list of every trend in the system
    static network_get_all_trends(username, auth_token, sucess, failure) {
        var URL = main_url + "/trends/" + username + version_extension + "&auth_token=" + auth_token
        fetch(URL).then(response => response.json().then(result => sucess(result))).catch(failure)
    }

    // String String (Void -> Void) (Error -> Void) -> Void
    // Marks this user as healthy
    static network_report_healthy(username, auth_token, sucess, failure) {
        var date = new Date().toISOString().split("T")[0];
        var URL = main_url + "/users/" + username + "/diseases" + version_extension +
            "&auth_token=" + auth_token + "&date_healthy=" + date
        fetch(URL, {
            method: "PATCH"
        }).then(response => response.json().then(result => sucess(result))).catch(failure)
    }

    // String (JSON -> Void) (Error -> Void) -> Void
    // Loads the data used to diagnose users
    static network_load_diagnosis(auth_token, sucess, failure) {
        var URL = main_url + "/diseases/symptoms" + version_extension +
            "&auth_token=" + auth_token
        fetch(URL).then(response => response.json().then(result => sucess(result))).catch(failure)
    }

    // String (Number Number -> Void) (Void -> Void) -> Void
    //Function to covert address to Latitude and Longitude
    static network_get_location(address, sucess, failure) {
        address = address.replace(/ /g, "+")
        let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAQDNSjsR5fSbsRwOOoPLMLRL1_WsEoUtY"
        fetch(url).then(json => {
            return json.json()
        }).then(result => {
            let lat_long = result.results[0].geometry.location
            sucess(lat_long.lat, lat_long.lng)
        }).catch(error => {
            failure();
        })
    };

}