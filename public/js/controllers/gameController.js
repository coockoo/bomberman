
var GameController = function(params) {
    this.field = null;
    this.player = null;
    this.enemies = [];
    this.view = null;
    this.keyTimer = null;
    this.keyHandler = null;
    this.sendActionCallback = params.sendActionCallback || null;
};

GameController.prototype.init = function(params) {
    this.field = new Field(params.field);
    this.player = new Player(params.player);
    this.view = new View();
    for (var enemy in params.enemies) {
        this.addPlayer(enemy);
    }
    this.keyHandler = new KeyHandler();
    this.keyTimer = setInterval(function () {
        var action = this.keyHandler.getCurrentAction();
        if (action.length != 0) {
            this.sendActionCallback && this.sendActionCallback(action);
        }
    }.bind(this), 1000 / 30);
};

GameController.prototype.addPlayer = function(player) {
    this.enemies.push(new Player(player));
};

GameController.prototype.removePlayer = function(player) {
    var enemy = null;
    for (var i = 0; i < this.enemies.length; ++i) {
        if (this.enemies[i].getId() == player.id) {
            enemy = this.enemies[i];
            this.enemies.splice(i, 1);
            break;
        }
    }
    return enemy;
};

GameController.prototype.makePlayerAction = function(player) {
    var playerToUpdate = null;
    if (player.id == this.player.getId()) {
        playerToUpdate = this.player.update(player);
    } else {
        for (var i = 0; i < this.enemies.length; ++i) {
            if (this.enemies[i].getId() == player.id) {
                playerToUpdate = this.enemies[i];
                playerToUpdate.update(player);
                break;
            }
        }
    }
    return playerToUpdate;
};

