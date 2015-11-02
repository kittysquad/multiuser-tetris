// Require our dependencies
var express = require('express'),
    exphbs = require('express-handlebars'),
    http = require('http'),
    routes = require('./routes');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Index Route
app.get('/', routes.index);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Fire it up (start our server)
var server = http.createServer(app).listen(port, function() {
    console.log('Express server listening on port ' + port);
});


// Initialize socket.io
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected');
  
  //socket.broadcast.emit('hi');

  socket.on('boardstate', function(msg){
    //console.log('message: ' + msg);
    socket.emit( "boardstate", msg );
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


});