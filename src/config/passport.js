var passport = require('passport');

module.exports = function (app) {
	console.log('Configurando passport');
	app.use(passport.initialize());
  app.use(passport.session());
	
	passport.serializeUser(function (user, done) { //se usa para agrupar el usuario hacia la sesión, empaquetar el usuario
		console.log('serializador');
		done(null, user); //primer parametro es el error, como no se esta haciendo nada para que de error se manda null. Se puede poner user.id o el correo o algo para identificar y consultar en la BD
	});

	passport.deserializeUser(function (user, done) { // depende de lo que se ponga el done del serialize se recibe en el primer parametro, capturar lo que estaba guardado
		console.log('deserializador');
		done(null, user);
	});

	require('./strategies/local.strategy')();

};

//passport - local; //es la estategia, en este caso local, se puede usar tambien passport Google o Passport Facebook o passport Twitter usando oAuth

        
