// pravimo RESTful API...

var express = require('express');
var Bourne = require('bourne');
var bodyParser = require('body-parser');

var db = new Bourne('./data.json');
var router = express.Router();

router
      .use(bodyParser.json())
      .route('/contact')
        .get(function (req, res) {
            db.find({ userId : parseInt(req.user.id, 10)}, function (err, data) {
                res.json(data);
            })
        })
        .post(function (req, res) {
            var contact = req.body;
            contact.userId = req.user.id;

            db.insert(contact, function (err, data) {
                res.json(data);
            });
        });

router
    .param('id', function(req, res, next){  // req.params ce da sadrzi bilo sta sto se u putanji nalazilo iza ':', u ovom slucaju :id
        req.dbQuery = { id : parseInt(req.params.id, 10)}
        next();
    })
    .route('/contact/:id')
        .get(function (req, res) {
            db.findOne(req.dbQuery, function (err, data) {
                res.json(data);
            });
        })
        .put(function (req, res) {  //kad pokusamo da UPDATE-ujemo podatak
            var contact = req.body;
            delete contact.$promise;
            delete contact.$resolved;
            db.update(req.dbQuery, contact, function (err, data) {
                res.json(data[0]);
            });
        })
        .delete(function (req, res) {
            db.delete(req.dbQuery, function () {
                res.json(null);
            });
        });

module.exports = router;