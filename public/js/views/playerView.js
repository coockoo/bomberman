/**
 * Created by dashyki on 16.04.14.
 */
var PlayerView = function(params) {
    this.player = params.player;
    this.w = params.w;
    this.h = params.h;
    this.draw();
};
(function () {
    function drawPlayer (ctx, player) {
        ctx.beginPath();
        ctx.fillStyle = '#8ED6FF';
        ctx.rect(player.getX(), player.getY(), player.getWidth(), player.getHeight());
        ctx.fill();
        ctx.closePath();
    }

    PlayerView.prototype.getId = function() {
        return this.player.getId();
    };
    PlayerView.prototype.draw = function() {
        var $html = $('<canvas width=":w" height=":h" id=":id">Your browser does not support canvas.</canvas>'
            .replace(":w", this.w)
            .replace(":h", this.h)
            .replace(":id", this.player.getId())
        );
        $(".container").append($html);
        this.ctx = $html[0].getContext('2d');

        drawPlayer(this.ctx, this.player);
    };
    PlayerView.prototype.update = function (player) {
        this.ctx.clearRect(0,0,this.w,this.h);

        drawPlayer(this.ctx, player);
    }

})();
