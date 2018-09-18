import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'darpa',
    templateUrl: './darpa.component.html',
    styleUrls: ['./darpa.component.css']
})
export class DarpaComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        this.startGame();
    }

    startGame() {
        // Canvas DARPA
        let canvas: any = document.getElementById('canvas');
        let context = canvas.getContext('2d');

        // Key Codes
        const D = 68;
        const P = 80;
        const R = 82;

        // theme
        const theme = {
            black: '#000000',
            white: '#FFFFFF',
            red: '#FF0000'
        }

        // Keep track of the score
        let leftDistance = 100;
        let rightDistance = 100;
        const distanceFactor = 3;

        // Listen for key events
        canvas.addEventListener('keyup', function (e) {
            if (e.keyCode === D) {
                rightSquare.x -= distanceFactor;
                rope.w -= distanceFactor;
                rightDistance -= 1;
            }
            if (e.keyCode === P) {
                leftSquare.x += distanceFactor;
                rope.x += distanceFactor;
                rope.w -= distanceFactor;
                leftDistance -= 1;
            }
            if (e.keyCode === R) {
                erase();
                draw();
                setGameObjects();
            }
        });

        // Create a rectangle object
        function makeRect(x, y, width, height, color) {
            if (!color) color = theme.black;
            return {
                x: x,
                y: y,
                w: width,
                h: height,
                c: color,
                draw: function () {
                    context.fillStyle = this.c;
                    context.fillRect(this.x, this.y, this.w, this.h);
                }
            };
        }

        // Prepare the game
        let squareWidth = 100;
        let squareHeight = 100;
        let leftSquare = makeRect(25, 200, squareWidth, squareHeight, theme.black);
        let rightSquare = makeRect(canvas.width - squareWidth - 25, 200, squareWidth, squareHeight, theme.black);
        let fieldX = makeRect(0, 300, 854, 2, theme.black);
        let fieldY = makeRect(427, 0, 2, 300, theme.black);
        let ropeLength = 704;
        let ropeDiam = 1;
        let rope = makeRect(75, 250, ropeLength, ropeDiam, theme.red);

        // Reset the game
        function setGameObjects() {
            squareWidth = 100;
            squareHeight = 100;
            leftSquare = makeRect(25, 200, squareWidth, squareHeight, theme.black);
            rightSquare = makeRect(canvas.width - squareWidth - 25, 200, squareWidth, squareHeight, theme.black);
            fieldX = makeRect(0, 300, 854, 2, theme.black);
            fieldY = makeRect(427, 0, 2, 300, theme.black);
            ropeLength = 704;
            ropeDiam = 1;
            rope = makeRect(75, 250, ropeLength, ropeDiam, theme.red);
            leftDistance = 100;
            rightDistance = 100;
        }

        // Show the menu
        function menu() {
            erase();
            // Show the menu
            context.fillStyle = theme.black;
            context.font = 'bold 24px Arial';
            context.textAlign = 'center';
            context.fillText('DARPA', canvas.width / 2, canvas.height / 6);
            context.font = 'bold 18px Arial';
            context.fillText('Instructions:', canvas.width / 2, canvas.height / 4 + 20);
            context.font = '16px Arial';
            context.fillText('Two players have to pull each other over the line at the center of the screen.', canvas.width / 2, canvas.height / 4 + 45);
            context.fillText('Press R for restart. Click to Start', canvas.width / 2, canvas.height / 4 + 70);
            context.textAlign = 'left';
            context.fillText('Player 1: Press D for pulling', 5, (canvas.height / 3) * 2);
            context.textAlign = 'right';
            context.fillText('Player 2: Press P for pulling', canvas.width - 5, (canvas.height / 3) * 2);
            // Start the game on a click
            canvas.addEventListener('click', startGame);
        }

        // Start the game
        function startGame() {
            canvas.removeEventListener('click', startGame);
            draw();
        }

        // Show the end game screen
        function endGame() {
            erase();
            context.fillStyle = theme.black;
            context.font = '24px Arial';
            context.textAlign = 'center';
            let winner = 1;
            if (leftDistance === 0) winner = 2;
            context.fillText('Player ' + winner + ' wins! Please press R for restarting the game!', canvas.width / 2, canvas.height / 2);
        }

        // Clear the canvas
        function erase() {
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Main draw loop
        function draw() {
            erase();
            // // Draw the paddles and ball
            leftSquare.draw();
            rightSquare.draw();
            rope.draw();
            fieldX.draw();
            fieldY.draw();
            // Draw the scores
            context.fillStyle = theme.black;
            context.font = '20px Arial';
            context.textAlign = 'left';
            context.fillText('Distance: ' + leftDistance, 5, 24);
            context.fillText('Player 1', 5, 54);
            context.fillText('Press D', 5, 350);
            context.textAlign = 'right';
            context.fillText('Distance: ' + rightDistance, canvas.width - 5, 24);
            context.fillText('Player 2', canvas.width - 5, 54);
            context.fillText('Press P', canvas.width - 5, 350);
            // // End the game or keep going
            if (leftDistance === 0 || rightDistance === 0) {
                endGame();
            } else {
                window.requestAnimationFrame(draw);
            }
        }

        // Show the menu to start the game
        menu();
        canvas.focus();
    }
}
