;
(function() {

    angular.module('dangari-healthy')
        .factory('StationSvc', Station);

    function Station($http, $q) {
        var field = 'name';
        var order = 'name';
        var callback = undefined;
        var searchValue = '';
        return {
            getPendings: _getPendings,
            getAll: _getAll,
            create: _create,
            remove: _remove,
            update: _update,
            getReviews: _getReviews,
            createReview: _createReview,
            set: function(f, v, o) {
                field = f;
                searchValue = v;
                order = o;
                if (callback) {
                    callback();
                }
            },
            setCb: function(cb) {
                callback = cb;
            }
        };

        function _getReviews(id) {
            return $http.get('stations/' + id + '/reviews').then(
                function(response) {
                    return response.data;
                },
                function(err) {
                    return $q.reject(err);
                }
            )
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

        function _getAll() {
            var url = '/stations';
            if (field) {
                url += '?' + field + '=' + searchValue;
            }
            if (order) {
                if (url.indexOf('?') > -1) {
                    url += '&';
                } else {
                    url += '?';
                }
                url += 'o=' + order;
            }
            return $http.get(url).then(
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

        function _createReview(id, review) {
            return $http.post('stations/' + id + '/reviews', review).then(
                function(response) {
                    return response.data;
                },
                function(errResponse) {
                    console.error('Erro ao adicionar avaliação.');
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
