const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const config = require('./modules/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:'3308',
    database: 'ecomreact'
})

// --------------------------------------------------------------------------------------------------------------------
// Routes USER 

app.get('/users', (req,res) => {
    let sql = "SELECT name,id FROM users"
    connection.query(sql, (err,users) => {
        if (err) console.log(err)
        else res.send(users)
    })
})

app.post('/users/sign-up',async (req,res) => {
    let cryptedPassword =  await bcrypt.hash(req.body.password,12)
    let sql = "INSERT INTO users (name,email,password) VALUES (?)"
    let user = [req.body.name,req.body.email,cryptedPassword]
    connection.query(sql,[user],(err) => {
        if (err) res.sendStatus(449)
        else res.send('Utilisateur enregistré')
    })
})

app.post('/users/sign-in',(req,res) => {
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`
    connection.query(sql, async(err,result) => {
        if (err) console.log(err)
        else if (result.length) {
            let AuthPass = await bcrypt.compare(req.body.password,result[0].password)
            let token = jwt.sign({name: result[0].name,id: result[0].id},config.secret,{expiresIn: 86400})
            if(AuthPass){
                res.json(token)
            }else{
                res.send("Mot de passe éronnée")
            }
        } else {
            res.send("Email inconnu")
        } 
    })
})

app.get('/users/:id', (req,res) => {
    let sql = `SELECT * FROM users WHERE ${req.body.id} = id`
    connection.query(sql,(err,result) => {
        if (err) console.log(err)
        else res.json(result)
    })
})

// --------------------------------------------------------------------------------------------------------------------
// Routes PRODUCT

app.get('/products', (req,res) => {
    let sql = 'SELECT id,name,price FROM products'
    connection.query(sql,(err,result) => {
        if (err) console.log(err)
        else res.send(result)
    })
})

app.post('/products',async (req,res,next) => {
     jwt.verify(req.headers.token,config.secret, (err,result) => {
        if (err) res.sendStatus(401)
        if(result) next()
    }) 
}, (req,res) => {
    let product = [req.body.category,req.body.name,req.body.description,req.body.price,req.body.id_affiliate]
    let sql = `INSERT INTO products (category,name,description,price,id_affiliate) VALUES (?)`
    connection.query(sql,[product])
    res.send(product)
})

app.get('/products/:id',(req,res) => {
    let sql = `SELECT users.name AS username,products.name,products.category,products.description,products.price FROM users INNER JOIN products ON products.id_affiliate = ${req.params.id} `
    connection.query(sql,(err,result) => {
        if (err) {
            console.log(err) 
            res.sendStatus(500)
        } else {
            res.send(result)
        }
    })
})

app.listen('8080', () => {
    console.log("server has started at http://localhost:8080/");
})
