;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, StationSvc) {
        var vm = this;

        vm.stations = StationSvc.getAll();
    }
}());
