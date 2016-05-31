;
(function() {

    angular.module('dangari-healthy')
        .factory('UserSvc', Users);

    function Users($http, $q) {
        return {
            getAll: _getAll
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
    }
}());
