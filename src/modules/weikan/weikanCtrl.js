module.exports = [ '$scope', 'weikanService', '$window', 'settingsService', 'ListService', '$mdBottomSheet', '$mdToast', '$mdPanel',
    function ( $scope, weikanService, $window, settingsService, ListService, $mdBottomSheet, $mdToast, $mdPanel ) {
        var vm = this;

        vm.settings = settingsService.loadSettings();

        $scope.timelist = [
          {'id':0,'title':'5 分钟','number':'5','bei':'60'},
          {'id':1,'title':'10 分钟','number':'10','bei':'60'},
          {'id':2,'title':'30 分钟','number':'30','bei':'60'}
        ];

        var timeClock = null;

        $scope.weikan_file_list = [];
        $scope.weikan_video_list = [];
        $scope.weikan_list = [];
        $scope.weikan_list_menu = [];
        $scope.weikan_list_content = {};
        $scope.weikan_count = 0;

        $scope.liststyle = {
            'width': '100%',
            'height': '581px'
        };
        $scope.loading = true;

        vm.flushdir = function () {
            $scope.loading = true;

            var block_test_list={};

            $scope.weikan_file_list = [];
            $scope.weikan_video_list = [];
            $scope.weikan_list = [];
            $scope.weikan_list_menu = [];
            $scope.weikan_list_content = {};
            $scope.weikan_count = 0;

            if(vm.settings.fooder.weikan){
              $window.App.fs.readdir(vm.settings.fooder.weikan,function (err, files) {
                $scope.weikan_file_list=files;
                if($scope.weikan_file_list.length){
                  $scope.weikan_file_list.forEach(function (key) {
                    var ext=key.substring(key.lastIndexOf('.') + 1).toLowerCase();
                    if(ext=='mp4'){
                      $scope.weikan_video_list.push(key);
                    }
                  });
                  $scope.weikan_video_list.forEach(function (key) {
                    switch(key.substr(0,1)) {
                      case '[':
                        ListService.getfang(key,block_test_list,function (obj) {
                          $scope.weikan_list.push(obj);
                          var lowname = obj.name.toLowerCase();
                          if(typeof($scope.weikan_list_content[lowname])=="undefined"){
                            $scope.weikan_list_menu.push(obj.name);
                            $scope.weikan_list_content[lowname]=[];
                          }
                          $scope.weikan_list_content[lowname].push(obj);
                          $scope.weikan_count++;
                        });
                      break;
                      case '【':
                        ListService.getfang(key,block_test_list,function (obj) {
                          $scope.weikan_list.push(obj);
                          var lowname = obj.name.toLowerCase();
                          if(typeof($scope.weikan_list_content[lowname])=="undefined"){
                            $scope.weikan_list_menu.push(obj.name);
                            $scope.weikan_list_content[lowname]=[];
                          }
                          $scope.weikan_list_content[lowname].push(obj);
                          $scope.weikan_count++;
                        });
                      break;
                      default:

                      break;
                    }
                  });
                  $scope.loading = false;
                  $scope.$apply();
                }
              });
            };
        };

        vm.settime = function (id) {
          vm.settings.weikan.flushtime = id;
          settingsService.saveSettings( vm.settings );
          clearTimeout(timeClock);
          $scope.load();
        };

        $scope.load = function () {
          vm.flushdir();
          timeClock = setInterval( function () {
            vm.flushdir();
            $scope.$apply();
          }, 1000 * $scope.timelist[vm.settings.weikan.flushtime].number * $scope.timelist[vm.settings.weikan.flushtime].bei);
        };

        $scope.showGridBottomSheet = function(name) {
          $scope.alert = '';
          var lowname = name.toLowerCase();
          $mdBottomSheet.show({
            templateUrl: 'static/view/play-grid.html',
            controller: 'GridPlayCtrl',
            clickOutsideToClose: false,
            locals: {
              list: $scope.weikan_list_content[lowname]
            }
          }).then(function(clickedItem) {
            var position = $mdPanel.newPanelPosition()
                .absolute()
                .center();

            var config = {
              controller: 'playPanelCtrl-weikan',
              controllerAs: 'ctrl',
              disableParentScroll: false,
              templateUrl: 'static/view/play-panel.html',
              hasBackdrop: true,
              panelClass: 'play-dialog',
              position: position,
              locals: {
                list:clickedItem
              },
              trapFocus: true,
              zIndex: 150,
              clickOutsideToClose: false,
              escapeToClose: true,
              focusOnOpen: true
            };
            $mdPanel.open(config);
          }).catch(function(error) {
            // User clicked outside or hit escape
          });
        };
    }
];
