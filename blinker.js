function blinker() {
    $(".blinker").fadeToggle(2000);
    setTimeout('blinker()', 2000);
}