
// CAP.9 - Recursos cross-origin.

// SOAP: Same-Origin Policy (politica de mesma origem). Restringe quais mensagens de rede uma 
//       origem pode enviar para a outra.         


// Listagem 9.1 - Determinando se devemos usar XDomainRequest ou a interface XMLHttpRequest Level 2
//                para uma solicitacao cross-origin.
var xhr= new XMLHttpRequest();
    // Para IE 8 ou 9 deve-se instanciar XDomainRequest.
    xhr= ("withCredentials" in xhr) ? xhr : new XDomainRequest();
    xhr.open("GET","http://json.sandboxed.guru/chapter9/data/images.json");
    xhr.onload = function() { 
                                alert(this.responseText);
                            };
    xhr.onerror = function() {
        console.error('Error Occurred');
    };
    xhr.send();

// Solicitacao feita à http://sandboxed.guru/xss-exercise.html.
/* 
    Access to XMLHttpRequest at 'http://json.sandboxed.guru/chapter9/data/images.json' from 
    origin 'http://sandboxed.guru' has been blocked by CORS policy: 
    No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/

// Solicitacao feita à http://json.sandboxed.guru/chapter9/xss-exercise.html.
/* 
    Solicitacao de mesma origem sendo feita para json.sandboxed.guru a partir de json.sandboxed.guru
{
    "images": [
        {
            "title": "Image One",
            "url": "img/AndroidDevelopment.jpg"
        }, {
            "title": "Image Two",
            "url": "img/php.jpg"
        }, {
            "title": "Image Three",
            "url": "img/Rails.jpg"
        }, {
            "title": "Image Three",
            "url": "img/Android.jpg"
        }
    ]
}    
*/


// Listagem 9.2 - Sintaxe de um URL HTTP.

// ******************************************************************************************
//
// scheme://domain:port/path/?key=value
//
//     => Esquema (scheme): As vezes chamado de protocolo, define como um recurso especificado
//                          sera obtido. Podem ser especificados como ftp, http e https.
//                
//     => Dominio (domain): Convertido internamente para um endereco IP estatico, dominio é 
//                          o meio amigavel aos seres humanos para se referir a um destino 
//                          especifico.
//
//     => Porta (port): É um endpoint opcional, que pode ser usado para especificar uma 
//                      aplicacao em particular executando em um endereco IP comun.
//                      No esquema HTTP, a porta default é 80, enquanto no HTTPS a porta 
//                      default é 443.
//
// ******************************************************************************************


// Tabela 9.1 - A politica de mesma origem em funcionamento, mostrando se uma origem esta 
//              autorizada a fazer uma solicitacao.
/*
        Origem da solicitacao          |        Origem do recurso                   | Permitido |  Motivo
    -------------------------------------------------------------------------------------------------------
    http://json.sandboxed.guru/a.html  | http://json.sandboxed.guru/b.php           |  True     |   
    http://json.sandboxed.guru/a.html  | http://json.sandboxed.guru/chapter8/b.php  |  True     |  
    http://json.sandboxed.guru/a.html  | https://json.sandboxed.guru/b.php          |  False    | Esquema 
    http://json.sandboxed.guru/a.html  | http://json.sandboxed.guru:81/b.php        |  False    | Porta
    http://json.sandboxed.guru/a.html  | http://json.sandboxed.guru:80/b.php        |  True     |  
    http://json.sandboxed.guru/a.html  | http://sandboxed.guru/b.php                |  False    | Dominio


    * Para impedir que algum script force a solicitacao, determinados cabecalhos nao podem
      ser definidos por meio do metodo setRequestHeader do objeto XMLHttpRequest:
        - Host
        - Origin 
        - Referer 
        - Via
*/


// Contornando a politica de mesma origem.
/* 
    O navegador limita o acesso a rede entre duas origens diferentes para garantir que a 
    politica de mesma origem seja obedecida.
    Entretanto como a SOAP foi ajustada de forma ad hoc ao longo do tempo, ha algumas 
    brechas, das quais é possivel tirar proveito para facilitar a realizacao de solicitacoes 
    cross-origen.

    * CORS

    * Proxy

    * JSONP
*/


// Listagem 9.3 - Autorizando todas as origens de acordo com o recurso atual.

/* 
    // Mostra como um recurso pode conceder a autorizacao adequada a todas as origens.
    <?php 
        header('Access-Control-Allow-Origin: *');
        $headers=getallheaders();
        $origin=$headers['Origin'];

        echo '{"message":"congratulations '.$origin .', 
                your origin has been successfully authorized by your user-agent"}';

    ?>
*/


// Listagem 9.4 - Uma solicitacao GET sendo feita para cors.php
var xhr = new XMLHttpRequest();

if(!"withCredentials" in xhr)
    xhr = new XDomainRequest();

xhr.open("GET", "http://json.sandboxed.guru/chapter9/cors.php");
xhr.onload = function() {
    console.log(this.responseText);
};

xhr.send();
// {"message":"congratulations chrome-search://local-ntp, your origin has been successfully authorized by your user-agent"}


// Tabela 9.2 - Cabecalhos CORS simples.
/*
    => Os cabecalhos desta tabela dizem respeito a todos os aspectos das solicitacoes simples: 

    Cabecalho                          |   Funcao                                        |  Configurado por
   -----------------------------------------------------------------------------------------------------------
    Orgin                              |   Indica a origem da solicitacao cross-origin.  |  Agente de usuario
                                       |                                                 |
    Access-Control-Allow-Origin        |   Indica se um recurso pode ser compartilhado   |  Servidor
                                       |   retornando o valor configurado no cabecalho   |
                                       |   de solicitacao Origin, * ou null.             |
                                       |                                                 |
    Access-Control-Allow-Credentials   |   Indica se a resposta a solicitacao pode ser   |  Servidor
                                       |   exposta quando a flag de credentials omitidas |
                                       |   nao estiver sendo usada.                      |
                                       |                                                 |
    Access-Control-Expose-Headers      |   Indica quais cabecalhos podem ser expostos de |  Servidor
                                       |   forma segura a API do objeto XMLHttpRequest   |
                                       |   por meio do metodo getResponseHeaders.        |
*/


// Tabela 9.3 - Cabecalhos CORS preflight.
/*
    => Os cabecalhos desta tabela dizem respeito as solicitacoes mais complexas que exigem 
       uma solicitacao inicial para determinar se o servidor reconhece os aspectos configurados 
       da solicitacao que nao sao reconhecidos como simpples.

    Cabecalho                          |   Funcao                                        |  Configurado por
   -----------------------------------------------------------------------------------------------------------
    Access-Control-Request-Headers     |   Indica quais cabecalhos serao usados na       |  Agente de usuario
                                       |   solicitacao propriamente dita.                |
                                       |                                                 |
    Access-Control-Request-Method      |   Indica qual metodo sera usado na solicitacao  |  Agente de usuario
                                       |   propriamente dita                             |
                                       |                                                 |
    Access-Control-Allow-Methods       |   Indica quais metodos podem ser usados durante |  Servidor
                                       |   a solicitacao para um recurso visado.         |                                       
                                       |                                                 |
    Access-Control-Allow-Headers       |   Indica os nomes dos campos de cabecalho que   |  Servidor
                                       |   podem ser usados durante a solicitacao do     |
                                       |   recurso visado.                               |
                                       |                                                 |
    Access-Control-Max-Age             |   Indica por quanto tempo os resultados de uma  |  Servidor
                                       |   solicitacao preflight podem permanecer        |
                                       |   em cache.                                     |
                                       
*/


// Proxy:

// Listagem 9.5 - Solicitacao HTTP para o recurso /proxy.php autorizado.
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://sandboxed.guru/proxy.php");
xhr.onload = function() {
    console.log(this.responseText);
};
xhr.onerror = function() {
    console.log("Error ocurred");
};
xhr.send(); // Append ?uri=xxxx to the target resource where xxxx is the value of the URI on json.sandboxed.guru/chapter9/data/xxxx


// Listagem 9.6 - Implementacao de proxy do lado do servidor PHP.
/*
<?php 
    if($_SERVER['REQUEST_METHOD']) === 'GET' {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://json.sandboxed.guru/chapter9/data/images.json');
        curl_setopt($ch, CURLOPT_RETURNTRASNFER, false);
        $output = curl_exec($ch);
        curl_close($ch);
    }
?>
*/


// Listagem 9.7 - Um objeto xhr cujo recurso-alvo tem um parametro de string de query
//                indicando o URI a ser obtido pelo proxy.
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://sandboxed.guru/proxy.php?uri=images.json");
xhr.onload = function() {
    console.log(this.responseText);
};
xhr.onerror = function() {
    console.log("Error ocurred");
};
xhr.send();


// Listagem 9.8 - Codigo PHP que leva em conta o parametro de URL jsonp.
/*
// Retorna o proxy da listagem 9.6 com o novo parametro de string de query levado em consideracao.    
<?php 
    if(strtolower($_SERVER['REQUEST_METHOD']) === 'get') { 
        $uri = (isset($_GET[uri]));

        if($uri) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'http://json.sandboxed.guru/chapter9/data/images.json');
            curl_setopt($ch, CURLOPT_RETURNTRASNFER, false);
            $output = curl_exec($ch);
            curl_close($ch);
        } else {
            header('HTTP/1.1 400 Bad Request');
            echo 'Append ?uri=xxxx to the target resource where xxxx is the value of the 
                  URI on json.sandboxed.guru/chapter9/data/xxxx';
        }         
    }
?>
*/


// JSONP: 
// JSON Padding (JSON com preenchimento). Diz respeito a uma tecnica em particular, em que 
// um cliente pode obter dados JSON simplesmente tirando proveito do elemento HTML <script>


// Listagem 9.9 - Tag de script que tem como alvo o script jQuery hospedado externamente em um CDN.
// <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>


// Listagem 9.10 - Conteudo JSON em imagesA.json
/* 
{
    "images": [
        {
            "title": "Image One",
            "url": "img/AndroidDevelopment.jpg"
        }, {
            "title": "Image Two",
            "url": "img/php.jpg"
        }, {
            "title": "Image Three",
            "url": "img/Rails.jpg"
        }, {
            "title": "Image Four",
            "url": "img/TSQL.jpg"
        }
    ]
}
*/


// Listagem 9.11 - Tag de script referenciando imagesA.json
// <script src="http://json.sandboxed.guru/chapter8/data/imagesA.json"></script> // Erro Sintaxe.


// Listagem 9.12 - Fornecendo uma colecao JSON a engine do script por meio de eval.
eval( '{"test":"abc"}' ); // falha.


// Listagem 9.13 - Encapsulando o JSON com o operador de agrupamento (( )).
eval('({"teste":"abc"})');  // Parse bem sucedido.


// Listagem 9.14 - Exemplo do modelo JSONP.
someMethod({"test":"abc"});  // ReferenceError: someMethod is not defined.


// Listagem 9.15 - Chamada do metodo avaliado e o fornecimento de um argumento JSON.
eval('someMethod( ({"test":"abc"}) )');
function someMethod(data) {
    console.log(data.test);     // abc.
}


// Listagem 9.16 - Solicitacao JSONP.
/*
    // Declara uma funcao que vai operar em uma porcao de dados fornecida, e a atribui a variavel 
    // test podendo ser referenciada posteriormente.
    <script>
        var test = function (data) {
            // conteudo..
        }
    </script>
    <script src="http://json.sadboxed.guru/chapter9/data/jsonp.php?jsonp=test"></script>
*/


// Listagem 9.17 - Tratamento de JSON ou JSONP de acordo com o fornecimento do parametro jsonp.
/* 
// Mostra codigo PHP para o URI solicitado http://json.sadboxed.guru/chapter9/data/jsonp.php
<?php 
    header('Content-Type: application/javascript');
    $callback = (isset($_GET["jsonp"])) ? $_GET["jsonp"] : "";
    $JSONtext = '{
        "images": [
            {
                "title": "Image One",
                "url": 'img/AndroidDevelopment.jpg
            }, 
            {
                "title": "Image Two",
                "url": 'img/php.jpg
            },
            {
                "title": "Image Three",
                "url": 'img/Rails.jpg
            }, 
            {
                "title": "Image Four",
                "url": 'img/Android.jpg
            }
        ]
    }'
    echo $callback . '(' .$JSONtext. ');';
?>
*/



// Injecao dinamica da tag de script.

// Listagem 9.18 - Injecao dinamica da tag de script.
function getScript(url) {
    var script = document.createElement("script");
    script.src = url;
    document.getElementsByName('head')[0].appendChild(script);
}
getScript('http://json.sandboxed.guru/chapter9/data/jsonp.php?jsonp=someMethod');


// Listagem 9.19 - Injecao dinamica de tag de script com o uso de callback anonima.
var getJSONP = (function() {
    jsonp_callbacks = {};
    return function(url, fname, callback) {
        scriptNode = document.createElement('script');
        scriptNode.setAttribute('type', 'text/javascript');
        scriptNode.src = url + '?jsonp=' + encodeURIComponent('jsonp_callbacks["' + fname + '"]');
        jsonp_callbacks[fname] = function(data) {
            delete jsonp_callbacks[fname];
            callback(data);
        };
        document.body.appendChild(scriptNode);
    };
}());
getJSONP('http://json.sandboxed.guru/chapter9/data/jsonp.php', 'callback', function(data){
    console.log(data);
});

/* 
    http://json.sandboxed.guru/chapter9/data/jsonp.php

    {…}
​    images: (4) […]
        0: Object { title: "Image One", url: "img/AndroidDevelopment.jpg" }
        ​​1: Object { title: "Image Two", url: "img/php.jpg" }
        ​​2: Object { title: "Image Three", url: "img/Rails.jpg" }
        ​​3: Object { title: "Image Three", url: "img/Android.jpg" }
        ​​length: 4
        ​​<prototype>: Array []
        ​<prototype>: Object { … }
        debugger eval code:15:13
*/