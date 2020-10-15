
// CAP.13 - Trabalhando com templates.

// Listagem 13.2 - Incluindo a biblioteca Handlebars.
/* 
<html>
<head>
    <script src="handlebars-v4.7.6.js"></script>
</head>
<body>
    <script>
        alert(Handlebars);    // exibe referencia global ao Handlers: [object Object]
    </script>
</body>
</html>
*/


// Listagem 13.3 - Uso mais simples possivel de um template Handlebars.
/* 
<html>
<head>
    <script src="handlebars-v4.7.6.js"></script>
</head>
<body>
    <!-- 
        Define o tipo do script como uma linguagem nao identificavel,  
        para evitar que o parse do template seja feito pela engine Javascript.
    -->
    <script type="application/x-handlers" id="Handlerbar-Name-Template">
        <span>{{name}}</span>
    </script>
    <script type="application/javascript">
        var initialTemplateWrapper = document.getElementById('Handlerbar-Name-Template');
        var initialTemplateContent = initialTemplateWrapper.innerHTML;
        var dynamicTemplate = Handlebars.compile(initialTemplateContent);
        var markupOutput = dynamicTemplate({'name': 'ben'});

        document.getElementsByTagName('body')[0].innerHTML = markupOutput;
    </script>
</body>
</html>
*/


// Listagem 13.4 - Um template com uma unica expressao.
/* 
<html>
<head>
    <script src="handlebars-v4.7.6.js"></script>
</head>
<body>
    <script type="text/x-handlers" id="Handlerbar-Name-Template">
        <span>{{name}}</span>
    </script>
</body>
</html>
*/


// Listagem 13.5 - Compilando nosso Handlebar-Name-Template.
/* 
<html>
<head>
    <script src="handlebars-v4.7.6.js"></script>
</head>
<body>
    <script type="text/x-handlers" id="Handlerbar-Name-Template">
        <span class="name">{{name}}</span>
    </script>
    <script type="application/javascript">
        var templateWrapper = document.getElementById('Handlerbar-Name-Template');
        var templateContent = templateWrapper.innerHTML;
        var templateFunction = Handlebars.compile(templateContent);
    </script>
</body>
</html>
*/


// Listagem 13.6 - Assinatura de nossa funcao template.
// function(object)


// Listagem 13.7 - Um template compilado é usado para transformar dados JSON em marcacao.
/* 
...codigo removido

    <script type="application/javascript">
        var templateWrapper = document.getElementById('Handlerbar-Name-Template');
        var templateContent = templateWrapper.innerHTML;
        var templateFunction = Handlebars.compile(templateContent);
        var outputMarkup = templateFunction({'name': 'ben'});

        alert(outputMarkup);        // <span class="name">ben</span>
    </script>
</body>
</html>
*/


// Listagem 13.8 - Uso repetitivo de templateFunction com contextos variados.
/* 
...codigo removido

<script type="application/javascript">
        var templateWrapper = document.getElementById('Handlerbar-Name-Template');
        var templateContent = templateWrapper.innerHTML;
        var templateFunction = Handlebars.compile(templateContent);
        var outputMarkup;
            outputMarkup = templateFunction({'name': 'ben'});
            console.log(outputMarkup);      // <span class="name">ben</span>
            outputMarkup = templateFunction({'name': 'ivan'});
            console.log(outputMarkup);      // <span class="name">ivan</span>
            outputMarkup = templateFunction({'name': 'michael'});
            console.log(outputMarkup);      // <span class="name">michael</span>
</script>
*/


// Listagem 13.9 - Uso de varios placeholders em um template.
/* 
<body>
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            <div class="employee">
                <p>firstName: {{fName}}</p>
                <p>lastName: {{lname}}</p>
                <p>contact: {{phone}}</p>
            </div>
        </script>
    </section>
    <script></script>
</body>
*/


// Listagem 13.10 - Codigo JavaScript necessario para inserir dados em um documento com apresentacao apropriada.
/* 
...codigo removido

<body>
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            <div class="employee">
                <p>firstName: {{fName}}</p>
                <p>lastName: {{lName}}</p>
                <p>contact: {{phone}}</p>
            </div>
        </script>
    </section>
    <script type="application/javascript">
        var templateWrapper = document.getElementById('Handlebar-Employee-Template');
        var templateContent = templateWrapper.innerHTML;
        var templateFunction = Handlebars.compile(templateContent);
        var dataA = templateFunction({'fName': 'Ben', 'lName': 'Smith', 'phone': '555-1234'});
        var dataB = templateFunction({'fName': 'Ivan', 'lName': 'Bravo', 'phone': '555-5678'});
        var dataC = templateFunction({'fName': 'Michael', 'lName': 'Chang', 'phone': '555-9090'});
        var directory = document.getElementById('directory');
            directory.innerHTML = dataA;
            directory.innerHTML += dataB;
            directory.innerHTML += dataC;
    </script>
</body>

*/


// Listagem 13.11 - Uma estrutura JSON complexa.
var complexJSON = {
    'fName': 'Ben',
    'lName': 'Smith',
    'contact': {
        'phone': '555-1234',
        'cell': '555-5678',
        'email': 'ben@example.com'
    }
};


// Listagem 13.12 - Template Handlebar que usa a notacao de ponto para referenciar uma colecao aninhada.
/* 
...codigo removido

<body>
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            <div class="employee">
                <p>firstName: {{fName}}</p>
                <p>lastName: {{lName}}</p>
                <p>work: {{contact.phone}}</p>
                <p>email: {{contact.email}}</p>
                <p>celll: {{contact.cell}}</p>
            </div>
        </script>
    </section>
    <script type="application/javascript">
        var templateWrapper = document.getElementById('Handlebar-Employee-Template');
        var templateContent = templateWrapper.innerHTML;
        var templateFunction = Handlebars.compile(templateContent);
        var complexJSON = {
                            'fName': 'Ben',
                            'lName': 'Smith',
                            'contact': {
                                'phone': '555-1234',
                                'cell': '555-5678',
                                'email': 'ben@example.com'
                            }
                        };
        var directory = document.getElementById('directory');
            directory.innerHTML = templateFunction(complexJSON);
    </script>
</body>
*/


// Listagem 13.13 - Sintaxe de uma expressao de bloco.
/*
    {{#Expression}}
        // tudo que ocorrer aqui estara dentro do contexto de Expression.
    {{/Expression}}
*/


// Listagem 13.14 - Usi de uma expressao de bloco para alterar o contexto corrente.
/* 
...codigo removido

<body>
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            <div class="employee">
                <p>firstName: {{fName}}</p>
                <p>lastName: {{lName}}</p>
                {{#contact}}
                    <p>work: {{phone}}</p>
                    <p>email: {{email}}</p>
                    <p>celll: {{cell}}</p>
                {{/contact}}
            </div>
        </script>
    </section>
    <script type="application/javascript">
        var templateWrapper = document.getElementById('Handlebar-Employee-Template');
        var templateContent = templateWrapper.innerHTML;
        var templateFunction = Handlebars.compile(templateContent);
        var complexJSON = {
                            'fName': 'Ben',
                            'lName': 'Smith',
                            'contact': {
                                'phone': '555-1234',
                                'cell': '555-5678',
                                'email': 'ben@example.com'
                            }
                        };
        var directory = document.getElementById('directory');
            directory.innerHTML = templateFunction(complexJSON);
    </script>
</body>
*/


// Listagem 13.15 - Incluindo uma expressao de bloco.
/*
<body>
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            {{#employees}}
            <div class="employee">
                <p>firstName: {{fName}}</p>
                <p>lastName: {{lName}}</p> 
                <p>contact: {{phone}}</p>                
            </div>
            {{/employees}}
        </script>
    </section>
</body>
*/


// Listagem 13.16 - Uma lista ordenada de funcionarios individuais.
/*
    {
        'employees': [
            {'fName': 'Ben', 'lName': 'Smith', 'phone': '555-1234'},
            {'fName': 'Ivan', 'lName': 'Bravo', 'phone': '555-5678'},
            {'fName': 'Michael', 'lName': 'Chang', 'phone': '555-9090'}
        ];
    }
*/


// Listagem 13.17 - Utilizando uma expressao de bloco para apresentar tres funcionarios a partir de um argumento JSON.
/* 
<body>
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            {{#employees}}
            <div class="employee">
                <p>firstName: {{fName}}</p>
                <p>lastName: {{lName}}</p>
                <p>contact: {{phone}}</p>
            </div>
            {{/employees}}            
        </script>
    </section>
    <script type="application/javascript">
        var templateWrapper = document.getElementById('Handlebar-Employee-Template');
        var templateContent = templateWrapper.innerHTML;
        var templateFunction = Handlebars.compile(templateContent);
        var dataA = {
                        'employees': [
                                {'fName': 'Ben', 'lName': 'Smith', 'phone': '555-1234'},
                                {'fName': 'Ivan', 'lName': 'Bravo', 'phone': '555-5678'},
                                {'fName': 'Michael', 'lName': 'Chang', 'phone': '555-9090'}
                        ]
                    }
        var directory = document.getElementById('directory');
            directory.innerHTML = templateFunction(dataA);
    </script>
</body>
*/


// Listagem 13.19 - Sintaxe de um helper de bloco.
/*
    {{#helper Expression}}
      // contexto de expression.
    {{/helper}}
*/


// Listagem 13.20 - Sintaxe do helper each.
/*
    {{#each Expression}}
      // a avaliacao é feita em relacao ao contexto atual.
    {{/each}}
*/


// Listagem 13.21 - Retomando nossa listagem de funcionarios com a ajuda do helper each.
/* 
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            {{#each employees}}     // percorre um array.
            <div class="employee">
                <p>firstName: {{fName}}</p>
                <p>lastName: {{lName}}</p>
                {{#each contacts}}      // percorre uma colecao.
                    <p>{{@key}}: {{@this}}</p>
                {{/each}}
            </div>
            {{/each}}
        </script>
    </section>
*/


// Listagem 13.22 - Dados JSON complexos.
/*
{
    'employees': [
        {
            'fName': 'Ben',
            'lName': 'Smith',
            'contacts': {
                'phone': '555-1234',
                'cell': '555-5678',
                'email': 'ben@example.com'
            }
        },
        {
            'fName': 'Ivan',
            'lName': 'Bravo',
            'contacts': {
                'phone': '555-9012',
                'cell': '555-9034',
                'email': 'ivan@example.com'
            }
       },
        {
            'fName': 'Michael',
            'lName': 'Chang',
            'contacts': {
                'phone': '555-1234'
            }
        }
    ]
}
*/


// Listagem 13.23 - Sintaxe do helper if.
/* 
    {{#if Expression}}
        // avaliacao é feita em relacao ao contexto Expression atual.
        // Se Expression for avaliado com null, 0, false, undefined o bloco sera ignorado.
    {{/if}}
*/


// Listagem 13.24 - Incluindo o helper if.
/* 
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            {{#employees}}
            <div class="employee">
                <p>firstName: {{fName}}</p>
                <p>lastName: {{lName}}</p>
                {{#contacts}} 
                    {{#if phone}} <p>phone: {{phone}}</p> {{/if}}
                    {{#if email}} <p>email: {{email}}</p> {{/if}}
                    {{#if cell}} <p>celll: {{cell}}</p> {{/if}}
                {{/contacts}}
            </div>
            {{/employees}}
        </script>
    </section>
*/


// Listagem 13.25 - Sintaxe do helper unless.
/* 
    {{#unless Expression}}
        // avaliacao é feita em relacao ao contexto Expression atual.
        // É avaliado como verdadeiro se o valor de Expression for null, 0, false, undefined.
    {{/unless}}
*/


// Listagem 13.26 - Incluindo o helper unless.
/* 
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            {{#employees}}
                {{#unless contacts.email}}
                <div class="employee">
                    <p>firstName: {{fName}}</p>
                    <p>lastName: {{lName}}</p>
                    {{#contacts}} 
                        {{#if phone}} <p>phone: {{phone}}</p> {{/if}}
                        {{#if email}} <p>email: {{email}}</p> {{/if}}
                        {{#if cell}} <p>celll: {{cell}}</p> {{/if}}
                    {{/contacts}}
                </div>
                {{/unless}}
            {{/employees}}
        </script>
    </section>
*/


// Listagem 13.27 - Sintaxe do helper else.
/* 
    {{#if Expression}}
        // avaliacao será feita para o contexto atual se verdadeiro.
    {{else}}
        // avaliacao será feita para o contexto atual se falso.
    {{/if}}


    {{#unless Expression}}
        // avaliacao será feita para o contexto atual se falso.
    {{else}}
        // avaliacao será feita para o contexto atual se verdadeiro.
    {{/unless}}
*/


// Listagem 13.28 - Incluindo o helper else.
/* 
    <section id="directory">
        <script type="application/x-handlebars" id=Handlebar-Employee-Template>
            {{#employees}}
                {{#unless contacts.email}}
                <div class="lacksEmail">
                    <p>requires contact for {{fName}} {{lName}}</p>
                </div>
                {{else}}
                <div class="lacksEmail">
                    <p>congratulations {{fName}} {{lName}}</p>
                </div>
                {{/unless}}
            {{/employees}}
        </script>
    </section>
*/


// Listagem 13.2 - 