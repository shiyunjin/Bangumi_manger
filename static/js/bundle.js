(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "bangumi_manger",
  "version": "1.0.0",
  "description": "A Bangumi Manger",
  "main": "main.js",
  "scripts": {
    "clean:test": "rimraf test",
    "clean:dist": "rimraf dist",
    "build:css": "stylus -u nib src/css/app.styl -o static/css/app.css",
    "build:js": "browserify src/modules/entry.js -o static/js/bundle.js",
    "release:css": "stylus -u nib src/css/app.styl -o static/css/app.css -c",
    "release:js": "browserify src/modules/entry.js | uglifyjs > static/js/bundle.js",
    "watch:css": "stylus -u nib src/css/app.styl -o static/css/app.css -w",
    "watch:js": "watchify src/modules/entry.js -o static/js/bundle.js",
    "test": "electron --debug main.js --development",
    "test:js": "parallelshell \"npm run watch:js\" \"npm run test\"",
    "start": "npm run build:js && npm run build:css && electron main.js --enable-logging 2>&1 | silence-chromium",
    "asar": "asar ./ BangumiManger.asar",
    "package": "electron-packager . BangumiManger --platform=win32,darwin,linux --arch=all --electron-version=1.4.13 --icon=static/image/app.ico --overwrite --out=dist/ --ignore=./src --ignore=.git --ignore=dist --asar=true"
  },
  "repository": {
    "type": "git",
    "url": "https://git.oschina.net/swapteam/bangumi_manger.git"
  },
  "keywords": [
    "bangumi",
    "manger"
  ],
  "author": "ShiYunJin",
  "license": "MIT",
  "dependencies": {
    "auto-launch": "^5.0.1",
    "bluebird": "^2.9.25",
    "cheerio": "^0.19.0",
    "deepcopy": "^0.5.0",
    "extend": "^2.0.1",
    "superagent": "^1.2.0",
    "superagent-bluebird-promise": "^2.0.2",
    "superagent-proxy": "^0.3.2"
  },
  "devDependencies": {
    "babel": "^6.23.0",
    "babel-plugin-transform-es2015-spread": "^6.22.0",
    "babel-plugin-transform-object-rest-spread": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babelify": "^7.3.0",
    "browserify": "^14.4.0",
    "electron-packager": "^8.7.2",
    "electron-reload": "^1.2.1",
    "electron-prebuilt": "latest",
    "asar": "latest",
    "jshint": "latest",
    "mkdirp": "latest",
    "nib": "latest",
    "parallelshell": "latest",
    "rimraf": "latest",
    "silence-chromium": "latest",
    "stylus": "latest",
    "uglifyjs": "latest",
    "watchify": "^3.9.0",
    "bower": "latest"
  }
}

},{}],2:[function(require,module,exports){
var radioit = require( './main' );

radioit.controller( 'AppCtrl',
    [ '$scope', '$window', '$mdDialog',
    function ( $scope, $window, $mdDialog) {
        var vm = this;

        vm.selectedTabName = 'home';

        vm.selectTab = function ( tabName ) {
            vm.selectedTabName = tabName;
        };

        vm.openUrl = function ( url ) {
            $window.App.openUrl( url );
        };

        vm.openDevTools = function () {
            $window.App.openDevTools();
        };
    }]
)
;

},{"./main":5}],3:[function(require,module,exports){
var radioit = require( './main' );


radioit.directive( 'closeButton',
    [ 'appService',
    function ( app ) {
        return function ( scope, el ) {
            el.on( 'click', function () {
                app.quit();
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

},{"./main":5}],4:[function(require,module,exports){
require( './main' )
},{"./main":5}],5:[function(require,module,exports){
module.exports = angular.module( 'bangumi', [
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'angularLazyImg',
    require( './settings' ).name
    ])

.config( function ( $stateProvider ) {
    $stateProvider
        .state( 'index', {
            url: '/',
            templateUrl: 'static/view/default.html'
        });
})

.config( function( $logProvider ) {
    $logProvider.debugEnabled( true );
})

.run( function ( $rootScope, $mdToast ) {
    // notification
    $rootScope.$on( 'notify', function ( e, text, hideDelay ) {
        text = text || '';
        hideDelay = hideDelay || 0;
        $mdToast.show(
            $mdToast.simple()
                .content( text )
                .position( 'bottom left' )
                .hideDelay( hideDelay )
        );
    });
})
;

require( './services' );
require( './controllers' );
require( './directives' );

},{"./controllers":2,"./directives":3,"./services":6,"./settings":7}],6:[function(require,module,exports){
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

        this.hide = function () {
            $window.App.hide();
        };
    }]
);

},{"./main":5}],7:[function(require,module,exports){
module.exports = angular.module( 'radioit.settings', [] )

.service( 'settingsService', require( './settingsService' ) )

.controller( 'SettingsCtrl', require( './settingsCtrl' ) )
},{"./settingsCtrl":8,"./settingsService":9}],8:[function(require,module,exports){
module.exports = [ '$scope', 'settingsService', '$window',
    function ( $scope, settingsService, $window ) {
        var vm = this;
        var packageJson = require( '../../../package.json' );
        $scope.author=packageJson.author;
        $scope.version=packageJson.version;

        vm.items = settingsService.loadSettings();

        vm.save = function () {
            settingsService.saveSettings( vm.items );
            if(vm.items.system['startup']){
              $window.App.startup.install();
            }else{
              $window.App.startup.uninstall();
            }
        };

        $scope.systemsettings = [
          { name: '随着系统启动', item: 'startup' },
          { name: '启动后置于托盘', item: 'startup-small' },
          { name: '最小化到托盘', item: 'small-down' }
        ];
    }
]

},{"../../../package.json":1}],9:[function(require,module,exports){
module.exports = [ '$window',
    function ( $window ) {
        this.loadSettings = function () {
            return $window.App.settings.load();
        };

        this.saveSettings = function ( settings ) {
            $window.App.settings.save( settings );
        }
    }
]
},{}]},{},[4]);
