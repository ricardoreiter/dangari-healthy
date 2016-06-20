;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('ProfileSettingsCtrl', ProfileSettingsCtrl);

    function ProfileSettingsCtrl($scope, LoginSvc, UserSvc, user, Utils) {
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
                    loadPhoto();
                },
                function(error) {
                    console.error(error);
                    toastr.error("Ocorreu um erro ao buscar o usuário ativo");
                }
            );

        loadPhoto = function() {
            if (vm.profile && vm.profile.photo) {
                vm.urlImagem = "data:image/JPEG;base64," + Utils.base64ArrayBuffer(vm.profile.photo.data);
            } else {
                vm.urlImagem = "http://localhost:3000/assets/semFoto.jpg";
            }
        };
        loadPhoto();



        function onLoadBufferImagem(file) {
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
                console.log('salvar');
                console.log(vm.profile);
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

        vm.loadImage = function(file) {
            loadImage(file, vm.onLoadUrlImagem, vm.onLoadBufferImagem);
        };

        vm.onLoadUrlImagem = function(file) {
            vm.urlImagem = file.target.result;
            $scope.$apply();
        };

        vm.onLoadBufferImagem = function(file) {
            vm.profile.photo = getByteArrayFromFile(file);
            console.log(vm.profile.photo);
        };

        function getByteArrayFromFile(file) {
            var uintArray = new Uint8Array(file.target.result);
            var byteArray = [];
            uintArray.forEach(function(val) {
                byteArray.push(val);
            });
            return byteArray;
        }
    }
}());
