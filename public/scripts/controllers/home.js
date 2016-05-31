;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, StationSvc, $uibModal, Utils) {
        var vm = this;

        vm.stations = [];

        function loadPhoto(stations){
            for (var i = 0; i < stations.length; i++) {
                if (stations[i].photo){
                    stations[i].urlPhoto = "data:image/JPEG;base64," + Utils.base64ArrayBuffer(stations[i].photo.data);
                }else{
                    stations[i].urlPhoto = "http://localhost:3000/assets/semFoto.jpg";
                }
            }
        }

        function _getAll() {
            StationSvc.getAll()
                .then(
                    function(response) {
                        if (response) {
                            vm.stations = response;
                            calculateStars(vm.stations);
                            loadPhoto(vm.stations);
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
            console.log('passou');
            console.log(st);
            for (var i = 0; i < st.length; i++) {
                st[i].stars = getStars(st[i].scoreAverage);
            }
        }

        function getStars(score) {
            console.log('kak');
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
