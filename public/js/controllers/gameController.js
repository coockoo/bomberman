var GameController = function(params) {
    this.field = null;
    this.player = null;
    this.enemies = [];
    this.view = null;
    this.keyHandler = null;
    this.keyTimer = null;
    this.sendActionCallback = params.sendActionCallback || null;

    this.predictionStorage = null;

};

GameController.prototype.init = function(params) {

    this.field = new Field(params.field);
    this.player = new Player(params.player);

    this.predictionStorage = new PredictionStorage();

    this.view = new View();
    this.view.init({
        field: this.field,
        success: function () {

            this.view.addPlayer(this.player);

            for (var i = 0; i < params.enemies.length; ++i) {
                this.addPlayer(params.enemies[i]);
            }

            this.keyHandler = new KeyHandler();
            //TODO: clear timer
            this.keyTimer = setInterval(function () {
                var action = this.keyHandler.getCurrentAction();
                if (action.length != 0) {
                    //TODO: put here move resolve (possible or not). Collision detection
                    this.player.move(action);
                    this.view.updatePlayer(this.player);
                    var predictionState = this.predictionStorage.addState(this.player);
                    this.sendActionCallback && this.sendActionCallback({
                        action: action,
                        playerId: this.player.getId(),
                        stateId: predictionState.id
                    });
                }
            }.bind(this), 1000 / 30);

        }.bind(this)

    });

};

GameController.prototype.addPlayer = function(player) {
    var newPlayer = new Player(player);
    this.enemies.push(newPlayer);
    this.view.addPlayer(newPlayer);
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
    if (enemy != null) {
        this.view.removePlayer(enemy);
    }
    return enemy;
};

GameController.prototype.makePlayerAction = function(player) {

    var playerToUpdate = null;

    if (player.id == this.player.getId()) {
        if (!this.predictionStorage.resolve(player)) {
            playerToUpdate = this.player.update(player);
        } else {
        }
    } else {
        for (var i = 0; i < this.enemies.length; ++i) {
            if (this.enemies[i].getId() == player.id) {
                playerToUpdate = this.enemies[i].update(player);
                break;
            }
        }
    }
    if (playerToUpdate != null) {
        this.view.updatePlayer(playerToUpdate);
    }
    return playerToUpdate;
};
