module.exports = angular.module( 'bangumi.kanwan', [] )

.service( 'kanwanService', require( './kanwanService' ) )

.controller( 'kanwanCtrl', require( './kanwanCtrl' ) )

.controller( 'GridPlayCtrl', require( '../weikan/GridPlayCtrl' ) )

.filter('clarityIcon',require( '../weikan/clarityIcon' ) )

.controller( 'playPanelCtrl-kanwan', require( './playPanelCtrl' ) )
