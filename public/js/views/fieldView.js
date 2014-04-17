/**
 * Created by dashyki on 16.04.14.
 */

var FieldView = function(field) {
    this.field = field;

    this.draw();
};

(function () {

    function drawBlocks (ctx, blocks) {
        for (var i = 0; i < blocks.length; ++i) {
            ctx.rect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h);
            ctx.stroke();
        }
    }

    FieldView.prototype.draw = function() {
        console.log(this.field);
        var $html = $('<canvas width=":w" height=":h" id="field">Your browser does not support canvas.</canvas>'
            .replace(":w", this.field.getWidth())
            .replace(":h", this.field.getHeight())
        );
        $(".container").append($html);
        this.ctx = $html[0].getContext('2d');
        this.ctx.rect(0,0, this.field.getWidth(), this.field.getHeight());

        drawBlocks(this.ctx, this.field.getBlocks());

    };

})();

