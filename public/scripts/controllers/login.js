(function () {

	angular.module('dangari-healthy').controller('LoginCtrl', function($http, $scope, LoginSvc, LocalStorageSvc) {
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
		self.loginBtnClick = loginBtnClick;
		self.registerBtnClick = registerBtnClick;

		checkIfLogged();

		function loginBtnClick() {
			$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$('#login-form-link').addClass('active');
		}

		function registerBtnClick() {
			$("#register-form").delay(100).fadeIn(100);
	 		$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$('#register-form-link').addClass('active');
		}

		function checkIfLogged() {
			var token = LocalStorageSvc.getAuthToken();
			if (token) {
				LoginSvc.getCurrentUser()
	                .then(
	                    function(response) {
	                    	if (response) {
	                    		self.user = response.data;
	                        	toastr.success('Logado com sucesso!');
	                        	window.location = '/#/';
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
			LoginSvc.login(self.user)
                .then(
                    function(response) {
                    	if (response) {
                    		LocalStorageSvc.setAuthToken(response.token);
                        	toastr.success('Logado com sucesso!');
                        	window.location = '/#/';
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
			LoginSvc.register(self.newUser)
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