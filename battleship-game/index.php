<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Battleship Game</title>
		<!-- Bootstrap CSS -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<!-- custom CSS -->
		<link rel="stylesheet" href="style.css?<?php echo date('l jS \of F Y h:i:s A'); ?>" />
	</head>

	<body>
		<h1 id="gameTitle" class="text-center">Battleship Game</h1>
		<div class="container-fluid">
			<div class="row justify-content-around">
				<!-- rules area -->
				<div class="col-xl-5 d-flex align-items-center">
					<div class="row">
						<div class="col-sm-8 align-self-center" id="rules">
							<h3 id="rulesTitle">Rules of Battleship Game: </h3>
							<ul id="rulesDescription">
								<li>There are two ships in total with length of 3 each, meaning there are two <img src="assets/ship-sm.png" alt="ship"><img src="assets/ship-sm.png" alt="ship"><img src="assets/ship-sm.png" alt="ship">s in the radar</li>
								<li>However, these two ships can be in either horizontal or vertical position</li>
								<li>Enter in the input box your guess of the locations of these ships</li>
								<li>Your goal is to hit both ships</li>
								<li>A message will appear indicating whether you miss/hit/sink the ship. An alert would pop up if you enter an invalid location</li>
								<li>You get unlimited trials!</li>
								<li>Good luck!</li>
							</ul>
						</div>
					</div>
					
				</div>

				<!-- board area -->
				<div class="col-xl-6">
					<div class="position-relative" id="boardContainer">
						<!-- the board background -->
						<img src="assets/boardBig.jpg" alt="boardBg" id="boardBg">
						<!-- the message area in the top left -->
						<div class="position-absolute" id="messageArea"></div>
								
						<!-- the place for entering the hitting area -->
						<form class="position-absolute text-start" id="playerInput">
							<label for="guessInput" id="guessLabel">Enter a location here: </label><br>
							<input type="text" id="guessInput" placeholder="e.g. A0">
							<!-- fire button -->
							<input type="button" id="fireButton" value="Fire!">
						</form>

						<!-- the battleship game grid -->
						<table class="position-absolute" id="grid">
							<tr>
								<td id="00"></td><td id="01"></td><td id="02"></td><td id="03"></td><td id="04"></td><td id="05"></td><td id="06"></td>
							</tr>
							<tr>
								<td id="10"></td><td id="11"></td><td id="12"></td><td id="13"></td><td id="14"></td><td id="15"></td><td id="16"></td>
							</tr>
							<tr>
								<td id="20"></td><td id="21"></td><td id="22"></td><td id="23"></td><td id="24"></td><td id="25"></td><td id="26"></td>
							</tr>
							<tr>
								<td id="30"></td><td id="31"></td><td id="32"></td><td id="33"></td><td id="34"></td><td id="35"></td><td id="36"></td>
							</tr>
							<tr>
								<td id="40"></td><td id="41"></td><td id="42"></td><td id="43"></td><td id="44"></td><td id="45"></td><td id="46"></td>
							</tr>
							<tr>
								<td id="50"></td><td id="51"></td><td id="52"></td><td id="53"></td><td id="54"></td><td id="55"></td><td id="56"></td>
							</tr>
							<tr>
								<td id="60"></td><td id="61"></td><td id="62"></td><td id="63"></td><td id="64"></td><td id="65"></td><td id="66"></td>
							</tr>
						</table>
						
					</div>
					
				</div>
			</div>
		</div>
		
		<script src="battleship.js?<?php echo date('l jS \of F Y h:i:s A'); ?>"></script>
	</body>
</html>