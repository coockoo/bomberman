/**
 * Created by dashyki on 16.04.14.
 */
var FieldView = function(field) {
    this.field = field;
    this.draw();
}

FieldView.prototype.draw = function() {
    var html = '<canvas width=":w" height=":h" id="field">Your browser does not support canvas.</canvas>'
        .replace(":w", this.field.getWidth())
        .replace(":h", this.field.getHeight());
    $("body").append(html);
    this.ctx = document.getElementById("field").getContext("2d");
    //TODO draw field

}