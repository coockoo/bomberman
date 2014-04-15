/**
 * Created by coockoo on 4/15/14.
 */

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
    if ('l' == action) {
        this.x -= this.speed;
    } else if ('r' == action) {
        this.x += this.speed;
    } else if ('u' == action) {
        this.y -= this.speed;
    } else if ('d' == action) {
        this.y += this.speed;
    }
};

//TODO: getters/setters and other stuff;

module.exports = Player;

