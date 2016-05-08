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

            .when('/pending-stations', {
                templateUrl: 'views/pending-stations.html',
                controller: 'PendingStationsCtrl',
                controllerAs: 'ctrl'
            })

            .when('/profile-settings', {
                templateUrl: 'views/profile-settings.html',
                controller: 'ProfileSettingsCtrl',
                controllerAs: 'vm',
                resolve: {
                    user: function() {
                        return undefined;
                    }
                }
            })

            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'lc'
            })

            .when('/users', {
                templateUrl: 'views/users.html',
                controller: 'UsersCtrl',
                controllerAs: 'ctrl'
            });
    }
}());
