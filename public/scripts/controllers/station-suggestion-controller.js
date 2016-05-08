;
(function() {
    'use-strict';

    angular.module('dangari-healthy').controller('StationSuggestionController', StationSuggestionController);

    function StationSuggestionController($scope, NgMap) {
        var self = this;
        console.log('carregou!!!');

        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });


        function onLoadBufferImagem(file){
            var uintArray = new Uint8Array(file.target.result);
            var byteArray = [];
            uintArray.forEach(function(val) {
                byteArray.push(val);
            });
            return byteArray;
        };

        function loadImage(file, onLoadUrlImagem, onLoadBufferImagem) {
            // Gera uma URL para ser utilizada no img do form
            var reader = new FileReader();
            reader.onload = onLoadUrlImagem;
            reader.readAsDataURL(file);

            // Obtém os bytes da imagem para salvar no backend
            reader = new FileReader();
            reader.onload = onLoadBufferImagem;
            reader.readAsArrayBuffer(file);
        };


        self.loadImage = function (file) {
            loadImage(file, self.onLoadUrlImagem, self.onLoadBufferImagem);
        };

        self.onLoadUrlImagem = function (file) {
            self.urlImagem = file.target.result;
            $scope.$apply();
        };

        self.onLoadBufferImagem = function (file) {
            self.station.image = {
                bytes: onLoadBufferImagem(file)
            };
        };

    }
}());
