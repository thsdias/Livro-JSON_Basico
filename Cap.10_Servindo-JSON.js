
// CAP.10 - Servindo JSON.


// Listagem 10.1 - Servidor Node extremamente basico.
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


// Listagem 10.2 - Assinatura do metodo require.
require( 'module' ) // espera um unico argumento que representa o modulo a ser carregado.


// Listagem 10.3 - Modulos importados usando o metodo require.
var http = require('http');
var path = require('path');
var url = require('url');
var fileSystem = require('fs');


// Modulo HTTP.

// ***************************************************************************************
//  Responsavel por criar uma instancia do servidor e iniciar solicitacoes HTTP do 
//  lado do servidor, que serao usadas em nosso proxy.
//
//  => http.createServer: É responsavel exclusivamente por instanciar um servidor que sera 
//                        usado para monitorar suas conexoes.
//
//  => http.IncomingMessage: Expoe uma API que é fundamental para obter todas as partes da 
//                           solicitacao.
//                           Por meio dela é possivel obter o URL solicitado, o metodo da 
//                           solicitacao, os cabecalhos fornecidos na solicitacao, e o 
//                           corpo de entidade, se houver um. 
//                           Ver tabela 10.2        
//
//  => http.ServerResponse: Sera por meio da interface da instanciaresponse que poderemos 
//                          fornecer uma resposta de volta a cliente da solicitacao.
//                          Ver tabela 10.3    
//     
//  => http.Server: A instancia do servidor é um gerador de eventos que notifica qualquer 
//                  listener de eventos sobre o evento de entrada por meio da notificacao 
//                  'request'.
//                  Ver tabelas 10.4 e 10.5
//     
// ***************************************************************************************


// Tabela 10.1 - Metodos do modulo HTTP.
/*
    ==========================================================================================
    Metodo                            | Descricao
    ==========================================================================================
    createServer([requestListener])   | Retorna um novo objeto referente a um servidor web.
    ------------------------------------------------------------------------------------------
    request(option, [callback])       | Possibilita efetuar solicitacoes de servidor.
                                      | *Retorna uma instancia de clientRequest
    ------------------------------------------------------------------------------------------                                      
*/


// Tabela 10.2 - Metodos do objeto IncomingMessage.
/*
    ==========================================================================================
        Metodo      | Descricao
    ==========================================================================================
        url         | Retorna o URL presente na solicitacao HTTP na forma de uma string 
    ------------------------------------------------------------------------------------------
        Method      | Retorna o metodo da solicitacao HTTP na forma de uma string
    ------------------------------------------------------------------------------------------
        Headers     | Retorna um objeto contendo os cabecalhos da solicitacao e os valores.
                    | *Os nomes dos cabecalhos estarao em letras minusculas.
    ------------------------------------------------------------------------------------------    
*/


// Tabela 10.3 - Metodos do objeto Server Response.
/*
    ==========================================================================================
    Metodo                            | Descricao
    ==========================================================================================
    response.setHeader(name, value)   | Define o valor de um unico cabecalho para a resposta.
    ------------------------------------------------------------------------------------------    
    respons.write(chunk, [encoding])  | Envia uma parte do corpo da resposta.
                                      | *Pode ser chamado varias vezes.
                                      | Codificacoes possiveis sao binary ou utf8.
    ------------------------------------------------------------------------------------------                                          
    response.statusCode               | Metodo setter usado para gerar a linha de status da 
                                      | resposta.
                                      | *A atribuicao esperada corresponde a um codigo de 
                                      | status HTTP valida.
    ------------------------------------------------------------------------------------------    
    response.end([data], [encoding])  | Sinaliza o final da resposta. Pode ser chamado com um 
                                      | corpo de entidade.
                                      | *Os dados devem estar na forma de string.                                                                            
    ------------------------------------------------------------------------------------------    
*/


// Tabela 10.4 - Metodos do objeto servidor.
/*
    ==========================================================================================
        Metodo                      | Descricao
    ==========================================================================================
     addListener(event, callback);  | Atribui um event handler a um evento em particular.
    ------------------------------------------------------------------------------------------
     listen(port, [hostname])       | Comeca a aceitar conexoes na porta e para o nome de 
                                    | host especificados.
    ------------------------------------------------------------------------------------------    
*/


// Tabela 10.5 - Eventos do objeto servidor.
/*
    ==========================================================================================
        Metodo      | Descricao
    ==========================================================================================
        request     | Emitido sempre que houver uma solicitacao. O event handler recebera 
                    | uma instancia da solicitacao e da resposta.
    ------------------------------------------------------------------------------------------    
*/


// Listagem 10.4 - Fornecendo uma callback com a funcao a ser disparada a cada solicitacao de entrada.
var serverA = http.createServer(requestListener);
//ou
var serverB = http.createServer();
serverB.addListener('request', requestListener);


// Listagem 10.5 - Assinatura do metodo listen.
listen(port, [hostname]);


// Listagem 10.7 - message,json com CORS habilitado.
var http = require('http');
var server = http.createServer(requestHandler);
server.listen(1337, '127.0.0.1');

function requestHandler(request, response) {
    if (request.url === '/message.json') {
        var body = JSON.stringify({ message: 'hello-world' });
        response.statusCode = 200;
        
        // inclusao do cabecalho CORS e a configuracao do seu valor com o token
        // correspondente ao caractere curinga (*).
        response.setHeader('Access-Control-Allow-Origin', '*'); 

        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Content-Length', Buffer.byteLength(body, 'utf8'));
        response.end(body);
    }
};

console.log('Server running at http://127.0.0.1:1337');



// Sevidor JSONP.

// Listagem 10.9 - Esqueleto de um requestHandler para extrair o possivel par chave-valor
//                 jsonp de request.url
function requestHandler(request, response) {
    if (request.ul === '/message.json') {
        // retorna uma entidade JSON.
    }
    else if(request.url.toLowerCase().indexOf('/message.json?jsonp=') > -1) {
        // retorna uma entidade JSONP.
    } else {
        // 404 file not found;
    }    
}

function getParamKey(key, str) {
    var regExp = new RegExp(key.toLowerCase() + '=[^&]*');
    var matchingValue = (str.toLowerCase()).match(regExp);
    for (let i = 0; i < matchingValue.length; i++) {
        var replacedValue = matchingValue[i].replace(key + '=', '');
        matchingValue[i] = replacedValue;
    }
    return decodeURIComponent(matchingValue[0]);
};


// Listagem 10.10 - Servidor JSON e JSONP simples.
var http = require('http');
const { callbackify } = require('util');
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



// Sevidor proxy.

// Listagem 10.11 - Assinatura do parametro callback de request.
callbackify(response);


// Listagem 10.12 - Codigo minimo para tratar uma solicitacao do lado do servidor usando http.request
var http = require('http');
var options = { 
    host: 'json.sandboxed.guru',
    path: '/chapter10/data/imagedata.txt',
    method: 'GET'
};

http.request(options, callback);

function callback(response) {
    console.log(response.statusCode);
    console.log(response.headers);
};


// Listagem 10.13 - Esqueleto do codigo para consumir um corpo de entidade de um objeto IncomingMessage.
var http = require('http');
var options = { 
    host: 'json.sandboxed.guru',
    path: '/chapter10/data/imagedata.txt',
    method: 'GET'
};

http.request(options, callback);

function callback(proxy_response) {
    console.log(response.statusCode);
    console.log(response.headers);
    proxy_response.addListener('data', function(chunkOfData){
        // faz algo com uma porcao de dados.
    });
    proxy_response.addListener('end', function(){
        // final do stream foi alcançado.
    });
};


// Listagem 10.14 - Estrutura completa do esqueleto de codigo para facilitar chamadas do proxy.
var http = require('http');
var options = {
    hostname: 'json.sandboxed.guru',
    path: '/chapter10/data/imagedata.txt',
    method: 'GET'
};
var clientRequest = http.request(options, responseHandler);
clientRequest.end();

function responseHandler(proxy_response) {
    console.log('STATUS: ' + proxy_response.statusCode);
    console.log('HEADERS: ' + proxy_response.headers);

    proxy_response.addListener('data', function(chunkOfData){
        // faz algo com uma porcao de dados.
    });
    proxy_response.addListener('end', function(){
        // final do stream foi alcançado.
    });
}


// Listagem 10.16 - Alterando nosso proxy para que busque arquivos adicionais em json.sandboxed.guru
var http = require('http');
var server = http.createServer();
server.addListener('request', requestHandler);
server.listen(1337, '127.0.0.1');

function requestHandler(request, response) { 
    var body;
    if(request.url.toLowerCase().indexOf('/proxy/') > -1) { 
        var options = {
            host: 'json.sandboxed.guru',
            path: '/chapter10/data/' + request.url.substr(7),
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
