var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
	passport.use(new LocalStrategy({ // decirle a passport que use la estrategia (en este caso local), identifica 
																	 // toma un objeto JSON que el username y password
			usernameField: 'userName', //estos nombres vienen de los campos del formulario del html
			passwordField: 'password',
		},
		function (username, password, done) { //determina si es un logeo exitoso, consultando la BD y mirando si existe usuario
																					// en este caso se va a crear un usuario
			var user = {
				username: username,
				password: password
			};
			done(null, user);
		}));
};
