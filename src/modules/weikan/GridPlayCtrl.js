module.exports = [ '$scope', 'weikanService', '$window', 'settingsService', 'ListService', '$mdBottomSheet', '$mdToast', 'list',
    function ( $scope, weikanService, $window, settingsService, ListService, $mdBottomSheet, $mdToast, list ) {
      $scope.items = list;

      $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
      };
    }
];
