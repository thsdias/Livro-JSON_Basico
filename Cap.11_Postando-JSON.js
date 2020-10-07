
// CAP.11 - Postando JSON.


// Listagem 11.1 - Monitorando o stream em busca de dados
function requestHandler(request, response) {
    request.addListener('data', function(chunk) {
        // faz algo com a porcao de dados.
    });

    // .. mais codigo
}


// Listagem 11.2 - Monitorando o stream para ver se os dados acabaram (evento end)
function requestHandler(request, response) { 
    // ... codigo removido

    request.addListener(end, function() {
        // stream nao contem mais dados
    });
}


// Post de formulario HTML.

// Listagem 11.3 - Um post de formulario HTML
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="formPost" method="POST" content="application/x-www-form-urlencoded">
        First-Name: <input type="text" name="fname" size="25" />
        Last-Name: <input type="text" name="lname" size="25" />
        <input type="submit" />
    </form>
</body>
</html>
*/


// Listagem 11.4 - ExerciseA.js: uma aplicacao local para POST de formulario.
var http = require('http');
var server = http.createServer();
server.addListener('request', requestHandler);
server.listen(1337, '127.0.0.1');

function requestHandler(request, response) {
    console.log(request.url);
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
        // ... mais codigo
    }
    else {
        response.statusCode = 204;
    }
    response.end();
};

console.log('Server running at http://127.0.0.1:1337/index.html');

/* 
Server running at http://127.0.0.1:1337/index.html

/index.html
end os stream

Resultado:
    First-Name: Ben
    Last-Name: Smith

/formPost
<Buffer 66 6e 61 6d 65 3d 42 65 6e 26 6c 6e 61 6d 65 3d 53 6d 69 74 68>
end os stream


Resultado:
    First-Name: Thiago
    Last-Name: Dias

/formPost
<Buffer 66 6e 61 6d 65 3d 54 68 69 61 67 6f 26 6c 6e 61 6d 65 3d 44 69 61 73>
end os stream
*/


// Listagem 11.5 - A funcao getParamKey
function getParamKey(key, str) {
    var regExp = new RegExp(key.toLowerCase() + '=[^&]*');
    var matchingValue = (str.toLowerCase()).match(regExp);
    for (let i = 0; i < matchingValue.length; i++) { 
        var replacedValue = matchingValue[i].replace(key + '=', '');
        matchingValue[i] = replacedValue;
    }
    return decodeURIComponent(matchingValue[0]);
}


// Listagem 11.6 - Parsing de dados x-www-form-urlencoded
var http = require('http');
const { format } = require('path');
const { Script } = require('vm');
var server = http.createServer();
server.addListener('request', requestHandler);
server.listen(1337, '127.0.0.1');

function requestHandler(request, response) {
    console.log(request.url);
    request.setEncoding('utf-8');
    request.addListener('data', function(chunk) {
        console.log(getParamKey("fname", chunk));
        console.log(getParamKey("lname", chunk));
    });

    request.addListener('end', function() {
        console.log('end os stream \n');
    });

    // ...mais codigo.
};    

function getParamKey(key, str) {
    var regExp = new RegExp(key.toLowerCase() + '=[^&]*');
    var matchingValue = (str.toLowerCase()).match(regExp);
    for (let i = 0; i < matchingValue.length; i++) { 
        var replacedValue = matchingValue[i].replace(key + '=', '');
        matchingValue[i] = replacedValue;
    }
    return decodeURIComponent(matchingValue[0]);
}

console.log('Server running at http://127.0.0.1:1337/index.html');


// ver arquivo em server/Cap.11/ExerciseA3.js

/* 
    Server running at http://127.0.0.1:1337/index.html
    /index.html
    end os stream

    /formPost
    ben
    smith
    end os stream
*/


// Processando um POST JSON.

// Listagem 11.7 - Melhorando progessivamente nosso formulario HTML com Ajax.
// <script>
    function ajax() {
        var xhr = new XMLHttRequest();
        xhr.open("POST", "formPost");
        xhr.setRequestHeader("Content-Type", "application/json");
        var input = document.getElementByTagName("input");
        var obj = {
            fname: input[0].value,
            lname: input[1].value
        };
        xhr.send(JSON.stringify(obj));
        return false;
    }
// </script>


// Listagem 11.8 - Determinando o Content-Type dos dados de entrada.
request.addListener('data', function(chunk) {
    if (request.headers['content-type'].indexOf('application/json') > -1) {
        var json = JSON.parse(chunk);
        console.log(json.fname);
        console.log(json.lname);
    } 
    else if (http.request.headers['content-type'].indexOf('application/x-www-form-urlencoded') > -1) { 
    }
});


// Listagem 11.9 - Armazenando todos os dados de entrada em uma variavel.
function requestHandler(request, response) {
    console.log(request.url);
    console.log(request.headers);

    var incomingEntity = '';
    request.setEncoding('utf8');
    request.addListener('data', function(chunk) {
        incomingEntity += chunk;
    });

    request.addListener('end', function() {
        console.log('end of stream \n');
        console.log(incomingEntity);

        if (request.headers['content-type'].indexOf('application/json') > -1) {
            // trata o playload JSON.
        }
        else if(request.headers['content-type'].indexOf('application/x-www.form-urlencoded') > -1) {
            // trata o playload x-www.form-urlencoded.
        }
    });

    if (request.url === '/index.html') {
        response.statusCode = 200;
        response.setHeader('Content-type', 'text/html');
        // ...codigo removido
    } else {
        response.statusCode = 204;
        response.end();
    }
}
console.log('response-end');


// Listagem 11.10 - Resposta do exercicio referente ao corpo de entidade da entrada.
/* 
node exercise11.2.js
Server running at http://127.0.0.1:1337/index.html
/index.html
response-end
/formPost
response-end
end of strem

Raw entity: fname=Ben&lname=Smith
*/


// Listagem 11.11 - Incluindo a capacidade de responder a solicitacao preflight.
// ...codigo removido
function requestHandler(request, response) {
    console.log(request.url);
    if (request.method === 'POST') {
        // ...codigo removido.
    }
    else if(request.method === 'GET') {
        // ...codigo removido.
    }
    else if(request.method === 'OPTIONS') {        
    }
    console.log('response-end');
}


// Listagem 11.12 - Mostrando a configuracao dos cabecalhos CORS para preflight.
/* 
...
}
else if(request.method === 'OPTIONS') { 
    response.statusCode = 200;
    if (request.url === '/formPost') {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Accept-Language, Accept-Encoding, User-Agent, Host, Content-Length, Connection, Cache-Control');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    }

    response.end();
}
*/


// Listagem 11.13 - Autorizando formPost para todas as origens.
// ...codigo removido.
request.addListener('end', function() {
    console.log('end of strem \n');
    console.log('Raw entity: ' + incomingEntity);

    if (request.headers['content-type'].indexOf('application/json') > -1) {
        data = JSON.parse(incomingEntity);

        if (request.url === '/formPost') {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(incomingEntity);
        }
    }
    else if(request.headers['content-type'].indexOf('application/x-www.form.urlencoded') > -1) {
        if (request.url === '/formPost') {
            response.statusCode = 200;
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Content-type', 'text/html');
                var fname = getParamKey('fname', incomingEntity);
                var lname = getParamKey('lname', incomingEntity);
            response.write('<!DOCTYPE html>');
            response.write('<html lang="en">');                    
            response.write('<body>');
            response.write('<form action="formPost" method="POST" content="application/x-www-form-urlencoded">');                    
            response.write('</body>');
            response.end();
            return;
        }
    }
});
// ...codigo removido