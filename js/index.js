'use strict';
const canvas = document.querySelector('canvas');
const brush = canvas.getContext('2d');
let x = 240;
let y = 480;
let w = 20;
let h = 20;
let over = true;

function drawRect(x, y, w, h) {
    brush.fillStyle = 'black';
    brush.fillRect(x, y, w, h);
}

window.onkeydown = function(event) {
    let key = event.keyCode;
    if (key === 39 && x < 480) {
        x = x + 20;
    } else if (key === 37 && x > 0) {
        x = x - 20;
    }
    if (over != true) {
        brush.clearRect(0, 0, 500, 500);
    }
};

let yPosition = 0;
let xPosition = Math.floor((Math.random() * 460) + 0);
let fallWidth = Math.floor((Math.random() * 60) + 20);
let fallHeight = Math.floor((Math.random() * 40) + 10);
let score = 0;
let highScore = 0;
let time = 0;
function play() {
    over = false;
    document.querySelector('#score').textContent = 'Score: 0';
    document.querySelector('#timer').textContent = 'Time: 0 seconds';
    buttonDisable();
    let timer = window.setInterval(function() {
        time +=1;
        document.querySelector('#timer').textContent = 'Time: ' + time + ' seconds';
        if (over) {
            clearInterval(timer);
            time = 0;
        }
    }, 1000);
    let game = window.setInterval(function() {
        brush.clearRect(0, 0, 500, 500);
        drawRect(x, y, w, h);
        brush.fillRect(xPosition, yPosition, fallWidth, fallHeight);
        over = gameOver(xPosition, yPosition, x, y, fallWidth, fallHeight);
        if (over) {
            clearInterval(game);
            brush.font = '30px Arial';
            brush.fillText('Game Over', 175, 240);
            brush.strokeStyle = 'gray';
            brush.fillStyle = 'gray';
            brush.fillText('Score: ' + score, 190, 280);
            yPosition = 0;
            xPosition = Math.floor((Math.random() * 460) + 0);
            x = 240;
            score = 0;
            document.querySelector('button').textContent = 'Retry?';
            button.disabled = false;
        }
        if (score < 5) {
            yPosition += 5;
        } else if (score < 10) {
            yPosition += 7;
        } else if (score < 15) {
            yPosition += 10;
        } else if (score < 20) {
            yPosition += 15;
        } else if (score < 25) {
            yPosition += 20;
        } else {
            yPosition += 30;
        }
        if (yPosition >= 500) {
            yPosition = 0;
            xPosition = Math.floor((Math.random() * 460) + 0);
            fallWidth = Math.floor((Math.random() * 60) + 20);
            fallHeight = Math.floor((Math.random() * 40) + 10);
            score += 1;
            document.querySelector('#score').textContent = 'Score: ' + score;
        }
        if (score > highScore) {
            highScore = score;
            document.querySelector('#high').textContent = 'High Score: ' + highScore;
        }
    }, 20);
}

let button = document.querySelector('button');
button.addEventListener('click', play);
function buttonDisable() {
    if (over == false) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}
function gameOver(x1, y1, x2, y2, w, h) {
    if (x1 >= x2 + 20 || x2 >= x1 + w) return false;
    if (y1 >= y2 + 20 || y2 >= y1 + h) return false;
    return true;
}
