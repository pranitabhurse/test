
var express = require('express');

var app = express();


app.get('/',function(req , res){
    res.send('my node js api with ms-sql')

})

var server = app.listen(7000, function () {
    console.log('Server is running..');
});
