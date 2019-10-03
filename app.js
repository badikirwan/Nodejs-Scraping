var http = require('http');
var express = require('express');
var Xray = require('x-ray');
var app = express();
var x = Xray();
var port = process.env.PORT || 8080;
var server = http.createServer(app);

app.get('/new-movie-soon', function(req, res){
   x('http://www.imdb.com/movies-coming-soon/?ref_=nv_mv_cs_4','div .list_item', [{
       title: 'tbody h4',
       description: 'tbody .outline',
       director: 'tbody .txt-block',
       director_description: x('tbody .txt-block a@href', 'tbody #name-bio-text'),
       link: 'tbody h4 a@href'
   }])(function(err, data) {
       return res.json(data);
   })
});

server.listen(port, function() {
   console.log('Server listening on port '+  server.address().port);
});

exports = module.exports = app;