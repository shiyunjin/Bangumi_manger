module.exports = [ '$scope', 'weikanService', '$window', 'settingsService',
    function ( $scope, weikanService, $window, settingsService ) {
        var vm = this;

        vm.settings = settingsService.loadSettings();

        $scope.weikan_file_list = [];
        $scope.weikan_video_list = [];
        $scope.weikan_list = [];
        $scope.weikan_list_menu = [];
        $scope.weikan_list_content = {};
        $scope.weikan_count = 0;

        vm.flushdir = function () {
            var block_test_list={};
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
                        weikanService.getfang(key,block_test_list,function (obj) {
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

                      break;
                      default:

                      break;
                    }
                  });
                }
              });
            };
        };
        vm.flushdir();
    }
];
