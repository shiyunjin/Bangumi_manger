module.exports = [ '$scope', 'kanwanService', '$window', 'settingsService', 'ListService', '$mdBottomSheet', '$mdToast', 'list', 'mdPanelRef',
    function ( $scope, kanwanService, $window, settingsService, ListService, $mdBottomSheet, $mdToast, list, mdPanelRef ) {
      this._mdPanelRef = mdPanelRef;
      this.settings = settingsService.loadSettings();

      $scope.item = list;
      $scope.allowkanwan = false;

      this.closeDialog = function() {
        var panelRef = this._mdPanelRef;

        panelRef && panelRef.close().then(function() {
          panelRef.destroy();
        });
      };

      this.openfile = function (filename) {
        $window.App.openfile(this.settings.fooder.kanwan + '\\' + filename);
      };

      this.unlink = function (filename) {
        return $window.App.fs.unlinkSync(this.settings.fooder.kanwan + '\\' + filename);
        var panelRef = this._mdPanelRef;

        panelRef && panelRef.close().then(function() {
          panelRef.destroy();
        });
      };

    }
];
