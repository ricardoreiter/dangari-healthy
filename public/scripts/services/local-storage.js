;
(function() {

    angular.module('dangari-healthy')
        .factory('LocalStorageSvc', LocalStorage);

    function LocalStorage($window){
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
    }

}());