// Void -> Boolean
// Says if the login is written to the disk
function login_exists() {
    console.log(localStorage.getItem("username"))
    return localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== "" && localStorage.getItem("username") !== "undefined" &&
        localStorage.getItem("auth_token") !== undefined && localStorage.getItem("auth_token") !== "" && localStorage.getItem("auth_token") !== "undefined"
}

// ([Maybe-String] -> Void) -> Void
// Says if this browsers is valid
export function login_is_valid(callback) {
    if (!login_exists()) {
        callback(false);
    } else {
        callback(true);
    }
}