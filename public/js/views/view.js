var View = function() {
    this.fieldView = null;
    this.playerViews = [];
};

View.prototype.init = function (params) {

    this.fieldView = new FieldView(params.field);

    this.w = params.field.getWidth();
    this.h = params.field.getHeight();

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

