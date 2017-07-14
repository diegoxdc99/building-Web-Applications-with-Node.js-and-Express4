var express = require('express'); //da un puntero a express
var bodyParser = require('body-parser'); //analiza el body de la solicitud
var cookieParser = require('cookie-parser'); //analiza cookie para la session
var passport = require('passport'); //se necesita para hacer todo lo que se necesita hacer con passport
var session = require('express-session'); //guarda la información del usuario

var app = express(); // crea una instancia de express
//var sql = require('mssql'); // base de datos

// var config = {
//     user: 'usuario',
//     password: 'Clave',
//     server: 'Servidor',
//     database: 'base de datos',
// };

var config = {
	user: 'sa',
	password: '1234',
    server: 'localhost\\SQLEXPRESS',
	database: 'Books',

};

//sql.connect(config, function(err){
//	console.log(err);
//});

var port = process.env.PORT || 5000; //puerto en el que va a escuchar el servidor web
var nav = [{
				Link: '/Libros',
				Text: 'Libros'
		}, {
				Link: '/Autores',
				Text: 'Autores'
		}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public')); // buscar archivos estaticos en esta ruta 'public'
app.use(bodyParser.json());  // coje un JSON y crea un objeto req.body
app.use(bodyParser());
app.use(bodyParser.urlencoded()); // Coje una URl codificada y crea un objeto req.body
app.use(cookieParser());
app.use(session({
	secret: 'library',
	resave: true,
	saveUninitialized: true
})); //el secreto puede ser lo que quiera

require('./src/config/passport')(app);

app.set('views', './src/views'); // establece una variable views para decirle a node cuales son las vistas para usar plantillas

// configurar motor para EJS
app.set('view engine', 'ejs');

// configurar motor para JADE
// app.set('view engine', 'jade'); // decirle cual motor usar

// configurar motor para handlebars
//var handlebars = require('express-handlebars'); // crea una referencia a Handlebars
//app.engine('.hbs', handlebars({
//	extname: '.hbs'
//})); // establecer el app.engine para decir que los archivos .hbs va a ser manipulados handlebars
//app.set('view engine', '.hbs');  //establecer el view engine para el handlebars

app.use('/Libros', bookRouter); // se usa las rutas de bookRouter con la raiz libros quedando rutas /libros y /libros/sencillo
app.use('/Admin', adminRouter); // se usa las rutas de adminRouter 
app.use('/Auth', authRouter); // se usa las rutas de authRouter

app.get('/', function (req, res) { //agrega una ruta a la raiz de la url
	// res.send('Hola Mundo'); //responde el texto hola mundo
	res.render('index', {
		title: 'Hola desde render',
		nav: nav
	}); //renderizar una vista usando el motor de plantillas se le pasan parametros a la vista por medio del objeto del segundo parametro
});

//app.get('/books', function (req, res) { //agrega una ruta a /books
//	res.send('Hola Books'); //envia el texto hola books
//});

app.listen(port, function (err) { //para que escuche se manda el puerto y un callback que contiene un error
	require('dns').lookup(require('os').hostname(), function (err, add, fam) {
		console.log('Servidor corriendo en: ' + add + ':' + port);
	});
});
