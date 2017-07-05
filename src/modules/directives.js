var radioit = require( './main' );


radioit.directive( 'closeButton',
    [ 'appService','settingsService',
    function ( app , settings ) {
        return function ( scope, el ) {
            el.on( 'click', function () {
                setting = settings.loadSettings();
                if(setting.system['small-quit']){
                  app.quit();
                }else{
                  app.hide();
                }
            });
        }
    }]
)

.directive( 'minimizeButton',
    [ 'appService','settingsService',
    function ( app , settings ) {
        return function ( scope, el ) {
            el.on( 'click', function () {
                setting = settings.loadSettings();
                if(setting.system['small-down']){
                  app.hide();
                }else{
                  app.minimize();
                }
            });
        }
    }]
)
;
