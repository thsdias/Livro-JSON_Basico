var http = require('http');
var server = http.createServer();
server.addListener('request', requestHandler);
server.listen(1337, '127.0.0.1');

function requestHandler(request, response) { 
    var body;
    if(request.url.toLowerCase().indexOf('/proxy/') > -1) { 
        var options = {
            host: 'json.sandboxed.guru',
            path: '/chapter10/data/imagedata.txt',
            method: 'GET'
        };
        var clientRequest = http.request(options, responseHandler);
        clientRequest.end();

        function responseHandler(proxy_response) {
            response.writeHead(proxy_response.statusCode, proxy_response.headers);
            proxy_response.addListener('data', function(chunkOfData){
                response.write(chunkOfData);
            });
            proxy_response.addListener('end', function(){
                response.end();
            });
        }
    } else { 
        response.statusCode = 200;        
        body = 'proxy calls occur at /proxy/';
        response.setHeader('Content-Type', 'text/plain');
        response.setHeader('Content-Length', Buffer.byteLength(body, 'utf-8'));
        (body) ? response.end(body) : response.end();
    } 
};

console.log('Server running at http://127.0.0.1:1337/');
