/**
 * Created by coockoo on 4/15/14.
 */


(function ($) {
    $('document').ready(function () {
        //so BADASS
        console.log('console.log();');

        var socket = io.connect();
        socket.on('init', function (data) {
            console.log(data);
        });
    });

})(jQuery);
