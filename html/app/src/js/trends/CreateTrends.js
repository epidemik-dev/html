/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

getTrends(localStorage['username'], localStorage['token']);

// String String -> Void
// Adds the trend information in this users location
function getTrends(username, token) {
    var URL = "http://localhost:3000/trends"
    network_get_all_trends(username, token, function(response) {
        addTrends(response);
    }, function(xhr) {
        displayLogin();
    });
}

// String -> Void
// Adds the trend information given in the string
function addTrends(trends) {
    for (const i in trends) {
        var trend = trends[i]
        addTrend(trend.disease_name, trend.trend_weight);
    }
}

// String Number -> Void
// Adds the given trend to the view
function addTrend(name, weight) {
    weight = Math.floor(weight*10)/10;
    var trendsView = document.getElementById("trendsView");
    var newdiv = document.createElement('div');   //create a div
    newdiv.id = 'trend';                      //add an id
    newdiv.textContent = name + ": " + weight + "% Infection Chance";

    trendsView.appendChild(newdiv);                 //append to the doc.body
}


