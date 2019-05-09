// Map erstellen
$(document).ready(function () {
	createMap();
	$(".start").click(function () {
		//Button deaktivieren nach dem ersten Klick
		$(this).prop('disabled', 'disabled');
		//Spiel starten
		gameStart();
	});
});

var snake = {
	position: [15, 15],
	size: 3,
	direction: 'down'
};

var snack = {
	position: [],
	available: false
};

var columnsMap = 30;
var score = 0;
var display_size = 0;
var speed = 10;

var counter = 0;
var counter_row = 1;
var counter_column = 1;
var mapSize = columnsMap;

// Funktion zum Kreieren der Map
function createMap() {

	for (var i = 0; i < mapSize; i++) {
		$('#map').append('<div class="columns" id="' + counter_column + '"></div>');
		counter_column = counter_column + 1;
		for (var j = 0; j < mapSize - 1; j++) {
			counter = counter + 20;
			counter_row = counter_row + 1;
			$('.columns:last-child').append('<div class="rows" id="' + counter_row + '"></div>');
			$('.rows:last-child').css('margin-left', counter + 'px');

			if (counter == 580) {
				counter = 0;
			}

			if (counter_row == 30) {
				counter_row = 1;
			}

		}

	}

}

function control() {}

function moveSnake() {}


// Funktion zum Start des Spiels
function gameStart() {

	score = 0;
	display_size = 0;

	// Score anzeigen
	$('#points').text(score);
	// Länge anzeigen
	$('#size_number').text(display_size);
	// Head anzeigen
	$('.columns:nth-child(15) .rows:nth-child(14').append('<div id="snake_head"></div>');


}