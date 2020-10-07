/* require */
var cradle = require('D:/Git/Estudos/Livros/JSON_Basico/server/Cap.12/node_modules/cradle');
var http = require('http');

/* HTTP */
var server = http.createServer();
server.addListener('request', requestHandler);
server.listen(1337, '127.0.0.1');

/* Cradle */
var DBConnection = cradle.Connection;
var couchDB = new DBConnection('127.0.0.1', 5984, { 
    auth: { username: 'admin', password: 'abc123' }, 
    cache: true,
    raw: false,
    forceSave: true
});

var gbDataBase = couchDB.database('visitors');
    gbDataBase.exists(function(err, exists) {
        if (err) {
            console.log('error: ', err);
        } else if(exists) {
            console.log('the guestbook db exists');
        } else {
            console.log('database does not exists');
            gbDataBase.create();
        }
    });

/* Trata solicitacoes de entrada */    
function requestHandler(req, response) {
    if (req.method === 'POST') {
        var incomingEntity = '';
        var data;

        req.addListener('data', function(chunk){
            incomingEntity += chunk
        });

        req.addListener('end', function(){
            if (req.headers['content-type'].indexOf('application/json') > -1) { 
                data = JSON.parse(incomingEntity);
            } else if(req.headers['content-type'].indexOf('application/x-www-form-urlencoded') > -1) {
                data = parseQueryStringToObject(incomingEntity);
                return;
            }

            saveToDB(data, response);
        });
    } else if(req.method === 'GET') {
        if(req.url === '/index.html') {
            response.statusCode = 200;
            response.setHeader('Content-type', 'text/html');
            response.write('<!DOCTYPE html>');
            response.write('<html lang="en">');
            response.write('<body>');
            response.write('<form action="formPost" method="POST" onsubmit="return ajax();" content="application/x-www-form-urlencoded">');
            response.write('First-Name:');
            response.write('<input type="text" id="fname" size="25">');
            response.write('Last-Name:');
            response.write('<input type="text" id="lname" size="25">');
            response.write('<input type="submit">');
            response.write('</form>');
            response.write('<script>');
            response.write('function ajax() {');
            response.write('var xhr = new XMLHttpRequest();');
            response.write('xhr.open("POST", "formPost");');
            response.write('xhr.onload = function() { console.log(this.responseText); };');
            response.write('xhr.setRequestHeader("Content-Type", "application/json");');
            response.write('xhr.setRequestHeader("Accept", "application/json");');
            response.write('var input = document.getElementsByTagName("input");');
            response.write('var obj = {');
            response.write('fname: input[0].value,');
            response.write('lname: input[1].value');
            response.write('};');
            response.write('xhr.send(JSON.stringify(obj));');
            response.write('return false;');
            response.write('}');
            response.write('</script>');
            response.write('</body>');
            response.write('</html>');
            response.end();
        } else {
            response.statusCode = 204;
            response.end();
        }
    } else if(req.method === 'OPTIONS') {
        response.statusCode = 200;

        if(req.url === '/formPost') {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Accept-Language, Accept-Encoding, User-Agent, Host, Content-Length, Connection, Cache-Control');
            response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        }

        response.end();
    }

    console.log('response = end');
};

console.log('Server running at http://127.0.0.1:1337/index.html');

var saveToDB = function(obj, response) {
    gbDataBase.save(obj, function(err, res) {
        response.setHeader('Access-Control-Allow-Origin', '*');

        if(err) {
            response.statusCode = 500;
            console.log('error: ', err);
        } else if(res) {
            response.statusCode = 200;
            var stringResponse = JSON.stringify(res);
            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Content-Length', Buffer.byteLength(stringResponse, 'utf8'));
            response.write(stringResponse);
        }
        response.end();
    });
};

var parseQueryStringToObject = function(queryString) {
    var params = {}, queries, temp, i, l;

    // Separa em pares chave/valor.
    queries = queryString.split('&');

    // Converte o array de strings em um objeto.
    for (let i = 0, l = queries.length; i < l; i++) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }

    return params;
};
