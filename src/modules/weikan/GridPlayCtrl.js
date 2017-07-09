module.exports = [ '$scope', 'weikanService', '$window', 'settingsService', 'ListService',
    function ( $scope, weikanService, $window, settingsService, ListService ) {
      $scope.items = [
        { name: 'Hangout', icon: 'hangout' },
        { name: 'Mail', icon: 'mail' },
        { name: 'Message', icon: 'message' },
        { name: 'Copy', icon: 'copy2' },
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Twitter', icon: 'twitter' },
      ];

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
];
