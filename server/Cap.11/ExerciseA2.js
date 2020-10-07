var http = require('http');
var server = http.createServer();
server.addListener('request', requestHandler);
server.listen(1337, '127.0.0.1');

function requestHandler(request, response) {
    console.log(request.url);
    request.setEncoding('utf-8');
    request.addListener('data', function(chunk) {
        console.log(chunk);
    });

    request.addListener('end', function() {
        console.log('end os stream \n');
    });

    if(request.url === '/index.html') {
        response.statusCode = 200;
        response.setHeader('Content-type', 'text/html');
        response.write('<!DOCTYPE html>');
        response.write('<html lang="en">');
        response.write('<head>');
        response.write('<meta charset="UTF-8">');
        response.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
        response.write('<title>Document</title>');
        response.write('</head>');
        response.write('<body>');
        response.write('<form action="formPost" method="POST" content="application/x-www-form-urlencoded">');
        response.write('First-Name: <input type="text" name="fname" size="25" />');
        response.write('Last-Name: <input type="text" name="lname" size="25" />');
        response.write('<input type="submit" />');
        response.write('</form>');
        response.write('</body>');
        response.write('</html>');
    }
    else {
        response.statusCode = 204;
    }
    response.end();
};

console.log('Server running at http://127.0.0.1:1337/index.html');
