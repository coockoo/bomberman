/**
 * Created by coockoo on 4/17/14.
 */

function Router () {
    this.gameController = null;

    this.socket = io.connect();

    this.socket.on('init', this.init.bind(this));
    this.socket.on('add player', this.addPlayer.bind(this));
    this.socket.on('action', this.makePlayerAction.bind(this));
    this.socket.on('remove player', this.removePlayer.bind(this));
    this.socket.on('bomb explosion', this.bombExplosion.bind(this));

}
Router.prototype.init = function (data) {
    var dataObj = JSON.parse(data);
    var self = this;
    this.gameController = new GameController({
        sendActionCallback: function (action) {
            self.sendAction(action);
        }
    });
    this.gameController.init(dataObj);
};
Router.prototype.addPlayer = function (data) {
    this.gameController.addPlayer(JSON.parse(data));
};
Router.prototype.makePlayerAction = function (data) {
    var dataObj = JSON.parse(data);
    this.gameController.makePlayerAction(dataObj);
};
Router.prototype.sendAction = function (action) {
    this.socket.emit('action', JSON.stringify(action));
};
Router.prototype.removePlayer = function (player) {
    var playerObj = JSON.parse(player);
    this.gameController.removePlayer(playerObj)

};
Router.prototype.bombExplosion = function (bomb) {
    var bombObj = JSON.parse(bomb);
    this.gameController.bombExplosion(bombObj);
};
