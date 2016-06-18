;
(function() {
    'use-strict';

    angular.module('dangari-healthy').controller('StationSuggestionCtrl', StationSuggestionCtrl);

    function StationSuggestionCtrl($scope, NgMap, station, user, $uibModalInstance, StationSvc, Utils) {
        var self = this;
        self.new = station === null;
        self.station = station;
        self.remove = _removeStation;
        self.approve = _approve;
        self.onLoadBufferImagem = onLoadBufferImagem;
        self.urlPhoto;

        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

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
