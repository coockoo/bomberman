/**
 * Created by dashyki on 16.04.14.
 */
var PlayerView = function(imageRepository, params) {
    this.imageRepository = imageRepository;
    this.player = params.player;
    this.w = params.w;
    this.h = params.h;
    this.draw();
};
(function () {
    function drawPlayer (ctx, player) {
        ctx.beginPath();
        ctx.drawImage(this.imageRepository.getImageById('player'), player.getX(), player.getY(), player.getWidth(), player.getHeight());
        ctx.closePath();
    }

    PlayerView.prototype.getId = function() {
        return this.player.getId();
    };
    PlayerView.prototype.draw = function() {
        this.$html = $('<canvas width=":w" height=":h" id=":id">Your browser does not support canvas.</canvas>'
            .replace(":w", this.w)
            .replace(":h", this.h)
            .replace(":id", this.player.getId())
        );
        $(".container").append(this.$html);
        this.ctx = this.$html[0].getContext('2d');

        drawPlayer.call(this, this.ctx, this.player);
    };
    PlayerView.prototype.update = function (player) {
        this.ctx.clearRect(0,0,this.w,this.h);

        drawPlayer.call(this, this.ctx, player);
    };
    PlayerView.prototype.remove = function () {
        this.$html.remove();
    };

})();
