/**
 * Created by dashyki on 15.04.14.
 */

function Block (block) {
    this.x = block.x || 0;
    this.y = block.y || 0;
    this.w = block.w || 40;
    this.h = block.h || 40;
    console.log("here I am");
};

Block.prototype.getWidth = function() {
    return this.w;
};

Block.prototype.getHeight = function() {
    return this.h;
};

Block.prototype.getX = function() {
    return this.x;
};

Block.prototype.getY = function() {
    return this.y;
};