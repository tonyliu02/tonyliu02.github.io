var view = {
	// display message
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	
	// display hit image
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	
	// display miss image
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
	
};

var model = {
	boardSize: 7,
	numShips: 2,
	shipLength: 3,
	shipsSunk: 0,
	
	// there are three ships in total
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],
	
	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			
			if (ship.hits[index] === "hit") {
				// if the location has already been hit
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}

				return true;
			}
		}

		// if missed
		view.displayMiss(guess);
		view.displayMessage("You missed.");

		return false;
	},
	
	// if all the "shipLength" number of ships have been hit, sink the battleship
	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},
	
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			// first randomly generate the location of the ships. If the ship is not already being placed there, record it 
			do {
				locations = this.generateShip();
			} while (this.isCollision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array:");
		console.log(this.ships);
	},
	
	generateShip: function() {
		// direction can only be 0 or 1
		var direction = Math.floor(Math.random() * 2);
		var row, col;
		
		if (direction === 1) {
			// if direction is 1, the ships are horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else {
			// if the direction is 0, the ships are vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}
		
		var newShipLocations = []
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				// push row col combo into the newShipLocations array
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}

		return newShipLocations;
	},
	
	isCollision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}	
			}
		}

		return false;
	}
};

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
	
	if (guess === null || guess.length !== 2) {
		// invalid input
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		firstChar = guess.charAt(0);
		// match the letter to a numerical index
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		// NaN - Not A Number
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			// return a string of row column combo
			return row + column;
		}
	}

	return null;
}

var controller = {
	guesses: 0,
	
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses.")
			}
		}
	}
}

function init() {
 	// when the fire button is clicked or the input is entered, fire
	var fireButton = document.getElementById("fireButton");
	fireButton.addEventListener('click', handleFireButton);
	var guessInput = document.getElementById("guessInput");
	// it has to be onkeydown (property) instead of adding an event handler
	// otherwise, the whole page would be refreshed
	guessInput.onkeydown = handleKeyPress;
	
	model.generateShipLocations();
}

function handleKeyPress(e) {
	if (e.keyCode === 13) {
		handleFireButton();

		// return false so that the form doesn't do anything else (e.g. submit the form itself)
		return false;
	}
}

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	
	// after firing reset the value in the input box
	guessInput.value = "";
}

// make sure DOM is loaded before executing the JS codes
window.onload = init;
