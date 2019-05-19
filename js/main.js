// Snake
var snake = {
	position_x: 1,
	position_y: 1,
	available: false,
	head: 'snake_head'
};

// Food
var food = {
	fclass: 'food'
};

// Wände
var wall = {
	left: 0,
	top: 31,
	right: 0,
	bottom: 31
};

// Tastatur Eingabe
var key = {
	left: 37,
	up: 38,
	right: 39,
	down: 40
};
var key_state = [false, false, false, false];

var totalRows = 30; // Gesamtanzahl der Reihen
var score = 0; // Score-Zähler
var display_size = 0; // Länge-Zähler

var counter = 0; // Zähler für Pixeln (20px)
var counter_column = 1; // id für columns
var counter_row = 0; // id für rows
var mapSize = totalRows;

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

// Map, Score- und Längezähler verbergen, solange nicht auf Start gedrückt wurde
$('#map').hide();
$('span').hide();
$('.start').hide();

// Map erstellen und Tasten einweisen
$(document).ready(function () {
	setTimeout(function () {
		$('.start').fadeIn(1000);
	}, 2000);
	createMap();
	initializeKeyboard();
	startButton.text('START');
	startButton.click(function () {
		// Start-Button deaktivieren nach dem ersten Klick
		$('.start').prop('disabled', true);
		// Smooth Scrolling nach ganz unten
		$('html,body').animate({
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
	$(document).keydown(function (e) {
		if (e.keyCode == key.left) {
			key_state[0] = true;
			key_state[1] = false;
			key_state[2] = false;
			key_state[3] = false;

			console.log(key.left);
		}
		if (e.keyCode == key.up) {
			key_state[1] = true;
			key_state[0] = false;
			key_state[2] = false;
			key_state[3] = false;

			console.log(key.up);
		}
		if (e.keyCode == key.right) {
			key_state[2] = true;
			key_state[0] = false;
			key_state[1] = false;
			key_state[3] = false;

			console.log(key.right);
		}
		if (e.keyCode == key.down) {
			key_state[3] = true;
			key_state[0] = false;
			key_state[1] = false;
			key_state[2] = false;

			console.log(key.down);
		}
		// wenn die Arrow Tasten nicht betätigt wurden, so lassen wie es auf default ist
		e.preventDefault();
	});
}

function addNewSnakeElement() {
	var newElement = $(
		'.columns:nth-child(' +
		path_y.slice(addNewElementCounter)[0] +
		') .rows:nth-child(' +
		path_x.slice(addNewElementCounter)[0] +
		')'
	).addClass(snake.head);
	return newElement;
}

function setSizeCounter() {
	// Score und Länge-Zähler fangen an zu zählen, wenn einer der Tasten betätigt wurde
	cycleTimer_b = setInterval(function () {
		if (key_state[0] || key_state[1] || key_state[2] || key_state[3]) {
			display_size = display_size + 1;
			score = score + 1;
		}

		// fügt neues Element an Snake hinzu
		addNewSnakeElement();
		addNewElementCounter--;

		// Score und Länge aktualisieren
		$('#size_number').text(display_size);
		$('#score_number').text(score);
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
}

function gameProcess() {
	if (snake.available) {
		resetCycle();
		startCycle();
	}
}

function startCycle() {
	setSizeCounter();
	cycleTimer_a = setInterval(function () {
		moveSnake();
		foodCollision();
		spawnFood();
		gameCounter++;
		if (wallCollision() || selfCollision()) {
			resetCycle();
			setTimeout(function () {
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
		var randomElement = $('.columns:nth-child(' + food_y + ') .rows:nth-child(' + food_x + ')');

		// Verschiede Food Farben erzeugen
		randomElement.css({
			background: '#' + randomColor
		});

		if (!randomElement.hasClass('snake_head')) {
			randomElement.addClass(food.fclass);
		}
	}
}

function foodCollision() {
	var currElement = $('.columns:nth-child(' + snake.position_y + ') .rows:nth-child(' + snake.position_x + ')');
	if (currElement.hasClass(food.fclass)) {
		// Food löschen
		currElement.removeClass(food.fclass);

		// Food an Snake anhängen
		addNewSnakeElement();
		addNewElementCounter--;

		// Background-color auf blank setzen
		currElement.css({
			background: ''
		});
		// 5 Punkte pro Food
		score = score + 5;
		// Länge um 1 inkrementieren, wenn Food berührt wurde
		display_size = display_size + 1;
	}
	// Score und Länge aktualisieren
	$('#size_number').text(display_size);
	$('#score_number').text(score);
}

function selfCollision() {
	// gibt true bei Kollision mit dem Body vom Snake
	var isCollided = false;

	$.each(path_x, function (i) {
		if (snake.position_x == path_x[i] && snake.position_y == path_y[i]) {
			isCollided = true;
		}
	});

	return isCollided;
}

function wallCollision() {
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
	startButton.click(function () {
		popup.hide();
		startButton.text('START');
		gameStart();
	});
}

function gameStart() {
	// Alle Objekte auf der Map entfernen und Hintergrund auf blank zurücksetzen
	$('.columns .rows').removeClass(food.fclass);
	$('.columns .rows').removeClass(snake.head);
	$('.columns .rows').css({
		background: ''
	});

	// Score- und Laengezaehler auf 0
	score = 1;
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

	// Arrays (Länge des Sneaks) leeren, wenn das Spiel neugestartet wird
	path_x = [];
	path_y = [];

	// Score anzeigen
	$('#score_number').text(score);

	// Länge anzeigen
	$('#size_number').text(display_size);

	// Head anzeigen
	$('.columns:nth-child(' + snake.position_x + ') .rows:nth-child(' + snake.position_y + ')');

	// Spielschleife starten
	gameProcess();
}