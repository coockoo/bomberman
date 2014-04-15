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
        socket.broadcast.emit('add player', data.player);
        socket.emit('init', data);
        socket.on("action", self.onAction);
    });

    this.onAction = function (params) {
        var player = this.controller.makePlayerAction(params);
        this.io.sockets.emit("action", player);
    }
}


module.exports = Broadcaster;
