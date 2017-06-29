const electron = require( 'electron' );
const ipcRenderer = electron.ipcRenderer;
const shell = electron.shell;

const inherits = require( 'util' ).inherits;
const EE = require( 'events' ).EventEmitter;
const Promise = require("bluebird");


const App = function () {
    const self = this;
    if ( !( this instanceof App ) ) {
        return new App();
    }
    EE.call( this );

    let timeoutInterval,
        settings,
        cache;

    // bind events' handler
    // ----------------------------------------------
    // ----------------------------------------------

    // init
    settings = ipcRenderer.sendSync( 'load-settings' );
    cache = ipcRenderer.sendSync( 'load-cache' );

    timeoutInterval = settings.timeout.second
        + settings.timeout.minute * 60
        + settings.timeout.hour * 60 * 60;

    localStorage.setItem( 'catalogue', JSON.stringify( cache['catalogue'] || {} ) );
    localStorage.setItem( 'bangumi', JSON.stringify( cache['bangumi'] || {} ) );

    // APIs
    // APIs include types below:
    // * relate to setting
    // * relate to cache
    // ----------------------------------------------

    // setting related APIs
    // ----------------------------------------------
    self.settings = {};
    self.settings.load = function () {
        return settings;
    };
    self.settings.save = function ( obj ) {
        // update timeoutInternel
        timeoutInterval = obj.timeout.second
            + obj.timeout.minute * 60
            + obj.timeout.hour * 60 * 60;
        ipcRenderer.send( 'save-settings', obj );
    };
    // ----------------------------------------------

    // cache related APIs
    // ----------------------------------------------
    self.cache = {};
    self.cache.save = function () {
        ipcRenderer.send( 'save-cache', {
            catalogue: JSON.parse( localStorage.getItem( 'catalogue' ) ),
            bangumi: JSON.parse( localStorage.getItem( 'bangumi' ) )
        });
    };
    self.cache.load = function ( key ) {
        return JSON.parse( localStorage.getItem( key ) ) || {};
    };
    // ----------------------------------------------


    // miscellaneous APIs
    // ----------------------------------------------
    self.openUrl = function ( url ) {
        shell.openExternal( url );
    };

    self.openDevTools = function () {
        ipcRenderer.sendSync( 'open-dev' );
    };
    // ----------------------------------------------

    // control APIs
    // ----------------------------------------------
    self.quit = function () {
        ipcRenderer.sendSync( 'app-quit' );
    };

    self.minimize = function () {
        ipcRenderer.sendSync( 'app-minimize' );
    };
    // ----------------------------------------------
};
inherits( App, EE );

module.exports = window.App = App();