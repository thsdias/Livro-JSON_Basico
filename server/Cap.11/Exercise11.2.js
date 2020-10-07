var http = require('http');
var server = http.createServer();
server.addListener('request', requestHandler);
server.listen(1337, '127.0.0.1');

function requestHandler(request, response) {
    console.log(request.url);
    
    if (request.method === 'POST') {
        var incomingEntity = '';
        var data;

        request.addListener('data', function(chunk) {
            incomingEntity += chunk;
        });

        request.addListener('end', function() {
            console.log('end of strem \n');
            console.log('Raw entity: ' + incomingEntity);

            if (request.headers['content-type'].indexOf('application/json') > -1) {
                data = JSON.parse(incomingEntity);

                if (request.url === '/formPost') {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.end(incomingEntity);
                }
            }
            else if(request.headers['content-type'].indexOf('application/x-www.form.urlencoded') > -1) {
                if (request.url === '/formPost') {
                    response.statusCode = 200;
                    response.setHeader('Content-type', 'text/html');
                        var fname = getParamKey('fname', incomingEntity);
                        var lname = getParamKey('lname', incomingEntity);
                    response.write('<!DOCTYPE html>');
                    response.write('<html lang="en">');                    
                    response.write('<body>');
                    response.write('<form action="formPost" method="POST" content="application/x-www-form-urlencoded">');                    
                    response.write('</body>');
                    response.end();
                    return;
                }
            }
        });
    }
    else if(request.method === 'GET') { 
        if(request.url === '/index.html') {
            response.statusCode = 200;
            response.setHeader('Content-type', 'text/html');
            response.write('<!DOCTYPE html>');
            response.write('<html lang="en">');         
            response.write('<body>');
            response.write('<form action="formPost" method="POST" onsubmit="return ajax();" content="application/x-www-form-urlencoded">');
            response.write('First-Name:');
            response.write('<input type="text" name="fname" size="25" />');
            response.write('Last-Name:');
            response.write('<input type="text" name="lname" size="25" />');
            response.write('<input type="submit" />');
            response.write('</form>');
            response.write('<script>');
            response.write('function ajax() {');
            response.write('var xhr = new XMLHttpRequest();');
            response.write('xhr.open("POST", "formPost");');
            response.write('xhr.setRequestHeader("Content-type", "application/json");');
            response.write('xhr.setRequestHeader("Accept", "application/json");');
            response.write('var input = document.getElementsByTagName("input")');
            response.write('var obj = {');
            response.write('fname: input[0].value,');
            response.write('lname: input[1].value');
            response.write('};');
            response.write('xhr.send(JSON.stringify(obj));');
            response.write('return false;');
            response.write('}');
            response.write('</script>');
            response.write('</body>');
            response.write('</html>');
            response.end();
        }
        else {
            response.statusCode = 204;
            response.end();
        }
    }

    console.log('response-end');    
};

function getParamKey(key, str) {
    var regExp = new RegExp(key.toLowerCase() + '=[^&]*');
    var matchingValue = (str.toLowerCase()).match(regExp);
    for (let i = 0; i < matchingValue.length; i++) { 
        var replacedValue = matchingValue[i].replace(key + '=', '');
        matchingValue[i] = replacedValue;
    }
    return decodeURIComponent(matchingValue[0]);
};

console.log('Server running at http://127.0.0.1:1337/index.html');
