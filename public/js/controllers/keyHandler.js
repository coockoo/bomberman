/**
 * Created by coockoo on 4/17/14.
 */

function KeyHandler () {
    this.KEY_CODES = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    this.KEY_STATUS = {};
    for (var code in this.KEY_CODES) {
        if (this.KEY_CODES.hasOwnProperty(code)) {
            this.KEY_STATUS[this.KEY_CODES[ code ]] = false;
        }
    }
    document.onkeydown = function (e) {
        var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
        if (this.KEY_CODES[keyCode]) {
            e.preventDefault();
            this.KEY_STATUS[this.KEY_CODES[keyCode]] = true;
        }
    }.bind(this);
    document.onkeyup = function (e) {
        var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
        if (this.KEY_CODES[keyCode]) {
            e.preventDefault();
            this.KEY_STATUS[this.KEY_CODES[keyCode]] = false;
        }
    }.bind(this);
}
KeyHandler.prototype.getCurrentAction = function () {
    var result = "";
    for (var action in this.KEY_STATUS) {
        if (this.KEY_STATUS.hasOwnProperty(action)) {
            if (this.KEY_STATUS[action] == true) {
                result += action.slice(0,1);
            }
        }
    }
    return result;
};
