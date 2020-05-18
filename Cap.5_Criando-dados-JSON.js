
// CAP.5 - Criando dados JSON.


/* 
--------------------------------------------------------------------------------
* Processo de serializacao - desmitificado
-------------------------------------------------------------------------------- 
*/

// Listagem 5.1 - Concatenando valores primitivos com string.
"" + 1;          // gera 1
"" + true;       // gera "true"
"" + null;       // gera "null"
"" + undefined;  // gera "undefided"
"" + "Hello";    // gera "Hello"


// Listagem 5.2 - Concatenando valores nao primitivos com strings.
"" + { identifier: "Hello" };   // gera "[object Object]"
"" + ["Hello", ["hello", "World"]];     // gera "Hello, hello, World"


// Tabela 5.1 - Os Seis caracteres estruturais que correspondem a tokens.
/*
    Token                 | Literal | Nome
    ------------------------------------------------------
    Inicio de array       |   [     | colchete esquerdo
    Fim de array          |   ]     | colchete direito
    Inicio de objeto      |   {     | chave esquerda
    Fim de objeto         |   }     | chave direita
    Separador nome/valor  |   :     | dois pontos
    Separador de valor    |   ,     | virgula
*/


// Listagem 5.3 - Covertendo um objeto e sua propriedade em um objeto literal.
var author = new Object();
author.name = "Ben";

var literal = stringify(author);

function stringify(structure) { 
    // se a estrutura fornecida for um dado do tipo string.
    if (typeof structure === "string") {
        return '"' + String(structure) + '"';
    }

    // se a estrutura fornecida for um dado do tipo objeto.
    if (typeof structure === "object") {
        var v = "";
        var partial = [];

        // para cada propriedade mantida pela nossa estrutura.
        for (var k in structure) {
            v = structure[k];
            v = stringify(v);
            partial.push(k + ": " + v);
        }

        // se partial nao tiver 'filhos' inclui chaves de abertura/fechamento.
        // caso contrario, delimita os valores entre chaves de abertura/fechamento com virgula.
        v = (partial.length === 0) ? '{}' : ' { ' + partial.join(', ') + ' }';

        return v;
    }
}

console.log(literal);          // { name: "Ben" }
console.log(typeof literal);   // string


// Listagem 5.4 - Uma estrutura de dados aninhada.
var author = new Object();
author.name = "Ben";
author.age = 36;
author.pets = [
    { name: "Waverly", age: 3.5 },
    { name: "Westley", age: 4 }
]

var literal = stringify(author);

console.log(literal);   // { name: "Ben", age: undefined, pets:  { 0:  { name: "Waverly", age: undefined }, 1:  { name: "Westley", age: undefined } } }
console.log(typeof literal);    // string



/* 
--------------------------------------------------------------------------------
* JSON Object
-------------------------------------------------------------------------------- 
*/

// ********************************************************************************
// stringfy: Utilizado para serializar valores JavaScript, convertendo-os em
//           um JSON valido.
//           JSON Object é um objeto global que nao oferece a possibilidade de
//           criar nenhuma instancia.
//           O metodo aceita 3 parametros: value, replacer, space.
// ********************************************************************************


// Listagem 5.6 - Sintaxe do metodo stringfy.
// JSON.stringify(value[, replacer [, space]])

// replacer e space sao parametros opcionais, mas caso se utilize por exemplo o param 
// 'space', um valor do tipo null deve ser atribuido explicitamente ao param 'replacer'
// O parametro 'value' é o unico obrigatorio, e representa o valor JavaScript a ser serializado, 
// podendo ser qualuer objeto, valor primitivo, ou ate uma composicao de ambos.


// Listagem 5.7 - Marcacao HTML mostrando resultadi de JSON.stringfy.
/*
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="Livros/Json Basico [Apress - Ben Smith]/Libs/json2.js"></script>    
    </head>
    <body>
        <script>
            // Obtem referencia à tag body
            var body = document.getElementsByTagName('body')[0];

            // Funcao que concatenara um valor ao corpo para que seja exibido.
            function log(jsonText) {
                // insere aspas duplas ao redor do jsoText fornecido e concatena um marcador de nova linha.
                body.innerHTML += '"' + jsonText + '"<br>';            
            }

            var author = new Object();
                author.name = "Ben";
                author.age = 36;
                author.pets = [
                    { name: "Waverly", age: 3.5 },
                    { name: "Westley", age: 4 },                
                ];

            var JSONtext = JSON.stringify(author);
            log(JSONtext);
        </script>
    </body>
    </html>
*/

// {"name":"Ben","age":36,"pets":[{"name":"Waverly","age":3.5},{"name":"Westley","age":4}]}


// Exericio 5.1 - stringfy.
var body = "";

// Funcao que concatenara um valor ao corpo para que seja exibido.
function log(jsonText) {
    // insere aspas duplas ao redor do jsoText fornecido e concatena um marcador de nova linha.
    body += '"' + jsonText + '"\n';            
}

log(JSON.stringify(false));                         // "false"
log(JSON.stringify(undefined));                     // "undefined"
log(JSON.stringify([undefined]));                   // "[null]"
log(JSON.stringify([undefined, false]));            // "[null,false]"
log(JSON.stringify({ prop: undefined }));           // "{}" propriedades com valor undefined serao completamente removidas do texto JSON
log(JSON.stringify(new Date('Jan 1 2015')));        // ""2015-01-01T02:00:00.000Z""

var obj = new Object();
    obj.name = 'name-test';
    obj.f = function() {                            // funcoes sao ignoradas pelo metodo stringfy.
        return 'function test';
    };

log(JSON.stringify(obj));                                                   // "{"name":"name-test"}"
log(JSON.stringify('this example \u000A\u000D has control charecters'));    // ""this example \n\r has control charecters""
log(JSON.stringify('true'));                                                // ""true""
log(JSON.stringify(1/0));                                                   // "null"
log(JSON.stringify(Infinity));                                              // "null"  todos os valores numericos devem ser finitos.
log(JSON.stringify([ function() { return 'A' }]));                          // "[null]"

var selfReference = new Array();
    selfReference[0] = selfReference;       // JSON nao pode lidar com valores ciclicos de objetos.
                                            // Nem arrays, nem objetos poderao ter um valor que seja uma referencia a si mesmo.

// Bloco try/catch para visualizar o erro que sera gerado pela linha abaixo.
try {
    JSON.stringify(selfReference);
} catch (error) {
    log(error);     // "TypeError: Converting circular structure to JSON
                    // --> starting at object with constructor 'Array'
                    // --- index 0 closes the circle"
}

console.log(body);



// ********************************************************************************
// toJSON: 
// ********************************************************************************

// Listagem 5.8 - Implementacao default de toJSON.
Date.prototype.toJSON = function(key) {
    function f(n) {
        // formata inteiros para que tenham pelo menos 2 digitos.
        return n < 10 ? '0' + n : n;
    }

    return this.getUTCFullYear() + '-' + 
            f(this.getUTCMonth() + 1) + '-' + 
            f(this.getUTCDate()) + 'T' + 
            f(this.getUTCHours()) + ':' + 
            f(this.getUTCMinutes()) + ':' + 
            f(this.getUTCSeconds()) + 'Z';
};


// Listagem 5.9 - Associar a funcao toJSON a Object fara todos os objetos js terem essa funcao
Object.prototype.toJSON = function(key) {
    // faz log da chave sendo analisada.
    console.log(key);   // exibe a chave para o contexto corrente (mostrado abaixo).
    // faz log do escopo do metodo.
    console.log(this);  // exibe o contexto corrente (mostrado abaixo).
    // retorna o objeto como esta, de volta ao serializador.
    return this;
};

var author = new Object();
                author.name = "Ben";
                author.age = 36;
                author.pets = [
                    { name: "Waverly", age: 3.5 },
                    { name: "Westley", age: 4 },                
                ];

JSON.stringify(author);




// ********************************************************************************
// replacer: O parametro opcional pode ser uma funcao que altera o modo como objetos
//           e arrays sao transformados em strings ou pode ser um array de strings e 
//           numeros que atua como uma lista branca (white list) para selecionar as 
//           propriedades do objeto a serem transformadas em string.
// ********************************************************************************

// Listagem 5.10 - Propriedade pets substituida por e-mail.
var author = new Object();
                author.name = "Ben";
                author.age = 36;
                author.email = 'iben@spilled-milk.com';

console.log(JSON.stringify(author)); // {"name":"Ben","age":36,"email":"iben@spilled-milk.com"}


// Obs: Caso desejarmos recuperar propriedades especificas, forneceremos o parametro
//      array cujos valores representem as propriedades que queremos que stringfy 
//      serialize. O texto JSON caputurara somente esses pares chave/valor.


// Listagem 5.11 - Ao fornecer um array replacer, podemos especificar queis chaves devem ser exibidas
// A listagem coloca 2 parametros (name e age) na lista branca (white list).
console.log(JSON.stringify(author, ['name', 'age']));   // {"name":"Ben","age":36}


// Listagem 5.12 - A ordem das propriedades na lista branca determina a ordem que elas serao capturadas
console.log(JSON.stringify(author, ['age', 'name']));   // {"age":36,"name":"Ben"}


// Listagem 5.13 - Numeros usados como chaves sao convertidos para strings.
var yankeesLineup = new Object();
    yankeesLineup['1'] = 'Jacob Ellsbury';
    yankeesLineup['2'] = 'Derek Jeter';
    yankeesLineup['3'] = 'Carlos Beltran';
    yankeesLineup['4'] = 'Afonso Soriano';

console.log(JSON.stringify(yankeesLineup, [1,2]));  // {"1":"Jacob Ellsbury","2":"Derek Jeter"}


// Listagem 5.14 - Assinatura da funcao replacer.
var replaceFunction = function(k, v) {};    // k: representa o identificador chave para cada objeto que o metodo se aplica
                                            // v: representa o valor associado a chave.


// Listagem 5.15 - Fazendo logging de todas as chaves, valores e contexto com a funcao replacer.
var author = new Object();
                author.name = "Ben";
                author.age = 36;
                author.pets = [
                    { name: "Waverly", age: 3.5 },
                    { name: "Westley", age: 4 },                
                ];

JSON.stringify(author, function(k,v) {
    console.log(this);
    console.log(k);
    console.log(v);
    
    return v;
});

/*
        * o wrapper do objeto inicial sendo analisado.
    (contexto)  { '': { name: 'Ben', age: 36, pets: [ [Object], [Object] ] } }
    (chave)     (string vazia)
    (valor)     {  name: 'Ben',  age: 36,  pets: [ { name: 'Waverly', age: 3.5 }, { name: 'Westley', age: 4 } ] }

        * a propriedade ben do obj author sendo analisada.
    (contexto)  {  name: 'Ben',  age: 36,  pets: [ { name: 'Waverly', age: 3.5 }, { name: 'Westley', age: 4 } ] }
    (chave)     name
    (valor)     Ben    

        * a propriedade age do obj author sendo analisada.
    (contexto)  {  name: 'Ben',  age: 36,  pets: [ { name: 'Waverly', age: 3.5 }, { name: 'Westley', age: 4 } ] }
    (chave)     age
    (valor)     36

        * a propriedade pets do obj author sendo analisada.
    (contexto)  {  name: 'Ben',  age: 36,  pets: [ { name: 'Waverly', age: 3.5 }, { name: 'Westley', age: 4 } ] }
    (chave)     pets
    (valor)     [ { name: 'Waverly', age: 3.5 }, { name: 'Westley', age: 4 } ]    

        * o indice 0 do obj pets sendo analisado.
    (contexto)  [ { name: 'Waverly', age: 3.5 }, { name: 'Westley', age: 4 } ]
    (chave)     0
    (valor)     { name: 'Waverly', age: 3.5 }

        * a propriedade name do indice 0 sendo analisada.
    (contexto)  { name: 'Waverly', age: 3.5 }
    (chave)     name
    (valor)     Waverly    

        * a propriedade age do indice 0 sendo analisada.
    (contexto)  { name: 'Waverly', age: 3.5 }
    (chave)     age
    (valor)     3.5    

        * o indice 1 do obj pets sendo analisado.
    (contexto)  [ { name: 'Waverly', age: 3.5 }, { name: 'Westley', age: 4 } ]
    (chave)     1
    (valor)     { name: 'Westley', age: 4 }    

        * a propriedade name do indice 1 sendo analisada.
    (contexto)  { name: 'Westley', age: 4 }
    (chave)     name
    (valor)     Westley

        * a propriedade age do indice 1 sendo analisada.
    (contexto)  { name: 'Westley', age: 4 }
    (chave)     age
    (valor)     4
*/


// Listagem 5.16 - Funcao replacer pode ser usada para possibilitar uma serializacao personalizada.
var author = new Object();
                author.name = "Ben";
                author.age = 36;
                author.pets = [
                    { name: "Waverly", age: 3.5 },
                    { name: "Westley", age: 4 },                
                ];

var replacer = function(k,v) {
    // caso o valor da chave seja igual a 'age' a remove do texto JSON final.
    if (k === 'age') {
        return undefined;
    } else {
        return v;
    }
};

console.log(JSON.stringify(author, replacer));  // {"name":"Ben","pets":[{"name":"Waverly"},{"name":"Westley"}]}




// ********************************************************************************
// space: parametro sempre opcional que permite especificar o padding (espacamento)
//        que separa cada valor do outro no texto JSON gerado.
//        O valor deve ser um numero inteiro maior ou igual a 1 (valor menor nao tera efeito)
//        O valor do parametro so tera efeito sobre o texto gerado, caso ele nao
//        contenha um array ou um objeto.
// ********************************************************************************

// Listagem 5.17 - Texto JSON com padding adicionado.
var obj = { primitive: 'string', array: ['a', 'b'] };

// sem padding.
console.log(JSON.stringify(obj, null, 0));  // {"primitive":"string","array":["a","b"]}

// com espacamento de 8.
console.log(JSON.stringify(obj, null, 8));  
/*
{
        "primitive": "string",
        "array": [
                "a",
                "b"
        ]
}
*/


// Listagem 5.18 - Espacos funcionam somente em objetos e arrays.
var primitive = 'string';
console.log(JSON.stringify(primitive, null, 8));    // "string"

