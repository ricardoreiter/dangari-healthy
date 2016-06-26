;
(function() {

    angular.module('dangari-healthy')
        .factory('UserSvc', Users);

    function Users($http, $q) {
        return {
            getAll: _getAll,
            saveUser: _saveUser,
            summary: _summary
        }

        function _saveUser(id, user) {
            return $http.put('users/' + id, user).then({
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    console.error('Erro ao salvar o usuário.');
                    return $q.reject(errResponse);
                }
            });
        }

        function _getAll() {
            return $http.get('users').then({
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    console.error('Erro ao obter todos usuários.');
                    return $q.reject(errResponse);
                }
            });
        }

        function _summary() {
            return $http.get('users/summary').then({
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    console.error('Erro ao obter todos usuários.');
                    return $q.reject(errResponse);
                }
            });
        }
    }
}());
