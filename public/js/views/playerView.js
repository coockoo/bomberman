/**
 * Created by dashyki on 16.04.14.
 */
var PlayerView = function(params) {
    this.id = params.player.getId();
    this.w = params.w;
    this.h = params.h;
    this.draw();
}

PlayerView.prototype.draw = function() {
    var html = '<canvas width=":w" height=":h" id=":id">Your browser does not support canvas.</canvas>'
        .replace(":w", this.w)
        .replace(":h", this.h)
        .replace(":id", this.id);
    $("body").append(html);
    this.ctx = document.getElementById("field").getContext("2d");
}

