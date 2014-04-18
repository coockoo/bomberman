/**
 * Created by coockoo on 4/15/14.
 */

var Player = require('../models/player');
var FieldProvider = require('../resource_providers/field_provider');

function GameController () {
    this.fieldProvider = new FieldProvider();
    this.field = this.fieldProvider.getField("field_01");
    this.players = [];

    //TODO: add field provider
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
            this.player.splice(i, 1);
            break;
        }
    }
    return player;
};
GameController.prototype.makePlayerAction = function (params) {
    var player = this.getPlayerById(params.id);
    if (player != null) {
        //TODO: check if move is possible
        player.move(params.action);
    }
    return player;
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

module.exports = GameController;
