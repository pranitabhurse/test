
var express = require('express');

var cors = require('cors')

var app = express();
var router = express.Router();
var bodyParser = require("body-parser"); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());


router.use((req , res , next)=>{
// console.log('middleware');
next()
})


app.use('/api', require('./Src/ApiForm/Router'));



app.get('/',function(req , res){
    res.send('my node js api with ms-sql ')

})
var server = app.listen(8000, function () {
    console.log('Server is running..');
});


   
   

