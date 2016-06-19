;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, StationSvc, $uibModal, Utils, LocalStorageSvc, LoginSvc) {
        var vm = this;

        vm.field = 'name';
        vm.searchValue = '';
        vm.order = 'name';
        vm.stations = [];
        vm.openStation = openStation;

        function loadPhoto(stations) {
            for (var i = 0; i < stations.length; i++) {
                if (stations[i].photo) {
                    stations[i].urlPhoto = "data:image/JPEG;base64," + Utils.base64ArrayBuffer(stations[i].photo.data);
                } else {
                    stations[i].urlPhoto = "http://localhost:3000/assets/semFoto.jpg";
                }
            }
        }

        function _getAll() {
            // StationSvc.getAll(vm.field, vm.searchValue, vm.order)
            StationSvc.getAll()
                .then(
                    function(response) {
                        if (response) {
                            // console.log('foifoifofio' + vm.field + vm.searchValue + vm.order);
                            // vm.stations.splice(0, vm.stations.length + 1);
                            // for (var i = 0; i < response.length; i++) {
                            //     vm.stations.push(response[i])
                            // }
                            // $scope.$apply(function() {
                            // });
                            vm.stations = response;
                            calculateStars(vm.stations);
                            loadPhoto(vm.stations);
                            console.log(vm.stations);
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
        StationSvc.setCb(function() {
            _getAll();
        });

        function openStation(station) {
            $uibModal.open({
                templateUrl: 'views/station.html',
                controller: 'StationCtrl',
                controllerAs: 'sc',
                size: 'lg',
                resolve: {
                    station: function() {
                        return station;
                    }
                }
            });
        }

        function calculateStars(st) {
            for (var i = 0; i < st.length; i++) {
                st[i].stars = getStars(st[i].scoreAverage);
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
