function startTime() {
    var today = new Date();
    document.getElementById('timeclock').innerHTML =
        today.getHours() + ":" +
        checkTime(today.getMinutes()) + ":" +
        checkTime(today.getSeconds());
    setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}

function shortDate() {
    var today = new Date();
    return today.getHours() + ":" + checkTime(today.getMinutes()) + ":" + checkTime(today.getSeconds());
}