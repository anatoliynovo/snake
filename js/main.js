// Map, Score- und Längezähler verbergen, solange nicht auf Start gedrückt wurde
/*
$('#map').hide();
$('span').hide();
*/

// Snake
var snake = {
	position_x: 1,
	position_y: 1,
	available: false,
	head: 'snake_head'
};

// Futter
var food = {
	fclass: 'food'
};

var wall = {
	left: 1,
	top: 31,
	right: 1,
	bottom: 31
};

var totalRows = 30; // Gesamtanzahl der Reihen
var score = 0; // Score-Zähler
var display_size = 0; // Länge-Zähler

var counter = 0; // Zähler für Pixeln (20px)
var counter_column = 1; // id für columns
var counter_row = 0; // id für rows
var mapSize = totalRows;

// Tastatur Eingabe
var key_left = 37;
var key_up = 38;
var key_right = 39;
var key_down = 40;
var key_state = [ false, false, false, false ];

// Taktzyklus für Snake
var cycleTimer_a;
var cycleTimer_b;
var gameCounter = 0; // Basis, zählt bei jedem Takt
var addNewElementCounter = -1;
var snakeSpeed = 600; // Geschwindigkeit des Schalangenkopfs
var cycleSpeed = 3000;

// der Weg, den der Snake läuft
var path_y = [];
var path_x = [];

// Pop Up anzeigen, wenn Kollision stattgefunden hat
var popup = $('.popup');

// Start-Button
var startButton = $('.start');

// Map erstellen und Tasten einweisen
$(document).ready(function() {
	createMap();
	initializeKeyboard();
	startButton.text('START');
	startButton.click(function() {
		// Start-Button deaktivieren nach dem ersten Klick
		$('.start').prop('disabled', true);
		// Smooth Scrolling nach ganz unten
		$('html,body').animate(
			{
				scrollTop: $(document).height()
			},
			2000
		);

		// Map, Score und Längezähler einblenden
		$('#map').show();
		$('span').show();

		// Spiel starten
		gameStart();
	});
});

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
		// wenn die Arrow Tasten nicht betätigt wurden, so lassen wie es auf default ist
		e.preventDefault();
	});
}

function addNewSnakeElement() {
	$('.columns:nth-child(' + path_y.slice(-1)[0] + ') .rows:nth-child(' + path_x.slice(-1)[0] + ')').addClass(
		snake.head
	);
}

function setSizeCounter() {
	// Score und Länge-Zähler fangen an zu zählen, wenn einer der Tasten betätigt wurde
	cycleTimer_b = setInterval(function() {
		if (key_state[0] || key_state[1] || key_state[2] || key_state[3]) {
			display_size = display_size + 1;
			score = score + 1;
			$('#size_number').text(display_size);
			$('#score_number').text(score);
		}
		// fügt neues Element an Snake hinzu
		addNewSnakeElement();
		addNewElementCounter--;
	}, cycleSpeed);
}

function moveSnake() {
	// den Weg in x und y ablegen, den der Snake läuft
	path_y.push(snake.position_y);
	path_x.push(snake.position_x);

	// links
	if (key_state[0]) {
		snake.position_x = snake.position_x - 1;
		$('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')').addClass(
			snake.head
		);
		$(
			'.columns:nth-child(' +
				path_y.slice(addNewElementCounter)[0] +
				') .rows:nth-child(' +
				path_x.slice(addNewElementCounter)[0] +
				')'
		).removeClass(snake.head);
	}

	// oben
	if (key_state[1]) {
		snake.position_y = snake.position_y - 1;
		$('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')').addClass(
			snake.head
		);
		$(
			'.columns:nth-child(' +
				path_y.slice(addNewElementCounter)[0] +
				') .rows:nth-child(' +
				path_x.slice(addNewElementCounter)[0] +
				')'
		).removeClass(snake.head);
	}

	// rechts
	if (key_state[2]) {
		snake.position_x = snake.position_x + 1;
		$('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')').addClass(
			snake.head
		);
		$(
			'.columns:nth-child(' +
				path_y.slice(addNewElementCounter)[0] +
				') .rows:nth-child(' +
				path_x.slice(addNewElementCounter)[0] +
				')'
		).removeClass(snake.head);
	}

	// unten
	if (key_state[3]) {
		snake.position_y = snake.position_y + 1;
		$('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')').addClass(
			snake.head
		);
		$(
			'.columns:nth-child(' +
				path_y.slice(addNewElementCounter)[0] +
				') .rows:nth-child(' +
				path_x.slice(addNewElementCounter)[0] +
				')'
		).removeClass(snake.head);
	}

	console.log('y: ' + snake.position_y, ',  x: ' + snake.position_x);
	console.log('add new element counter: ' + addNewElementCounter);
}

function gameProcess() {
	if (snake.available) {
		resetCycle();
		startCycle();
	}
}

function startCycle() {
	setSizeCounter();
	cycleTimer_a = setInterval(function() {
		moveSnake();
		foodCollision();
		spawnFood();
		gameCounter++;
		if (checkWallCollision()) {
			resetCycle();
			setTimeout(function() {
				gameOver();
			}, 300);
		}
	}, snakeSpeed);
}

function resetCycle() {
	clearInterval(cycleTimer_a);
	clearInterval(cycleTimer_b);
}

function spawnFood() {
	var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	if (gameCounter % 5 == 0) {
		var food_x = Math.floor(Math.random() * 29) + 1;
		var food_y = Math.floor(Math.random() * 29) + 1;
		var currElement = $('.columns:nth-child(' + food_y + ') .rows:nth-child(' + food_x + ')');

		// Verschiede Food Farben erzeugen
		currElement.css({ background: '#' + randomColor });

		if (!currElement.hasClass('snake_head')) {
			currElement.addClass(food.fclass);
		}
	}
}

function foodCollision() {
	var currElement = $('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')');
	if (currElement.hasClass(food.fclass)) {
		currElement.removeClass(food.fclass);
		score = score + 5;
		display_size = display_size + 1;
	}
}

function checkWallCollision() {
	if (
		snake.position_y == wall.left ||
		snake.position_y == wall.bottom ||
		snake.position_x == wall.right ||
		snake.position_x == wall.up
	) {
		snake.available = false;
		return key_state;
	}
}

function gameOver() {
	popup.show();
	addNewElementCounter = -1;
	// Start-Button wieder aktivieren
	startButton.prop('disabled', false);
	startButton.text('RESTART');
	startButton.click(function() {
		popup.hide();
		startButton.text('START');
		gameStart();
	});
}

function gameStart() {
	// Alle Objekte auf der Map entferenn
	$('.columns .rows').removeClass(food.fclass);
	$('.columns .rows').removeClass(snake.head);

	// Score- und Laengezaehler auf 0
	score = 0;
	display_size = 1;

	// Anfangsposition des snake_head festlegen
	snake.position_x = 15;
	snake.position_y = 15;

	// Snake lebt
	snake.available = true;

	// Bewegungsrichtung am Anfang nach "unten" auf true setzen, alle anderen sind auf "false" gesetzt
	key_state[0] = false;
	key_state[1] = false;
	key_state[2] = false;
	key_state[3] = true;

	// Score anzeigen
	$('#score_number').text(score);

	// Länge anzeigen
	$('#size_number').text(display_size);

	// Head anzeigen
	$('.columns:nth-child(' + snake.position_x + ') .rows:nth-child(' + snake.position_y + ')').addClass(snake.head);

	// Spielloop starten
	gameProcess();
}
