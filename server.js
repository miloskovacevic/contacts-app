var express = require('express');
var api = require('./api');
var app = express();
var users = require('./accounts');

app.use(express.static('public'))
   .use(users)
   .use('/api', api)
   .get('*', function(req, res){
        if(!req.user){
            res.redirect('/login')
        } else {
            res.sendfile('public/main.html');
        }
    })
.listen(3000, function () {
        console.log('Listening on port 3000...');
    });



//linija 6: u api-ju imamo rute /contact i /contact/:id
// browser ce da salje zahtjev ka /api/contact i /api/contact/:id




