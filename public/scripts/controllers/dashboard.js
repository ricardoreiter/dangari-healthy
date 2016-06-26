;
(function() {
    'use-strict';

    angular.module('dangari-healthy')
        .controller('DashboardCtrl', DashboardCtrl);

    function DashboardCtrl($scope, StationSvc, UserSvc) {
        StationSvc.countByCity('desc')
            .then(
                function(response) {
                    if (response) {
                        _createChart('bar', 'Pontos de atendimento', response.labels, response.data, 'most')
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao obter as estações');
                }
            );

        StationSvc.countByCity('asc')
            .then(
                function(response) {
                    if (response) {
                        _createChart('bar', 'Pontos de atendimento', response.labels, response.data, 'less')
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao obter as estações');
                }
            );

        StationSvc.reviewsByCity('desc')
            .then(
                function(response) {
                    if (response) {
                        _createChart('bar', 'Avaliações', response.labels, response.data, 'mostRated')
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao obter as estações');
                }
            );

        StationSvc.reviewsByCity('asc')
            .then(
                function(response) {
                    if (response) {
                        _createChart('bar', 'Avaliações', response.labels, response.data, 'lessRated')
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao obter as estações');
                }
            );

        StationSvc.avgByCity('desc')
            .then(
                function(response) {
                    if (response) {
                        _createChart('bar', 'Pontuaçao', response.labels, response.data, 'mostPopular')
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao obter as estações');
                }
            );

        StationSvc.avgByCity('asc')
            .then(
                function(response) {
                    if (response) {
                        _createChart('bar', 'Pontuaçao', response.labels, response.data, 'lessPopular')
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao obter as estações');
                }
            );

        UserSvc.summary()
            .then(
                function(response) {
                    if (response) {
                        console.log(response.data);
                        _createChart('pie', 'Usuários', ['Ativos', 'Banidos', 'Administradores'], [response.data.users, response.data.banned, response.data.admin], 'users')
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao obter as estações');
                }
            );

        function _createChart(type, label, labels, data, element) {
            new Chart(document.getElementById(element), {
                type: type,
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            })
        }
    }
}());
