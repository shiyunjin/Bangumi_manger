var radioit = require( './main' );

radioit.controller( 'AppCtrl',
    [ '$scope', '$window', '$mdDialog',
    function ( $scope, $window, $mdDialog) {
        var vm = this;

        vm.selectedTabName = 'weikan';

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
