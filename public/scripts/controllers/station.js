(function () {

	angular.module('dangari-healthy').controller('StationCtrl', function($http, $scope) {
		var self = this;

		self.station = {
			name: 'UNIMED - Vila Nova',
			scoreAverage: 3.5,
			reviews: [{
			  	scoreGeneral: 0,
			  	scoreAttendence: 1,
			  	scoreReception: 2,
			  	scoreStructure: 2,
			  	scorePunctuality: 0,
			  	user: 'Gabriel Biz',
			  	comment: 'Uma bostaaaa, odieiii, uiii'
			}, {
			  	scoreGeneral: 5,
			  	scoreAttendence: 5,
			  	scoreReception: 5,
			  	scoreStructure: 5,
			  	scorePunctuality: 5,
			  	user: 'Seu zeca',
			  	comment: 'Rapaz que atendimento bão sô se é loco o atendente me atendeu bem ta ligado pq o baguio é doido mermo bixão o.O'
			}]
		};

		self.images = [{
				url: 'http://localhost:3000/assets/modelo-caso-de-uso-alteracoes.png'
			}, {
				url: 'http://localhost:3000/assets/modelo-caso-de-uso-cadastro.png'
		}];

		self.filterStationReviews = filterStationReviews;

		loadStation();
		calculateStars(self.station);

		$('#collapseNewReview').on('shown.bs.collapse', function () {
	       $("#newReviewIcon").removeClass("fa-angle-down").addClass("fa-angle-up");
	    });

	    $('#collapseNewReview').on('hidden.bs.collapse', function () {
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

		function getStructuredScores(review) {
			return [
				{
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
				}
			];
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

	});

}());