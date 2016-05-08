(function () {

    angular.module('dangari-healthy')
           .controller('UsersCtrl', UsersCtrl);
    
    function UsersCtrl($uibModal) {
        var self = this;

        self.users = [{
            login: 'ricardoreiter',
            name: 'Ricardo Filipe Reiter',
            email: 'ricardof.reiter@gmail.com',
            accountLevel: 1
        }, {
            login: 'ghbiz',
            name: 'Gabriel Henrique Biz',
            email: 'asdasd.fafa@gmail.com',
            accountLevel: 1
        }, {
            login: 'dani',
            name: 'Daniel Pamplona',
            email: 'afaf.sdas@gmail.com',
            accountLevel: 1
        }, {
            login: 'jucada',
            name: 'Juca da Silva',
            email: 'asd.asdadd@gmail.com',
            accountLevel: 0
        }, {
            login: 'antoni',
            name: 'Antônio Almeida da Silva Costa Neto',
            email: 'agdsdfsdf@gmail.com',
            accountLevel: 0
        }, {
            login: 'moca',
            name: 'Moooo atatata',
            email: 'dfgdfgdfg@terra.com.br',
            accountLevel: 0
        }, {
            login: 'figomasnaobate',
            name: 'Figueira Santos Costa Silva',
            email: 'figueirinha@bol.com.br',
            accountLevel: 1
        }, {
            login: 'soueu',
            name: 'José Antônio Marcelo da Costa Silva',
            email: 'manoqueloko@hotmail.com',
            accountLevel: 0
        }, {
            login: 'costaesilva',
            name: 'João Costa e Silva',
            email: 'seehlokocachoeira@cachos.io',
            accountLevel: 0
        }];

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