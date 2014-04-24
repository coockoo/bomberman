/**
 * Created by coockoo on 4/15/14.
 */

var Controller = require('../controllers/game_controller');

function Broadcaster (server) {
    this.server = server;
    this.io = require('socket.io').listen(server);
    this.controller = new Controller({
        bombTimeoutCallback: function (data) {
            this.io.sockets.emit('bomb explosion', JSON.stringify(data));
        }.bind(this),
        removeBlockCallback: function (data) {
            this.io.sockets.emit('remove block', JSON.stringify(data))
        }.bind(this)
    });

    // -- server state update timer
    this.timeStepTimer = null;
    // -- server update frequency
    this.timeStep = 100;

    this.io.sockets.on('connection', function (socket) {
        var data = this.controller.addPlayer();
        socket.broadcast.emit('add player', JSON.stringify(data.player));
        socket.emit('init', JSON.stringify(data));
        socket.set('playerId', data.player.getId());

        socket.on('action', this.onAction.bind(this));
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
    }.bind(this), 0);
};

Broadcaster.prototype.onDisconnect = function (socket) {
    socket.get('playerId', function (err, id) {
        var player = this.controller.removePlayer(id);
        socket.broadcast.emit('remove player', JSON.stringify(player));

    }.bind(this));

};


module.exports = Broadcaster;
