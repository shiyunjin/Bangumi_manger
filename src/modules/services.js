var radioit = require( './main' );

radioit.service( 'appService',
    [ '$window',
    function ( $window ) {
        this.quit = function () {
            $window.App.quit();
        };

        this.minimize = function () {
            $window.App.minimize();
        };
    }]
);
