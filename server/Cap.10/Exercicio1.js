var http = require('http');
var server = http.createServer(requestHandler);
    server.listen(1337);

    function requestHandler(request, response) {
        if (request.url === '/message.json') {
            var body = JSON.stringify({message: 'hello-world'});
        }
        response.statusCode = 200;
        response.setHeader('Content-Type', 'appplication/json');
        response.setHeader('Content-Lenght', Buffer.byteLength(body, 'utf-8'));
        response.end(body);
    };

console.log('Server running at http://127.0.0.1:1337/');
