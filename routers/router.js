/**
 * Created by coockoo on 4/15/14.
 */

var Broadcaster = require('../broadcasters/broadcaster');

function Router () {

}
Router.prototype.showRoot = function (req, res) {
    var broadcaster = new Broadcaster();
    res.render('index', {

    });
};
module.exports = Router;
