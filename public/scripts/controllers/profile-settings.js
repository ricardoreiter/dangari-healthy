;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('ProfileSettingsCtrl', ProfileSettingsCtrl);

    function ProfileSettingsCtrl($scope, user) {
        var vm = this;

        if (user) {
            vm.profile = user;
            vm.adminMode = true;
        }

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


        vm.loadImage = function (file) {
            loadImage(file, vm.onLoadUrlImagem, vm.onLoadBufferImagem);
        };

        vm.onLoadUrlImagem = function (file) {
            vm.urlImagem = file.target.result;
            $scope.$apply();
        };

        vm.onLoadBufferImagem = function (file) {
            vm.station.image = {
                bytes: onLoadBufferImagem(file)
            };
        };
    }
}());
