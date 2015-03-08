'use strict';

// Player Constants
var PLAYER_STARTING_X = 200;
var PLAYER_STARTING_Y = 400;
var PLAYER_SPEED_RIGHT_LEFT = 101;
var PLAYER_SPEED_UP_DOWN = 85;
//Stage constants
var CANVAS_WIDTH = 505;
var X_RIGHT_BOUNDRY = 480;
var X_LEFT_BOUNDRY = -80;
var Y_BOTTOM_BOUNDRY = 450;
var Y_WIN_BOUNDRY = 0;

// Bug Constants
var HIT_BOX = 50;
var ENEMY_LOW_SPEED = 105;
var ENEMY_MID_SPEED = 130;
var ENEMY_HIGH_SPEED = 160;
var E1START = [110, 50];
var E2START = [10, 140];
var E3START = [210, 210];
var E4START = [220, 140];
var BUG_RESET = 0;
var BUG_BOX_FOR_RESET = 25;

// Enemy Object
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Check if bug hits the end of the map and resets
    this.x = this.x + this.speed * dt;
    if ((this.x + BUG_BOX_FOR_RESET) > CANVAS_WIDTH) {
        this.x = BUG_RESET;
    }

    // Checks for collitions
    if (player.collide(this)) {
        alert("CRASH!");
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


//player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};


// Renders player image
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Update
Player.prototype.update = function(dt) {
    this.dt = dt;

    // Checks if player hits the water, if so
    // gains a point and resets to starting point
    if ((this.y) < Y_WIN_BOUNDRY) {
        this.addPoint();
        alert("Great Job!");
        this.reset();
    }

    // checks if player is out of bounds and resets
    if (this.y > Y_BOTTOM_BOUNDRY) {
        this.reset();
    } else if (this.x > X_RIGHT_BOUNDRY || this.x < X_LEFT_BOUNDRY) {
        this.reset();
    }
};


// Add one point to players score
Player.prototype.addPoint = function() {
    this.score++;
};

// Reset Player back to bottom center start position
Player.prototype.reset = function() {
    this.x = PLAYER_STARTING_X;
    this.y = PLAYER_STARTING_Y;
};

// Check if enemy is in players hit box
Player.prototype.collide = function(enemy) {
    if ((this.y <= enemy.y + HIT_BOX) && (this.y >= enemy.y)) {
        if ((this.x >= enemy.x) && (this.x <= enemy.x + HIT_BOX)) {
            return true;
        }
    }
    return false;
};


// Handle keystrokes for movement
Player.prototype.handleInput = function(dir) {

    // move Player by any direction by 30 pixels
    switch (dir) {
        case 'left':
            this.x = this.x - PLAYER_SPEED_RIGHT_LEFT;
            break;
        case 'right':
            this.x = this.x + PLAYER_SPEED_RIGHT_LEFT;
            break;
        case 'up':
            this.y = this.y - PLAYER_SPEED_UP_DOWN;
            break;
        case 'down':
            this.y = this.y + PLAYER_SPEED_UP_DOWN;
            break;
        default:
            break;
    }
};

// Create player and enemey objects
var player = new Player(PLAYER_STARTING_X, PLAYER_STARTING_Y);
var enemy1 = new Enemy(E1START[0], E1START[1], ENEMY_LOW_SPEED);
var enemy2 = new Enemy(E2START[0], E2START[1], ENEMY_MID_SPEED);
var enemy3 = new Enemy(E3START[0], E3START[1], ENEMY_HIGH_SPEED);
var enemy4 = new Enemy(E4START[0], E4START[1], ENEMY_MID_SPEED);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});