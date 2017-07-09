module.exports = angular.module( 'bangumi.weikan', [] )

.service( 'weikanService', require( './weikanService' ) )

.controller( 'weikanCtrl', require( './weikanCtrl' ) )

.controller( 'GridPlayCtrl', require( './GridPlayCtrl' ) )
