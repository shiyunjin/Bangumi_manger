module.exports = [ '$scope', 'settingsService',
    function ( $scope, settingsService ) {
        var vm = this;
        var packageJson = require( '../../../package.json' );
        $scope.author=packageJson.author;
        $scope.version=packageJson.version;

        vm.items = settingsService.loadSettings();

        vm.save = function () {
            settingsService.saveSettings( vm.items );
        };

        $scope.systemsettings = [
          { name: '随着系统启动', item: 'startup' },
          { name: '启动后置于托盘', item: 'startup-small' },
          { name: '最小化到托盘', item: 'small-down' }
        ];
    }
]
