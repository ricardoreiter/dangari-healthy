;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, StationSvc) {
        var vm = this;

        vm.stations = StationSvc.getAll();

        calculateStars(vm.stations);

        function calculateStars(stations) {
            for (var i = 0; i < stations.length; i++) {
                stations[i].stars = getStars(stations[i].scoreAverage);
            }
        }

        function getStars(score) {
            var stars = [];
            for (var i = 0; i < 5; i++) {
                if (i < score) {
                    if ((score - i) < 1) {
                        stars.push('fa-star-half-o');
                    } else {
                        stars.push('fa-star');
                    }
                } else {
                    stars.push('fa-star-o');
                }
            }
            return stars;
        }
    }
}());
