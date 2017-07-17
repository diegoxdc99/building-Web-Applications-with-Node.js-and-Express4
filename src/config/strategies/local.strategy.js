var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
	passport.use(new LocalStrategy({ // decirle a passport que use la estrategia (en este caso local), identifica 
																	 // toma un objeto JSON que el username y password
			usernameField: 'userName',  //estos nombres vienen de los campos del formulario del html (reescriben el valor esperado por
			passwordField: 'password'	//por defecto)			
		},
		function (username, password, done) { //determina si es un logeo exitoso, consultando la BD y mirando si existe usuario
			var user = {
				username: username,
				password: password
			};
			console.log('esta es la super estrategia que no funciona');
			return done(null, user);
		}));
};
