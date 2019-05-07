// Spiel starten
document.addEventListener("DOMContentLoaded", function (event) {
    createMap();
    var startButton = document.getElementById('start');
    startButton.click(function () {
        startGame();
    });
});

var snake = {
    position: [],
    size: 3,
    richtung: "unten",
    aktiv: true
};

var futter = {
    position: [],
    verfuegbar: false
};

var columns = 30;
var score = 0;
var display_size = 0;
var speed = 10;

function createMap() {


}



function moveSnake() {


}


function startGame() {

}