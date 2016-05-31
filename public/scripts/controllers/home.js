;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, StationSvc, $uibModal) {
        var vm = this;

        vm.stations = [];

        function _getAll() {
            StationSvc.getAll()
                .then(
                    function(response) {
                        if (response) {
                            vm.stations = response;
                        } else {
                            toastr.error('Ocorreu um erro ao obter as estações');
                        }
                    },
                    function(error) {
                        toastr.error('Ocorreu um erro ao obter as estações');
                    }
                );
        }
        _getAll();

        vm.openStation = openStation;

        calculateStars(vm.stations);

        function openStation(station) {
            $uibModal.open({
                templateUrl: 'views/station.html',
                controller: 'StationCtrl',
                controllerAs: 'sc',
                size: 'lg'
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
