;
(function() {
    'use-strict';

    angular.module('dangari-healthy').controller('StationSuggestionCtrl', StationSuggestionCtrl);

    function StationSuggestionCtrl($scope, NgMap, station, $uibModalInstance, StationSvc) {
        var self = this;
        self.new = station === null;
        self.station = station;
        self.remove = _removeStation;
        self.approve = _approve;

        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

        self.add = function(station) {
            var photos = [
                'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.unimed.coop.br%2Fportal%2Fconteudo%2Fmaterias%2F1341590080539unimed.jpg&f=1',
                'https://images.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F99%2FNational_University_Hospital%2C_Nov_06.JPG&u=https://upload.wikimedia.org/wikipedia/commons/9/99/National_University_Hospital%2C_Nov_06.JPG',
                'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.ccm.pitt.edu%2Fsites%2Fdefault%2Ffiles%2Fimagecache%2Fhistory-thumbnail%2Fmagee_womens_hospital.jpg&f=1',
                'https://images.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F_OLc2TjnHOgQ%2FTOSisJ3ByUI%2FAAAAAAACE6k%2FFnUTpkzgnGA%2Fs1600%2FDOCTORS%2BHOSPITAL%2BColumbus%2BGeorgia%252C%2BDoctors%2BHospital%2Bat%2BColumbus%2BRegional%2BMedical%2BCenter%2BColumbus%2BGeorgia%2B%2B.JPG&f=1',
                'https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fblogs.rch.org.au%2Fnews%2Ffiles%2F2011%2F12%2FHospital.jpg&f=1'
            ];

            station.location = 'Rua Rio Branco, 797';
            station.scoreAverage = Math.floor(Math.random() * 5);
            station.photo = photos[Math.floor(Math.random() * 4)];
            station.pending = true;
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
            self.urlImagem = file.target.result;
            $scope.$apply();
        };

        self.onLoadBufferImagem = function(file) {
            self.station.image = {
                bytes: onLoadBufferImagem(file)
            };
        };

        self.close = _close;

        function _close() {
            $uibModalInstance.dismiss('cancel');
        };
    }
}());
