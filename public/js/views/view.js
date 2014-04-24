var View = function() {
    this.fieldView = null;
    this.playerViews = [];
    this.imageRepository = new ImageRepository();
};

View.prototype.init = function (params) {


    this.imageRepository.load({
        success: function () {

            this.w = params.field.getWidth();
            this.h = params.field.getHeight();

            var $html = $('<canvas width=":w" height=":h" id="background">Your browser does not support canvas.</canvas>'
                .replace(":w", this.w)
                .replace(":h", this.h)
            );

            $(".container").append($html);

            var ctx = $html[0].getContext('2d');
            ctx.strokeRect(0,0, this.w, this.h);

            ctx.fillStyle = ctx.createPattern(this.imageRepository.getImageById('background'), 'repeat');
            ctx.fillRect(0,0,this.w, this.h);

            this.fieldView = new FieldView(this.imageRepository, params.field);


            params.success && params.success();


        }.bind(this)
    });


    //TODO: image load progressbar

};
View.prototype.addPlayer = function (player) {
    this.playerViews.push(new PlayerView({
        player: player,
        w: this.w,
        h: this.h
    }));
};
View.prototype.removePlayer = function (player) {
    for (var i = 0; i < this.playerViews.length; ++i) {
        if (this.playerViews[i].getId() == player.getId()) {
            this.playerViews[i].remove();
            this.playerViews.splice(i,1);
            break;
        }
    }
};
View.prototype.updatePlayer = function (player) {
    for (var i = 0; i < this.playerViews.length; ++i) {
        if (player.getId() == this.playerViews[i].getId()) {
            this.playerViews[i].update(player);
            break;
        }
    }
};
View.prototype.addBomb = function (bomb) {
    this.fieldView.addBomb(bomb);
};
View.prototype.explodeBomb = function (bomb) {
    this.fieldView.explodeBomb(bomb);
};

