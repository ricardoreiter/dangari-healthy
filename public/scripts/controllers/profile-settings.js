;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('ProfileSettingsCtrl', ProfileSettingsCtrl);

    function ProfileSettingsCtrl($scope, LoginSvc, UserSvc, user) {
        var vm = this;

        LoginSvc.getCurrentUser()
            .then(
                function(currentUser) {
                    if (user) {
                        if (!currentUser.data.isAdmin) {
                            toastr.error("Você não possuí permissão para alterar este usuário");
                        } else {
                            vm.profile = user;
                            vm.adminMode = true;
                        }
                    } else {
                        vm.profile = currentUser.data;
                    }
                    vm.profile.password = "";
                }, 
                function(error) {
                    console.error(error);
                    toastr.error("Ocorreu um erro ao buscar o usuário ativo");
                }
            );

        

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

        vm.saveUser = function() {
            if (vm.profile.password && (vm.profile.password != vm.profile.confirmPassword)) {
                toastr.error("As senhas digitadas não conferem");
            } else {
                UserSvc.saveUser(vm.profile._id, vm.profile)
                    .then(
                        function(response) {
                            toastr.success("Usuário atualizado com sucesso");
                        },
                        function(error) {
                            console.error(error);
                            toastr.error("Ocorreu um erro ao atualizar usuário");
                        }
                    );
            }
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
