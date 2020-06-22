
// CAP.8 - Troca de Dados.


// Solicitacao HTTP:

// Tabela 8.1 - Estrutura da soliciacao HTTP.
/*
        | Partes                        |   Obrigatorio
    --------------------------------------------------------
     1  | Linha de solicitacao          |    Sim
     2  | Cabecalhos                    |    Nao
     3  | Corpo de entidade             |    Nao    
*/

// ******************************************************************************************
// Linha de solicitacao: (request line). Obrigatorio para qualquer solicitacao.
//                       É responsavel pelo tipo da solicitacao, pelo recurso associado 
//                       a solicitacao, e pela versao do protocolo HTTP que o cliente
//                       esta usuando. Os tres componetes que compoem a Linha de 
//                       solicitacao sao: Method, Request-URI e HTTP-Version.
//
//                       => Method: Representa a acao a ser realizada no recurso
//                                  especificado, pode ser GET, POST, HEAD, PUT, LINK 
//                                  UNLINK, DELETE, OPTIONS e TRACE.
//                       => URI:    Identifica o recurso ao qual o metodo de solicitacao
//                                  se aplica. O URI especificado pode ser um recurso
//                                  estatico (arquivo CSS), ou um script dinamico, gerado
//                                  no momento de uma solicitacao.
//                       => HTTP-Version: Indica a versao de HTTP. Desde 1999 a versao de
//                                        solicitacao dos navegadores tem sido HTTP/1.1  
// ******************************************************************************************


// Listagem 8.1 - Estrutura sintatica de uma linha de solicitacao.
// GET    http://json.sandboxed.guru/chapter8/css/style.css       HTTP/1.1
// GET    http://json.sandboxed.guru/chapter8/img/physics.jpg     HTTP/1.1
// POST   http://json.sandboxed.guru/chapter8/post.php            HTTP/1.1


// ******************************************************************************************
// Cabecalhos:   Diz respeito a maneira pela qual a solicitacao pode fornecer metainformacoes 
//               suplementares. A metainformacao fornecida é simplesmente um par chave/valor 
//               separado por dois pontos (:), composto de caracteres ASCII.
//               O servidor pode utilizar essa informacao para determinar o modo de 
//               responder a solicitacao de forma mais adequada.
//
//               => Cabecalhos gerais (general headers): 
//                       Identificam informcoes gerais que dizem respeito a solicitacao. 
//                       Essas informacoes podem estar relacionadas à data da solicitacao,     
//                       se a solicitacao deve ou nao ser enviada para cache
//                       Ex:
//                       - Cache-Control       - Connection      - Date
//                       - Pragma              - Trailer         - Via
//                       - Transfer-Encoding   - Upgrade         - War
//
//              => Cabecalhos de solicitacao (request headers):
//                       Podem ser fornecidos com a solicitacao, para disponibilizar informacoes 
//                       preferenciais ao servidor, que o ajudarao com a solicitacao. Representam as 
//                       informacoes do cliente que esta fazendo a solicitacao.
//                       Esses cabecalhos podem revelar informacoes sobre o agente de usuario que 
//                       esta fazendo a solicitacao ou o tipo de dado preferencial que a resposta 
//                       deve disponibilizar.
//                       Um cabecalho muito util é o cabecalho Accept, ele pode ser usado para 
//                       informar o servidor do tipo MIME ou tipo de dado com o qual o cliente 
//                       podera lidar de forma apropriada. Geralmente esse cabecalho pode ser 
//                       definido como um tipo MIME particular (ex: application/json ou text/plan),
//                       ou tambem definido como */* que informa ao servidor que o cliente pode 
//                       aceitar todos os tipos de MIME. Espera-se que a resposta fornecida pelo 
//                       servidor seja um dos tipos MIME com o qual o cliente possa lidar.
//                       Ex:
//                       - Accept               - Accept-Charset        - Accept_encoding
//                       - Accept-Language      - Authorization         - Expect
//                       - From                 - Host                  - If-Match
//                       - If-Modified-Since    - If-None-Match         - If-Range
//                       - If-Unmodified-Since  - Max-Forwards          - Proxy-Authorization
//                       - Range                - Referer               - TE
//                       - User-Agent
//
//              => Cabecalhos de entidade (entity headers): 
//                       Sao usados para fornecer metainformacoes que dizem respeito a qualquer
//                       dado sendo enviado ao servidor junto da solicitacao.
//                       Quando dados forem fornecidos, serao esse cabecalhos que descreverao o 
//                       tipo de dado sendo enviado, a codificacao de caracteres associada e a
//                       quantidade de bytes de dados sendo transferida.
//                       Ex: 
//                       - Allow                - Content-Encoding      - Content-Languages
//                       - Content-Length       - Content-Location      - Content-MD5
//                       - Content-Range        - Content-Type          - Expires
//                       - Last_modified
// ******************************************************************************************


// Listagem 8.2 - A composicao de uma solicitacap HTTP GET.

// http://json.sandboxed.guru/chapter8/headers.php

/* Chrome:
    GET /chapter8/headers.php HTTP/1.1
    Host: json.sandboxed.guru
    Connection: keep-alive
    Upgrade-Insecure-Requests: 1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*//*;q=0.8,application/signed-exchange;v=b3;q=0.9
    Accept-Encoding: gzip, deflate
    Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6
    Content-Length: 0
*/

/* Firefox: 
    GET /chapter8/headers.php HTTP/1.1
    Host: json.sandboxed.guru
    Connection: keep-alive
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*//*;q=0.8
    Accept-Language: pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3
    Accept-Encoding: gzip, deflate
    Upgrade-Insecure-Requests: 1
    Content-Length: 0
*/

// * Obs: Aba Network (Developer Tools) fornece maiores detalhes dos Cabecalhos da solicitacao.



// ******************************************************************************************
// Corpo de entidade (entity body): Corresponde estritamente a nomenclatura referente aos
//               dados sendo enviados ao servidor. A sintaxe da entidade pode refletir a 
//               sintaxe do HTML, de XML ou ate mesmo JSON. Entretanto caso o cabecalho de
//               entidade Content-Type nao for fornecido, o servidor, considerando que é parte
//               receptora da solicitacao, devera advinhar o tipo MIME apropriado dos dados
//               fornecidos. 
// ******************************************************************************************


// Listagem 8.3 - A composicao de uma solicitacao HTTP POST.
/* 
    POST /chapter8/headers.php HTTP/1.1
    Host: json.sandboxed.guru
    Connection: keep-alive
    Cache-Control: max-age=0
    Upgrade-Insecure-Requests: 1
    Origin: http://json.sandboxed.guru
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*//*;q=0.8,application/signed-exchange;v=b3;q=0.9
    Referer: http://json.sandboxed.guru/chapter8/post.php
    Accept-Encoding: gzip, deflate
    Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6
    Content-Length: 53
    Content-Type: application/x-www-form-urlencoded

    fname=primeiro_nome&lname=ultimo_nome&mySubmit=submit
*/



// Resposta HTTP:

// Tabela 8.2 - Estrutura da resposta HTTP.
/*
        | Partes                        |   Obrigatorio
    --------------------------------------------------------
     1  | Linha de status               |    Sim
     2  | Cabecalhos                    |    Nao
     3  | Corpo de entidade             |    Nao    
*/


// ******************************************************************************************
// Linha de status: Detalha o resultado da solicitacao. É composta de tres partes:
//                  versao, codigo de status e o status da solicitacao.
//
//         => versao: Contem a versao do protocolo HTTP usado pelo servidor.
//         => codigo status: Representa um numero de tres digitos que reflete o status
//                           da solicitacao.
//                           É responsabilidade do codigo de status informar ao cliente se a 
//                           solicitacao foi compreendida, se houve erro, e/ou se o cliente
//                           deve executar alguma acao adicional. Há 5 categorias de status.
// ******************************************************************************************


// Tabela 8.3 - Classes de status de resposta para uma solicitacao HTTP.
/*
    Classe de Status | Frase que descreve o motivo
    --------------------------------------------------------------------------------------
     100-199         | Indica uma resposta provisoria, constituida somente da linha de 
                     | status e de cabecalhos opcionais.
    _______________________________________________________________________________________
     200-299         | Indica que a solicitacao do cliente foi recebida, compreendida e 
                     | aceita com sucesso.
     _______________________________________________________________________________________
     300-399         | Indica que acoes adicionais devem ser executadas pelo agente de 
                     | usuario para que a solicitacao seja atendida.
     _______________________________________________________________________________________
     400-499         | É usada em casos em que o cliente parece ter cometido um erro.
     _______________________________________________________________________________________
     500-599         | Indica os casos em que o servidor sabe que cometeu um erro ou é 
                     | incapaz de atender a solicitacao.


    * Os status mais comuns sao: 200, 204, 404 e 500.
        => 200 OK - Servidor reconheceu a solicitacao com sucesso.
        => 204 No Content: Servidor reconheceu a solicitacao com sucesso, porem nao ha nenhum
                            corpo de entidade novo a ser retornado.
        => 404 Page Not Found: O recurso indicado nao pôde ser localizado pelo servidor.
        => 500 Internal Server Error: Servidor encontrou um problema que impede a solicitacao 
                                      de ser atendida.

    * Mais sobre status: http://www.w3.org/protocols/rfc2616/rfc2616-sec10.html
*/



// ******************************************************************************************
// Cabecalhos: Diz respeito ao sistema pelo qual a resposta pode fornecer meta-informacoes de 
//             suporte ao cliente. Estao agrupados em 3 categorias:    
//
//         => cabecalhos gerais (general headers): 
//                  Indicam informacoes gerais. Podem estar relacionadas à data de resposta 
//                  ou à conexao, se esta deve permacer aberta ou fechada.
//                  - Cache-Control         - Connection            - Date
//                  - Pragma                - Trailer               - Transfer-Encoding
//                  - Upgrade               - Via                   - Warning
//
//         => cabecalhos de resposta (response headers): 
//                  Fornecem informacoes ao cliente que dizem respeito às configuracoes do 
//                  servidor, bem como ao URI solicitado.
//                  Ex: O servidor pode disponibilizar cabecalhos de resposta para informar 
//                  quais metodos HTTP sao aceitos, ou se uma autorizacao é necessaria a quem 
//                  fez a solicitacao para acessar a URI especificada.
//                  - Accept-Rangers        - Age                   - ETag
//                  - Location              - Proxy-Authentication  - Retry-After
//                  - Server                - Vary                  - WWW-Authenticate
//
//         => cabecalhos de entidate (entity headers): 
//                  Sao usados para fornecer metainformacoes que dizem respeito aos dados 
//                  sendo enviados com a resposta.
//                  - Allow                 - Content-Encoding      - Content-Languages 
//                  - Content-Length        - Content-Location      - Content-MD
//                  - Content-Range         - Content-Type          - Expires
//                  - Last-Modified
//
//
// Corpo da entidade: Enquanto os cabecalhos definem meta-informacoes, o corpo da entidade 
//                    contem os dados disponibilizados pelo servidor.
//
// ******************************************************************************************



// XMLHttpRequest:


// Tabela 8.4 - Construtor de XMLHttpRequest
/*
      Metodo/Propriedade  | Parametro     |   Valor retornado
    -------------------------------------------------------------------
        construtor        | N/A           |    XMLHttpRequest (object)     
*/


// Listagem 8.4 - Criando uma instancia do objeto XMLHttprequest.
var xhr = new XMLHttpRequest();


// Tabela 8.5 - Event handlers de xhr para monitorar o progreso da solicitacao HTTP.
/*
      Event handlers            | Tipo de evento associado ao event handler
    ------------------------------------------------------------------------
        onloadstart *           | loadstart *
        onprogress              | progress
        onload                  | load
        onloadend *             | loadended *
        onerror                 | error
        ontimeout               | timeout
        onabort *               | abort *
        onreadystatechange      | readystatechange

    Obs: Os eventos de progresso que aparecem com (*), exigem o IE 10 ou 
         versao superior.


    Eventos:
        => loadstart: Este evento sera disparado no momento que a solicitacao HTTP iniciar, uma vez a
                      cada solicitacao iniciada.

        => progress:  Disparado no momento que a conexao HTTP é estabelecida e houver realmente a 
                      transmissao de dados na solicitacao/resposta.

        => error:     Sera disparado exatamente uma vez, ou nenhuma, durante o curso de cada 
                      solicitacao HTTP iniciada pelo objeto xhr. Util para informar que a solicitacao 
                      nao teve sucesso.

        => load:      Sera disparado exatamente uma vez, ou nenhuma, durante o curso de cada 
                      solicitacao HTTP iniciada pelo objeto xhr. Se a solicitacao for feita com 
                      sucesso, o evento load sera disparado imediatamente. Util para informar que a 
                      solicitacao foi atendida com sucesso. O codigo alem do texto de status, podem 
                      ser obtidos por meio das propriedades 'status' e 'statusText' de xhr.

        => timeout:   Sera disparado exatamente uma vez, ou nenhuma, durante o curso de cada 
                      solicitacao HTTP iniciada pelo objeto xhr. Se for constatado que a duracao da 
                      solicitacao ultrapassou um determinado intervalo, a conexao sera considerada 
                      expirada e sua aplicacao sera notificada.

        => abort:     Sera disparado exatamente uma vez, ou nenhuma, durante o curso de cada 
                      solicitacao HTTP iniciada pelo objeto xhr. Se a solicitacao for abortada a 
                      qualquer momento, o evento sera imediatamente disparado.

        => loadended: Sera disparado exatamente uma vez, durante o curso de cada solicitacao HTTP 
                      iniciada pelo objeto xhr. Sera disparado apos as possiveis notificacoes a seguir:
                      error, abort, load, timeout.

        => onreadystatechange:  É o event handler original. Sera disparado diversas vezes durante o 
                                curso de cada solicitacao HTTP iniciada pela instancia xhr.
*/


// Listagem 8.5 - Registro de listeners de eventos pertencentes ao obj xhr para cada 
//                notificacao de estado.
var xhr = new XMLHttpRequest();
addListener(xhr, 'loadstart', function() { console.log('load-start'); });
addListener(xhr, 'progress', function() { console.log('progess'); });
addListener(xhr, 'load', function() { console.log('load'); });
addListener(xhr, 'loadended', function() { console.log('loadended'); });
addListener(xhr, 'timout', function() { console.log('timout'); });
addListener(xhr, 'abort', function() { console.log('abort'); });
addListener(xhr, 'readystatechange', function() { console.log('ready-state-change'); });

// Funcao addListener para diversos navegadores.
function addListener(elem, eventName, handler) {
    if(elem) 
        elem.addEventListener(eventName, handler, false);
    else if(elem.attachEvent) 
        elem.attachEvent('on' + eventName, handler);
    else 
        elem['on' + eventName] = handler;
}


// Listagem 8.6 - Atribuindo funcoes callback a cada um dos events handlers de status de xhr.
var xhr = new XMLHttpRequest();
xhr.onloadstart = function() { console.log('onloadstart'); };
xhr.onprogress = function() { console.log('onprogress'); };
xhr.onload = function() { console.log('onload'); };
xhr.onloadend = function() { console.log('onloadend'); };
xhr.ontimeout = function() { console.log('ontimeout'); };
xhr.onabort = function() { console.log('onabort'); };
xhr.onreadystatechange = function() { console.log('onreadystatechange'); };


// Tabela 8.6 - Possiveis estados do objeto xhr e suas representacoes numericas.
/*
      Estados               | Representacao numerica
    ---------------------------------------------------
        UNSET               |       0
        OPENED              |       1
        HEADERS_RECEIVED    |       2
        LOADING             |       3
        DONE                |       4

    * Os estados sao atribuidos a propriedade readState, existente em cada instancia xhr.

        => UNSET: Estado default da propriedade readState. É usado para informar nossa 
                  aplicacao de que o objeto xhr, embora esteja instanciado, ainda nao foi
                  inicializado. Retorna um valor igual a 0.
        
        => OPENED: Substitui o estado UNSET assim que o metodo de solicitacao 'open' for
                   chamado, inicializando a instancia de xhr. Retorna um valor igual a 1.
        
        => HEADERS_RECEIVED: Sera atribuido como valor da propriedade readState na recepcao 
                             dos cabecalhos que acompanham a resposta que em ultima instancia
                             sera recebida de um servidor. Retorna um valor igual a 2.
        
        => LOADING: Sera atribuido como valor da propriedade readState quando a transmissao 
                    dos dados pertinentes ao corpo da entidade da resposta for recebida.
                    Retorna um valor igual a 3.
                
        => DONE:    Sera atribuido como valor da propriedade readState na conclusao da 
                    solicitacao HTTP. 
                    Como ocorre com evento load, nao identifica se a solicitacao resultou 
                    em um erro, um timeout ou no se foi bem sucedido. Sera mandatorio 
                    determinar o statusCode quando definirmos como a solicitacao devera ser 
                    processada. Retorna um valor igual a 4.
*/


// Listagem 8.7 - Determinando o estado do objeto xhr para cada mudanca de estado.
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = handleStateChange();

function handleStateChange() {
    if(xhr.readyState === 0) 
        console.log('XHR is now instantiated');
    else if(xhr.readyState === 1)
        console.log('XHR is now Initialized');
    else if(xhr.readyState === 2)
        console.log('XHR is now Available');
    else if(xhr.readyState === 3)
        console.log('Receiving Data');
    else if(xhr.readyState === 4)
        console.log('HTTP Request ended');
} 



// Lado da solicitacao: 
// Compoem a fachada que permite configurar corretamente os metadados da solicitacao HTTP.


// Tabela 8.7 - Metodos de solicitacao do objeto xhr.
/*
      Metodo              | Parametro                                     |   Valor retornado
    --------------------------------------------------------------------------------------------
      open                | String(method), String(URI), Boolean(async)   |    N/A
                            String(user), String(password)
      setRequestHeader    | String(field), String(value                   |    N/A
      send                | String(entity body)                           |    N/A 
      abort               | N/A                                           |    N/A

      
    => open: Atua como ponto de partida a ser usado para configurar a solicitacao HTTP.
    
    => setRequestHeader: Oferece a nossa aplicacao a oportunidade de especificar cabecalhos
                         particulares que complementarao a solicitacao fornecendo informacoes
                         suplementares. Atraves deste metodo, a aplicacao podera fornecer 
                         qualquer valor de atributo que ajude na disponibilizacao da resposta 
                         pelo servidor.
                         Inserir um X em todos os cabecalhos personalizados é uma pratica
                         comum.
    
    => send: O metodo send pode ser chamado como um argumento. Esse argumento representa o 
             corpo de entidade da solicitacao e, normalmente é usado se o metodo de solicitacao 
             for especificado como um dos metodos 'nao seguros', exemplo POST.
    
    => abort: Diz a solicitacao HTTP para descontinuar/cancelar a solicitacao.
              Este metodo encerra efetivamente qualquer conexao que tenha sido feita com um 
              servidor, ou impede que uma ocorra, caso ela ainda nao tenha sido estabelecida.
*/


// Listagem 8.8 - Assinatura do metodo open do objeto xhr.
//open(HTTP-MSInputMethodContext, request-URI [, asyc [, user [, password]]]);


// Listagem 8.9 - Solicitacao GET para o URI xFile.php usando protocolo HTTP/1.1
//GET /xFile.php HTTP/1.1


// Listagem 8.10 - Assinatura do metodo setRequestHeader do objeto xhr.
setRequestHeader(field, value);


// Listagem 8.11 - Configuracao do cabecalho Accept e de um cabecalho personalizado por
//                  meio do metodo setRequestHeader.

setRequestHeader('Accept', 'application/json');     // solicitando JSON como resposta.
setRequestHeader('X-Custom-Attribute', 'Hello-World');      // cabecalho personalizado.


// Tabela 8.8 - Os diversos cabecalhos HTTP que nao podem ser definidos no JavaScript.
/*
    Accept-Charset                  | Cookie        | Keep-Alive        | Trailer
    Accept-Encoding                 | Cookie2       | Origin            | Transfer-Encoding
    Access-Controle-Request-Headers | Date          | Referer           | Via
    Access-Controle-Request-Method  | DNT           | Upgrade           | 
    Connection                      | Expect        | User-Agent        | 
    Content-Length                  | Host          | TE                |    
*/


// Listagem 8.12 - Assinatura do metodo send do objeto xhr.
send( data );


// Listagem 8.13 - Dados enviados como corpo de entidade da solicitacao:
// Content-Type tendo text/plain (charset=UTF-8) como default.
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://json.sandboxed.guru/chapter8/xss-post.php");
xhr.send("fname=ben&name=smith");


// Listagem 8.14 - Dados enviados como corpo de entidade da solicitacao:
// Content-Type especificado como x-www-form-urlencoded.
/*
    <form action="8-1.php" method="post" onsubmit="return formSubmit();">
        First-Name: < input name="fname" type="text" size="25" />
        Last-Name: < input name="lname" type="text" size="25" />
    </form>
*/
function formSubmit() {
    var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://json.sandboxed.guru/chapter8/xss-post.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("fname=ben&lname=smith&mySubmit=submit");
    return false;
}


// Listagem 8.15 - Dados enviados como corpo de entidade da solicitacao:
// Content-Type especificado como JSON.
var person = { name: "ben", gender: "male" };
var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://json.sandboxed.guru/chapter8/xss-post.php");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(person));


// Tabela 8.9 - Atributos de solicitacao do objeto xhr.
/*
        Propriedades        | Valor retornado
    ---------------------------------------------------
        Timeout             | Number (duration)
        withCredentials *   | Boolean (credentials)
        upload *            | XMLHttpRequestUpload (object)
        

    (*) Exigem o IE 10 ou superior.

        => timout: Tempo maximo alocado para uma solicitacao ser concluida. Caso uma solicitacao 
                   ultrapassar o tempo especificado, o evento de timeout sera disparado para que sua
                   aplicacao seja notificada. Pode ser definida em milessegundos, com qualquer duracao.

        => withCredentials: Pode ser definida com true ou false.
                            É usado para informar o servidor de que credenciais foram fornecidas 
                            em uma solicitacao de recurso cross-origin.

        => upload: Disponibiliza uma referencia ao objeto XMLHttpRequestUpload a nossa aplicacao.
                   Esse objeto possibilita que nossa aplicacao monitore o progresso da transmissao 
                   para o corpo de entidade que contenha uma quantidade excessiva de dados, por 
                   exemplo quando permitimos que os usuarios postem diversos arquivos anexos, com 
                   com imagens ou midia.
*/



// Lado da resposta: 
// O objeto xhr tambem incorpora diversos metodos e propriedades que dizem respeito somente a 
// manipulacao da resposta disponibilizada pelo servidor.


// Tabela 8.10 - Metodos de resposta do objeto xhr.
/*
      Metodo                    | Parametro             |  Valor retornado
    -------------------------------------------------------------------------------------------
      getAllResponseHeaders     | N/A                   |  String(value)
      getResponseHeader         | String (key)          |  String(value)
      overrideMimeType          | STring (Content-Type) |  N/A
    
      
    => getAllResponseHeaders: Quando esse metodo form chamado, xhr retornara uma string contendo 
                              todos os caracteres de resposta na forma de pares chave/valor, cada 
                              qual separado um do outro por caracteres de controle (\u000D e \u000A)
                              carriage return e nova linha.

    => getResponseHeader: Pode ser utilizado para obter o valor do cabecalho especificado na resposta,
                          conforme configurado pelo servidor.

    => overrideMimeType: Permite que nossa aplicacao sobscreva o Content-Type configurado da resposta 
                         quando ele for obtido.    
*/


// Listagem 8.16 - Extraindo todos os valores configurados nos cabecalhos da resposta fornecida.
// ..codigo
// Quando o evento load xhr for disparado, faz parse de todos os cabecalhos.
xhr.onload = parseHeaders;

// Mostra como todos os cabecalhos podem ser extraidos.
function parseHeaders() { 
    var headers = new Object();
    var responseHeaders = (this.getAllResponseHeaders());

    // Faz a correspondencia de sequencias de caracteres que antecedem os caracteres de controle
    // em um array.
    var headerArray = (responseHeaders.match(/[^\u000D\u000A].*/gi));

    for (var i = 0; i < headerArray.length; i++) {
        var akeyValuePair = headerArray[i];
        var colonIndex = akeyValuePair.indexOf(":");
        var headerKey = akeyValuePair.substring(0, colonIndex);
        var headerValue = akeyValuePair.substring(colonIndex + 1);
        headerValue = (headerValue.charAt(0) == " ") ? headerValue(1) : headerValue;
        headers[headerKey] = headerValue;
    }
}


// Listagem 8.17 - Assinatura do metodo getResponseHeader do objeto xhr.
getResponseHeader(key);


// Listagem 8.18 - HTTP POST para exercise.php com cabecalhos Content-Type a Accept configurados
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://json.sanboxed.guru/chapter8/exercise.php");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onreadystatechange = changeInState;
xhr.send('{"frame":"ben","lname":"smith"}');

function changeInState() {
    var data;
    if(this.readyState === 4 && this.status === 200) {
        var mime = this.getResponseHeader("content-type").toLowerCase();

        if(mime.indexOf('json')) 
            data = JSON.parse(this.responseText);
        else if(mime.indexOf('xml'))
            data = this.responseXML;
    }
}


// Obtendo a resposta: 
// A tabela 8.11 oferece os meios necessarios para obter a resposta disponibilizada para a 
// solicitacao HTTP.


// Tabela 8.11 - As propriedades de resposta do objeto xhr.
/*
      Propriedades   | Parametro          |  Valor retornado
    -------------------------------------------------------------------------------
      readyState     | Leitura            |  Integer (state)
      status         | Leitura            |  Integer (HTTP status Code)
      statusText     | Leitura            |  string (HTTP status)
      responseXML    | Leitura            |  XML (value)
      responseText   | Leitura            |  string (value)
      responseType   | Leitura/Escrita    |  XMLHttpRequestResponseType (object)
      response       | Leitura            |  * (value)

          
    => readyState: Exibe o estado atual da solicitacao HTTP.
                   Será atualizado regularmente para refletir o status da solicitacao.
                   Obs: comos os estados refletidos sao muito variados, esta propriedade com
                        frequencia sera usada em conjunto com outras propriedades, por exemplo
                        status ou statusText.

    => status: Oferece a uma aplicacao a capacidade de obter o codigo de status HTTP da resposta.
               A listagem 8.18 contou com as propriedades readyState e status, onde foi possivel 
               validar se a solicitacao xhr foi concluida (readyState = 4), alem de determinar se 
               a solicitacao foi reconhecida (status = 200) .
    
    => statusText: Descricao que acompanha o codido de status, e fornece informacoes adicionais 
                   relacionadas ao status. O codigo de status igual a 200 como exemplo é acompanhado 
                   da frase 'OK'.
                   Obs: Esta frase visa mais ao debugging do que ao controle do fluxo de uma 
                        aplicacao.
    
    => responseXML: Atributo do objeto xhr que permite a uma aplicacao obter uma resposta XML 
                    disponibilizada pelo servidor, caso os dados fornecidos na resposta estiverem 
                    configurados como um dos Content-Types XML - application/xml ou text/xml, caso 
                    contrario um valor null sera retornado.
    
    => responseText: Oferece a uma aplicacao a capacidade de obter texto puro do corpo da entidade, 
                     conforme disponibilizado pela resposta. Diferentemente de responseXML que pode 
                     ter um valor igual a null, responseText sempre tera um valor.
    
    => responseType: Esta relacionado ao parsing nativo dos tipos de dados, alem do simples XML.
                     Possui 5 Content-Types particulares: arraybufer, blob, document, text e json.
                     Ao configurar uma solicitacao com o atributo responseType, podemos informar 
                     o processo associado ao xhr de que faça parse do corpo da entidade de acordo 
                     com a sintaxe especificada, como por exemplo na listagem 8.19.
    
    => response: Oferece uma maneira de obter o corpo de entidade da solicitacao sendo atendida, 
                 assim como responseXML e responseText. A diferenca é que o parse sera feito no valor 
                 'read' se tivermos configurado a solicitacao HTTP com responseType, caso contrario 
                 o valor retornado sera uma string vazia. Ex. listagem 8.20
*/


// Listagem 8.19 - Solicitacao HTTP configurada para fazer parse de JSON.
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://json.sandboxed.guru/chapter8/exercise.php");
xhr.setRequestHeader("Contetnt-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onreadystatechange = changeInState;
xhr.responseType = "json";
xhr.send('{"fname":"ben", "lname":"smith"}');


// Listagem 8.20 - Solicitacao HTTP obtendo JSON apos o parse a partir da propriedade response de xhr.
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://json.sandboxed.guru/chapter8/exercise.php");
xhr.setRequestHeader("Contetnt-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.onreadystatechange = changeInState;
xhr.responseType = "json";
xhr.send('{"fname":"ben", "lname":"smith"}');

function changeInState() {
    var data;
    if(this.readyState === 4 && this.status === 200) {
        var mime = this.getResponseHeader("content-type").toLowerCase();

        if(mime.indexOf('json')) {
            // O Parse sera desnecessario por ter setado a propriedade xhr.responseType = "json".
            //data = JSON.parse(this.responseText);             
            data = this.response;
        } 
        else if(mime.indexOf('xml'))
            data = this.responseXML;
    }
}


// Listagem 8.21 - Conteudo JSON em /data/imagesA.json
/*
{
    "images": [
        {
            "title": "Image One",
            "url" "img/AndroidDevelopment.jpg"
        },
        {
            "title": "Image Two",
            "url" "img/php.jpg"
        },
        {
            "title": "Image One",
            "url" "img/Rails.jpg"
        },
        {
            "title": "Image One",
            "url" "img/Android.jpg"
        }
    ]
}
*/


// Listagem 8.22 - Corpo de um arquivo HTML que utiliza Ajax para carregar JSON data/imagesA.json
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cap8 - Exercicio 2</title>
</head>
<body>
    <input type="submit" value="load images" onclick="loadImages('https://github.com/thsdias/repositorio-teste/tree/master/livro-json-basico/imagesA.json')">
    <script>
        function loadImages(url) { 
            debugger;
            var body = document.getElementsByTagName('body')[0];
            var xhr = (window.XDomainRequest) ? newXDomainRequest() : new XMLHttpRequest();            
            xhr.open("GET", url);

            xhr.onload = function() {            
                var data = JSON.parse(this.responseText);
                var list = data.images;

                for (let i = 0; i < list.length; i++) {
                    var image = list[i];
                    var listItem = document.createElement('li');
                    var img = document.createElement('img');
                    
                    img.src = image.url;
                    img.alt = image.title;
                    listItem.appendChild(img);
                    body.appendChild(listItem);
                }
            };

            xhr.onerror = function() {
                alert(this.status + " " + this.statusText);
            };

            xhr.send();
        };
    </script>
</body>
</html>
*/
