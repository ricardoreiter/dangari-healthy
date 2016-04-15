(function () {

	angular.module('dangariHealthy').controller('LoginController', function($http, $scope, LoginService) {
		var self = this;

		self.user = {
			username: '',
			password: ''
		};

		self.newUser = {
			username: '',
			email: '',			
			password: '',
			confirmPassword: ''
		}

		self.login = login;
		self.register = register;

		function login() {
			toastr.error('Login');
		}

		function register() {
			toastr.error('register');
		}

	});

}());

$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});
