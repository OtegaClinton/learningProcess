require("dotenv").config();
const express = require('express')
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express()
const port = 2000
app.use(express.json())
const db = require('./config/db')
const router = require('./routers/schoolRouter')

// app.get("/",(req,res)=>{
//     res.send(`welcome to my first hosting`)
// });

app.use(router)

const store = new MongoDBStore({
    uri: process.env.databaseUrl,
    collection: 'mySessions'
  });

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store
  }));

  app.get("/",(req,res)=>{
    req.session.isAuth = true;
    console.log(req.session);
    res.send("Welcome to session auth")
  })


app.listen(port, ()=>{
    console.log(`app is listening to ${port}.`)
})