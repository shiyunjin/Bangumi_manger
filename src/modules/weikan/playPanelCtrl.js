module.exports = [ '$scope', 'weikanService', '$window', 'settingsService', 'ListService', '$mdBottomSheet', '$mdToast', 'list', 'mdPanelRef',
    function ( $scope, weikanService, $window, settingsService, ListService, $mdBottomSheet, $mdToast, list, mdPanelRef ) {
      this._mdPanelRef = mdPanelRef;
      this.settings = settingsService.loadSettings();

      $scope.item = list;
      $scope.allowkanwan = true;

      this.closeDialog = function() {
        var panelRef = this._mdPanelRef;

        panelRef && panelRef.close().then(function() {
          panelRef.destroy();
        });
      };

      this.openfile = function (filename) {
        $window.App.openfile(this.settings.fooder.weikan + '\\' + filename);
      };

      this.movetokanwan = function (filename) {
        $window.App.fs.renameSync(this.settings.fooder.weikan + '\\' + filename,this.settings.fooder.kanwan + '\\' + filename);
        var panelRef = this._mdPanelRef;

        panelRef && panelRef.close().then(function() {
          panelRef.destroy();
        });
      };

      this.unlink = function (filename) {
        return $window.App.fs.unlinkSync(this.settings.fooder.weikan + '\\' + filename);
        var panelRef = this._mdPanelRef;

        panelRef && panelRef.close().then(function() {
          panelRef.destroy();
        });
      };

    }
];
