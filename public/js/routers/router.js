/**
 * Created by coockoo on 4/17/14.
 */

function Router () {
    this.gameController = null;
}
Router.prototype.init = function (data) {
    console.log(this);
    var self = this;
    this.gameController = new GameController({
        sendActionCallback: function (action) {
            self.sendAction(action);
        }
    });
    this.gameController.init(data);
};
Router.prototype.addPlayer = function (data) {
    console.log("Adding player", data);
    this.gameController.addPlayer(data);
};
Router.prototype.makePlayerAction = function (data) {
    console.log("Player action", data);
    this.gameController.makePlayerAction(data);
};
Router.prototype.sendAction = function (action) {
    console.log('Sending action: ', action);
};
