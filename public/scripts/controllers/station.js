(function() {
    angular.module('dangari-healthy').controller('StationCtrl', function($http, $scope, $uibModal, station, StationSvc, Utils, ReviewSvc) {
        var self = this;

        self.newReview = {};
        self.station = station;
        self.station.reviews = [];
        self.addReview = _addReview;

        function _getReviews() {
            StationSvc.getReviews(station._id)
                .then(
                    function(response) {
                        if (response) {
                            self.station.reviews = response.station.reviews;
                            if (response.hasComment) {
                                _hideNewReview();
                            }
                            loadStation();
                        } else {
                            toastr.error('Ocorreu um erro ao obter avaliações da estação');
                        }
                    },
                    function(error) {
                        toastr.error('Ocorreu um erro ao obter avaliações da estação');
                    }
                );
        }
        _getReviews();

        function _hideNewReview() {
            $('#collapseNewReview').hide();
            $('#newReviewBtn').hide();
        }

        function _addReview(review) {
            StationSvc.createReview(station._id, review).then(
                function(response) {
                    if (response) {
                        _cleanReview();
                        _getReviews();
                        _hideNewReview();
                        toastr.success('Avaliação criada com sucesso!');
                    } else {
                        toastr.error('Ocorreu um erro ao criar avaliação.');
                    }
                },
                function(error) {
                    toastr.error('Ocorreu um erro ao criar avaliação.');
                }
            );
        }

        self.images = [{
            url: "data:image/JPEG;base64," + Utils.base64ArrayBuffer(station.photo.data)
        }]

        function _cleanReview() {
            self.newReview = {
                user: '',
                comment: '',
                scoreGeneral: 0,
                scoreAttendence: 0,
                scoreReception: 0,
                scoreStructure: 0,
                scorePunctuality: 0
            };
        }
        _cleanReview();

        self.scoreStruct = [
            'Geral', 'Atendimento', 'Recepção', 'Estrutura física', 'Pontualidade'
        ];

        self.filterStationReviews = filterStationReviews;
        self.setReviewScore = setReviewScore;
        self.reportReview = reportReview;

        loadStation();
        calculateStars(self.station);

        $('#collapseNewReview').on('shown.bs.collapse', function() {
            $("#newReviewIcon").removeClass("fa-angle-down").addClass("fa-angle-up");
        });

        $('#collapseNewReview').on('hidden.bs.collapse', function() {
            $("#newReviewIcon").removeClass("fa-angle-up").addClass("fa-angle-down");
        });

        function loadStation() {
            for (var i = 0; i < self.station.reviews.length; i++) {
                self.station.reviews[i].scores = getStructuredScores(self.station.reviews[i]);
            }
        }

        function filterStationReviews(review) {
            return review.comment;
        }

        function setReviewScore(scoreId, score) {
            switch (scoreId) {
                case 0:
                    self.newReview.scoreGeneral = score;
                    break;
                case 1:
                    self.newReview.scoreAttendence = score;
                    break;
                case 2:
                    self.newReview.scoreReception = score;
                    break;
                case 3:
                    self.newReview.scoreStructure = score;
                    break;
                case 4:
                    self.newReview.scoreGeneral = score;
                    break;
            }
            for (var i = score; i > 0; i--) {
                $('#star_' + scoreId + '_' + i).addClass('selected');
            }
            for (var i = 5; i > score; i--) {
                $('#star_' + scoreId + '_' + i).removeClass('selected');
            }
        }

        function getStructuredScores(review) {
            return [{
                label: 'Geral',
                score: getStars(review.scoreGeneral)
            }, {
                label: 'Atendimento',
                score: getStars(review.scoreAttendence)
            }, {
                label: 'Recepção',
                score: getStars(review.scoreReception)
            }, {
                label: 'Estrutura física',
                score: getStars(review.scoreStructure)
            }, {
                label: 'Pontualidade',
                score: getStars(review.scorePunctuality)
            }];
        }

        function calculateStars(station) {
            station.stars = getStars(station.scoreAverage);
        }

        function getStars(score) {
            var stars = [];
            for (var i = 0; i < 5; i++) {
                if (i < score) {
                    if ((score - i) < 1) {
                        stars.push('fa-star-half-o');
                    } else {
                        stars.push('fa-star');
                    }
                } else {
                    stars.push('fa-star-o');
                }
            }
            return stars;
        }

        function reportReview(review) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/confirmation-modal.html',
                controller: 'ConfirmationModalCtrl',
                controllerAs: 'mc',
                resolve: {
                    title: function() {
                        return 'Confirmação';
                    },
                    description: function() {
                        return 'Você tem certeza que quer denunciar este comentário por conteúdo abusivo/ofensivo?'
                    }
                }
            });

            modalInstance.result.then(function() {
                ReviewSvc.complaintReview(review._id)
                    .then(
                        function(response) {
                            toastr.success('Comentário denunciado com sucesso!');
                        },
                        function(error) {
                            console.error(error);
                            toastr.error('Ocorreu um erro ao denunciar a avaliação!');
                        }
                    );
            }, function() {});

        }

    });

}());
