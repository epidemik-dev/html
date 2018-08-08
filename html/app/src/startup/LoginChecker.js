import * as NetworkAPI from '../network_api/NetworkAPI.js';
// Void -> Boolean
// Says if the login is written to the disk
function login_exists() {
    return localStorage["username"] != undefined && localStorage["username"] != "" &&
        localStorage["password"] != undefined && localStorage["password"] != "" &&
        localStorage["auth_token"] != undefined && localStorage["auth_token"] != ""
}

// ([Maybe-String] -> Void) -> Void
// Says if this browsers is valid
export function login_is_valid(callback) {
    if(!login_exists()) {
        callback(false)
    } else {
        NetworkAPI.network_login(localStorage["username"], localStorage["password"], (auth_token) => {
            callback(auth_token)
        }, () => {
            callback(false)
        })
    }
}