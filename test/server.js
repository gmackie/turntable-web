//Basic Static Node Server using the Node Static Server Package
var static = require('node-static');

// Create a node-static server instance to serve the './dist' folder

var file = new(static.Server)('./dist');
var port = process.env.PORT || 5000;

require('http').createServer(function (request, response) {
		file.serve(request, response);
}).listen(port);
