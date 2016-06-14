;
(function() {

    angular.module('dangari-healthy')
        .factory('ReviewSvc', Review);

    function Review($http, $q) {

        return {
            complaintReview: _complaintReview,
            getAllWithComplaint: _getAllWithComplaint,
            ignoreComplaints: _ignoreComplaints
        }

        function _complaintReview(id) {
            return $http.put('reviews/' + id + '/complaint').then(
                function(response) {
                    return response.data;
                },
                function(err) {
                    return $q.reject(err);
                }
            )
        }

        function _getAllWithComplaint() {
            return $http.get('reviews?withComplaint=true').then(
                function(response) {
                    return response.data;
                },
                function(err) {
                    return $q.reject(err);
                }
            )
        }

        function _ignoreComplaints(id) {
            return $http.delete('reviews/' + id + '/complaint').then(
                function(response) {
                    return response.data;
                },
                function(err) {
                    return $q.reject(err);
                }
            )   
        }

    }
}());
