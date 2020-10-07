var http = require('http');
var server = http.createServer();
server.addListener('request', requestHandler);
server.listen(1337, '127.0.0.1');

function requestHandler(request, response) {
    console.log(request.url);
    console.log(request.headers);

    var body = 'Hello World!!';
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plan');
    response.setHeader('Content-Length', Buffer.byteLength(body, 'utf-8'));
    response.end(body);
};
console.log('Server running at http://127.0.0.1:1337/');
