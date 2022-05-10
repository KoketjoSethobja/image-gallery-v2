const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');

const app = express();
const saltRounds = 10
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', '*'],
    method: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    //key: 'userId', //name of the cookie
    secret: 'koketjosethobjasethobjakoketjo', //
    resave: true,
    saveUninitialized: true
}))

const db = mysql.createConnection({
    user: 'koketjo',
    host: 'mysql-db-gallery.cpu7powidjpl.us-east-1.rds.amazonaws.com',
    password: 'skoketjo',
    database: 'public'
});

cloudinary.config({
    cloud_name: 'koketjosethobja',
    api_key: '941348775951192',
    api_secret: 'y5CEoBG-UQFwqqHYXSBqF0qxiC0',
    secure: true
});

app.post('/register', (req, res) => {
    const inputData = {
        username: req.body.username,
        password: req.body.password
    }
    var sql = 'INSERT INTO public.Users (username, password) VALUES (?,?)';

    bcrypt.hash(inputData.password, saltRounds, (err, hash) => {
        if(err) {
            console.log(err)
        }
        db.query(sql, [inputData.username, hash], (err, results) => {
            if(err){
                console.log(err)
            }
            if(results) {
                res.send({passed: 'Registration successful'})
                //console.log(results)
            } else {
                res.send({message: 'Registration failed'})
                //console.log(err)
            }
        })
    })        
})

app.post('/login', (req, response) => {
    const username = req.body.username;
    const password = req.body.password;
    var sql = 'SELECT * FROM public.Users WHERE username = ?';

    db.query(sql, username, (notFound, found) => {
        if(found){
            bcrypt.compare(password, found[0].password, (err, res) => {
                if(res){
                    req.session.regenerate(() => {
                        console.log('password matches user logged in')
                        req.session.found = found.username;
                        // console.log(found[0].idUsers+' '+found[0].username)
                        console.log(found)
                        response.send(found)
                    })
                } else {
                    console.log('password do not match' + err)
                }
            })
        } else {
            console.log('username does not exist')
        }
    })
})

// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     var sql = 'SELECT * FROM public.Users WHERE username = ?';
//     db.query(sql, username, (err, result) => {
//         if(err){
//             // res.send({err: err})
//             //res.send({message: err})
//             console.log(err)
//         }
//         if(result.length > 0) {            
//             bcrypt.compare(password, result[0].password, (error, response) => {
//                 if(response){
//                     // app.set('id', result[0].idUsers)
//                     // res.send({message: result})
//                     app.set('id', result[0].idUsers); 
//                     req.session.user = result[0].username;                    
//                     console.log(req.session.user)
//                     console.log(response)
//                     res.send(result)
//                 } else {
//                     // res.send({message: error})
//                     console.log(error)
//                     // res.send({message: 'Wrong username or password'})
//                 }
//             })
//         } else {
//             console.log('failed')
//             // res.send({message: 'User does not exist'})
//         }
//     })
// })

app.listen(PORT, () => {
    console.log('running server');
})