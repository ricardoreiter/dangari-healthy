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
    }

}());
