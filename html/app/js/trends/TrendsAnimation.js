/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var trendsAreShown = false;

// Void -> Void
// Chages the display status of the trends
function properlyShowTrends() {
    if (trendsAreShown) {
        hideTrends();
    } else {
        showTrends();
    }
    trendsAreShown = !trendsAreShown;
}

// Void -> Void
// Slides the trend window so it's displayed
function showTrends() {
    width = $(document).width() / 5;
    $("#trendsView").animate({
        width: width,
        left: 10
    }, 1000, function () {
        //Completion 
    });
}

// Void -> Void
// Slides the trend window so it's hidden
function hideTrends() {
    width = 0;
    $("#trendsView").animate({
        width: width,
        left: 0
    }, 1000, function () {
        // Animation complete.
    });
}



