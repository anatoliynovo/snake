// Map

// Spiel starten
var startButton = document.getElementById('start');
startButton.click(function() {
	startGame();
});

var snake = {
	position: [],
	size: 3,
	richtung: 'unten'
};

var snack = {
	position: [],
	available: false
};

var columns = 30;
var score = 0;
var display_size = 0;
var speed = 10;

function createMap() {
	var map = document.getElementById('map');
	map = map + '<div></div>';
}

function control() {}

function moveSnake() {}

function startGame() {}
