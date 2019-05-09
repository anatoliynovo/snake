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
	position_x: 1,
	position_y: 1,
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

function gameProcess() {
	setTimeout(function () {
		document.addEventListener("keydown", moveSnake);
	});
}


function moveSnake(key) {

	var arrow = {
		left: 37,
		up: 38,
		right: 39,
		down: 40
	};

	// Snake Koordinaten erhalten
	var snake = document.querySelector('#snake_head');
	var style = getComputedStyle(snake);
	var snake_x_t = style.marginLeft.substring(0, 3);
	var snake_y_t = style.marginTop.substring(0, 3);
	var snake_x = parseInt(snake_x_t, 10);
	var snake_y = parseInt(snake_y_t, 10);

	switch (key.keyCode) {
		case arrow.left: //left           
			snake_x = snake_x - 20;
			if (snake_x == -20) {
				snake_x = 580;
			}
			$('#snake_head').css({
				'margin-left': snake_x + 'px'
			});
			console.log(snake_x);
			break;
		case arrow.up: //up
			snake_y = snake_y - 20;
			if (snake_y == -20) {
				snake_y = 580;
			}
			$('#snake_head').css({
				'margin-top': snake_y + 'px'
			});
			console.log(snake_y);
			break;
		case arrow.right: //right
			snake_x = snake_x + 20;
			if (snake_x == 600) {
				snake_x = 0;
			}
			$('#snake_head').css({
				'margin-left': snake_x + 'px'
			});
			console.log(snake_x);
			break;
		case arrow.down: //down
			snake_y = snake_y + 20;
			if (snake_y == 600) {
				snake_y = 0;
			}
			$('#snake_head').css({
				'margin-top': snake_y + 'px'
			});
			console.log(snake_y);
			break;

	}
	key.preventDefault();
}

// Funktion zum Start des Spiels
function gameStart() {

	score = 0;
	display_size = 0;

	// Score anzeigen
	$('#points').text(score);
	// Länge anzeigen
	$('#size_number').text(display_size);
	// Head anzeigen
	$('.columns:nth-child(' + snake.position_x + ') .rows:nth-child(' + snake.position_y + ')').append('<div id="snake_head"></div>');
	// Spieldurchlauf starten
	gameProcess();

}