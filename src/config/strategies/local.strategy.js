var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	mongodb = require('mongodb').MongoClient;

module.exports = function () {
	passport.use(new LocalStrategy({ 	// decirle a passport que use la estrategia (en este caso local), identifica 
																		// toma un objeto JSON que el username y password
			usernameField: 'userName', //estos nombres vienen de los campos del formulario del html (reescriben el valor esperado por
			passwordField: 'password' //por defecto)			
		},
		function (username, password, done) { //determina si es un logeo exitoso, consultando la BD y mirando si existe usuario
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, function (err, db) {
				var collection = db.collection('users');
				collection.findOne({
					username: username
				}, function (err, results) {					
					if (results.password === password) {
						var user = results;
						done(null, user);
					} else {
						done('Bad password', null);
					}
				});
			});
		}));
};
