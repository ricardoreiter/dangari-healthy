;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('IndexCtrl', IndexCtrl);

    function IndexCtrl($scope, $uibModal, LocalStorageSvc, LoginSvc) {
        var vm = this;

        vm.openSuggestion = openSuggestion;
        vm.logout = logout;

        login();

        function login() {
            var token = LocalStorageSvc.getAuthToken();
            if (token) {
                LoginSvc.getCurrentUser()
                    .then(
                        function(response) {
                            if (response) {
                                self.user = response.data;
                                // toastr.success('Logado com sucesso!');
                            } else {
                                toastr.error('Ocorreu um erro ao realizar login');
                                window.location = '/login-view';
                            }
                        },
                        function(error) {
                            console.error(error);
                            toastr.error('Ocorreu um erro ao realizar login');
                            window.location = '/login-view';
                        }
                    );
            } else {
                toastr.info('É necessário estar logado para utilizar o sistema!');
                window.location = '/login-view';
            }
        }

        function logout() {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/confirmation-modal.html',
                controller: 'ConfirmationModalCtrl',
                controllerAs: 'mc',
                resolve: {
                    title: function() {
                        return 'Confirmação';
                    },
                    description: function() {
                        return 'Você deseja sair do sistema?'
                    }
                }
            });

            modalInstance.result.then(function() {
                toastr.success('Logoff efetuado com sucesso!');
                LocalStorageSvc.deleteAuthToken();
                window.location = '/login-view';
            }, function() {});

        }

        function openSuggestion() {
            $uibModal.open({
                templateUrl: 'views/station-suggestion.html',
                controller: 'StationSuggestionCtrl',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    station: function () {
                        return null;
                    }
                }
            });
        }
    }
}());
