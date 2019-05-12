// Map, Score- und Längezähler verbergen, solange nicht auf Start gedrückt wurde
/*
$('#map').hide();
$('span').hide();
*/
// Map erstellen und Tasten einweisen
$(document).ready(function() {
	createMap();
	initializeKeyboard();
	$('.start').click(function() {
		//Button deaktivieren nach dem ersten Klick
		$(this).prop('disabled', 'disabled');
		// Smooth Scrolling nach unten
		$('html,body').animate(
			{
				scrollTop: $(document).height()
			},
			2000
		);

		// Map, Score und Längezähler einblenden
		$('#map').show();
		$('span').show();

		//Spiel starten
		gameStart();
	});
});

var snake = {
	position_x: 1,
	position_y: 1,
	size: 1,
	available: false,
	head: 'snake_head'
};

var snack = {
	position: [],
	available: false
};

var snack = {
	position: [],
	available: false
};

var columnsMap = 30; // gesamte Anzahl der columns
var score = 0; // Score-Zähler
var display_size = 0; // Länge-Zähler
var speed = 300; // Geschwindigkeit des Schalangenkopfs

var counter = 0; // Zähler für Pixeln (20px)
var counter_column = 1; // id für columns
var counter_row = 0; // id für rows
var mapSize = columnsMap;

// Tastatur Eingabe
var key_left = 37;
var key_up = 38;
var key_right = 39;
var key_down = 40;
var key_state = [ false, false, false, false ];

// Funktion zum Kreieren der Map
function createMap() {
	for (var i = 0; i < mapSize; i++) {
		$('#map').append('<div class="columns" id="' + counter_column + '"></div>');
		counter_column = counter_column + 1;
		for (var j = 0; j < mapSize; j++) {
			counter = counter + 20;
			counter_row = counter_row + 1;
			$('.columns:last-child').append('<div class="rows" id="' + counter_row + '"></div>');
			$('.rows:last-child').css('margin-left', counter + 'px');

			if (counter == 600) {
				counter = 0;
			}

			if (counter_row == 30) {
				counter_row = 0;
			}
		}
	}
}

function initializeKeyboard() {
	$(document).keydown(function(e) {
		if (e.keyCode == key_left) {
			key_state[0] = true;
			if (key_state[0] == true) {
				key_state[1] = false;
				key_state[2] = false;
				key_state[3] = false;
			}
			console.log(key_left);
		}
		if (e.keyCode == key_up) {
			key_state[1] = true;
			if (key_state[1] == true) {
				key_state[0] = false;
				key_state[2] = false;
				key_state[3] = false;
			}
			console.log(key_up);
		}
		if (e.keyCode == key_right) {
			key_state[2] = true;
			if (key_state[2] == true) {
				key_state[0] = false;
				key_state[1] = false;
				key_state[3] = false;
			}
			console.log(key_right);
		}
		if (e.keyCode == key_down) {
			key_state[3] = true;
			if (key_state[3] == true) {
				key_state[0] = false;
				key_state[1] = false;
				key_state[2] = false;
			}
			console.log(key_down);
		}
		// wenn die Arrow Tasten nicht betätigt wurde, so lassen wie es default ist
		e.preventDefault();
	});
}

function gameProcess() {
	moveSnake();
}

function moveSnake() {
	setInterval(function() {
		// Tail vom Snake sichern
		var snake_tail_x = snake.position_x;
		var snake_tail_y = snake.position_y;

		// Score und Länge-Zähler fangen an zu zählen, wenn einer der Tasten betätigt wurde
		if (key_state[0] || key_state[1] || key_state[2] || key_state[3]) {
			display_size = display_size + 1;
			score = score + 1;
			$('#size_number').text(display_size);
			$('#score_number').text(score);
		}

		// links
		if (key_state[0]) {
			snake.position_x = snake.position_x - 1;
			$('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')').addClass(
				snake.head
			);
			$('.columns:nth-child(' + snake_tail_y + ') .rows:nth-child(' + snake_tail_x + ')').removeClass(snake.head);
			console.log('links: ' + snake.position_x);
		}

		// oben
		if (key_state[1]) {
			snake.position_y = snake.position_y - 1;
			$('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')').addClass(
				snake.head
			);
			$('.columns:nth-child(' + snake_tail_y + ') .rows:nth-child(' + snake_tail_x + ')').removeClass(snake.head);
			console.log('oben: ' + snake.position_y);
		}

		// rechts
		if (key_state[2]) {
			snake.position_x = snake.position_x + 1;
			$('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')').addClass(
				snake.head
			);
			$('.columns:nth-child(' + snake_tail_y + ') .rows:nth-child(' + snake_tail_x + ')').removeClass(snake.head);
			console.log('rechts: ' + snake.position_x);
		}

		// unten
		if (key_state[3]) {
			snake.position_y = snake.position_y + 1;
			$('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')').addClass(
				snake.head
			);
			$('.columns:nth-child(' + snake_tail_y + ') .rows:nth-child(' + snake_tail_x + ')').removeClass(snake.head);
			console.log('unten: ' + snake.position_y);
		}
	}, speed);
}

// Funktion zum Starten des Spiels
function gameStart() {
	// Score- und Laengezaehler auf 0
	score = 0;
	display_size = 0;

	// Anfangsposition des snake_head festlegen
	snake.position_x = 15;
	snake.position_y = 15;

	// Snake lebt
	snake.available = true;

	// Bewegungsrichtung am Anfang
	setTimeout(function() {
		key_state[3] = true;
	}, 500);

	// Score anzeigen
	$('#score_number').text(score);
	// Länge anzeigen
	$('#size_number').text(display_size);
	// Head anzeigen
	$('.columns:nth-child(' + snake.position_x + ') .rows:nth-child(' + snake.position_y + ')').addClass(snake.head);
	// Spieldurchlauf starten
	gameProcess();
}
