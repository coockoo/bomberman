/**
 * Created by dashyki on 15.04.14.
 */

function Player (player) {
    this.id = player.id;
    this.x = player.x || 0;
    this.y = player.y || 0;
    this.w = player.w || 40;
    this.h = player.h || 40;
    this.speed = player.speed || 1;
}

Player.prototype.getId = function () {
    return this.id;
};

Player.prototype.getX = function () {
    return this.x;
};

Player.prototype.getY = function () {
    return this.y;
};

Player.prototype.getWidth = function () {
    return this.w;
};

Player.prototype.getHeight = function () {
    return this.h;
};

Player.prototype.getSpeed = function () {
    return this.speed;
};