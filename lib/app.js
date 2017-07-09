const electron = require( 'electron' );
const ipcRenderer = electron.ipcRenderer;
const shell = electron.shell;
const $ = require('jquery');

const inherits = require( 'util' ).inherits;
const EE = require( 'events' ).EventEmitter;
const Promise = require("bluebird");
const startup = require('./startup');
const fs = require( 'fs' );

const App = function () {
    const self = this;
    if ( !( this instanceof App ) ) {
        return new App();
    }
    EE.call( this );

    let settings,
        cache;

    // bind events' handler
    // ----------------------------------------------
    // ----------------------------------------------

    // init
    settings = ipcRenderer.sendSync( 'load-settings' );
    cache = ipcRenderer.sendSync( 'load-cache' );

    self.ipcRenderer = ipcRenderer;
    self.fs = fs;

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

    self.openfile = function (fullpath) {
      return shell.openItem(fullpath);
    }

    self.moveItemToTrash = function (fullpath) {
      return shell.moveItemToTrash(fullpath);
    }
    // ----------------------------------------------

    // control APIs
    // ----------------------------------------------
    self.quit = function () {
        ipcRenderer.sendSync( 'app-quit' );
    };

    self.minimize = function () {
        ipcRenderer.sendSync( 'app-minimize' );
    };

    self.hide = function () {
        ipcRenderer.sendSync( 'app-hide' );
    };

    self.show = function () {
        ipcRenderer.sendSync( 'app-show' );
    };

    self.startup = {};

    self.startup.install = function () {
      startup.install();
    };

    self.startup.uninstall = function () {
      startup.uninstall();
    };

    self.openfooder = function (name) {
      ipcRenderer.send('open-directory-dialog',name);
    }

    // ----------------------------------------------

    if(!settings.system['startup-small']){
      ipcRenderer.sendSync( 'app-show' );
    }
};
inherits( App, EE );
window.$ = $;
module.exports = window.App = App();
