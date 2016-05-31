;
(function() {

    angular.module('dangari-healthy')
        .factory('StationSvc', Station);

    function Station($http, $q) {

        return {
            getPendings: _getPendings,
            getAll: _getAll,
            create: _create,
            remove: _remove,
            update: _update
        }

        function _update(id, station) {
            return $http.put('/stations/' + id, station).then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    return $q.reject(errResponse);
                }
            );
        }

        function _getPendings() {
            return $http.get('/stations/pendings').then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    console.error('Erro ao obter todas estações.');
                    return $q.reject(errResponse);
                }
            );
        }

        function _getAll(average) {
            return $http.get('/stations').then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    console.error('Erro ao obter todas estações.');
                    return $q.reject(errResponse);
                }
            );
        }

        function _create(station) {
            return $http.post('/stations', station).then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    console.error('Erro ao criar estação.');
                    return $q.reject(errResponse);
                }
            );
        }

        function _remove(id) {
            return $http.delete('/stations/' + id).then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    console.error('Erro ao deletar estação.');
                    return $q.reject(errResponse);
                }
            );
        }
    }
}());
