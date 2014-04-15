/**
 * Created by coockoo on 4/15/14.
 */

function Field (field) {
    this.w = field.w || 0;
    this.h = field.h || 0;
    this.blocks = field.blocks || [];
}

module.exports = Field;
//TODO: get/set
