/**
 * Created by coockoo on 4/15/14.
 */

var Controller = require('../controllers/game_controller');

function Broadcaster (server) {
    var self = this;
    this.server = server;
    this.io = require('socket.io').listen(server);
    this.controller = new Controller();

    this.io.sockets.on('connection', function (socket) {
        var data = self.controller.addPlayer();
        socket.broadcast.emit('add player', JSON.stringify(data.player));
        socket.emit('init', JSON.stringify(data));
        socket.set('playerId', data.player.getId());

        socket.on('action', self.onAction.bind(this));
        socket.on('disconnect', function () {
            this.onDisconnect(socket);
        }.bind(this));
    }.bind(this));

}

Broadcaster.prototype.onAction = function (params) {
    setTimeout(function () {
        var paramsObj = JSON.parse(params);
        var player = this.controller.makePlayerAction(paramsObj);
        this.io.sockets.emit('action', JSON.stringify(player));
    }.bind(this), 500);
};

Broadcaster.prototype.onDisconnect = function (socket) {
    socket.get('playerId', function (err, id) {
        var player = this.controller.removePlayer(id);
        socket.broadcast.emit('remove player', JSON.stringify(player));

    }.bind(this));

};


module.exports = Broadcaster;
