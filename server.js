/**
 * Created by coockoo on 4/15/14.
 */

(function () {
    var express = require('express');

    var app = express();

    app.set('views', './templates');
    app.set('view engine', 'ejs');

    app.get('/', function (req, res) {
        res.render('index', {

        });
    });

    //TODO: config file
    app.listen(8080);
    console.log('Server started on localhost:8080');
})();
