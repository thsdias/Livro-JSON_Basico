
// CAP.12 - Persistencia de JSON: II.

// Cria novos documentos:
/*
    {
        "id": "...", // gerado automaticamente
        "handle": "@apache",
        "message": "Hello World"
    }
    
    {
        "id": "...",
        "handle": "@CouchDB",
        "message": "greetings and salutations",
    }
    {
        "id": "...",
        "handle": "@MongoDB",
        "message": "NoSQL DB - MongoDB",
    }
*/


// Listagem 12.1 - Implementacao de uma funcao map especifica.
/*
function(doc) {
    if(doc.handle) {
        emit(doc.handle, {"handle": doc.handle, "message": doc.message, "_id": doc._id});
    }
}
*/

// Gera e salva a nova view => _design: guests  / view: signature
// http://127.0.0.1:5984/guestbook/_design/guests/_view/signatures
// http://127.0.0.1:5984/guestbook/_design/guests/_view/signatures?key="@couchDB"



// Cradle para Node
/* 
    Cradle é um modulo cliente de terceiros para o CouchDB, de alto nivel 
    criado para funcionar de forma facil e assincrona com o CouchDB e 
    aplicacoes Node.

    https://github.com/flatiron/cradle
    => instalacao: npm install cradle
*/


// Listagem 12.2 - Incluindo e configurando o Cradle com o CouchDB.
var cradle = require('../node_module/cradle');  // corresponde ao path da pasta node_module criada pelo comando npm do cradle.
var DBConnection = cradle.Connection;
var couchDB = new DBConnection('127.0.0.1', 5984, { // endereco e porta do servidor do couchDB.
    cache: true,
    raw: false,
    forceSave: true
});


// Listagem 12.3 - Criando uma referencia a um banco de dados.
var gbDataBase = couchDB.database('guestbook');


// Tabela 12.1 Metodos de um wrapper Cradle.
/* 
    Metodo                  Descricao
_______________________________________________________________________
    create();               Usado para criar um banco de dados    

    exists( callback )      Usado para determinar se um banco de dados
                            existe no momento.

    get( id[,id]            Usado para buscar um documento em particular
        , [object]
        , callback)

    view( id                Usado para query em uma view existente 
         , [object]
         , callback)   

    save( [id]              Usado para salvar um documento no banco de         
         , object           dados atual. Pode ser usado para salvar uma          
         , callback)        view ou uma entrada
*/


// Listagem 12.4 - Criando nossa referencia ao banco de dados

// ... codigo removido
var gbDataBase = couchDB.database('guestbook');
    gbDataBase.create();    // equivalente a Create Database
    

// Listagem 12.5 - Assinatura da callback para o metodo exists.
//function(err, exists);


// Listagem 12.6 - Determinando se um banco de dados existe

// ...codigo removido
gbDataBase.exists(function(err, exists) {
    if (err) {
        console.log('error: ', err);
    } else if(exists) {
        console.log('the guestbook db exists');
    } else {
        console.log('databse does not exists');
        gbDataBase.create();
    }
});


// Listagem 12.7 - Parametros da string de query fornecidos como membros de um objeto
var queryString = { limit: 1, key: "@CouchDB" };


// Listagem 12.8 - Assinatura da callback para get
//function(err, res);


// Listagem 12.9 - Obtendo todos os documentos do banco de dados alvo
var cradle = require('../node_modules/cradle');
var DBConnection = cradle.Connection;
var couchDB = new DBConnection('127.0.0.1', 5984, {
    cache: true,
    raw: false,
    forceSave: true
});

var gbDataBase = couchDB.database('guestbook');
    gbDataBase.exists(function(err, exists) {
        if (err) {
            console.log('error: ', err);
        } else if(exists) {
            console.log('the guestbook db exists');
        } else {
            console.log('databse does not exists');
            gbDataBase.create();
        }
    });

// obtem todos os documentos dentro do limite estabelecido.
gbDataBase.get('_all_docs', { limit: 1 }, function(err, res) {
    if (err) {
        console.log('error: ', err);
    } else if(res) {
        console.log(res);
    } else {
        // .. execute outra instrucao.
        console.log('outra instrucao..');
    }
});

/* 
the guestbook db exists
Response(1) [
  {
    id: '1d96ffe5b37436442424f6402b006f3b',
    key: '1d96ffe5b37436442424f6402b006f3b',
    value: { rev: '1-2c422372e71c79db87aca8289dd78827' }
  }
]
*/


// Listagem 12.10 - Fazendo log do ID de cada documento JSON retornado.

// ...codigo removido.
gbDataBase.get('_all_docs', { limit: 1 }, function(err, res) {
    if (err) {
        console.log('error: ', err);
    } else if(res) {
        var len = res.length;
        for (let i = 0; i < len; i++) {
            console.log(res[i].id);
        }
        console.log(res);
    } else {
        // .. execute outra instrucao.
        console.log('outra instrucao..');
    }
});


// Listagem 12.11 - Fazendo query de nosso banco de dados em busca de todas as assinaturas.
var cradle = require('../node_modules/cradle');
var DBConnection = cradle.Connection;
var couchDB = new DBConnection('127.0.0.1', 5984, {
    cache: true,
    raw: false,
    forceSave: true
});

var gbDataBase = couchDB.database('guestbook');
    gbDataBase.exists(function(err, exists) {
        if (err) {
            console.log('error: ', err);
        } else if(exists) {
            console.log('the guestbook db exists');
        } else {
            console.log('databse does not exists');
            gbDataBase.create();
        }
    });

// obtem uma view existente.
gbDataBase.view('guests/signatures', null, function(err, res){
    console.log(res);
});

/* 
the guestbook db exists
Response(3) [
  {
    id: '1d96ffe5b37436442424f6402b00ddf4',
    key: '@apache',
    value: {
      handle: '@apache',
      message: 'Hello World',
      _id: '1d96ffe5b37436442424f6402b00ddf4'
    }
  },
  {
    id: '1d96ffe5b37436442424f6402b006f3b',
    key: '@CouchDB',
    value: {
      handle: '@CouchDB',
      message: 'greetings and salutations',
      _id: '1d96ffe5b37436442424f6402b006f3b'
    }
  },
  {
    id: '1d96ffe5b37436442424f6402b00cf98',
    key: '@MongoDB',
    value: {
      handle: '@MongoDB',
      message: 'NoSQL DB - MongoDB',
      _id: '1d96ffe5b37436442424f6402b00cf98'
    }
  }
]
*/


// Listagem 12.12 - Filtrando todas as assinaturas de acordo com uma chave em particular.

// Query que filtra o resultado de uma view existente com uso de parametro 'key'.
// resultara no metodo HTTP GET para URL:
// http://127.0.0.1:5984/guestbook/_design/guests/_view/signatures?key="@CouchDB"

// ...codigo removido
gbDataBase.view('guests/signatures', {key: '@CouchDB'}, function(err, res){
    console.log(res);
});

/* 
the guestbook db exists
Response(1) [
  {
    id: '1d96ffe5b37436442424f6402b006f3b',
    key: '@CouchDB',
    value: {
      handle: '@CouchDB',
      message: 'greetings and salutations',
      _id: '1d96ffe5b37436442424f6402b006f3b'
    }
  }
]
*/


// Listagem 12.13 - Assinatura da callback para save.
//function(err, res);


// Listagem 12.14 - Criando um documento com o Cradle.

// ...codigo removido
gbDataBase.save(
    {
        // ID nao informado. Sera gerado pelo CouchDB.
        handle: "@MySQL",
        message: "welcome and thank you",
        time: new Date()
    },
    function(err, res) {
        if (err) {
            console.log('error: ', err);
        } else if(res) {
            console.log(res);
        }
    }
);

/* 
the guestbook db exists
Response {
  ok: true,
  id: '1d96ffe5b37436442424f6402b011707',
  rev: '1-05563dbfcdfdfcf0ca0e15b3871dd5cc'
}
*/


// Listagem 12.15 - Criando um documento de design que tenha varias views.

// ...codigo removido.

gbDataBase.save('_design/guests', {
    views: {
        sigTime: {
            map: 'function(doc) { ' + 
                    'if(doc.time) { ' + 
                        'emit(doc.handle, { handle: doc.handle, time: doc.time, message: doc.message });' + 
                    '}' + 
                 '}'
        },
        signature: {
            map: 'function(doc) { ' +  
                    'if(doc.handle) { ' + 
                        'emit(doc.handle, { handle: doc.handle, message: doc.message, _id: doc._id });' + 
                    '} ' + 
                 '}'
        },
        signaturesII: {
            map: 'function(doc) { ' + 
                    'emit(doc.handle, { handle: doc.handle, message: doc.message });' + 
                 '}'
        }
    },
    function(err, res) { 
        if (err) {
            console.log('error: ', err);
        } else if(res) {
            console.log(res);
        }
    } 
});


// Listagem 12.1 - 
// Listagem 12.1 - 
// Listagem 12.1 - 
// Listagem 12.1 - 
// Listagem 12.1 - 
// Listagem 12.1 - 
