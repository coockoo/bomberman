/**
 * Created by coockoo on 4/15/14.
 */

var Player = require('../models/player');
var FieldProvider = require('../resource_providers/field_provider');

function GameController (params) {
    this.fieldProvider = new FieldProvider();
    this.field = this.fieldProvider.getField("field_01");
    this.players = [];
    this.bombs = [];
    this.bombTimer = setInterval(function () {
        var currentTime = Date.now();
        var blocks = this.field.getBlocks();
        for (var i= 0; i < this.bombs.length; ++i) {
            //TODO: magic 3000 ms
            if(this.bombs[i].getTimestamp() + 3000 < currentTime) {
                params.bombTimeoutCallback(this.bombs[i].toJSON());
                var bomb = this.bombs.splice(i, 1)[0];
                for (var j = 0; j < blocks.length; ++j) {
                    if ((bomb.getX() == blocks[j].getX()) &&
                        (blocks[j].getY() >= (bomb.getY() - bomb.getRadius()*bomb.getWidth())) &&
                        (blocks[j].getY() <= (bomb.getY() + bomb.getWidth() + bomb.getRadius()*bomb.getWidth()))
                        ) {
                        params.removeBlockCallback(blocks.splice(j, 1)[0]);
                        j--;
                    }
                    if ((bomb.getY() == blocks[j].getY()) &&
                        (blocks[j].getX() >= (bomb.getX() - bomb.getRadius()*bomb.getHeight())) &&
                        (blocks[j].getX() <= (bomb.getX() + bomb.getHeight() + bomb.getRadius()*bomb.getHeight()))
                        ) {
                        params.removeBlockCallback(blocks.splice(j, 1)[0]);
                        j--;
                    }

                }
                --i;
            }
        }

    }.bind(this), 1000 / 10)

}
/*
GameController.prototype.detectExplodedObjects = function(bomb) {
    var players = [];
    var blocks = [];
    var bombRadius = bomb.radius;
    var bombX = ((bomb.x - bombRadius) >= 0) ? (bomb.x - bombRadius) : bomb.x;
    var bombY = ((bomb.x + bombRadius) <= this.field.w) ? (bomb.x + bombRadius) : bomb.y;
    //TODO fix bomb radius
    var bombW = ((bombX + bomb.w + 2 * bombRadius) <= (this.field.x + this.field.w)) ? (bombX + bomb.w + 2 * bombRadius) : bombX + bomb.w;
    var bombH = ((bombY + bomb.h + 2 * bombRadius) <= (this.field.y + this.field.h)) ? (bombY + bomb.h + 2 * bombRadius) : bombY + bomb.h;
    for (var i = 0; i < this.players.length; i++) {
        if () {

        }
    }

    return {
        players : players,
        blocks : blocks
    }
}
*/
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
    var result = {
        player: null,
        bomb: null
    };
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
                    result.bomb = bomb.toJSON();
                }
            } else {
                if(!this.isColliding(player, actions[i])) {
                    result.player = player.move(actions[i]);
                }
            }
        }
    }
    player['stateId'] = stateId;
    return result;
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
            /*point 2*/(((xToCheck >= blockX) && ((xToCheck) < (blockX + blockW))) && ((yToCheck + player.h > blockY) && (yToCheck < blockY + blockH))))) {
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
    //TODO: Is not to frequent
    return true;


};
module.exports = GameController;
