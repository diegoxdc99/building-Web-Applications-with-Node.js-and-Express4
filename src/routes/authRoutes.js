var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function (nav) {
	authRouter.route('/signUp')
		.post(function (req, res) {
			console.log(req.body);
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, function (err, db) {
				var collection = db.collection('users');
				var user = {
					username: req.body.userName,
					password: req.body.password
				};

				collection.insert(user, function (err, result) {
					req.login(result.ops[0], function () { // req.login(req.body, function () {
						res.redirect('/auth/profile');
					});
				});
			});

			//en las app.use (middleware) se crea esta variable que indica que el usuario esta logueado,
			// como en este caso se hizo local no es necesario llamar esta funcion porque la autenticación corre por cuenta 
			// de la lógica del negocio


		});
	authRouter.route('/signIn')
		.post(passport.authenticate('local', { //autentica usando la estrategia local
			failureRedirect: '/' // en caso de que falle usa esta dirección, tiene mas opciones para personalizar
		}), function (req, res) { // en caso de que sea valido ejecuta esta función
			res.redirect('/auth/profile'); // redirecciona al perfil
		});
	authRouter.route('/profile')
		.all(function (req, res, next) {
			if (!req.user) {
				res.redirect('/');
			}
			next();
		})
		.get(function (req, res) {
			res.json(req.user);
		});
	return authRouter;
};

module.exports = router;
