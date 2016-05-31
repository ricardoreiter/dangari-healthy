(function() {

    angular.module('dangari-healthy').controller('PendingStationsCtrl', function($uibModal, StationSvc) {
        var self = this;
        self.stations = [];

        function _getPendings() {
            StationSvc.getPendings()
                .then(
                    function(response) {
                        if (response) {
                            self.stations = response;
                        } else {
                            toastr.error('Ocorreu um erro ao realizar login');
                        }
                    },
                    function(error) {
                        toastr.error('Ocorreu um erro ao realizar login');
                    }
                );
        }
        _getPendings();

        self.open = function(s) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/station-suggestion.html',
                controller: 'StationSuggestionCtrl',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    station: function() {
                        return s;
                    }
                }
            }).closed.then(function() {
                _getPendings();
            });

        };

    });

}());
