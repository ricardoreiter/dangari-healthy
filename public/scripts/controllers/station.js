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

		self.newReview = {
			user: '',
			comment: '',
			scoreGeneral: 0,
		  	scoreAttendence: 0,
		  	scoreReception: 0,
		  	scoreStructure: 0,
		  	scorePunctuality: 0		
		};

		self.scoreStruct = [
			'Geral', 'Atendimento', 'Recepção', 'Estrutura física', 'Pontualidade'
		];

		self.filterStationReviews = filterStationReviews;
		self.setReviewScore = setReviewScore;

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