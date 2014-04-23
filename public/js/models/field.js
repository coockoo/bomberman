/**
 * Created by dashyki on 15.04.14.
 */

function Field (field) {
    this.w = field.w || 0;
    this.h = field.h || 0;
    this.blocks = [];
    //this.blocks = field.blocks || [];
    if (field.blocks) {
        for (var i = 0; i < field.blocks.length; ++i) {
            this.blocks.push(new Block(field.blocks[i]));
        }
    } else {
        this.blocks = [];
    }
}
Field.prototype.getWidth = function () {
    return this.w;
};
Field.prototype.getHeight = function () {
    return this.h;
};
Field.prototype.getBlocks = function () {
    return this.blocks;
};
