;
(function() {
    'use-strict';

    angular.module('dangari-healthy').controller('StationSuggestionCtrl', StationSuggestionCtrl);

    function StationSuggestionCtrl($scope, NgMap, station, user, $uibModalInstance, StationSvc, Utils, $geolocation, $timeout) {
        var self = this;
        self.new = station === null;
        self.station = station;
        self.remove = _removeStation;
        self.approve = _approve;
        self.onLoadBufferImagem = onLoadBufferImagem;
        self.urlPhoto;
        self.map = null;
        self.latitude = null;
        self.longitude = null;
        self.marker = null;

        NgMap.getMap("map").then(function(map) {
            self.map = map;
            $geolocation.getCurrentPosition({
                timeout: 60000
            }).then(function(position) {
                google.maps.event.addListener(map, 'click', function(event) {
                    self.latitude = event.latLng.lat();
                    self.longitude = event.latLng.lng();
                    var position = new google.maps.LatLng(self.latitude, self.longitude);
                    map.panTo(position);
                    if (self.marker){
                        self.marker.setMap(null);
                    }
                    self.marker = new google.maps.Marker();
                    self.marker.setPosition(position);
                    self.marker.setMap(map);
                });
                self.latitude = position.coords.latitude;
                self.longitude = position.coords.longitude;
            });
        }, function(error){
            console.log('error getting map');
        });

        self.render = false;
        $timeout(function () {
            self.render = true;
        }, 500);

        loadPhoto = function() {
            if (!self.new) {
                if (station.photo) {
                    self.urlPhoto = "data:image/JPEG;base64," + Utils.base64ArrayBuffer(station.photo.data);
                } else {
                    self.urlPhoto = "http://localhost:3000/assets/semFoto.jpg";
                }
            }
        };
        loadPhoto();



        self.add = function(station) {
            station.location = 'Rua Rio Branco, 797';
            station.pending = !user.isAdmin;
            console.log('aaa ' + station.pending);
            StationSvc.create(station).then(
                function(response) {
                    if (response) {
                        _close();
                        toastr.success('Sugestão enviada com sucesso!');
                    } else {
                        toastr.error('Ocorreu um erro ao enviar a sugestão.');
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao enviar a sugestão.');
                }
            );
        }

        function _approve(station) {
            station.pending = false;
            StationSvc.update(station._id, station).then(
                function(response) {
                    if (response) {
                        _close();
                        window.location = '/#/';
                        toastr.success('Estação aprovada com sucesso!');
                    } else {
                        toastr.error('Ocorreu um erro ao aprovar a estação');
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao aprovar a estação');
                }
            );
        }

        function _removeStation(id) {
            StationSvc.remove(id).then(
                function(response) {
                    if (response) {
                        _close();
                        toastr.success('Estação removida com sucesso!');
                    } else {
                        toastr.error('Ocorreu um erro ao remover a estação');
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao remover a estação');
                }
            );
        }

        function onLoadBufferImagem(file) {
            self.station.photo = getByteArrayFromFile(file);
        }

        function getByteArrayFromFile(file) {
            var uintArray = new Uint8Array(file.target.result);
            var byteArray = [];
            uintArray.forEach(function(val) {
                byteArray.push(val);
            });
            return byteArray;
        }

        function loadImage(file, onLoadUrlImagem, onLoadBufferImagem) {
            // Gera uma URL para ser utilizada no img do form
            var reader = new FileReader();
            reader.onload = onLoadUrlImagem;
            reader.readAsDataURL(file);

            // Obtém os bytes da imagem para salvar no backend
            reader = new FileReader();
            reader.onload = onLoadBufferImagem;
            reader.readAsArrayBuffer(file);
        }




        self.loadImage = function(file) {
            loadImage(file, self.onLoadUrlImagem, self.onLoadBufferImagem);
        };


        self.onLoadUrlImagem = function(file) {
            self.urlPhoto = file.target.result;
            $scope.$apply();
        };

        self.close = _close;

        function _close() {
            $uibModalInstance.dismiss('cancel');
        };
    }
}());
