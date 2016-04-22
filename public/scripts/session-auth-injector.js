;
(function() {
    'use-strict';

    //Adiciona um interceptor em cada requisição para adicionar o token de autenticação
    angular
        .module('dangari-healthy')
        .factory('AuthTokenInterceptor', ['LocalStorageSvc', AuthTokenInterceptor])
        .config(config);

    function AuthTokenInterceptor (LocalStorageSvc) {
        var authTokenInterceptor = {
            request: function(config) {
                var authToken = LocalStorageSvc.getAuthToken();
                if (authToken) {
                    config.headers['Authorization'] = authToken;
                }
                return config;
            }
        };
        return authTokenInterceptor;
    }

    function config($httpProvider) {
        $httpProvider.interceptors.push('AuthTokenInterceptor');
    }

}());


