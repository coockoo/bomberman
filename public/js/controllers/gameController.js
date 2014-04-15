
var GameController = function() {
    this.field = null;
    this.player = null;
    this.enemies = [];
    this.view = null;
};

GameController.prototype.init = function(params) {
    this.field = new Field(params.field);
    this.player = new Player(params.player);
    this.view = new View();
    for (var enemy in params.enemies) {
        this.addPlayer(enemy);
    }
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

