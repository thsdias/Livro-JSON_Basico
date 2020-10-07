var cradle = require('D:/Git/Estudos/Livros/JSON_Basico/server/Cap.12/node_modules/cradle');
var DBConnection = cradle.Connection;
var couchDB = new DBConnection('127.0.0.1', 5984, { 
    auth: { username: 'admin', password: 'abc123' }, 
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
            console.log('database does not exists');
            gbDataBase.create();
        }
    });

// obtem todos os documentos dentro do limite estabelecido.
/*
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
*/

/*
// obtem uma view existente.
gbDataBase.view('guests/signatures', null, function(err, res){
    console.log(res);
});
*/

/*
// query que filtra o resultado de uma view existente com uso de parametro 'key'.
gbDataBase.view('guests/signatures', {id: '1d96ffe5b37436442424f6402b00cf98'}, function(err, res){
    console.log(res);
});
*/
/*
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
*/

/*
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
*/

// obtem uma view existente.
gbDataBase.view('guests/sigTime', null, function(err, res){
    console.log(res);
});


