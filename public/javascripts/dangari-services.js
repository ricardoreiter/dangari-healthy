(function () {

    var dangariServices = angular.module('dangariServices', []);

    dangariServices.factory('LoginService', ['$http', '$q', function($http, $q){
        return {

                login: function(user) {
                    return $http.post('/login/', user).then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Erro ao logar usuário.');
                            return $q.reject(errResponse);
                        }
                    );
                },

                register: function(user) {
                    return $http.post('/users/', user).then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Erro ao registrar usuário.');
                            return $q.reject(errResponse);
                        }
                    );  
                },

                getCurrentUser: function() {
                    return $http.get('/users/me/me').then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Erro ao carregar usuário atual.');
                            return $q.reject(errResponse);
                        }
                    );
                }
             
            };

    }]);

    dangariServices.factory('LocalStorageService', ['$window', function($window){
        return {

            getAuthToken: function() {
                return $window.localStorage['authAnalysisToken'];
            },

            setAuthToken: function(authToken) {
                $window.localStorage['authAnalysisToken'] = authToken;  
            },

            deleteAuthToken: function() {
                delete $window.localStorage['authAnalysisToken'];
            }
             
        };
    }]);

    dangariServices.factory('sessionAuthTokenInjector', ['LocalStorageService', function (LocalStorageService) {
        var sessionInjector = {
            request: function(config) {
                var authToken = LocalStorageService.getAuthToken();
                if (authToken) {
                    config.headers['Authorization'] = authToken;
                }
                return config;
            }
        };
        return sessionInjector;
    }]);

    dangariServices.config(
        function setupConfig( $httpProvider ) {
            $httpProvider.interceptors.push('sessionAuthTokenInjector');
        }
    );
    

}());