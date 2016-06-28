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

        StationSvc.summaryByCity()
            .then(
                function(response) {
                    if (response) {
                        var datasets = []
                        for (var i = 0; i < response.labels.length; i++) {
                            var color = Math.floor((Math.random() * 255)) + ', ' +
                                Math.floor((Math.random() * 255)) + ', ' +
                                Math.floor((Math.random() * 255))
                            var dataset = {
                                label: response.labels[i],
                                backgroundColor: 'rgba(' + color + ',0.2)',
                                borderColor: 'rgba(' + color + ',1)',
                                pointBackgroundColor: 'rgba(' + color + ',1)',
                                pointRadius: 6,
                                pointBorderColor: "#fff",
                                pointHoverBackgroundColor: "#fff",
                                pointHoverBorderColor: 'rgba(' + color + ',1)',
                                data: response.data[i]
                            }
                            datasets.push(dataset)
                        }
                        _createRadarChart(['Geral', 'Recepção', 'Estrutura', 'Atendimento', 'Pontualidade'], datasets, 'radar')
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
                        _createChart('pie', 'Usuários', ['Ativos', 'Banidos', 'Administradores'], [response.data.users, response.data.banned, response.data.admin], 'users')
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao obter as estações');
                }
            );

        UserSvc.lastYear()
            .then(
                function(response) {
                    if (response) {
                      console.log(response);
                        _createChart('line', 'Cadastro de usuários', response.data.labels, response.data.data, 'usersLastYear')
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
        Chart.defaults.global.defaultFontSize = 20

        console.log(Chart);

        function _createRadarChart(labels, datasets, element) {
            new Chart(document.getElementById(element), {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    scale: {
                        reverse: false,
                        ticks: {
                            beginAtZero: true,
                            stepSize: 0.5
                        }
                    }
                }
            })
        }
    }
}());
