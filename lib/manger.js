const electron = require( 'electron' );
const ipcMain = electron.ipcMain;

const settings = require( './settings.js' );
const cache = require( './cache.js' );

const Manger = ( function () {
    const Manger = function () {
        this.registerListeners();
    };

    // Singleton
    Manger.boot = function () {
        if ( !!Manger.INSTANCE ) {
            throw new Error( 'only allow one instance running at the same time');
        }
        Manger.INSTANCE = new Manger();
    };

    Manger.prototype.registerListeners = function () {
        // setting
        ipcMain.on( 'load-settings', function ( event, arg ) {
            event.returnValue = settings.load();
        });
        ipcMain.on( 'save-settings', function ( event, arg ) {
            settings.save( arg );
        });

        // cache
        ipcMain.on( 'load-cache', function ( event, arg ) {
            event.returnValue = cache.load();
        });
        ipcMain.on( 'save-cache', function ( event, arg ) {
            cache.save( arg );
        });
    };

    return Manger;
})();

module.exports = Manger;
