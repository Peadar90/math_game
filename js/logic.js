var currentScore = 0;
var bestScore = 0;

var correctResult = 0;
var dummyResult = 0;
var answerToShow = 0;
var interval = 0;
var time = 50;

$(document).ready(function (){
	generateEquation();
	displayBestScore();
	addEventListeners()
});

$(function() {
	$("input[id=easy").change(function () {
		alert("Easy");
		time = 50;
		// setEasyMode();
	});
	$("input[id=hard").change(function () {
		time = 25;
		// setHardMode();
	});
	$("input[id=expert").change(function () {
		time = 10;
		// setExpertMode();
	});
});



function addEventListeners() {
	document.getElementById("correctButton").addEventListener('click', checkCorrect, false);
	document.getElementById("incorrectButton").addEventListener('click', checkIncorrect, false);
	$('#difficulty').attr('checked', 'checked').trigger('change');
}

function generateEquation() {
	var x = Math.floor(Math.random() * 10) + 1;
	var y = Math.floor(Math.random() * 10) + 1;
	correctResult = x + y;
	generateDummyResult();
	document.getElementById("equation").innerHTML = x + " + " + y;
	showResult();
}

function startProgressBar() {
	var bar = document.getElementById("myBar");
	var width = 0;
	interval = setInterval(function frame() {
		if (width >= 100) {
			showGameOver();
		} else {
			width++;
			bar.style.width = width + "%";
		}
	}, time);
}

function generateDummyResult() {
	dummyResult = Math.floor(Math.random() * correctResult) + 1;
}

function showDummyResult() {
	var random = Math.floor(Math.random() * 1000) + 1;
	return random % 3 == 0 ? true : false;
}

function showResult() {
	answerToShow = showDummyResult() ? dummyResult : correctResult;
	document.getElementById("answer").innerHTML = answerToShow;
}

function checkCorrect() {
	if (correctResult == answerToShow) {
		generateEquation();
		clearInterval(interval);
		startProgressBar();
		updateScore();
	} else {
		showGameOver();
	}
}

function checkIncorrect() {
	if (correctResult != answerToShow) {
		generateEquation();
		clearInterval(interval);
		startProgressBar();
		updateScore();
	} else {
		showGameOver();
	}
}

function showGameOver() {
	clearInterval(interval);
	disableButtons();
	setBestScore();
	$("#gameScoreValue").text(currentScore);
	$("#bestScoreValue").text(getBestScore());
	$("#gameOver").show();
}

function displayBestScore() {
	var best = getBestScore();
	if (best == null) {
		$("#best").text("Best: " + currentScore);
	} else {
		$("#best").text("Best: " + getBestScore());
	}
}

function setBestScore() {
	var best = getBestScore();
	if (currentScore > best || best == null) {
		window.sessionStorage.setItem("bestScore", currentScore);
	}
}

function getBestScore() {
	return window.sessionStorage.getItem("bestScore");
}

function updateScore() {
	$("#count").text(++currentScore);
}

function disableButtons() {
	document.getElementById("correctButton").setAttribute("disabled", "disabled");
	document.getElementById("incorrectButton").setAttribute("disabled", "disabled");
}
