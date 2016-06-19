;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('IndexCtrl', IndexCtrl);

    function IndexCtrl($scope, $uibModal, LocalStorageSvc, LoginSvc, StationSvc) {
        var vm = this;

        vm.openSuggestion = openSuggestion;
        vm.search = _search;
        vm.logout = logout;
        vm.searchValue = '';
        vm.field = 'name';
        vm.order = 'name';
        login();

        function _search() {
            StationSvc.set(vm.field, vm.searchValue, vm.order);
            $('#basic-addon1').triggerHandler('click');
        }

        function login() {
            var token = LocalStorageSvc.getAuthToken();
            if (token) {
                LoginSvc.getCurrentUser()
                    .then(
                        function(response) {
                            if (response) {
                                vm.user = response.data;
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
                    user: function() {
                        return vm.user;
                    },
                    station: function() {
                        return null;
                    }
                }
            });
        }
    }
}());
