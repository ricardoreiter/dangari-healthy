(function () {

	angular.module('dangariHealthy').controller('LoginController', function($http, $scope, LoginService, LocalStorageService) {
		var self = this;

		self.user = {
			login: '',
			password: ''
		};

		self.newUser = {
			name: '',
		  	login: '',
		  	password: '',
			confirmPassword: ''
		}

		self.login = login;
		self.register = register;

		checkIfLogged();

		function checkIfLogged() {
			var token = LocalStorageService.getAuthToken();
			if (token) {
				LoginService.getCurrentUser()
	                .then(
	                    function(response) {
	                    	if (response) {
	                    		self.user = response.data;
	                        	toastr.success('Logado com sucesso!');
	                    	} else {
	                    		toastr.error('Ocorreu um erro ao realizar login');
	                    	}
	                    },
	                    function(error) {
	                        console.error(error);
	                        toastr.error('Ocorreu um erro ao realizar login');
	                    }
	                );
			}
		}

		function login() {
			LoginService.login(self.user)
                .then(
                    function(response) {
                    	if (response) {
                    		LocalStorageService.setAuthToken(response.token);
                        	toastr.success('Logado com sucesso!');
                    	} else {
                    		toastr.error('Ocorreu um erro ao realizar login');
                    	}
                    },
                    function(error) {
                        console.error(error);
                        toastr.error('Ocorreu um erro ao realizar login');
                    }
                );
		}

		function register() {
			LoginService.register(self.newUser)
                .then(
                    function(response) {
                        toastr.success('Registrado com sucesso!');
                    },
                    function(error) {
                        console.error(error);
                        toastr.error('Ocorreu um erro ao registrar usuário');
                    }
                );
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
