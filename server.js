/**
 * Created by coockoo on 4/15/14.
 */

(function () {
    var express = require('express');
    var Router = require('./routers/router');

    var app = express();
    var router = new Router();

    app.set('views', './templates');
    app.set('view engine', 'ejs');

    app.use(express.static(__dirname + '/public'));

    app.get('/', router.showRoot);

    //TODO: config file
    app.listen(8080);
    console.log('Server started on localhost:8080');
})();
