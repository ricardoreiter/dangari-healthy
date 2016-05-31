(function () {

    angular.module('dangari-healthy')
           .controller('UsersCtrl', UsersCtrl);

    function UsersCtrl($uibModal, UserSvc) {
        var self = this;

        self.users = [];

        function _getAll() {
            UserSvc.getAll()
                .then(
                    function(response) {
                        if (response) {
                            self.users = response.data;
                        } else {
                            toastr.error('Ocorreu um erro ao obter usuários');
                        }
                    },
                    function(error) {
                        toastr.error('Ocorreu um erro ao obter usuários');
                    }
                );
        }
        _getAll();

        self.openUser = openUser;

        function openUser(user){
            $uibModal.open({
                templateUrl: 'views/profile-settings.html',
                controller: 'ProfileSettingsCtrl',
                controllerAs: 'vm',
                resolve: {
                    user: function() {
                        return user;
                    }
                }
            });
        };

    }

}());
