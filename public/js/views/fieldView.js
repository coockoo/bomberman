/**
 * Created by dashyki on 16.04.14.
 */


var FieldView =
(function () {

    var FieldView = function(imageRepository, field) {

        var imageRepo = imageRepository;

        this.field = field;

        function drawBlocks (ctx, blocks) {
            ctx.beginPath();
            for (var i = 0; i < blocks.length; ++i) {
                ctx.drawImage(imageRepository.getImageById('block_breakable'), blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h);
            }
            ctx.closePath();
        }

        this.draw = function() {
            var $html = $('<canvas width=":w" height=":h" id="field">Your browser does not support canvas.</canvas>'
                .replace(":w", this.field.getWidth())
                .replace(":h", this.field.getHeight())
            );
            $(".container").append($html);
            this.ctx = $html[0].getContext('2d');
            this.ctx.strokeRect(0,0, this.field.getWidth(), this.field.getHeight());

            var pattern = this.ctx.createPattern(imageRepository.getImageById('background'), 'repeat');
            this.ctx.rect(0,0,this.field.getWidth(), this.field.getHeight());
            this.ctx.fillStyle = pattern;
            this.ctx.fill();

            drawBlocks(this.ctx, this.field.getBlocks());
        };

        this.draw();
    };


    return FieldView;

})();

