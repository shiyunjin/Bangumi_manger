module.exports = [ '$scope', 'settingsService', '$window',
    function ( $scope, settingsService, $window ) {
        var vm = this;
        var packageJson = require( '../../../package.json' );
        $scope.author=packageJson.author;
        $scope.version=packageJson.version;

        ipcRenderer = $window.App.ipcRenderer;

        vm.items = settingsService.loadSettings();

        $scope.fooder = vm.items.fooder;

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
          { name: '最小化到托盘', item: 'small-down' },
          { name: '关闭按钮退出程序', item: 'small-quit' }
        ];

        vm.openweb = function () {
            $window.App.openUrl('http://www.shiyunjin.cn/');
        };

        vm.setweikan = function () {
            $window.App.openfooder('weikan');
        };

        vm.setkanwan = function () {
            $window.App.openfooder('kanwan');
        };

        ipcRenderer.on('selected-directory',function (event, name, path) {
            $scope.fooder[name] = path[0];
            vm.items.fooder = $scope.fooder;
            vm.save();
            $scope.$apply();
        });
    }
]
