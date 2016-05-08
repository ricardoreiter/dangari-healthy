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
            })

            .when('/suggestion', {
                templateUrl: 'views/station-suggestion.html',
                controller: 'StationSuggestionController',
                controllerAs: 'ctrl'
            })

            .when('/profile-settings', {
                templateUrl: 'views/profile-settings.html',
                controller: 'ProfileSettingsCtrl',
                controllerAs: 'vm'
            })
            //Essas duas outras rotas, por enquanto são só para testes. Depois acho que vamos abrir em modais.
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
            })

            .when('/station', {
                templateUrl: 'views/station.html',
                controller: 'StationCtrl',
                controllerAs: 'sc'
            });
    }
}());
