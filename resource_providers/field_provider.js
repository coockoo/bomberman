/**
 * Created by coockoo on 4/18/14.
 */

(function () {

    var Field = require('../models/field');

    function FieldProvider () {
        this.config = require('../config/fields.json');
    }
    FieldProvider.prototype.getField = function (name) {
        return new Field(this.config['fields'][name]);
    };

    module.exports = FieldProvider;
})();
