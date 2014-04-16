/**
 * Created by coockoo on 4/15/14.
 */

(function ($) {
    $('document').ready(function () {
        //so BADASS
        console.log('console.log();');

        var router = new Router();

        var socket = io.connect();

        socket.on('init', router.init.bind(router));
        socket.on('add player', router.addPlayer.bind(router));
        socket.on('action', router.makePlayerAction.bind(router));
    });

})(jQuery);
