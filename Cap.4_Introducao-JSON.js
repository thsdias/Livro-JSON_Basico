
// CAP.4 - Introducao ao JSON.


/* 
--------------------------------------------------------------------------------
* Estruturas Compostas
-------------------------------------------------------------------------------- 
*/

// Listagem 4.1 - Exemplos de representaoes validas para uma colecao de pares
//                 chave/valor, de acordo com a gramatica JSON.

// Colecao vazia.
// {};

// Unico par string/valor.
// { "abc": "123" };

// Varios pares string/valor.
// { 
//     "captainsLog": "starDate 9522.6",
//     "Message": "I've never trusted Klingons, and I never will."
// }


// Listagem 4.2 - Exemplos de representacoes validas para uma lista ordenada, de 
//                 acordo com a gramatica JSON.

// Lista ordenada vazia.
// [];

// Lista ordenada com um unico valor.
// ["abc"];

// Lista ordenada com varios valores.
// ["0", 1, 2, 3, 4, 100];


// Listagem 4.3 - Usando palavra-chave new para instanciar um objeto e um array.
var objectInstantion = new Object(); // a chamada ao construtor retorna um novo Object.
var arrayInstantion = new Array(); // a chamada ao construtor retorna um novo Array.

/* Obs: A maneira alternativa possivel de ser usada para criar um objeto, ou um array
        consiste em defini-los 'literalmente', como mostrado na listagem 4.4
*/


// Listagem 4.4 - Criacao de um objeto e de um array por meio de notacao literal.
var objectInstantion = {};   // criacao de um objeto vazio.
var arrayInstantion = [];   // criacao de um array vazio.


// Listagem 4.5 - Design de um objeto e de um array por meio de notacao literal, 
//                com configuracao de propriedades.
var objectInstantion = { name: "ben", age: 36 };
var arrayInstantion = ["ben", 36];


// Listagem 4.6 - As chaves do objeto podem ser definidas explicitamente ou implicitamente como strings.
var objectInstantionA = { name: "ben", age: 36 };
var objectInstantionB = { "name": "ben", age: 36 };

console.log(objectInstantionA.name);    // "ben".
console.log(objectInstantionB.name);    // "ben".


// Listagem 4.7 - Primeira mensagem JSON usada por Douglas Crockford.
var firstJSON = { to: "session", do: "test", message: "Hello World" };  // ECMA 3 erro sintaxe.

/* Obs: Erro de sintaxe no ECMA 3 por causa do uso da palavra-chave 'do' como nome de propriedade
        em um par string/valor.

        A 5 edicao do ECMAScript permite que palavras-chave sejam usadas agora com a notacao de ponto.
        No entanto a especificacao do JSON continua a levar em conta o legado.
*/



/* 
--------------------------------------------------------------------------------
* Valores JSON
-------------------------------------------------------------------------------- 
*/

// Listagem 4.8 - Exemplos de valores validos para string, conforme definidos pela gramatica JSON.

// Ausencia de Unicode.
"";

// Caracteres Unicode quaisquer.
"Σ";

// Uso de caracteres com escape para exibir aspas duplas.
" \" \" ";

// Uso de \u indica um valor Unicode.
"\u22A0" // exibe ⊠

// Uma serie de Unicodes validos, conforme definidos pela gramatica.
"\u22A0 ⊠ \" Σ \n";


// Listagem 4.9 - Valores numericos validos.
/*
    -0.01                   // uso valido de 0s.
    00.1                    // 0s superfluos geram um SyntaxError.
    1/3                     // forma de fracao.
    .333333333333333333     // forma decimal.
    1.2e-1                  // notacao cientifica.
*/

// Listagem 4.10 - Exemplos de texto JSON contendo variedade  de valores JSON validos.

// Texto JSON para um array com tipos primitivos.
//  [
//      null, true, 8
//  ]

// Texto JSON para um objeto com dois membros.
//  {
//      "first": "Ben",
//      "last": "Smith"
//  }

// Texto JSON para um array com composicoes aninhadas.
//  [
//      { "abc": "123" },
//      ["0", 1, 2, 3, 4, 100]
//  ]

// Texto JSON para um objeto com composicoes aninhadas.
//  {
//      "object": {
//          "array": [true]
//      }
//  }



/* 
--------------------------------------------------------------------------------
* Tokens do JSON
-------------------------------------------------------------------------------- 
*/

// Tabela 4.2 - Seis caracteres estruturais usados como tokens:
/*
    Token                 | Valor com escape |   Valor Unicode |  Literal | Nome
    -----------------------------------------------------------------------------------
    Inicio de array       |       %5b        |    \u005b       |    [     | colchete esquerdo
    Fim de array          |       %5d        |    \u005d       |    ]     | colchete direito
    Inicio de objeto      |       %7b        |    \u007b       |    {     | chave esquerda
    Fim de objeto         |       %7d        |    \u007d       |    }     | chave direita
    Separador nome/valor  |       %3a        |    \u003a       |    :     | dois pontos
    Separador de valor    |       %2c        |    \u002c       |    ,     | virgula

    * Obs: JSON ignora todos os espacos em branco insignificantes, antes ou depois dos seis tokens
*/


// Tabela 4.3 - Quatro tokens relacionados a espacos em branco
/*
    Token                 | Nome                        |   Valor com escape |  Valor Unicode
    ------------------------------------------------------------------------------------------
    Caracter de controle  | Espaco                      |    %20             |    \u0020
    Caracter de controle  | Tabulacao Horizontal        |    %09             |    \u0009
    Caracter de controle  | Quebra linha / Nova linha   |    %0A             |    \u000A
    Caracter de controle  | Carriage return             |    %0D             |    \u000D
*/



/* 
--------------------------------------------------------------------------------
* Editores/Validadores JSON
-------------------------------------------------------------------------------- 
*/

// http://jsoneditoronline.org
// http://jsonlint.com/
