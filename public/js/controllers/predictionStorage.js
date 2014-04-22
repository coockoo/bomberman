/**
 * Created by coockoo on 4/22/14.
 */

var PredictionStorage = (function () {

    var freeId = 0;

    function State (playerToStore) {
        var id = freeId++;
        var x = playerToStore.getX();
        var y = playerToStore.getY();
        this.getState = function () {
            return {
                id: id,
                state: {
                    x: x,
                    y: y
                }
            };
        };
        this.getId = function () {
            return id;
        };

    }

    function PredictionStorage () {

        var states = [];

        this.addState = function (player) {
            var state = new State(player);
            states.push(state);
            return state.getState();
        };
        this.getState = function (id) {
            var state = null;
            for (var i = 0; i < states.length; ++i) {
                if (states[i].getId() == id) {
                    state = states[i].getState();
                }
            }
            return state;
        };
        this.resolve = function (player) {
            var state = this.getState(player.stateId);
            while (states.shift().getId() != player.stateId) {  }
            if (state == null) {
                return false;
            } else {
                return (state.state.x == player.x) && (state.state.y == player.y);
            }
        }
    }

    return PredictionStorage;

})();
