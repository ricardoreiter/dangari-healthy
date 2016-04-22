;
(function() {

    angular.module('dangari-healthy')
        .factory('LoginSvc', Login);
        
    function Login($http, $q){
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

    }

}());