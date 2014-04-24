/**
 * Created by coockoo on 4/15/14.
 */

(function () {

    var Block = require('./block');

    function Field (field) {

        this.w = field.w || 0;
        this.h = field.h || 0;
        this.blocks = [];

        if (field.blocks) {
            for (var i = 0; i < field.blocks.length; ++i) {
                this.blocks.push(new Block(field.blocks[i]));
            }
        }
    }
    Field.prototype.getBlocks = function () {
        return this.blocks;
    };

    module.exports = Field;
})();
