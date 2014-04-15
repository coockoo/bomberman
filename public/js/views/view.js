var View = function() {
    this.fieldView = null;
    this.playerViews = [];
}

View.prototype.init = function (params) {
    this.fieldView = new FieldView(params.field);
    for (var player in params.players) {
        this.playerViews.push(new PlayerView({
            player : player,
            w : params.field.getWidth(),
            h : params.field.getHeight()
        }));
    }
}

