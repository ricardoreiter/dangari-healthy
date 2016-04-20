(function () {

	angular.module('dangariHealthy').controller('StationViewController', function($http, $scope, LoginService, LocalStorageService) {
		var self = this;

		self.station = {
			name: 'UNIMED - Vila Nova',
			reviews: [{
			  	scoreGeneral: 0,
			  	scoreAttendence: 1,
			  	scoreReception: 2,
			  	scoreStructure: 2,
			  	scorePunctuality: 0,
			  	comment: 'Uma bostaaaa, odieiii'
			}, {
			  	scoreGeneral: 5,
			  	scoreAttendence: 5,
			  	scoreReception: 5,
			  	scoreStructure: 5,
			  	scorePunctuality: 5,
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
					score: scoreToList(review.scoreGeneral)
				}, {
					label: 'Atendimento',
					score: scoreToList(review.scoreAttendence)
				}, {
					label: 'Recepção',
					score: scoreToList(review.scoreReception)
				}, {
					label: 'Estrutura física',
					score: scoreToList(review.scoreStructure)
				}, {
					label: 'Pontualidade',
					score: scoreToList(review.scorePunctuality)
				}
			];
		}

		function scoreToList(score) {
			var returnList = [];
			for (var i = 0; i < score; i++) {
				returnList.push(i);
			}
			return returnList;
		}

	});

}());