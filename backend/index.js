const express  = require('express')
const morgan = require("morgan");
const cors = require("cors")
const body_parser = require("body-parser")
require("dotenv").config()
const app = express();
const db = require("./db")

// handle all routes
const auth_route = require('./routes/auth')
const product_route = require('./routes/product')

const PORT = process.env.PORT 
app.use(morgan('dev'));
app.use(body_parser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/',(req,res)=>{
   res.json({message:"Hello E-coomerce"})
})

// routes middle ware

app.use('',auth_route)
app.use('',product_route)



app.listen(PORT,()=>{
    console.log(`Server is running at Port : ${PORT}`); 

})