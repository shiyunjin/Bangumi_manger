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

        vm.openweb = function () {
            $window.App.openUrl('http://www.shiyunjin.cn/');
        };
    }
]
