var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql'); // mantiene lo que paso en app.js con esta variable

var router = function (nav) {
	bookRouter.route('/') // tambien se puede concatenar con . el post, delete etc
		.get(function (req, res) {
			
			var request = new sql.Request();
			request.query('select * from books',
				function (err, recordset) {
					console.log(recordset.recordset);
					res.render('bookListViewer', {
						title: 'Listado de libros',
						nav: nav,
						books: recordset.recordset
					});
				});
		});

	bookRouter.route('/:id') // se asocia a bookRouter otra ruta para mostrar un solo libro
		.all(function (req, res, next) {  // todas los tipos de peticiones get, post, update, la palabra next le dice a express que ejecute el siguiente bloque (get)
			var ps = new sql.PreparedStatement(); //una query con opciones de parametrización
			ps.input('id', sql.Int);
			ps.prepare('select * from books where id = @id', function (err) {
				ps.execute({ id: req.params.id }, function (err, recordset) {
					if (recordset.recordset.length === 0) {
						res.status(404).send('No se encuentra :(');
					} else {
						req.book = recordset.recordset[0];
						next();
					}
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