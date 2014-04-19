/**
 * Created by coockoo on 4/17/14.
 */

function Router () {
    this.gameController = null;

    this.socket = io.connect();

    this.socket.on('init', this.init.bind(this));
    this.socket.on('add player', this.addPlayer.bind(this));
    this.socket.on('action', this.makePlayerAction.bind(this));

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
