;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, StationSvc, $uibModal) {
        var vm = this;

        vm.stations = StationSvc.getAll();

        vm.openStation = openStation;
        vm.openSuggestion = openSuggestion;

        calculateStars(vm.stations);

        function openStation(station) {
            $uibModal.open({
                templateUrl: 'views/station.html',
                controller: 'StationCtrl',
                controllerAs: 'sc',
                size: 'lg'
            });
        }

        function openSuggestion() {
            $uibModal.open({
                templateUrl: 'views/station-suggestion.html',
                controller: 'StationSuggestionController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    station: function () {
                        return null;
                    }
                }
            });
        }

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
