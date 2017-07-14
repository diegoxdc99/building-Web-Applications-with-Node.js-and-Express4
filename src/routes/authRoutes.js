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
		.post(function(req, res){
		console.log('holaaa');
			console.log( req.body);
			var authenticateOptions = {
				failureRedirect: '/',  // si falla la autenticación redireccione al index
			};
		
				// passport.authenticate('local', {
				// 	successRedirect: '/auth/profile',
				// 	failureRedirect: '/'
				// });
				// console.log(passport.authenticate);
			
			passport.authenticate('local', authenticateOptions, function(req, res){ //autentica usando la estrategia local
				console.log(err);
				res.redirect('/auth/profile');
			});
		});
	authRouter.route('/profile')
		.get(function (req, res) {
			res.json(req.user);
		});
	return authRouter;
};

module.exports = router;
