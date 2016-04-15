(function () {

    var dangariServices = angular.module('dangariServices', []);

    dangariServices.factory('LoginService', ['$http', '$q', function($http, $q){
        return {

                loginUser: function(user) {
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

                getCurrentlyUser: function() {
                    return $http.get('/login/').then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Erro ao carregar usuário.');
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
                // Só adicionamos token nos requests feitos para a API de análise crítica
                if (authToken && config.url.startsWith(API_URL)) {
                    config.headers['Authorization'] = authToken;
                }
                return config;
            }
        };
        return sessionInjector;
    }]);

}());