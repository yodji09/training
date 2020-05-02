const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes/index')
const errHandler = require('./middlewares/errHandler')
require('dotenv').config()

app.use(express.urlencoded({extended : true}))
app.use(router)
app.use(cors)
app.use(express.json())
app.use(errHandler)

app.listen(port, ()=> {
    console.log("this app listen to port", port)
})