/**
 * Created by coockoo on 4/15/14.
 */

function Block (block) {
    this.x = block.x || 0;
    this.y = block.y || 0;
    this.w = block.w || 40;
    this.h = block.h || 40;
}
//TODO: getters/setters

module.exports = Block;
