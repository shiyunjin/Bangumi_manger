const extend = require( 'extend' );
const env = require( './env.js' );
const Storage = require( './storage.js' );

const settingStorage = new Storage( env.settingsPath );

/**
 * Setting
 *   timout
 *     hour
 *     minute
 *     second
 *   language
 *   about
 *     author
 *     email
 *     githubAccount
 *     version
 *     codename
 */

const Default = {
    'system': {
        'startup': false,
        'startup-small': false,
        'small-down': false
    },
    'fooder':{
        'weikan': null,
        'kanwan': null
    }
};


// init
settingStorage.restore( extend( true, {}, Default, settingStorage.getItems() ) );
settingStorage.save();

const SettingManager = {
    save: function ( data ) {
        delete data.about;
        settingStorage.restore( data );
        settingStorage.save();
    },

    load: function () {
        return settingStorage.getItems();
    }
};

module.exports = SettingManager;
