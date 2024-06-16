const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '1234',
        database: 'postgres'
    },
    searchPath: ['serwis_internetowy'],
});

const app = express();

let initialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/', (request, response) => {
    response.sendFile(path.join(initialPath, "index.html"));
});

app.get('/login', (request, response) => {
    response.sendFile(path.join(initialPath, "login.html"));
});

app.get('/register', (request, response) => {
    response.sendFile(path.join(initialPath, "register.html"));
});

app.post('/register-user', (request, response) => {
    const {name, email, password} = request.body;

    if(name.length === 0 || email.length === 0 || password.length === 0) {
        response.json("Wypełnij wszystkie pola")
    } else {
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name, email"])
        .then(data => {
            response.json(data[0])
        })
        .catch(err => {
            if(err.datail.includes('Konto już istnieje')) {
                response.json("Podany e-mail już istnieje")
            }
        })
    }
});

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('Email jest niepoprawny');
        }
    })
})


app.get('/contact', (request, response) => {
    response.sendFile(path.join(initialPath, "contact.html"));
});


app.listen(3000, (request, response) => {
    console.log("Listening on port 3000...")
});