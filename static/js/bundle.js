(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./main":4}],2:[function(require,module,exports){
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
    [ 'appService',
    function ( app ) {
        return function ( scope, el ) {
            el.on( 'click', function () {
                app.minimize();
            });
        }
    }]
)
;
},{"./main":4}],3:[function(require,module,exports){
require( './main' )
},{"./main":4}],4:[function(require,module,exports){
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

},{"./controllers":1,"./directives":2,"./services":5,"./settings":6}],5:[function(require,module,exports){
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

},{"./main":4}],6:[function(require,module,exports){
module.exports = angular.module( 'radioit.settings', [] )

.service( 'settingsService', require( './settingsService' ) )

.controller( 'SettingsCtrl', require( './settingsCtrl' ) )
},{"./settingsCtrl":7,"./settingsService":8}],7:[function(require,module,exports){
module.exports = [ '$scope', '$translate', 'settingsService',
    function ( $scope, $translate, settingsService ) {
        var vm = this;

        vm.items = settingsService.loadSettings();

        vm.changeLanguage = function () {
            $translate.use( vm.items.language );
        };

        vm.save = function () {
            settingsService.saveSettings( vm.items );
        }
    }
]
},{}],8:[function(require,module,exports){
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
},{}]},{},[3]);
