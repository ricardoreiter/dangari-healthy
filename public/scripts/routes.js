;
(function() {
    'use-strict';

    angular
        .module('dangari-healthy')
        .config(config);

    function config($routeProvider, $locationProvider) {
        $routeProvider

            .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        });

        //Essas duas outras rotas, por enquanto são só para testes. Depois acho que vamos abrir em modais.
        $routeProvider

            .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'lc'
        });

        $routeProvider

            .when('/station', {
            templateUrl: 'views/station.html',
            controller: 'StationCtrl',
            controllerAs: 'sc'
        });
    }

}());
