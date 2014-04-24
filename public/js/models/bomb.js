/**
 * Created by coockoo on 4/24/14.
 */

var Bomb =
function () {

    function Bomb (params) {

        var id = params.id;
        var x = params.x;
        var y = params.y;
        var w = params.w || 40;
        var h = params.h || 40;
        var timestamp = params.timestamp || Date.now();
        var radius = params.radius || 1;

        this.getX = function () {
            return x;
        };
        this.getY = function () {
            return y;
        };
        this.getWidth = function () {
            return w;
        };
        this.getHeight = function () {
            return h;
        };
        this.toJSON = function () {
            return {id: id, x: x, y: y, w: w, h: h, timestamp: timestamp, radius: radius};
        };
        this.getTimestamp = function () {
            return timestamp;
        };

    }

    return Bomb;

}();
