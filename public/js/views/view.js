var View = function() {
    this.fieldView = null;
    this.playerViews = [];
};

View.prototype.init = function (params) {
    this.fieldView = new FieldView(params.field);
    for (var i = 0; i < params.players.length; ++i) {
        this.playerViews.push(new PlayerView({
            player : params.players[i],
            w : params.field.getWidth(),
            h : params.field.getHeight()
        }));
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

