module.exports = angular.module( 'bangumi', [
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'angularLazyImg',
    require( './settings' ).name,
    require( './weikan' ).name
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
