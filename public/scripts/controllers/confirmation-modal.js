(function () {

	angular.module('dangari-healthy')
		   .controller('ConfirmationModalCtrl', ConfirmationModalCtrl);

	function ConfirmationModalCtrl($scope, $uibModalInstance, title, description) {
		var self = this;

		self.title = title;
		self.description = description;
		self.yesClick = yesClick;
		self.noClick = noClick;

		function yesClick() {
			$uibModalInstance.close(true);
		}

		function noClick() {
			$uibModalInstance.dismiss('cancel');
		}

	}

}());