/**
 * Created by coockoo on 4/15/14.
 */

var Bomb = require('./bomb');

function Player (player) {
    this.id = player.id;
    this.x = player.x || 0;
    this.y = player.y || 0;
    this.w = player.w || 40;
    this.h = player.h || 40;
    this.speed = player.speed || 1;
}
Player.prototype.setId = function (id) {
    this.id = id;
    return this;
};
Player.prototype.getId = function () {
    return this.id;
};
Player.prototype.setPosition = function (position) {
    this.x = position.x;
    this.y = position.y;
    return this;
};
Player.prototype.move = function (action) {
    var actionArr = action.split('');
    for (var i = 0; i < actionArr.length; ++i) {
        if ('l' == actionArr[i]) {
            this.x -= this.speed;
        } else if ('r' == actionArr[i]) {
            this.x += this.speed;
        } else if ('u' == actionArr[i]) {
            this.y -= this.speed;
        } else if ('d' == actionArr[i]) {
            this.y += this.speed;
        }
    }
};

Player.prototype.getWidth = function() {
    return this.w;
};

Player.prototype.getHeight = function() {
    return this.h;
};

Player.prototype.getX = function() {
    return this.x;
};

Player.prototype.getY = function() {
    return this.y;
};

Player.prototype.getSpeed = function() {
    return this.speed;
};

Player.prototype.setWidth = function(width) {
    this.w = width;
};

Player.prototype.setHeight = function(height) {
    this.h = height;
};

Player.prototype.setX = function(x) {
    this.x = x;
};

Player.prototype.setY = function(y) {
    this.y = y;
};

Player.prototype.setSpeed = function(speed) {
    this.speed = speed;
};

Player.prototype.newBomb = function (params) {
    var playerX = this.getX();
    var prevBlockX = Math.floor(playerX / 40) * 40;
    var playerY = this.getY();
    var prevBlockY = Math.floor(playerY / 40) * 40;
    var x = prevBlockX;
    var y = prevBlockY;
    var dx = playerX - prevBlockX;
    var dy = playerY - prevBlockY;
    if (dx >= 20) {
        x += 40;
    }
    if (dy >= 20) {
        y += 40;
    }
    return new Bomb({
        x: x,
        y: y,
        timestamp: params['timestamp']
    });
};

module.exports = Player;

