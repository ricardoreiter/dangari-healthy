;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, StationSvc) {
        var vm = this;

        vm.stations = StationSvc.getAll();
        vm.starsAverage = _starsAverage;

        function _starsAverage(score) {
            if (score > 4.5) {
                return 5;
            } else if (score > 4) {
                return 4.5;
            } else if (score > 3.5) {
                return 4;
            } else if (score > 3) {
                return 3.5
            } else if (score > 2.5) {
                return 3;
            } else if (score > 2) {
                return 2.5
            } else if (score > 1.5) {
                return 2;
            } else if (score > 1) {
                return 1.5
            } else if (score > 0.5) {
                return 1;
            } else if (score > 0) {
                return 0.5;
            } else {
                return 0;
            }
        }
    }
}());
