/**
 * Created by coockoo on 4/15/14.
 */

var Player = require('../models/player');
var FieldProvider = require('../resource_providers/field_provider');

function GameController () {
    this.fieldProvider = new FieldProvider();
    this.field = this.fieldProvider.getField("field_01");
    this.players = [];
    this.bombs = [];

}
GameController.prototype.addPlayer = function () {
    var player = new Player({id: this.players.length + 1});
    player.setPosition(this.getNewPlayerPosition());

    var enemies = this.players.slice(0);
    this.players.push(player);
    return {
        enemies: enemies,
        player: player,
        field: this.field
    }
};
GameController.prototype.removePlayer = function (id) {
    var player = null;
    for (var i = 0; i < this.players.length; ++i) {
        if (this.players[i].getId() == id) {
            player = this.players[i];
            this.players.splice(i, 1);
            break;
        }
    }
    return player;
};
GameController.prototype.makePlayerAction = function (params) {
    var stateId = params['stateId'];
    var player = this.getPlayerById(params['playerId']);
    if (player != null) {
        var actions = params.action.split('');
        for (var i = 0; i < actions.length; ++i) {
            if (actions[i] == 's') {
                var bomb = player.newBomb({
                    timestamp: params['timestamp']
                });
                //TODO: too many bombs
                if (this.canPlaceBomb(player, bomb)) {
                    this.bombs.push(bomb);
                }
            } else {
                if(!this.isColliding(player, actions[i])) {
                    player.move(actions[i]);
                }
            }
        }
    }
    player['stateId'] = stateId;
    return player;
};

GameController.prototype.isColliding = function(player, action) {
    var collides = false;
    var xToCheck = player.x;
    var yToCheck = player.y;
    var fieldW = this.field.w;
    var fieldH = this.field.h;
    switch(action) {
        case "l" : {
            xToCheck = player.getX() - player.speed;
            break;
        }
        case "r" : {
            xToCheck = player.getX() + player.speed;
            break;
        }
        case "u" : {
            yToCheck = player.getY() - player.speed;
            break;
        }
        case "d" : {
            yToCheck = player.getY() + player.speed;
            break;
        }
    }
    //collision with field edges
    if ((xToCheck < 0) || (yToCheck < 0) || (xToCheck + player.getWidth() > fieldW) || (yToCheck + player.getHeight() > fieldH)) {
        collides = true;
        return collides;
    }
    //collision with blocks
    for (var i = 0; i < this.field.blocks.length; i++) {
        var blockH = this.field.blocks[i].getHeight();
        var blockW = this.field.blocks[i].getWidth();
        var blockX = this.field.blocks[i].getX();
        var blockY = this.field.blocks[i].getY();
        if( (
            /*point 1*/((xToCheck + player.w > blockX) && ((xToCheck + player.w) < (blockX + blockW)) && ((yToCheck + player.h > blockY) && (yToCheck < blockY + blockH))) ||
            /*point 2*/(((xToCheck > blockX) && ((xToCheck) < (blockX + blockW))) && ((yToCheck + player.h > blockY) && (yToCheck < blockY + blockH))))) {
            collides = true;
            return collides;
        }
    }
    return collides;
};

GameController.prototype.getPlayerById = function (id) {
    var player = null;

    for (var i = 0; i < this.players.length; ++i) {
        if (this.players[i].getId() == id) {
            player = this.players[i];
            break;
        }
    }
    return player;
};
GameController.prototype.getNewPlayerPosition = function () {
    //TODO: add normal coordinates from field provider
    return {x:0, y:0};
};
GameController.prototype.canPlaceBomb= function (player, bomb) {
    //Check if place is not free
    for (var i = 0; i < this.bombs.length; ++i) {
        if (this.bombs[i].getX() == bomb.getX() && this.bombs[i].getY() == bomb.getY()) {
            return false;
        }
    }
    //TODO: Is not to freequent
    return true;


};
module.exports = GameController;
