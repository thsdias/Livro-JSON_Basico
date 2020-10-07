
var http = require('http');
var server = http.createServer();
server.addListener('request', requestHandler);
server.listen(1337, '127.0.0.1');

function requestHandler(request, response) {
    var body;
    if (request.ul === '/message.json') {
        // retorna uma entidade JSON.
        response.statusCode = 200;
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Content-Type', 'application/javascript');
        body = JSON.stringify({message : 'hello-world'});
    }
    else if(request.url.toLowerCase().indexOf('/message.json?jsonp=') > -1) {
        // retorna uma entidade JSONP.
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/javascript');
        var jsonText = JSON.stringify({message : 'hello-world'});
        body = getParamKey('jsonp', request.url) + '(' + jsonText + ');';
    } else {
        // 404 file not found;
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        body = '<h1>404</h1> page not found';
    } 

    (body) ? response.end(body) : response.end();
};

function getParamKey(key, str) {
    var regExp = new RegExp(key.toLowerCase() + '=[^&]*');
    var matchingValue = (str.toLowerCase()).match(regExp);
    for (let i = 0; i < matchingValue.length; i++) {
        var replacedValue = matchingValue[i].replace(key + '=', '');
        matchingValue[i] = replacedValue;
    }
    return decodeURIComponent(matchingValue[0]);
};

console.log('Server running at http://127.0.0.1:1337/');
