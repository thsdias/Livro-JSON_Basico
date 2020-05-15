
// CAP.2 - Apresenta os fundamentos para trabalhar com objetos Javasccript.


/* 
--------------------------------------------------------------------------------
* Notacao de acesso: 
    Duas variedades de acesso conhecidas como notacao de ponto e notacao de colchetes
-------------------------------------------------------------------------------- 
*/

// Listagem 2.2 - Notacao de ponto usada para acessar um membro de uma instancia.
var aCollection = new Object();
console.log(aCollection.firstProperty);
aCollection.firstProperty = 'Hello World';
console.log(aCollection.firstProperty);
console.log(aCollection.toString());
console.log();

// Listagem 2.3 - Notacao de colchetes usada para acessar um membro de uma instancia.
var aCollection = new Object();
console.log();
console.log(aCollection['firtsProperty']);
aCollection['firstProperty'] = 'Hello World';
console.log(aCollection['firstProperty']);
console.log(aCollection.toString());
console.log();

// Listagem 2.4 - Comparando notacoes.
var aBrackeNotationCollectionA = new Object();
aBrackeNotationCollectionA['1'] = '1';
console.log(aBrackeNotationCollectionA['1']);

var aDotNotationCollectionB = new Object();
//aDotNotationCollectionB.1 = '1';  // SyntaxError: Unexpected number.
console.log();


/* 
--------------------------------------------------------------------------------
* Array
-------------------------------------------------------------------------------- 
*/

// Listagem 2.5 - lista ordenada dos dias da semana.
var orderedCollection = new Array();
orderedCollection[0] = 'Sunday';
orderedCollection[1] = 'Monday';
orderedCollection[2] = 'Tuesday';
orderedCollection[3] = 'Wednesday';
orderedCollection[4] = 'Thursday';
orderedCollection[5] = 'Friday';
orderedCollection[6] = 'Saturday';

// Listagem 2.6 - Loop For em objeto tipo Array.
var daysOfTheWeek = 7;

for (let i = 0; i < daysOfTheWeek; i++) {
    console.log(orderedCollection[i]);    
} 

// Listagem 2.7 - Representacao string de um array.
console.log();
console.log(orderedCollection.toString());
console.log();


/* 
--------------------------------------------------------------------------------
* Objetos Literais
-------------------------------------------------------------------------------- 
*/

// Listagem 2.8 - Criacao de objetos literais com membros.
var array = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
console.log(array[0]);

var object = { firstProperty: 'hello world' };
console.log(object.firstProperty);
console.log();

// Listagem 2.9
var externalObject = new Object();
externalObject.child = internalObject;

var internalObject = new Array();
internalObject[0] = 'Sunday';
internalObject[1] = 'Monday';
internalObject[2] = 'Tuesday';
internalObject[3] = 'Wednesday';
internalObject[4] = 'Thursday';
internalObject[5] = 'Friday';
internalObject[6] = 'Saturday';

console.log(externalObject.child);
console.log();

// Listagem 10 - Atribuicao de instancia em outro local.
var externalObject = new Object();

var internalObject = new Array();
internalObject[0] = 'Sunday';
internalObject[1] = 'Monday';
internalObject[2] = 'Tuesday';
internalObject[3] = 'Wednesday';
internalObject[4] = 'Thursday';
internalObject[5] = 'Friday';
internalObject[6] = 'Saturday';

externalObject.child = internalObject;
console.log(externalObject.child);
console.log();

// Listagem 2.11 - Reordenacao das instanciacoes.
var internalObject = new Array();
internalObject[0] = 'Sunday';
internalObject[1] = 'Monday';
internalObject[2] = 'Tuesday';
internalObject[3] = 'Wednesday';
internalObject[4] = 'Thursday';
internalObject[5] = 'Friday';
internalObject[6] = 'Saturday';

var externalObject = new Object();
externalObject.child = internalObject;
console.log(externalObject.child);
console.log();

// Listagem 2.12 - Objetos literais criados a medida que sao avaliados.
var externalObject = {
    child: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
};

console.log();
console.log(externalObject.child);
console.log(externalObject.child.toString());
console.log();


/* 
--------------------------------------------------------------------------------
* Objeto Literal: Consiste em usar chaves de abertura e fechamento ({, })
-------------------------------------------------------------------------------- 
*/

// Listagem 2.13 - Representacao sintatica de um objeto literal.
var emptyObject = { };
console.log(emptyObject.toString());  // [object Object]

// Listagem 2.14 - Objeti literal com par chave/valor.
var literalObject = {
    firstProperty: 'Hello World'
};
console.log(literalObject.firstProperty);  // Hello World

// Listagem 2.15 - Objeto literal criado com varios pares chave/valor.
var literalObject = {
    firstProperty: 'hello world',
    name: 'iObjectA',
    toString: function() {
        return this.name;
    }
};
console.log(literalObject.toString());  // iObjectA


/* 
--------------------------------------------------------------------------------
* Array literal: Consiste no uso de colchetes de abertura e fechamento ([,])
-------------------------------------------------------------------------------- 
*/

// Listagem 2.16 - Representacao sintatica do Array literal.
var literalArray = [];
console.log(literalArray);  // []

// Listagem 2.17 - Array literal criado com um par chave/valor.
var literalArray = ['hello world'];
console.log(literalArray);  // [ 'hello world' ]

// Listagem 2.18 - Valor do Array obtido por meio da notacao de colchetes.
var literalArray = ['hello world'];
console.log(literalArray[0]);

// Listagem 2.19 - Array litreal com varios pares chave/valor.
var literalArray = ['hello world', 'goodbye world'];
console.log(literalArray[0]);
console.log(literalArray[1]);
