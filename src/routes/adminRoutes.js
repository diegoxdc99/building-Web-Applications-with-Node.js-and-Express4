var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [ 
{ id: 1,
    title: 'Titulo 1  ',
    genre: 'Genero 1  ',
    author: 'Author 1  ',
    read: false },
  { id: 2,
    title: 'Titulo 2  ',
    genre: 'Genero 2  ',
    author: 'Author 2  ',
    read: false },
  { id: 3,
    title: 'Titulo 3  ',
    genre: 'Genero 3  ',
    author: 'Author 3  ',
    read: true },
  { id: 4,
    title: 'Titulo 4  ',
    genre: 'Genero 4  ',
    author: 'Author 4  ',
    read: true },
  { id: 5,
    title: 'Titulo 5  ',
    genre: 'Genero 5  ',
    author: 'Author 5  ',
    read: false } 
];

var router = function (nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp'; // url y puerto por estandar de mongodb
            mongodb.connect(url, function (err, db){ //conectarse a mongodb parametros error y la base de datos
                var collection = db.collection('books'); //es como las tablas en sql
                collection.insertMany(books, function(err, result){ //inserta varios registros. segundo parametro resultado (la misma colección pero con las cosas de mongo)
                    res.send(result);
                    db.close();
                });
            });  
        });

    return adminRouter;
};

module.exports = router;