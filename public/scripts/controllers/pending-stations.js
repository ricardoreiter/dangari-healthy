(function () {

    angular.module('dangari-healthy').controller('PendingStationsCtrl', function ($uibModal) {
        var self = this;

        self.stations = [{
            name: 'UNIMED - Vila Nova',
            location: 'Vila Nova',
            pending: true
        }, {
            name: 'UNIMED',
            location: 'Fortaleza',
            pending: true
        }, {
            name: 'Casa da paz',
            location: 'Indaial',
            pending: false
        }
        ];

        self.open = function(s){
            $uibModal.open({
                templateUrl: 'views/station-suggestion.html',
                controller: 'StationSuggestionController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    station: function () {
                        return s;
                    }
                }
            });
        };

    });

}());