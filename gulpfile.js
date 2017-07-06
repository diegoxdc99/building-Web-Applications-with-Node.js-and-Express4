var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js']; // los archivos que importan, node_modules no son propios asi que no deberia ser procesado

// verificar estandar de programación
gulp.task('style', function () {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs());
});

// en el html se injecta poniendo comentarios 'bower:css' o 'bower:js' y cerrando con 'endbower' lo mismo con inject para los propios
gulp.task('inject', function () {
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');

	var injectSrc = gulp.src(['./public/css/*.css',
							  './public/js/*.js'], {
		read: false
	});

	var injectOptions = {
		ignorePath: '/public'
	};

	var options = {
		bowerJson: require('./bower.json'), //bower.json local
		directory: './public/lib', //donde estan los paquetes de bower
		ignorePath: '../../public' //ignora esa parte de la URL 
	};

	return gulp.src('./src/views/*.jade') //html al que va a tener las dependencias
		.pipe(wiredep(options)) // se le manda las opciones
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function () {
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT': 3000
		},
		watch: jsFiles
	};

	return nodemon(options)
		.on('restart', function (ev) {
			console.log('reiniciando...');
		});
});
