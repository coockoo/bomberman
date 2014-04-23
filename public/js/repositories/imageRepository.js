/**
 * Created by coockoo on 4/22/14.
 */

var ImageRepository = (function () {

    function Repository () {

        this.load = function (params) {
            //TODO: move hard code to config file
            var loaded = 0;
            var total = 1;
            this.images = {};

            this.images['block_breakable'] = new Image();
            this.images['block_breakable'].src = 'images/block_breakable.png';
            this.images['block_breakable'].onload = onLoad;

            function onLoad () {
                ++loaded;
                if (loaded == total) {
                    params.success && params.success();
                }
            }
        };

        this.getImageById = function (id) {
            return this.images[id];

        };
    }

    return Repository;

})();
