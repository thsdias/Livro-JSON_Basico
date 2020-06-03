
// CAP.7 - Persistencia de JSON (Cookie / Web Storage).


// Listagem 7.1 - Sintaxe de Set-Cookie conforme definido pela RFC 6265.
/*    
    set-cookie       =      "Set-Cookie:" cookies
    cookies          =      1#cookie
    cookie           =      NAME "=" VALUE *(";" cookie-av)
    NAME             =      attr
    VALUE            =      value
    cookie-av        =      "expires" "=" value
                     |      "max-age" "=" value
                     |      "domain"  "=" value
                     |      "path"    "=" value
                     |      "secure"
                     |      "httponly"
*/


// Tabela 7.2 - Pares chave/valor a serem persistido como um cookie devem conter caracteres ASCII validos.
"greetings=Hello World";
"greetingJSON=[\"Hello World!\"]";


// ************************************************************************************
// Bibliotecas Base64 que convertem caracteres UTF-8 em ASCII para que estejam de acordo 
// com a sintaxe dos cookies HTTP.
// 
// - https://jsbase64.codeplex.com/releases/view/89265      // Pagina nao encontrada
// - https://code.google.com/p/javascriptbase64/            // Pagina nao encontrada
//
// ************************************************************************************


// Tabela 7.3 Caracteres UTF-8 sendo convertidos para ASCII usando uma biblioteca Base64.
var unicodeValue = "Привет мир!";   // 'Hello World' em russo.
var asciiString = Base64.encode(JSON.stringify(unicodeValue));
console.log(asciiString);

var decodeValue = Base64.decode(asciiString);
console.log(decodeValue);


// Listagem 7.4 - toUTCString gera um valor UTC GMT (Greenwich Mean Time).
var date = new Date('Jan 1 2015 12:00 AM');
var UTCdate = date.toUTCString();   // Gera data/hora igual a diferenca de fuso horario entre sua localidade e Greenwich.
console.log(UTCdate);   // Thu, 01 Jan 2015 02:00:00 GMT


// *************************************************************************************************************
// Atributos Cookie:
//
//  => expires: se for especificado, seu respectivo valor informa o navegador da data e hora em que nao sera
//              necessario armazenar o cookie.
//              obsI: se o valor fornecido a 'expires' estiver no passado, o cookie sera imediatamente removido 
//                    da memoria.
//              obsII: se o atributo 'expires' for omitido, o cookie sera descartado no momento que a sessao for 
//                     encerrada. 
//
//  => max-ge:  semelhante ao expires, mas especifica o tempo de vida do cookie em segundos. Nao é reconhecido
//              pelo IE6 ate o IE8.
//
//  => domain:  define explicitamente qual dominio o cookie esta associado. O dominio especificado deve 
//              obrigatoriamente ter uma relacao com a origem que estiver definindo o cookie.
//              É opcional, porem por razoes de seguranca deve ser definido.
//
//  => path:    garante quais subdiretorios um cookie estara disponivel. Se nao for especificado, o valor default
//              sera o diretorio corrente que definiu o cookie. Defini-lo permite restrigir ou ampliar o escopo
//              do cookie para um diretorio em particular e todos os seus subdiretorios.
//
//  => secure:  Esse atributo nao prove seguranca. Sinaliza ao navegador que so envie o cookie ao servidor, caso a
//              conexao utilzada seja uma conexao segura (HTTPS). Impede que o cookie seja sobrescrito ou ate mesmo
//              apagado por um invasor.    
//
//  => httponly: Indica que o cookie nao estara disponivel ao lado do cliente, limita sua disponibilidade somente ao
//               servidor, evitando assim que o JavaScript do lado do cliente, referencia, apague ou utilize o cookie
//               Cookies com a flag httponly podem ser definidos somente pelo servidor.
//
//
// * Nota: 
//         I:   Os cookies que tenham um dominio e/ou path em particular como escopo, podem ser usados 
//              indistintamente pelos protocolos HTTP e HTTs.
//         II:  Nao ha ordem em particular para definicao dos pares atributo-valor sinalizados anteriormente.
//         III: Nao ha diferenciacao de letras Maiuscula e Minuscula, e ambas podem ser utilizadas.
//         IV:  Armazena somente cerca de 4KB (aprox. 4000 caracteres ASCII).
//         V:   Os cookies podem ser compartilhados entre subdominios.
// *************************************************************************************************************


// Listagem 7.5 - Concatenando uma data ao par chave/valor para fornecer uma data de vencimento.
var date = new Date('Jan 1 2015 12:00 AM');
'author=test; expires=' + date.toUTCString();   


// Listagem 7.6 - Usando uma regex para mostrar origens correspondentes (validando atributo domain).
var regExp = '(/www.sandboxed.guru$/i).test("www.sandboxed.guru")';     // true


// Listagem 7.7 - URLs correspondentes sao determinados por meio do dominio de mais alto nivel(.com)
var regExpI = '(/sandboxed.guru/i).test("sandboxed.guru.com")';     // true
var regExpII = '(/sandboxed.guru$/i).test("sandboxed.guru.com")';   // false

/*
    A listagem acima mostra que sem especificar $ para forcar uma correspondencia no final
    duas propriedades totalmente diferentes poderiam ser, potencialmente, consideradas como
    uma correspondencia.
    O i apenas informa o padrao para que nao diferencie letras maiusculas de minusculas
    durante a correspondencia.
*/



// Table 7.1 - Mostra quais origens sao consideradas correspondentes ao valor do atributo domain.
/*
    Atributo domain          | Origem                   | Correspondencia
    --------------------------------------------------------------------------
    www.sandboxed.guru       | sandoboxed.guru          | false
    sandboxed.guru           | www.sandoboxed.guru      | false
    .sandboxed.guru          | sandoboxed.guru          | true
    .sandboxed.guru          | www.sandoboxed.guru      | true
    .sandboxed.guru          | json.sandoboxed.guru     | true    
    
    * Nao é necessario aplicar o token '.' ele sera prefixado automaticamente 
      a todos os dominios que nao estiverem totalmente qualificados pelos agentes
      de usuario.
*/


// Listagem 7.8 - Demonstrando a definicao de escopo usando path
/* 
    cookies definidos a partir de http://json.sandboxed.guru/chapter7/ficticius.html 

    
    'cookieDefault=test'; domain=.sandboxed.guru'    

    http://json.sandboxed.guru/chapter7/            // cookieDefault é disponibilizado para essa solicitacao.
    
    http://json.sandboxed.guru/chapter7/css/        // cookieDefault é disponibilizado para essa solicitacao.
    
    http://www.sandboxed.guru/                      // cookieDefault NAO é disponibilizado para essa solicitacao.
    
    http://json.sandboxed.guru/chapter3/js/         // cookieDefault NAO é disponibilizado para essa solicitacao.
    
    http://json.sandboxed.guru/chapter3/img/        // cookieDefault NAO é disponibilizado para essa solicitacao.
    
    __________________________________________________________________________________________________________
    
    'cookieA=test'; domain=.sandboxed.guru; path=/'
    
    http://json.sandboxed.guru/chapter7/            // cookieA é disponibilizado para essa solicitacao.
    
    http://json.sandboxed.guru/                     // cookieA é disponibilizado para essa solicitacao.

    http://json.sandboxed.guru/chapter3/js/         // cookieA é disponibilizado para essa solicitacao.

    http://json.sandboxed.guru/chapter3/img/        // cookieA é disponibilizado para essa solicitacao.
    
    __________________________________________________________________________________________________________
    
    'cookieB=test'; domain=.sandboxed.guru; path=chapter3/js/'
    
    http://json.sandboxed.guru/chapter7/            // cookieB NAO é disponibilizado para essa solicitacao.
    
    http://json.sandboxed.guru/                     // cookieB NAO é disponibilizado para essa solicitacao.

    http://json.sandboxed.guru/chapter3/js/         // cookieB é disponibilizado para essa solicitacao.

    http://json.sandboxed.guru/chapter3/            // cookieB NAO é disponibilizado para essa solicitacao.

*/




/* 
--------------------------------------------------------------------------------
* document.cookie
-------------------------------------------------------------------------------- 
*/

// URL => http://json.sandboxed.guru/

// Listagem 7.9 - Fornecendo nosso primeiro par chave/valor a document.cookie para criacao do cookie.
document.cookie = 'ourFirstCookie=abc123';      // fornece uma string como argumento a um metodo setter.


// Listagem 7.10 - Atribuicoes subsequentes a document.cookie
document.cookie = 'ourFirstCookie=abc123';
document.cookie = 'ourSecondCookie=doeRayMe';
document.cookie = 'ourThirdCookie=faSoLaTeaDoe';

// Nota: Podemos adicionar qualquer quantidade de pares nome/valor a document.cookie
//       sem preocuparmos em sobrescrever o que tinhamos definido anteriormente.


// Listagem 7.11 - A funcao setCookie simplifica a criacao de valores para cookie HTTP.
function setCookie(name, value, expires, path, domain, secure, httponly) { // atribuir null para o atributo que se deseja omitir
    document.cookie = name + '=' + value
    // se expires <> null concatena data GMT especificada.
    + ((expires) ? '; expires=' + expires.toUTCString() : '')
    // se path <> null concatena valor especificado.
    + ((path) ? '; path=' + path : '')
    // se domain <> null concatena valor especificado.
    + ((domain) ? '; domain=' + domain : '')
    // se secure <> null concatena valor especificado.
    + ((secure) ? '; secure' : '');
}

// Nota: É responsabilidade do agente de usuario definir valores para qualquer valor de atributo que nao seja valido.


// Listagem 7.12 - A funcao setCookie foi criada para ajudar na configuracao dos valores de atributo do cookie.
setCookie(
    'ourFourthCookie',                  // name
    'That would bring us back to doe',  // value
    new Date('May 29 2020 12:00 AM'),   // expires
    '/',                                // path
    null                                // secure
);


// Listagem 7.14 - Separando o valor da chave fornecido para um unico cookie retornado.
var returnedCookie = 'ourFourCookie=That would bring us back to doe';
var seperatorIndex = returnedCookie.indexOf('=');
var cookieName = returnedCookie.substring(0, seperatorIndex);
var cookieValue = returnedCookie.substring(seperatorIndex+1, returnedCookie.length);

console.log('Cookie_Name: ' + cookieName);
console.log('Cookie_Value: ' + cookieValue);


// Listagem 7.15 - Varios cookies concatenados e delimitados por um ponto-e-virgula.
setCookie('ourFourthCookie', 'That would bring us back to doe', 
            new Date('May 29 2020 12:00 AM'), '/', null, null);

setCookie('ourFifthCookie', 'Doe a dear a female dear', 
            new Date('May 29 2020 12:00 AM'), '/', null, null);

console.log(document.cookie);   // 'ourFifthCookie=Doe a dear a female dear; ourFourthCookie=That would bring us back to doe'


// Listagem 7.16 - Extraindo o valor de uma chave especificada entre varias.
function getCookie(name) { 
    // regex para recuperar qualquer par nome/valor na string.
    var regExp = new RegExp(name + "=[^\;]*", 'mgi');
    var matchingValue = (document.cookie).match(regExp);
    console.log(matchingValue);     // 'ourFourCookie=That would bring us back to doe'
    for (var key in matchingValue) {
        var replacedValue = matchingValue[key].replace(name + '=', '');
        matchingValue[key] = replacedValue;        
    }
    return matchingValue;
};

getCookie('ourFourthCookie');   // ['That would bring us back to doe']


// Listagem 7.17 - Combinando o JSON Object e o cookie para armazenar objetos.
function Person() {
    this.name;
    this.age;
    this.gender;
};

Person.prototype.getName = function() {
    return this.name;
};

Person.prototype.getAge = function() {
    return this.age;
};

Person.prototype.getGender = function() {
    return this.gender;
};

var p = new Person();
    p.name = 'ben';
    p.age = '36';
    p.gender = 'male';

var serializedPerson = JSON.stringify(p);
setCookie('person', serializedPerson, new Date('May 29 2020'), '/', 'sandboxed.guru', null);
console.log(getCookie('person'));   // '{ "name":"ben", "age":"36", "gender":"male" }'




/* 
-------------------------------------------------------------------------------------------------------
* Web Storage
-------------------------------------------------------------------------------------------------------
    - Permite que os dados sejam armazenados, obtidos ou removidos.
    - Possui uma API para o trabalho com a persistencia de dados.
    - Permite que estados sejam armazenados indefinidamente ou somenete pela duracao de um sessao.
    - Pode ser acessada como Window.localStorage e Window.sessionStorage
        - sessionStorage: permite que os dados sejam persistidos somente enquanto a sessao existir.
        - localStorage: serao persistidos indefinidamente , ate o estado ser apagado pela aplicacao 
                        ou pelo usuario, por meio da interface do browser.    
    - Capacidade de armazenamento de aproximadamente 5 MB. 
    - Obedece estritamente a politica de mesma origem, onde os recursos somente poderam ser compartilhados
      /acessados a partir da mesma origem de documento, se ambos compartilharem o mesmo protocolo, o nome
      de host e a porta.
=========================================================================================================
*/


// Table 7.2 - Seis membros da API de Web Storage
/*
    Membros          | Parametros                   | Retorno
    --------------------------------------------------------------------------
    setItem          | string(key), string(value)   |   void
    getItem          | string(key)                  |   string(value)
    removeItem       | string(key)                  |   void
    clear            |                              |   void
    key              | Number(index)                |   string(value)
    length           |                              |   Number
    
*/


// *************************************************************************************************************
// Metodos Web Storage:
//
//  => setItem: Faz a persistencia dos dados na forma de pares nome/valor. Mandatorio inclui-lo dentro do 
//              bloco try/catch para que seja possivel capturar a resposta de 'Error' lancada.
//              Cada chave devera ter um rotulo unico. O valor sera substituido caso seja armazenado um valor
//              com nome de chave ja existente.
//
//  => getItem: Esse metodo permite obter o estado persistido correspondente a chave fornecida ao metodo.
//              A chave é o unico parametro esperado, e caso esta nao existir no Storage Object, um valor
//              null sera retornado.
//
//  => removeItem:  É o unico meio de finalizar a persistencia de um par chave/valor individual. 
//
//  => clear: Usado para remover instantaneamente todo e qualquer par chave/valor mantido pelo Storage Object.
//
//  => key: Usado para obter as identidades de todoas as chaves armazenadas que tenham dados relacionados,
//          mantidos pelo Storage Object. Retornara o membro associado ao indice fornecido. Um valor null
//          sera retornado caso nao houver um valor para o indice fornecido.   
//
//  => length: Retorna a quantidade de valores armazenados no Storage Object.
// *************************************************************************************************************


// URL => http://json.sandboxed.guru/


// Listagem 7.18 - Assinatura do metodo setItem.
setItem(key, value);


// Listagem 7.19 - Armazenando nosso primeiro item.
localStorage.setItem('ourFirstItem', 'abc123');


// Listagem 7.20 - Substituindo o valor associado a chave 'ourFirstItem'.
localStorage.setItem('ourFirstItem', 'abc123');
localStorage.setItem('ourFirstItem', 'Sunday Monday happy-days');   // Substituira o valor anteriormente definido.


// Listagem 7.21 - Assinatura de getItem.
getItem(key);


// Listagem 7.22 - Obtendo um valor para uma chave especificada.
console.log(localStorage.getItem('ourFirstItem'));      // abc123
console.log(localStorage.getItem('ourSecondItem'));     // null


// Listagem 7.23 - Assinatura de removeItem.
removeItem(key);


// Listagen 7.24 - Utilizando removeItem para acabar com o estado persistente.
console.log(localStorage.getItem('ourFirstItem'));      //  abc123
localStorage.removeItem('ourFirstItem');
console.log(localStorage.getItem('ourFirstItem'));      // null


// Listagem 7.25 - Assinatura do metodo clear.
clear();


// Listagem 7.26 - Assinatura do metodo key.
key(index);


// Listagem 7.27 - Obtendo as chaves armazenadas no Storage Object.
var maxIndex = localStorage.length;
for (var i = 0; i < maxIndex; i++) {
    var foundKey = localStorage.key(i);    
}


// Listagem 7.28 - Web Storage para fazer a persistencia do valor forncecido à instancia 'Person'.
function setItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.log('Web Storage esta desabilitada ou a capacidade de armazenamento foi excedida - ' + error);
    }
}

function getItem(key) {
    var storageValue;
    try {
        storageValue = localStorage.getItem(key);
    } catch (error) {
        console.log('Web Storage esta desabilitada');
    }
    return storageValue;
}

function Person() {
    this.name;
    this.age;
    this.genre;
}

Person.prototype.getName = function() {
    return this.name;
};

Person.prototype.getAge = function() {
    return this.age;
};

Person.prototype.getGender = function() {
    return this.gender;
};

var p = new Person();
    p.name = 'ben';
    p.age = '36';
    p.gender = 'male';

var serializedPerson = JSON.stringify(p);
setItem('person', serializedPerson);
console.log(getItem('person'));     // {"name":"ben","age":"36","gender":"male"} | undefined
