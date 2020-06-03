
// CAP.6 - Parsing de JSON.

// ************************************************************************************
// stringfy: Gera JSON serializado a partir de um dado.
// -----------------------------------------------------------------------------------
// parse: Converte o texto JSON em um valor JavaScript.
// ************************************************************************************


// Listagem 6.1 - Sintaxe do metodo JSON.parse.
JSON.parse(text [, reviver]);      // text: Obrigatorio. Indica o valor que ele espera 
                                   //       receber. Esse parametro exige um JSON serializado.
                                   // reviver: Opcional. Usado de modo semelhante ao param 
                                   //          replacer de stringfy. Oferece a possibilidade
                                   //          de fornecer uma logica personalizada para o
                                   //          parsing.


// Listagem 6.2 - Gramatica invalida de JSON gera um erro de sintaxe.
var str = JSON.parse('abc123');     // SyntaxError: Unexpected token a in JSON at position 0


// Listagem 6.3 - Gramatica valida de JSON cujo parse foi feito com sucesso.
var str = JSON.parse('"abc123"');   // valor de string corresponde a um JSON valido.
console.log(str);   // 'abc123'
console.log(typeof str);    // string


// Listagem 6.4 - Estruturas compostas criam arvores de dados.
var JSONtext = `{"name": "Ben", "age": 36, "pets": [{"name":"Waverly", "age": 3.5}, 
                {"name": "Westley", "age": 4}]}`;
var author = JSON.parse(JSONtext);
console.log(author);

// Arvore de dados do texto JSON serializado apos o parse.
/* 
    {
        name: 'Ben',
        age: 36,
        pets: [ { name: 'Waverly', age: 3.5 }, { name: 'Westley', age: 4 } ]
    }
*/


// Listagem 6.5 - Os membros podem ser acessados por meio da notacao apropriada.
var JSONtext = `{"name": "Ben", "age": 36, "pets": [{"name":"Waverly", "age": 3.5}, 
                {"name": "Westley", "age": 4}]}`;
var author = JSON.parse(JSONtext); 
console.log(typeof author);         // object
console.log(author.name);           // Ben
console.log(author.pets.length);    // 2
console.log(author.pets[0].name);   // Waverly 


/* 
--------------------------------------------------------------------------------
* eval:
    Propriedade do objeto global e aceita um argumento na forma de string.
    A string fornecida pode representar uma expressao, uma instrucao, ou ambos.
    Sera avaliada como codigo javascript.
-------------------------------------------------------------------------------- 
*/


// Listagem 6.6 - eval avalia uma string como codigo JavaScript.
eval("console.log('Hello World')");   // Hello World (transforma a string em um programa javascript valido)


// Listagem 6.7 - eval retorna o resultado de uma avaliacao.
var answer = eval("1 + 5");
console.log(answer);    // 6


// Listagem 6.8 - Objetis literais podem ser avaliados pela funcao eval.
var array = eval("['Waverly', 'Westley', 'Ben']");
console.log(array[1]);  // Westley


// Listagem 6.9 - Strings literais nao podem ter quebras de linha.
/*
    var str = 'this is a sentence with a new line
    ... here is my new line';   // syntax error.
*/

// Invalid or unexpected token
eval('"this is a sentenced with a new line \u000a...here is my new line"');


// 6.10 - Strings literais podem conter quebras linha somente se usarem escape.
eval('"this is a sentenced with a new line \\u000a...here is my new line"');


// 6.11 - Atribuicoes podem causar impacto em seus valores JavaScript existentes.
var foo = 123;
eval('var foo = "abc"');
console.log(foo);   // abc

// Obs: Como valores JavaScript podem ser facilmente sobrescritos, é mandatorio
//      que somente texto JSON valido seja fornecido a eval.


/* 
--------------------------------------------------------------------------------------------
* reviver:
    Parametro que pode receber somente uma funcao (var reviver = function(k,v))
    Se uma funcao reviver for fornecida, o valor JavaScript retornado pelo
    metodo eval sera 'percorrido' de forma interativa. Esse laço descobrira todas
    as propriedades do objeto atual e continuara percorrendo todas as estruturas
    aninhadas que esse objeti tiver como valores.
    A funcao reviver pode usar esses rotulos como condicoes necessarias para
    converter os valores retornados por eval, a fim de obter as estruturas
    JavaScript necessarias ao propositos da nossa aplicacao.
    Se reviver retornar undefined como o novo valor de um membro, esse membro sera apagado
    reviver manipula valores JavaScript, e nap a gramatica JSON.
--------------------------------------------------------------------------------------------
*/

// Listagem 6.12 - Assinatura da funcao reviver.
var reviver = function(k, v) {}   // k: chave, v; valor


// Listagem 6.13 - Membros serao apagados se o valor retornado por reviver for undefined.
var JSONtext = '{"name": "Ben", "age": 36, "pets": [{"name":"Waverly", "age": 3.5}, {"name": "Westley", "age": 4}]}';
var reviver = function(k, v) {};
var author = JSON.parse(JSONtext, reviver); 

console.log(author);    // undefined
console.log(typeof author); // undefined


// Listagem 6.14 - Retornar o valor fornecido a funcao reviver.
var JSONtext = '{"name": "Ben", "age": 36, "pets": [{"name":"Waverly", "age": 3.5}, {"name": "Westley", "age": 4}]}';
var reviver = function(k, v) { return v };
var author = JSON.parse(JSONtext, reviver); 

console.log(author);
console.log(typeof author); 

// Preserva o valor original.
/* 
    {
        name: 'Ben',
        age: 36,
        pets: [ { name: 'Waverly', age: 3.5 }, { name: 'Westley', age: 4 } ]
    }
    object
*/


// Listagem 6.15 - strings formatadas como data ISO podem ser transformadas em objetos date.
var date = new Date('Jan 1 2015');
var stringfiedData = JSON.stringify(date);
console.log(stringfiedData);    // "2015-01-01T02:00:00.000Z"
console.log(typeof stringfiedData); // string

var dateReviver = function(k, v) { return new Date(v); };
var revivedDate = JSON.parse(stringfiedData, dateReviver);
console.log(revivedDate);   // 2015-01-01T02:00:00.000Z
console.log(typeof revivedDate);    // object


// Listagem 6.17 - Identificadores com rotulos bem definidos podem ser usados para
//                  determinar quais objetos exigem tratamento adicional em reviver.
var book = {};
    book.title = 'Beginning JSON';
    book.publishDate = new Date('Jan 1 2015');
    book.publisher = 'Apress';
    book.topic = 'JSON Data Interchange Format';
var bookAsJSONtext = JSON.stringify(book);

console.log(bookAsJSONtext);
/* 
    {
        "title":"Beginning JSON",
        "publishDate":"2015-01-01T02:00:00.000Z",
        "publisher":"Apress",
        "topic":"JSON Data Interchange Format"
    }
*/

// Funcao determina qual objeto deve receber tratamento adicional.
var reviver = function(k, v) {     
    if (k === 'publishDate') {
        return new Date(v);
    } else {
        return v;
    }
};

var parsedJSON = JSON.parse(bookAsJSONtext, reviver);

console.log(parsedJSON);
/* 
    {
        title: 'Beginning JSON',
        publishDate: 2015-01-01T02:00:00.000Z,
        publisher: 'Apress',
        topic: 'JSON Data Interchange Format'
    }
*/


// Listagem 6.18 - Classes personalizadas sao serializadas como um objeto comum.
function Person() {
    this.name;
    this.age;
    this.gender;
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

// Valida se a instancia p é do tipo Person atraves do operador instaceof.
console.log(p);     // Person { name: 'ben', age: '36', gender: 'male' }
console.log(p instanceof Person);   // true

// Serializa a instancia p.
var serializedPerson = JSON.stringify(p);
console.log(serializedPerson);  // {"name":"ben","age":"36","gender":"male"}

// Efetua o parse de volta para um objeto JavaScript.
var parsedJSON = JSON.parse(serializedPerson);
console.log(parsedJSON instanceof Person);   // false
console.log(parsedJSON);    // { name: 'ben', age: '36', gender: 'male' }
console.log(parsedJSON.getName());    // Erro: parsedJSON.getName is not a function


// Listagem 6.19 - Reativando o tipo de dado personalizado de um objeto com a funcao reviver.
function Person() {
    this.name;
    this.age;
    this.gender;
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

// Valida se a instancia p é do tipo Person.
console.log(p instanceof Person);   // true

// Serializa a instancia p.
var serializedPerson = JSON.stringify(p);

var reviver = function(k, v) {
    // se a chave for uma string vazia, sabemos que é nosso obj de mais alto nivel.
    if (k === '') {
        // define a cadeia de heranca do obj para que seja igual a de um instancia Person.
        v.__proto__ = new Person();
    }

    return v;
};

// Efetua o parse de volta dessa vez utilizando a funcao reviver como parametro do metodo.
var parsedJSON = JSON.parse(serializedPerson, reviver);

console.log(parsedJSON instanceof Person);  // true
console.log(parsedJSON);    // Person { name: 'ben', age: '36', gender: 'male' }
console.log(parsedJSON.getName());  // 'ben'
