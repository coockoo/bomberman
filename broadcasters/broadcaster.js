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
        socket.on("action", self.onAction);
    });

    this.onAction = function (params) {
        var paramsObj = JSON.parse(params);
        var player = this.controller.makePlayerAction(paramsObj);
        this.io.sockets.emit("action", JSON.stringify(player));
    }.bind(this);
}


module.exports = Broadcaster;
