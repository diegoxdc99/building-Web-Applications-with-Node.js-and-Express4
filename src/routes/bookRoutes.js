var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var router = function (nav) {
	bookRouter.use(function(req, res, next){
		if (!req.user) {
			res.redirect('/');
		}
		next();						 
	});
	bookRouter.route('/') // tambien se puede concatenar con . el post, delete etc
		.get(function (req, res) {
			var url = 'mongodb://localhost:27017/libraryApp'; // url y puerto por estandar de mongodb
			mongodb.connect(url, function (err, db){	
				var collection = db.collection('books');
				collection.find({}).toArray(function(err, result){//entre los {} se puede poner la query (en este caso se quieren todos)
					res.render('bookListViewer', {
						title: 'Listado de libros',
						nav: nav,
						books: result
					});	
				});  								
			});					
		});

	bookRouter.route('/:id') // se asocia a bookRouter otra ruta para mostrar un solo libro
		.all(function (req, res, next) {  // todas los tipos de peticiones get, post, update, la palabra next le dice a express que ejecute el siguiente bloque (get)
			var id = new ObjectId(req.params.id);
			var url = 'mongodb://localhost:27017/libraryApp'; // url y puerto por estandar de mongodb
			mongodb.connect(url, function (err, db){	
				var collection = db.collection('books');
				collection.findOne({_id: id},function(err, result){//entre los {} se puede poner la query (devuelve el primero que encuentre)
					res.render('bookView', {
						title: 'Listado de libros',
						nav: nav,
						book: result
					});	
				});  								
			});	
		})
		.get(function (req, res) {
			res.render('bookView', {
				title: 'Libro sencillo',
				nav: nav,
				books: req.book
			});
		});

	return bookRouter;
};

module.exports = router;