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
    "jquery": "^3.2.1",
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
    [ 'appService','settingsService',
    function ( app , settings ) {
        return function ( scope, el ) {
            el.on( 'click', function () {
                setting = settings.loadSettings();
                if(setting.system['small-quit']){
                  app.quit();
                }else{
                  app.hide();
                }
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

},{"./controllers":2,"./directives":3,"./services":6,"./settings":7,"./weikan":10}],6:[function(require,module,exports){
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
module.exports = angular.module( 'bangumi.settings', [] )

.service( 'settingsService', require( './settingsService' ) )

.controller( 'SettingsCtrl', require( './settingsCtrl' ) )

},{"./settingsCtrl":8,"./settingsService":9}],8:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
module.exports = angular.module( 'bangumi.weikan', [] )

.service( 'weikanService', require( './weikanService' ) )

.controller( 'weikanCtrl', require( './weikanCtrl' ) )

},{"./weikanCtrl":11,"./weikanService":12}],11:[function(require,module,exports){
module.exports = [ '$scope', 'weikanService', '$window', 'settingsService',
    function ( $scope, weikanService, $window, settingsService ) {
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
        }
    }
];

},{}],12:[function(require,module,exports){
module.exports = [ '$window',
    function ( $window ) {
        this.getfang = function ( key , block_test_list, callback ) {
            var reg = /(?:\[)[^\[\]]*(?:\])/g;
            var nokreg= /((?:\])[^\[\]]{1,}(?:\[)|(?:\])[^\[\.]{1,}(?:\.))/g;
            var res = key.match(reg);
            var info = {};
            info['file']=key;
            var nowlenght = ylenght = res.length;
            //console.info(res);
            res.forEach(function (item) {
              item_upper = fldel(item).toUpperCase();
              nowlenght--;
              switch (item_upper) {
                case '720P':
                  info['clarity']='720P';
                break;
                case '1080P':
                  info['clarity']='1080P';
                break;
                case '480P':
                  info['clarity']='480P';
                break;
                case 'GB':
                  info['language']='简体';
                break;
                case 'CHS':
                  info['language']='简体';
                break;
                case 'CHT':
                  info['language']='繁体';
                break;
                case 'GB_MP4':
                  info['language']='简体';
                break;
                case '简体':
                  info['language']='简体';
                break;
                case '简日':
                  info['language']='简日';
                break;
                case 'GB_JP':
                  info['language']='简日';
                break;
                case 'BIG5':
                  info['language']='繁体';
                break;
                case '1280X720':
                  info['clarity']='720P';
                break;
                case '1920X1080':
                  info['clarity']='1080P';
                break;
                case '848X480':
                  info['clarity']='480P';
                break;
                case 'OVA':
                  info['ova']=true;
                break;
                case 'SP':
                  info['sp']=true;
                break;
                case 'JP_SC':
                  info['language']='简日';
                break;
                case '简日双语字幕':
                  info['language']='简日';
                break;
                case 'JP_TC':
                  info['language']='繁日';
                break;
                case '繁日双语字幕':
                  info['language']='繁日';
                break;
                case 'END':

                break;
                case 'PREV':

                break;
                case 'HARDSUB':

                break;
                case '日语版':

                break;
                default:
                  if(item_upper.indexOf('AAC')>=0 || item_upper.indexOf('X264')>=0 || (item_upper.indexOf('第')>=0 && (item_upper.indexOf('季')>=0))|| item_upper.indexOf('HDRIP')>=0)
                    nowlenght--;
                  else if(!info['number']){
                    var temp=item_upper.toLowerCase().match(/(?![0-9a-zA-Z ]*\.)(?![0-9a-zA-Z ]*p)(?![0-9a-zA-Z ]*P)(?![0-9a-zA-Z ]*X)(?![0-9a-zA-Z ]*x)[0-9a-zA-Z ]*[^\s]/);
                    if(temp && typeof(temp[0])!=undefined && !isNaN(temp[0])){
                      info['number']=temp[0];
                    }
                  }
                  nowlenght++;
                break;
              }
            });
            if(nowlenght<=2){
              var tempname=info['file'].match(nokreg);
              if(tempname){
                info['ass']=fldel(res[0]);
                info['name']=fldel(tempname[0]);
              }else{
                info['ass']='无';
                info['name']=fldel(res[0]);
              }
            }else{
              if(res[1].indexOf('新番')>=0){
                info['ass']=fldel(res[0]);
                info['name']=fldel(res[2]);
              }else{
                info['ass']=fldel(res[0]);
                info['name']=fldel(res[1]).split('_').join(' ');
              }
            }
            if(info['name'].indexOf(' - ')>=0 && !info['number']){
              var temp=togang(info['name']);
              info['name']=temp[0];
              info['number']=temp[1];
            }
            if(info['name'].indexOf(' ')>=0 && !info['number']){
              var temp = info['name'].split(' ');
              var tempnumber = temp[temp.length-1];
              if(tempnumber.length == 2 && !isNaN(tempnumber)){
                info['number']=tempnumber;
                temp.pop();
                info['name'] = temp.join(' ');
              }
            }
            //if(!isNaN(info.name))
              //console.info(info);
            callback(info);
        };

        fldel = function ( str ) {
          return str.substr(1,str.length-2);
        };

        togang = function ( str ) {
          var obj = str.split(' - ');
          return obj;
        };
    }
]

},{}]},{},[4]);
