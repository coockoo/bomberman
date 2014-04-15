/**
 * Created by coockoo on 4/15/14.
 */

var Broadcaster = require('../broadcasters/broadcaster');

function Router (server) {
    this.broadcaster = new Broadcaster(server);
}
Router.prototype.showRoot = function (req, res) {

    res.render('index', {

    });
};
module.exports = Router;
