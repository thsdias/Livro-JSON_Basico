
// CAP.3 - Manipulacao de Strings.


/* 
--------------------------------------------------------------------------------
* Concatenacao de strings
-------------------------------------------------------------------------------- 
*/

// Listagem 3.1 - Concatenando strings.
var str = 'Hello' + 'World';
console.log(str);   // HelloWorld

// Listagem 3.2 - Formatando dados.
var username = 'Ben';
var clickedButton = false;
var stringRepresentation = 'username=' + username + '&clickedButton=' + clickedButton;
console.log(stringRepresentation);  // username=Ben&clickedButton=false


/* 
--------------------------------------------------------------------------------
* Objeto String: 
    objeto especializado cujos comportamentos coletivos facilitam a manipulacao
    de um valor do tipo string.
-------------------------------------------------------------------------------- 
*/

// Criando objetos String

// Listagem 3.3 - Instanciacao de um objeto String.
var strObject = new String('test');
console.log(strObject);     // [String: 'test']


// Interface do objeto String.
/*
    => length (propriedade): retorna o tamnho da string.
    => toString (metodo):    retorna uma representacao da colecao na forma de string.
    => charAt (metodo):      retorna o caracter que esta no indice especificado.
    => indeOf (metodo):      retorna posicao da primeira ocorrencia de uma substring.
    => lastIndexOf (metodo): retorna a ultima ocorrencia de uma substring.
    => match (metodo):       faz correspondencia de uma string com um padrao e retorna 
                             todas as correspondencias na forma de um array.
    => replace (metodo):     substitui texto em uma string.
    => slice (metodo):       retorna uma secao de uma string, conforme indicado por um intervalo.
    => substr (metodo):      retorna uma strinf conforme indicado por um indice de inicio,
                             com um tamanho especificado.
    => split (metodo):       separa uma string em substrings usando o separador especificado, e as 
                             retorna de forma de um array.
    => toUpperCase (metodo): converte todos os caracteres da string em letras maisculas.
    => toLowerCase (metodo): converte todos os caracteres da string em letras minusculas.
*/


// Listagem 3.4 - [length] Obtendo o tamanho de uma string.
var str = 'test';
var strObject = new String(str);
console.log(strObject);     // [String: 'test']
console.log(strObject.length);  // 4

// Listagem 3.4.1 - Obtendo o tipo primitivo da string.
console.log(strObject.toString());  // test

// Listagem 3.5 - [charAt] Obtendo caracteres Unicode.
var str = 'Hello World';
var strObject = new String(str);
var length = str.length;
for (let i = 0; i < length; i++) console.log(`${i}: ${strObject.charAt(i)}`);

// Listagen 3.6 - [charAt] Fazendo uma interacao pelos caracteres de uma string.
var str = 'Hello World';
var strObject = new String(str);
var length = strObject.length;
for (let i = 0; i < length; i++) console.log(strObject.charAt(i));

// Listagem 3.7 - [indexOf] Obtendo o primeiro local que uma substring ocorre.
var str = 'Hello World';
var strObject = new String(str);
console.log(strObject.indexOf('H'));    // 0

// Listagem 3.8 - [indexOf] Retorna o indice da primeira ocorrencia do caracter 'l'.
var str = 'Hello World';
var strObject = new String(str);
console.log(strObject.indexOf('l'));    // 2

// Listagem 3.9 - [indexOf] Indice igual a -1 a substring nao estara presente.
var str = 'Hello World';
var strObject = new String(str);
var index = strObject.indexOf(';');
if (index > -1) console.log(index); else console.log('substring does not occur');   // substring does not occur

// Listagem 3.10 - [indexOf] Retorna o indice de uma sequencia de caracteres.
var str = 'side beside besides the ocean';
var strObject = new String(str);
var index = strObject.indexOf('side');
if(index > -1) console.log(index); else console.log('substring does not occur');    // 0

// Listagem 3.11 - [lastIndexOf] Retorna o indice da ultima substring correspondente.
var str = 'side beside besides the ocean';
var strObject = new String(str);
var index = strObject.lastIndexOf('side');
if(index > -1) console.log(index); else console.log('substring does not occur');    // 14

// Listagem 3.12 - [match] Localiza padroes de caracteres em uma string.
var str = 'username=Ben&clickedButton=false';
var strObject = new String(str);
var stringMatches = strObject.match('username');
console.log(stringMatches);     /* 
                                    [
                                       'username',
                                        index: 0,
                                        input: 'username=Ben&clickedButton=false',
                                        groups: undefined
                                    ]
                                */
// localiza toda e qualquer serie de caracteres que nao contenha o token &
var parttnerMatches = strObject.match(/[^&]+/g);
console.log(parttnerMatches);   // ['username=Ben', 'clickedButton=false']

// Listagem 3.13 - [replace] Substitui uma string correspondente por outra.
var str = 'Hello World';
var strObject = new String(str);
var result = strObject.replace('Hello', 'Goodbye');
console.log(result);        // Goodbye World
console.log(strObject);     // [String: 'Hello World']

// Listagem 3.14 - [slice] Extraindo uma substring com slice
var str = 'Hello World';
var strObject = new String(str);
var index = strObject.indexOf('o');
var result = strObject.slice(0, index);
console.log(result);    // Hell
console.log(strObject.slice(0, index + 1)); // Hello

// Listagem 3.15 - [substr] Retorna substring em um intervalo especifico.
/*
Obs.: Ao contrario do slice, o tamanho nao indica o indice, e sim o numero
      total de caracteres a ser retornado na substring.
*/
var str = 'Hello World';
var strObject = new String(str);
var startIndex = strObject.indexOf('W');    // 6
var length = (new String('World').length);  // 5
var result = strObject.substr(startIndex, length);
console.log(result);    // World

// Listagem 3.16 - [split] Separando uma string delimitado com virgula e retornando um Array
var strObject = new String('ben, mike, ivan, kyle');
console.log(strObject.split(','));  // [ 'ben', ' mike', ' ivan', ' kyle' ]

// Listagem 3.17 - [toUpperCase] Convertendo todos os caracteres alfabeticos em letra maiuscula.
var strObject = new String('Hello World');
console.log(strObject.toUpperCase());   // HELLO WORLD

// Listagem 3.18 - [toLowerCase] Aplicando letras minusculas em todos caracteres alfanumericos.
var strObject = new String('Hello World');
console.log(strObject.toLowerCase());   // hello world

// Listagem 3.19 - [toLowerCase] Comparacoes levam em conta a diferenca entre letras maiusculas e minusculas.
console.log('Hello World' === 'hello world');   // false
console.log('Hello world' === 'hello world');   // false
console.log('HELLO WORLD' === 'Hello World');   // false

// Listagem 3.20 - [Objeto String implicito] Uso implicito do objeto string.
var strLiteral = 'Hello World';
console.log(strLiteral.toLowerCase());  // hello world
console.log(strLiteral.length);         // 11 
console.log(strLiteral.substr(0, 5));   // Hello
