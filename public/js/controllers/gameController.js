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
    var self = this;
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
                    var actions = action.split('');
                    for (var i = 0; i < actions.length; ++i) {
                        if (actions[i] != 's') {
                            // -- if not space
                            if (!self.collides(self.player, actions[i])) {
                                this.player.move(actions[i]);
                                this.view.updatePlayer(this.player);
                            }
                        } else {
                            // TODO: if space

                        }
                    }
                    var predictionState = this.predictionStorage.addState(this.player);
                    this.sendActionCallback && this.sendActionCallback({
                        action: action,
                        playerId: this.player.getId(),
                        stateId: predictionState.id,
                        timestamp: Date.now()
                    });
                }
            }.bind(this), 1000 / 30);

        }.bind(this)

    });

};

GameController.prototype.collides = function (player, action) {
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
}

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

GameController.prototype.makePlayerAction = function(data) {

    var playerToUpdate = null;
    var player = data.player;
    if (player != null) {
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
    }

    if (data.bomb != null) {
        this.view.addBomb(new Bomb(data.bomb));
    }

    //TODO: what to do with return?
    return playerToUpdate;
};
GameController.prototype.bombExplosion = function (bomb) {
    this.view.explodeBomb(bomb);

};
GameController.prototype.removeBlock = function (block) {
    this.view.removeBlock(block);

};
