// npm init -y
// npm i express
//npm i ejs 
// npm install express-session
// mkdir views // create views folder
// touch index.ejs // create index.ejs file in views folder


const express = require( 'express' );
var session = require('express-session');

const app = express();
// to use ejs
app.use(session({ secret: 'codingdojorocks' }));
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
// body-parser

app.use( express.urlencoded({extended:true}) );


app.get( '/', function( request, response ){
    request.session.user = undefined;
    response.render( 'index');
});

// http://localhost:8080/users/getById?id=123
// app.get( '/users/getById', function( request, response ){
//     // necessary casting as everything from request.query is a string
//     let id = Number( request.query.id );

//     let result = users.find( user => {
//         if( user.id === id ){
//             return user;
//         }
//     });

//     if( result === undefined ){
//         response.render( 'user', { found: false } );
//     }
//     else{
//         response.render( 'user', { found: true, user: result } );
//     }
// });

// app.get( '/users/:identifier', function( request, response ){
//     let id = Number( request.params.identifier );

//     let result = users.find( user => {
//         if( user.id === id ){
//             return user;
//         }
//     });

//     if( result === undefined ){
//         response.render( 'user', { found: false } );
//     }
//     else{
//         response.render( 'user', { found: true, user: result } );
//     }
// });

app.get( '/results', function( request, response ){
    console.log(request.session.user);
    response.render( 'results', { user : request.session.user } );

});
//body-parser package: intermediary function called middleware will be in charge of receiving information from form, creating a json object and setting it to the body property

app.post( '/addUser', function( request, response ){
    console.log( request.body );
    const name = request.body.name;
    const location = request.body.location;
    const language = request.body.language;
    const comment = request.body.comment;

    const newUser = {
        name : name,
        location: location,
        language: language,
        comment: comment
    };
    console.log(newUser);
    request.session.user = newUser;

    response.redirect( '/results' );
});

app.listen( 3000, function(){
    console.log( "The users server is running in port 3000." );
});