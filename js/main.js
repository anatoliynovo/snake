// Spiel starten
document.addEventListener("DOMContentLoaded", function (event) {
    createSpielfeld();
    var startButton = document.getElementById('start');
    startButton.click(function () {
        startSpiel();
    });
});

var snake = {
    position: [],
    size: 3,
    richtung: "rechts",
    aktiv: true
};

var futter = {
    position: [],
    verfuegbar: false
};

var bildpunkte = 20;
var punkte = 0;
var laenge = 0;
var geschwindigkeit = 10;

function createSpielfeld() {
    var size = bildpunkte;
    var spielfeld = document.getElementById('spielfeld');
    var row = document.createElement('div');

    for (var i = 0; i < size; i++) {
        row.innerHTML = spielfeld;
    }

    return row;

}